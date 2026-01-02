// Upgrade: Optimized for Gas and Audit-ready
contract CertificateRegistry {
    // ... structures ...
    
    // String ki jagah bytes32 (Gas efficient)
    mapping(bytes32 => Certificate) private certificates;
    
    // Unique ID ko hash karke store karne ke liye helper
    function _toKey(string memory id) internal pure returns (bytes32) {
        return keccak256(abi.encodePacked(id));
    }

    function storeCertificate(
        string memory certificateId,
        bytes32 certificateHash,
        string memory issuerName,
        string memory recipientName
    ) public onlyAuthorized {
        bytes32 key = _toKey(certificateId);
        require(!certificates[key].exists, "ID already exists");
        
        certificates[key] = Certificate({
            certificateHash: certificateHash,
            issuerName: issuerName,
            recipientName: recipientName,
            timestamp: block.timestamp,
            exists: true,
            revoked: false,
            revokedAt: 0
        });
        // ... rest of the logic ...
    }
}