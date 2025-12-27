// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

/**
 * @title CertificateRegistry
 * @dev Store, verify, and revoke certificate hashes on blockchain
 * This contract enables immutable storage of certificate hashes for verification
 * and supports certificate revocation for compromised or invalid certificates.
 */
contract CertificateRegistry {
    
    // ==================== DATA STRUCTURES ====================
    
    struct Certificate {
        bytes32 certificateHash;           // SHA-256 hash of certificate data
        string issuerName;                 // Organization/person issuing certificate
        string recipientName;              // Person receiving the certificate
        uint256 timestamp;                 // Block timestamp when certificate was stored
        bool exists;                       // Whether certificate exists
        bool revoked;                      // Whether certificate has been revoked
        uint256 revokedAt;                 // Timestamp when certificate was revoked
    }
    
    // ==================== STORAGE ====================
    
    // Mapping from certificate ID to Certificate struct
    mapping(string => Certificate) private certificates;
    
    // Contract owner (for admin functions)
    address public owner;
    
    // Mapping for authorized issuers
    mapping(address => bool) public authorizedIssuers;
    
    // Total certificates count
    uint256 public certificateCount;
    
    // ==================== EVENTS ====================
    
    /**
     * @dev Emitted when a certificate is stored
     */
    event CertificateStored(
        string indexed certificateId,
        bytes32 certificateHash,
        string issuerName,
        string recipientName,
        uint256 timestamp
    );
    
    /**
     * @dev Emitted when a certificate is revoked
     */
    event CertificateRevoked(
        string indexed certificateId,
        uint256 revokedAt,
        string reason
    );
    
    /**
     * @dev Emitted when an issuer is authorized
     */
    event IssuerAuthorized(address indexed issuer);
    
    /**
     * @dev Emitted when an issuer is revoked
     */
    event IssuerRevoked(address indexed issuer);
    
    // ==================== MODIFIERS ====================
    
    /**
     * @dev Ensure only contract owner can call function
     */
    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner can call this function");
        _;
    }
    
    /**
     * @dev Ensure only authorized issuers or owner can issue certificates
     */
    modifier onlyAuthorized() {
        require(authorizedIssuers[msg.sender] || msg.sender == owner, "Not authorized to issue certificates");
        _;
    }
    
    // ==================== CONSTRUCTOR ====================
    
    /**
     * @dev Initialize contract with owner
     */
    constructor() {
        owner = msg.sender;
        authorizedIssuers[msg.sender] = true;
        certificateCount = 0;
    }
    
    // ==================== ADMIN FUNCTIONS ====================
    
    /**
     * @dev Authorize an issuer to issue certificates
     * @param issuer Address of the issuer to authorize
     */
    function authorizeIssuer(address issuer) public onlyOwner {
        require(issuer != address(0), "Invalid issuer address");
        require(!authorizedIssuers[issuer], "Issuer already authorized");
        authorizedIssuers[issuer] = true;
        emit IssuerAuthorized(issuer);
    }
    
    /**
     * @dev Revoke issuer authorization
     * @param issuer Address of the issuer to revoke
     */
    function revokeIssuer(address issuer) public onlyOwner {
        require(authorizedIssuers[issuer], "Issuer not authorized");
        authorizedIssuers[issuer] = false;
        emit IssuerRevoked(issuer);
    }
    
    // ==================== CORE FUNCTIONS ====================
    
    /**
     * @dev Store a certificate hash on the blockchain
     * @param certificateId Unique identifier for the certificate
     * @param certificateHash SHA-256 hash of the certificate
     * @param issuerName Name of the organization/person issuing the certificate
     * @param recipientName Name of the certificate recipient
     */
    function storeCertificate(
        string memory certificateId,
        bytes32 certificateHash,
        string memory issuerName,
        string memory recipientName
    ) public onlyAuthorized {
        require(!certificates[certificateId].exists, "Certificate already exists");
        require(bytes(certificateId).length > 0, "Certificate ID cannot be empty");
        require(certificateHash != bytes32(0), "Certificate hash cannot be empty");
        
        certificates[certificateId] = Certificate({
            certificateHash: certificateHash,
            issuerName: issuerName,
            recipientName: recipientName,
            timestamp: block.timestamp,
            exists: true,
            revoked: false,
            revokedAt: 0
        });
        
        certificateCount++;
        
        emit CertificateStored(
            certificateId,
            certificateHash,
            issuerName,
            recipientName,
            block.timestamp
        );
    }
    
    /**
     * @dev Verify if a certificate exists and is valid (not revoked) and return its details
     * @param certificateId The certificate ID to verify
     * @return exists Whether the certificate exists
     * @return isValid Whether certificate is valid (exists and not revoked)
     * @return certificateHash The stored hash
     * @return issuerName The issuer name
     * @return recipientName The recipient name
     * @return timestamp When the certificate was stored
     */
    function verifyCertificate(string memory certificateId)
        public
        view
        returns (
            bool exists,
            bool isValid,
            bytes32 certificateHash,
            string memory issuerName,
            string memory recipientName,
            uint256 timestamp
        )
    {
        Certificate memory cert = certificates[certificateId];
        bool valid = cert.exists && !cert.revoked;
        return (
            cert.exists,
            valid,
            cert.certificateHash,
            cert.issuerName,
            cert.recipientName,
            cert.timestamp
        );
    }
    
    /**
     * @dev Get certificate details
     * @param certificateId The certificate ID
     * @return certificateHash The certificate hash
     * @return issuerName The issuer name
     * @return recipientName The recipient name
     * @return timestamp The timestamp
     * @return revoked Whether certificate is revoked
     */
    function getCertificate(string memory certificateId)
        public
        view
        returns (
            bytes32 certificateHash,
            string memory issuerName,
            string memory recipientName,
            uint256 timestamp,
            bool revoked
        )
    {
        require(certificates[certificateId].exists, "Certificate does not exist");
        Certificate memory cert = certificates[certificateId];
        return (
            cert.certificateHash,
            cert.issuerName,
            cert.recipientName,
            cert.timestamp,
            cert.revoked
        );
    }
    
    /**
     * @dev Revoke a certificate (mark as invalid)
     * @param certificateId The certificate ID to revoke
     * @param reason Reason for revocation
     */
    function revokeCertificate(string memory certificateId, string memory reason) 
        public onlyAuthorized 
    {
        require(certificates[certificateId].exists, "Certificate does not exist");
        require(!certificates[certificateId].revoked, "Certificate already revoked");
        
        certificates[certificateId].revoked = true;
        certificates[certificateId].revokedAt = block.timestamp;
        
        emit CertificateRevoked(certificateId, block.timestamp, reason);
    }
    
    /**
     * @dev Check if a certificate is valid (exists and not revoked)
     * @param certificateId The certificate ID to check
     * @return valid Whether the certificate is valid
     */
    function isCertificateValid(string memory certificateId) 
        public 
        view 
        returns (bool) 
    {
        Certificate memory cert = certificates[certificateId];
        return cert.exists && !cert.revoked;
    }
    
    /**
     * @dev Verify the hash of a certificate matches the stored hash
     * @param certificateId The certificate ID
     * @param providedHash The hash to verify against
     * @return matches Whether the provided hash matches the stored hash
     */
    function verifyHash(string memory certificateId, bytes32 providedHash) 
        public 
        view 
        returns (bool) 
    {
        require(certificates[certificateId].exists, "Certificate does not exist");
        return certificates[certificateId].certificateHash == providedHash;
    }
}
