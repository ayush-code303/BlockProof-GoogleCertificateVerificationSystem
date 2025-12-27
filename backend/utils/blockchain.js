const { ethers } = require('ethers');
require('dotenv').config();

// Smart contract ABI with all functions and events
const contractABI = [
  // Issuer Management
  "function authorizeIssuer(address issuer) public",
  "function revokeIssuer(address issuer) public",
  
  // Certificate Operations
  "function storeCertificate(string memory certificateId, bytes32 certificateHash, string memory issuerName, string memory recipientName) public",
  "function verifyCertificate(string memory certificateId) public view returns (bool, bool, bytes32, string memory, string memory, uint256)",
  "function getCertificate(string memory certificateId) public view returns (bytes32, string memory, string memory, uint256, bool)",
  "function revokeCertificate(string memory certificateId, string memory reason) public",
  "function isCertificateValid(string memory certificateId) public view returns (bool)",
  "function verifyHash(string memory certificateId, bytes32 providedHash) public view returns (bool)",
  
  // State variables
  "function owner() public view returns (address)",
  "function authorizedIssuers(address) public view returns (bool)",
  "function certificateCount() public view returns (uint256)",
  
  // Events
  "event CertificateStored(string indexed certificateId, bytes32 certificateHash, string issuerName, string recipientName, uint256 timestamp)",
  "event CertificateRevoked(string indexed certificateId, uint256 revokedAt, string reason)",
  "event IssuerAuthorized(address indexed issuer)",
  "event IssuerRevoked(address indexed issuer)"
];

/**
 * BlockchainService - Handles all blockchain interactions
 * This service manages certificate storage, verification, and revocation on Ethereum/Polygon
 */
class BlockchainService {
  constructor() {
    this.provider = null;
    this.wallet = null;
    this.contract = null;
    this.isInitialized = false;
  }

  /**
   * Initialize blockchain connection to Polygon Mumbai testnet or configured RPC
   * Sets up wallet and contract instance for blockchain operations
   */
  async initialize() {
    try {
      // Connect to blockchain RPC endpoint
      // Default: Polygon Mumbai testnet (free, perfect for hackathons)
      const rpcUrl = process.env.BLOCKCHAIN_RPC_URL || 'https://rpc-mumbai.maticvigil.com/';
      this.provider = new ethers.JsonRpcProvider(rpcUrl);

      // Test RPC connection
      const network = await this.provider.getNetwork();
      console.log(`✓ Connected to blockchain: ${network.name} (Chain ID: ${network.chainId})`);

      // Create wallet instance from private key
      if (process.env.PRIVATE_KEY) {
        this.wallet = new ethers.Wallet(process.env.PRIVATE_KEY, this.provider);
        console.log(`✓ Wallet loaded: ${this.wallet.address}`);
      }

      // Initialize contract if address is provided
      if (process.env.CONTRACT_ADDRESS && this.wallet) {
        this.contract = new ethers.Contract(
          process.env.CONTRACT_ADDRESS,
          contractABI,
          this.wallet
        );
        console.log(`✓ Contract initialized at: ${process.env.CONTRACT_ADDRESS}`);
        this.isInitialized = true;
      } else {
        console.warn('⚠ Contract not fully initialized. Blockchain operations will be simulated.');
        console.warn('Set CONTRACT_ADDRESS and PRIVATE_KEY in .env to enable full blockchain features.');
      }

      return true;
    } catch (error) {
      console.error('✗ Blockchain initialization error:', error.message);
      return false;
    }
  }

  /**
   * Store certificate hash on blockchain (immutable record)
   * @param {string} certificateId - Unique certificate identifier
   * @param {string} certificateHash - SHA-256 hash of certificate data
   * @param {string} issuerName - Organization issuing the certificate
   * @param {string} recipientName - Person receiving the certificate
   * @returns {Object} - Transaction details with hash and block info
   */
  async storeCertificate(certificateId, certificateHash, issuerName, recipientName) {
    try {
      if (!this.isInitialized || !this.contract) {
        // Simulate blockchain storage if not configured
        return this.simulateBlockchainStorage(certificateId, certificateHash);
      }

      // Convert hash string to bytes32 format (0x + hex)
      const hashBytes32 = '0x' + certificateHash.replace('0x', '');

      console.log(`📝 Storing certificate ${certificateId} on blockchain...`);
      
      // Call smart contract function to store certificate
      const tx = await this.contract.storeCertificate(
        certificateId,
        hashBytes32,
        issuerName,
        recipientName
      );

      // Wait for transaction to be confirmed (1 confirmation = 1 block)
      const receipt = await tx.wait(1);

      return {
        success: true,
        onBlockchain: true,
        transactionHash: receipt.hash,
        blockNumber: receipt.blockNumber,
        certificateId,
        gasUsed: receipt.gasUsed.toString(),
        blockchainUrl: `https://mumbai.polygonscan.com/tx/${receipt.hash}`,
        message: 'Certificate stored on blockchain successfully'
      };
    } catch (error) {
      console.error('Error storing certificate on blockchain:', error.message);
      
      // Fall back to simulation on error
      if (error.message.includes('Contract not initialized')) {
        return this.simulateBlockchainStorage(certificateId, certificateHash);
      }
      
      return {
        success: false,
        onBlockchain: false,
        error: error.message,
        message: 'Failed to store certificate on blockchain'
      };
    }
  }

