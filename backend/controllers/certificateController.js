const blockchain = require("../utils/blockchain");
const gemini = require("../utils/gemini");
const { generateHash } = require("../utils/hash");

// 1. Issue Certificate
exports.issueCertificate = async (req, res) => {
  try {
    const { recipientName, course, issuerName } = req.body;
    const certId = `BP-${Date.now()}`;
    const certHash = generateHash({ recipientName, course, certId });
    const tx = await blockchain.storeOnChain(
      certId,
      certHash,
      issuerName,
      recipientName
    );
    res
      .status(201)
      .json({
        success: true,
        certificateId: certId,
        transactionHash: tx.txHash,
      });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// 2. Verify Certificate
exports.verifyCertificate = async (req, res) => {
  try {
    const { certificateId } = req.body;
    const onChain = await blockchain.verifyOnChain(certificateId);
    if (!onChain.exists)
      return res.json({ verdict: "TAMPERING_DETECTED", trustScore: 0 });
    const aiAnalysis = await gemini.verifyCertificateContent(null, onChain);
    res.json({
      success: true,
      verdict: aiAnalysis.isAuthentic ? "VERIFIED" : "SUSPICIOUS",
      trustScore: aiAnalysis.confidence,
      blockchain: { exists: true, hash: onChain.hash },
      ai: { analysis: aiAnalysis.reason },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "System failure" });
  }
};

// 3. Get Certificate (Ye missing tha shayad)
exports.getCertificate = async (req, res) => {
  try {
    const { certificateId } = req.params;
    const data = await blockchain.verifyOnChain(certificateId);
    res.json({ success: true, data });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// 4. Revoke Certificate
exports.revokeCertificate = async (req, res) => {
  res.json({ success: true, message: "Revoke logic to be implemented" });
};
