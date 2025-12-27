const { ethers } = require('ethers');
require('dotenv').config();

// Smart contract ABI for certificate storage and verification
const contractABI = [
  "function storeCertificate(string memory certificateId, bytes32 certificateHash, string memory issuerName, string memory recipientName) public",
  "function verifyCertificate(string memory certificateId) public view returns (bool, bytes32, string memory, string memory, uint256)",
  "function getCertificate(string memory certificateId) public view returns (bytes32, string memory, string memory, uint256)"
];

class BlockchainService {
  constructor() {
    this.provider = null;
    this.wallet = null;
    this.contract = null;
  }

  /**
   * Initialize blockchain connection
   */
  async initialize() {
    try {
      // Connect to Polygon Mumbai testnet (or Ethereum testnet)
      this.provider = new ethers.JsonRpcProvider(
        process.env.BLOCKCHAIN_RPC_URL || 'https://rpc-mumbai.maticvigil.com/'
      );

      // Create wallet instance
      if (process.env.PRIVATE_KEY) {
        this.wallet = new ethers.Wallet(process.env.PRIVATE_KEY, this.provider);
      }

      // Initialize contract if address is provided
      if (process.env.CONTRACT_ADDRESS && this.wallet) {
        this.contract = new ethers.Contract(
          process.env.CONTRACT_ADDRESS,
          contractABI,
          this.wallet
        );
      }

      console.log('✓ Blockchain service initialized');
      return true;
    } catch (error) {
      console.error('✗ Blockchain initialization error:', error.message);
      return false;
    }
  }

  /**
   * Store certificate hash on blockchain
   * @param {string} certificateId - Unique certificate ID
   * @param {string} certificateHash - SHA-256 hash of certificate
   * @param {string} issuerName - Name of the issuer
   * @param {string} recipientName - Name of the recipient
   * @returns {Object} - Transaction details
   */
  async storeCertificate(certificateId, certificateHash, issuerName, recipientName) {
    try {
      if (!this.contract) {
        throw new Error('Contract not initialized. Please deploy the smart contract and set CONTRACT_ADDRESS in .env');
      }

      // Convert hash to bytes32 format
      const hashBytes32 = '0x' + certificateHash;

      // Store certificate on blockchain
      const tx = await this.contract.storeCertificate(
        certificateId,
        hashBytes32,
        issuerName,
        recipientName
      );

      // Wait for transaction confirmation
      const receipt = await tx.wait();

      return {
        success: true,
        transactionHash: receipt.hash,
        blockNumber: receipt.blockNumber,
        certificateId,
        message: 'Certificate stored on blockchain successfully'
      };
    } catch (error) {
      console.error('Error storing certificate on blockchain:', error);
      return {
        success: false,
        error: error.message,
        message: 'Failed to store certificate on blockchain'
      };
    }
  }

  /**
   * Verify certificate on blockchain
   * @param {string} certificateId - Certificate ID to verify
   * @returns {Object} - Verification result
   */
  async verifyCertificate(certificateId) {
    try {
      if (!this.contract) {
        throw new Error('Contract not initialized. Please deploy the smart contract and set CONTRACT_ADDRESS in .env');
      }

      // Call contract verify function
      const [exists, hash, issuer, recipient, timestamp] = await this.contract.verifyCertificate(certificateId);

      if (!exists) {
        return {
          success: false,
          exists: false,
          message: 'Certificate not found on blockchain'
        };
      }

      return {
        success: true,
        exists: true,
        certificateId,
        hash: hash.slice(2), // Remove '0x' prefix
        issuer,
        recipient,
        timestamp: new Date(Number(timestamp) * 1000).toISOString(),
        message: 'Certificate verified on blockchain'
      };
    } catch (error) {
      console.error('Error verifying certificate on blockchain:', error);
      return {
        success: false,
        error: error.message,
        message: 'Failed to verify certificate on blockchain'
      };
    }
  }

  /**
   * Get certificate details from blockchain
   * @param {string} certificateId - Certificate ID
   * @returns {Object} - Certificate details
   */
  async getCertificate(certificateId) {
    try {
      if (!this.contract) {
        throw new Error('Contract not initialized');
      }

      const [hash, issuer, recipient, timestamp] = await this.contract.getCertificate(certificateId);

      return {
        success: true,
        certificateId,
        hash: hash.slice(2),
        issuer,
        recipient,
        timestamp: new Date(Number(timestamp) * 1000).toISOString()
      };
    } catch (error) {
      console.error('Error getting certificate:', error);
      return {
        success: false,
        error: error.message
      };
    }
  }
}

// Create singleton instance
const blockchainService = new BlockchainService();

module.exports = blockchainService;