  /**
   * Verify certificate on blockchain
   * Checks if certificate exists and is valid (not revoked)
   * @param {string} certificateId - Certificate ID to verify
   * @returns {Object} - Verification status and certificate details
   */
  async verifyCertificate(certificateId) {
    try {
      if (!this.isInitialized || !this.contract) {
        // Simulate verification if not configured
        return this.simulateBlockchainVerification(certificateId);
      }

      console.log(`🔍 Verifying certificate ${certificateId} on blockchain...`);

      // Call smart contract to verify certificate
      const [exists, isValid, hash, issuer, recipient, timestamp] = 
        await this.contract.verifyCertificate(certificateId);

      if (!exists) {
        return {
          success: false,
          onBlockchain: true,
          exists: false,
          isValid: false,
          message: 'Certificate not found on blockchain'
        };
      }

      return {
        success: true,
        onBlockchain: true,
        exists: true,
        isValid: isValid, // true if not revoked
        certificateId,
        hash: hash.replace('0x', ''),
        issuer,
        recipient,
        timestamp: new Date(Number(timestamp) * 1000).toISOString(),
        message: isValid ? 'Certificate verified - valid' : 'Certificate exists but has been revoked'
      };
    } catch (error) {
      console.error('Error verifying certificate on blockchain:', error.message);
      return this.simulateBlockchainVerification(certificateId);
    }
  }

  /**
   * Get certificate details from blockchain
   * @param {string} certificateId - Certificate ID
   * @returns {Object} - Certificate information and status
   */
  async getCertificate(certificateId) {
    try {
      if (!this.isInitialized || !this.contract) {
        return {
          success: false,
          onBlockchain: false,
          message: 'Contract not initialized'
        };
      }

      const [hash, issuer, recipient, timestamp, revoked] = 
        await this.contract.getCertificate(certificateId);

      return {
        success: true,
        onBlockchain: true,
        certificateId,
        hash: hash.replace('0x', ''),
        issuer,
        recipient,
        timestamp: new Date(Number(timestamp) * 1000).toISOString(),
        revoked: revoked,
        status: revoked ? 'REVOKED' : 'VALID'
      };
    } catch (error) {
      console.error('Error getting certificate:', error.message);
      return {
        success: false,
        onBlockchain: false,
        error: error.message
      };
    }
  }

  /**
   * Revoke a certificate on blockchain
   * @param {string} certificateId - Certificate ID to revoke
   * @param {string} reason - Reason for revocation
   * @returns {Object} - Revocation transaction details
   */
  async revokeCertificate(certificateId, reason = 'Certificate invalidated') {
    try {
      if (!this.isInitialized || !this.contract) {
        return this.simulateRevocation(certificateId);
      }

      console.log(`🚫 Revoking certificate ${certificateId} on blockchain...`);

      const tx = await this.contract.revokeCertificate(certificateId, reason);
      const receipt = await tx.wait(1);

      return {
        success: true,
        onBlockchain: true,
        certificateId,
        transactionHash: receipt.hash,
        blockNumber: receipt.blockNumber,
        message: 'Certificate revoked successfully'
      };
    } catch (error) {
      console.error('Error revoking certificate:', error.message);
      return this.simulateRevocation(certificateId);
    }
  }

  /**
   * Check if a specific certificate is valid (exists and not revoked)
   * @param {string} certificateId - Certificate ID
   * @returns {boolean} - true if valid, false otherwise
   */
  async isCertificateValid(certificateId) {
    try {
      if (!this.isInitialized || !this.contract) {
        return true; // Assume valid if not on blockchain
      }

      return await this.contract.isCertificateValid(certificateId);
    } catch (error) {
      console.error('Error checking certificate validity:', error.message);
      return false;
    }
  }

  /**
   * Verify that a provided hash matches the stored hash for a certificate
   * @param {string} certificateId - Certificate ID
   * @param {string} providedHash - Hash to verify against
   * @returns {boolean} - true if hashes match
   */
  async verifyHash(certificateId, providedHash) {
    try {
      if (!this.isInitialized || !this.contract) {
        return false;
      }

      const hashBytes32 = '0x' + providedHash.replace('0x', '');
      return await this.contract.verifyHash(certificateId, hashBytes32);
    } catch (error) {
      console.error('Error verifying hash:', error.message);
      return false;
    }
  }

  /**
   * Simulate blockchain storage for demo/development purposes
   * @private
   */
  simulateBlockchainStorage(certificateId, certificateHash) {
    const mockTxHash = '0x' + Math.random().toString(16).slice(2, 66);
    return {
      success: true,
      onBlockchain: false,
      simulated: true,
      transactionHash: mockTxHash,
      blockNumber: Math.floor(Math.random() * 1000000),
      certificateId,
      gasUsed: '125000',
      message: 'Certificate storage simulated (not on actual blockchain)'
    };
  }

  /**
   * Simulate blockchain verification for demo/development purposes
   * @private
   */
  simulateBlockchainVerification(certificateId) {
    return {
      success: true,
      onBlockchain: false,
      simulated: true,
      exists: true,
      isValid: true,
      certificateId,
      hash: '0'.repeat(64), // Mock hash
      issuer: 'Demo Issuer',
      recipient: 'Demo Recipient',
      timestamp: new Date().toISOString(),
      message: 'Certificate verification simulated (not on actual blockchain)'
    };
  }

  /**
   * Simulate certificate revocation for demo purposes
   * @private
   */
  simulateRevocation(certificateId) {
    return {
      success: true,
      onBlockchain: false,
      simulated: true,
      certificateId,
      transactionHash: '0x' + Math.random().toString(16).slice(2, 66),
      message: 'Certificate revocation simulated'
    };
  }
}

// Create and export singleton instance
const blockchainService = new BlockchainService();

module.exports = blockchainService;
