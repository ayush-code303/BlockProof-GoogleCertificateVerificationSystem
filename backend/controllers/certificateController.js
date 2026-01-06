const { generateHash } = require("../utils/hash");
const blockchainService = require("../utils/blockchain");
const geminiService = require("../utils/gemini");
const crypto = require("crypto");

// Issue Certificate Function
async function issueCertificate(req, res) {
  try {
    const { recipientName, issuerName, course } = req.body;

    const timestamp = Date.now();
    const randomSuffix = crypto.randomBytes(4).toString("hex").toUpperCase();
    const certificateId = `CERT-${timestamp}-${randomSuffix}`;

    const certificateData = {
      certificateId,
      recipientName: recipientName.trim(),
      issuerName: issuerName.trim(),
      course: course.trim(),
      issuedAt: new Date().toISOString(),
    };

    const certificateHash = generateHash(certificateData);
    const blockchainResult = await blockchainService.verifyCertificate(
      certificateId
    );

    res.status(201).json({
      success: true,
      message: "Certificate issued successfully",
      certificate: { ...certificateData, hash: certificateHash },
      blockchain: blockchainResult,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to issue certificate",
      error: error.message,
    });
  }
}

// Verify Certificate Function (EXACTLY YOUR LOGIC)
async function verifyCertificate(req, res) {
  try {
    const { certificateId } = req.body;

    if (!certificateId) {
      return res
        .status(400)
        .json({ success: false, message: "Certificate ID is required" });
    }

    console.log(`🔍 Scanning ID: ${certificateId}`);

    let currentVerdict = "VERIFIED";
    let currentScore = 95;
    let existsOnBlockchain = true;

    // Conditions from your original code
    if (certificateId === "0001") {
      currentVerdict = "TAMPERING_DETECTED";
      currentScore = 35;
    } else if (certificateId === "1234") {
      currentVerdict = "SUSPICIOUS";
      currentScore = 55;
    } else if (certificateId.toLowerCase() === "fake") {
      existsOnBlockchain = false;
      currentVerdict = "TAMPERING_DETECTED";
      currentScore = 10;
    }

    const aiConfidence = currentScore + Math.random() * 5;

    res.json({
      success: true,
      verified: currentVerdict === "VERIFIED",
      certificateId: certificateId,
      trustScore: Math.round(currentScore),
      verdict: currentVerdict,
      blockchain: {
        success: true,
        exists: existsOnBlockchain,
        isValid: existsOnBlockchain,
        hash: "0x" + crypto.randomBytes(32).toString("hex"),
        message: existsOnBlockchain
          ? "Record found in Ledger"
          : "No record found on Blockchain",
      },
      ai: {
        confidence: Math.round(aiConfidence),
        isAuthentic: currentScore > 50,
        analysis: "Multi-layered forensic analysis complete.",
      },
      message: "Forensic Scan Complete",
    });
  } catch (error) {
    console.error("Verification Error:", error);
    res.status(500).json({
      success: false,
      message: "Error during verification",
      error: error.message,
    });
  }
}

async function getCertificate(req, res) {
  try {
    const result = await blockchainService.verifyCertificate(
      req.params.certificateId
    );
    res.json(result);
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
}

async function revokeCertificate(req, res) {
  try {
    res.json({ success: true, message: "Revocation logic simulated" });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
}

// Named exports (Required for routes)
module.exports = {
  issueCertificate,
  verifyCertificate,
  getCertificate,
  revokeCertificate,
};
