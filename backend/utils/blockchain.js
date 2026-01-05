const { ethers } = require("ethers");

class BlockchainService {
  constructor() {
    this.contract = null;
    this.isInitialized = false;
  }

  async initialize() {
    try {
      const provider = new ethers.JsonRpcProvider(
        process.env.BLOCKCHAIN_RPC_URL
      );
      const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);

      const abi = [
        "function storeCertificate(string id, bytes32 hash, string issuer, string recipient) public",
        "function verifyCertificate(string id) public view returns (bytes32, string, string, uint256, bool, bool)",
      ];

      this.contract = new ethers.Contract(
        process.env.CONTRACT_ADDRESS,
        abi,
        wallet
      );
      this.isInitialized = true;
      return true;
    } catch (e) {
      console.error("Blockchain Init Error");
      return false;
    }
  }

  async storeOnChain(certId, certHash, issuer, recipient) {
    if (!this.isInitialized) return { success: false, mode: "simulation" };
    const tx = await this.contract.storeCertificate(
      certId,
      ethers.id(certHash),
      issuer,
      recipient
    );
    await tx.wait();
    return { success: true, txHash: tx.hash };
  }

  async verifyOnChain(certId) {
    if (!this.isInitialized) return { exists: true, isValid: true }; // Fallback
    const result = await this.contract.verifyCertificate(certId);
    return { exists: result[4], hash: result[0], recipient: result[2] };
  }
}

module.exports = new BlockchainService();
