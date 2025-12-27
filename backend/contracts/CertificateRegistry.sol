// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

/**
 * @title CertificateRegistry
 * @dev Store and verify certificate hashes on blockchain
 */
contract CertificateRegistry {
    
    struct Certificate {
        bytes32 certificateHash;
        string issuerName;
        string recipientName;
        uint256 timestamp;
        bool exists;
    }
    
    // Mapping from certificate ID to Certificate struct
    mapping(string => Certificate) private certificates;
    
    // Events
    event CertificateStored(
        string indexed certificateId,
        bytes32 certificateHash,
        string issuerName,
        string recipientName,
        uint256 timestamp
    );
    
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
    ) public {
        require(!certificates[certificateId].exists, "Certificate already exists");
        require(bytes(certificateId).length > 0, "Certificate ID cannot be empty");
        require(certificateHash != bytes32(0), "Certificate hash cannot be empty");
        
        certificates[certificateId] = Certificate({
            certificateHash: certificateHash,
            issuerName: issuerName,
            recipientName: recipientName,
            timestamp: block.timestamp,
            exists: true
        });
        
        emit CertificateStored(
            certificateId,
            certificateHash,
            issuerName,
            recipientName,
            block.timestamp
        );
    }
    
    /**
     * @dev Verify if a certificate exists and return its details
     * @param certificateId The certificate ID to verify
     * @return exists Whether the certificate exists
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
            bytes32 certificateHash,
            string memory issuerName,
            string memory recipientName,
            uint256 timestamp
        )
    {
        Certificate memory cert = certificates[certificateId];
        return (
            cert.exists,
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
     */
    function getCertificate(string memory certificateId)
        public
        view
        returns (
            bytes32 certificateHash,
            string memory issuerName,
            string memory recipientName,
            uint256 timestamp
        )
    {
        require(certificates[certificateId].exists, "Certificate does not exist");
        Certificate memory cert = certificates[certificateId];
        return (
            cert.certificateHash,
            cert.issuerName,
            cert.recipientName,
            cert.timestamp
        );
    }
}
