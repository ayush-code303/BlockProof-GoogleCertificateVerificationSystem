const { generateHash } = require('../utils/hash');
const blockchainService = require('../utils/blockchain');
const geminiService = require('../utils/gemini');
const crypto = require('crypto');

/**
 * Issue a new certificate
 */
async function issueCertificate(req, res) {
  try {
    const { recipientName, issuerName, course, issueDate, additionalInfo } = req.body;

    // Validate required fields
    if (!recipientName || !issuerName || !course) {
      return res.status(400).json({
        success: false,
        message: 'Missing required fields: recipientName, issuerName, course'
      });
    }

    // Generate unique certificate ID
    const certificateId = `CERT-${Date.now()}-${crypto.randomBytes(4).toString('hex').toUpperCase()}`;

    // Prepare certificate data
    const certificateData = {
      certificateId,
      recipientName,
      issuerName,
      course,
      issueDate: issueDate || new Date().toISOString(),
      additionalInfo: additionalInfo || '',
      issuedAt: new Date().toISOString()
    };

    // Generate SHA-256 hash
    const certificateHash = generateHash(certificateData);

    // Store on blockchain
    const blockchainResult = await blockchainService.storeCertificate(
      certificateId,
      certificateHash,
      issuerName,
      recipientName
    );

    // Prepare response
    const response = {
      success: true,
      message: 'Certificate issued successfully',
      certificate: {
        ...certificateData,
        hash: certificateHash
      },
      blockchain: blockchainResult
    };

    res.status(201).json(response);
  } catch (error) {
    console.error('Error issuing certificate:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to issue certificate',
      error: error.message
    });
  }
}

/**
 * Verify a certificate
 */
async function verifyCertificate(req, res) {
  try {
    const { certificateId, certificateData } = req.body;

    if (!certificateId) {
      return res.status(400).json({
        success: false,
        message: 'Certificate ID is required'
      });
    }

    // Step 1: Verify on blockchain
    const blockchainResult = await blockchainService.verifyCertificate(certificateId);

    if (!blockchainResult.success || !blockchainResult.exists) {
      return res.status(404).json({
        success: false,
        message: 'Certificate not found on blockchain',
        blockchain: blockchainResult,
        verified: false
      });
    }

    // Step 2: AI verification (if certificate data provided)
    let aiResult = null;
    if (certificateData) {
      aiResult = await geminiService.verifyCertificate({
        certificateId,
        ...certificateData,
        ...blockchainResult
      });
    }

    // Step 3: Hash verification (if certificate data provided)
    let hashMatch = null;
    if (certificateData) {
      const computedHash = generateHash(certificateData);
      hashMatch = computedHash === blockchainResult.hash;
    }

    // Determine overall verification status
    const verified = blockchainResult.exists && 
                     (hashMatch === null || hashMatch) && 
                     (aiResult === null || aiResult.aiVerified);

    res.json({
      success: true,
      verified,
      certificateId,
      blockchain: blockchainResult,
      ai: aiResult,
      hashVerification: hashMatch !== null ? {
        match: hashMatch,
        message: hashMatch ? 'Certificate data matches blockchain record' : 'Certificate data does not match blockchain record'
      } : null,
      message: verified ? 'Certificate verified successfully' : 'Certificate verification failed'
    });
  } catch (error) {
    console.error('Error verifying certificate:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to verify certificate',
      error: error.message
    });
  }
}

/**
 * Get certificate details
 */
async function getCertificate(req, res) {
  try {
    const { certificateId } = req.params;

    if (!certificateId) {
      return res.status(400).json({
        success: false,
        message: 'Certificate ID is required'
      });
    }

    const result = await blockchainService.getCertificate(certificateId);

    if (!result.success) {
      return res.status(404).json({
        success: false,
        message: 'Certificate not found',
        error: result.error
      });
    }

    res.json(result);
  } catch (error) {
    console.error('Error getting certificate:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to get certificate',
      error: error.message
    });
  }
}

module.exports = {
  issueCertificate,
  verifyCertificate,
  getCertificate
};
