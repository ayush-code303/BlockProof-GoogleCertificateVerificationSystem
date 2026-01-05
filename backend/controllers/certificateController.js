const blockchain = require("../utils/blockchain");
const gemini = require("../utils/gemini");
const { generateHash } = require("../utils/hash");

exports.issueCertificate = async (req, res) => {
  const { recipientName, course, issuerName } = req.body;
  const certId = `BP-${Date.now()}`;
  const certHash = generateHash({ recipientName, course, certId });

  // 1. Store on Real Blockchain
  const chainResult = await blockchain.storeOnChain(
    certId,
    certHash,
    issuerName,
    recipientName
  );

  res.json({ success: true, certificateId: certId, blockchain: chainResult });
};

exports.verifyCertificate = async (req, res) => {
  const { certificateId, certificateData } = req.body;

  // 1. Real Blockchain Check
  const onChainData = await blockchain.verifyOnChain(certificateId);

  // 2. Real AI Analysis
  const aiResult = await gemini.verifyCertificateContent(null, certificateData);

  let verdict = "VERIFIED";
  if (!onChainData.exists) verdict = "TAMPERING_DETECTED";
  else if (aiResult.confidence < 60) verdict = "SUSPICIOUS";

  res.json({
    success: true,
    certificateId,
    verdict,
    trustScore: aiResult.confidence,
    blockchain: { exists: onChainData.exists, status: "ON_CHAIN" },
    ai: { confidence: aiResult.confidence, analysis: aiResult.reason },
  });
};
