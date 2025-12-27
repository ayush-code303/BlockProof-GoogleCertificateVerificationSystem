const { generateHash, generateFileHash } = require('../utils/hash');
const blockchainService = require('../utils/blockchain');
const geminiService = require('../utils/gemini');
const crypto = require('crypto');

/**
 * Issue a new certificate
 * Creates a certificate with unique ID, hashes the data, stores on blockchain
 * @route POST /api/certificates/issue
 * @body {recipientName, issuerName, course, issueDate, additionalInfo}
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

    // Generate unique certificate ID using timestamp and random bytes
    const timestamp = Date.now();
    const randomSuffix = crypto.randomBytes(4).toString('hex').toUpperCase();
    const certificateId = `CERT-${timestamp}-${randomSuffix}`;

    // Prepare certificate data object
    const certificateData = {
      certificateId,
      recipientName: recipientName.trim(),
      issuerName: issuerName.trim(),
      course: course.trim(),
      issueDate: issueDate || new Date().toISOString().split('T')[0],
      additionalInfo: additionalInfo || '',
      issuedAt: new Date().toISOString()
    };

    // Step 1: Generate SHA-256 hash of certificate data
    const certificateHash = generateHash(certificateData);
    console.log(`📝 Generated certificate hash: ${certificateHash.substring(0, 16)}...`);

    // Step 2: Store certificate on blockchain
    const blockchainResult = await blockchainService.storeCertificate(
      certificateId,
      certificateHash,
      issuerName,
      recipientName
    );

    // Prepare response with all certificate details
    const response = {
      success: true,
      message: 'Certificate issued successfully',
      certificate: {
        ...certificateData,
        hash: certificateHash
      },
      blockchain: blockchainResult,
      verification: {
        message: 'Certificate stored on blockchain. Use the Certificate ID to verify.',
        certificateId: certificateId
      }
    };

    res.status(201).json(response);
  } catch (error) {
    console.error('Error issuing certificate:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to issue certificate',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
    });
  }
}

/**
 * Verify a certificate using blockchain + AI
 * Two-layer verification: blockchain hash + AI analysis
 * @route POST /api/certificates/verify
 * @body {certificateId, certificateData (optional)}
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

    console.log(`🔍 Starting verification for certificate: ${certificateId}`);

    // Step 1: Verify certificate exists on blockchain
    const blockchainResult = await blockchainService.verifyCertificate(certificateId);

    if (!blockchainResult.success || !blockchainResult.exists) {
      return res.status(404).json({
        success: false,
        verified: false,
        certificateId,
        message: 'Certificate not found on blockchain',
        blockchain: blockchainResult,
        nextSteps: 'Please check the Certificate ID and try again'
      });
    }

    // Step 2: Check if certificate is revoked
    const isValid = blockchainResult.isValid;
    if (!isValid) {
      return res.json({
        success: false,
        verified: false,
        certificateId,
        message: 'Certificate has been revoked',
        blockchain: blockchainResult,
        status: 'REVOKED'
      });
    }

    // Step 3: Hash verification (if certificate data provided)
    let hashVerification = null;
    let hashMatch = false;
    if (certificateData) {
      const computedHash = generateHash(certificateData);
      hashMatch = computedHash === blockchainResult.hash;
      hashVerification = {
        match: hashMatch,
        computedHash: computedHash,
        storedHash: blockchainResult.hash,
        message: hashMatch ? 'Certificate data matches blockchain record' : 'Certificate data does NOT match blockchain record (possible tampering!)'
      };
    }

    // Step 4: AI verification (if certificate data provided)
    let aiResult = null;
    if (certificateData) {
      console.log('🤖 Running AI analysis...');
      aiResult = await geminiService.verifyCertificate({
        certificateId,
        recipientName: certificateData.recipientName,
        issuer: certificateData.issuerName,
        course: certificateData.course,
        issueDate: certificateData.issueDate,
        hashMatch: hashMatch
      });
    }

    // Step 5: Determine overall verification status
    // Certificate is verified if: exists on blockchain AND not revoked AND (no data OR hash matches) AND (no AI OR AI confident)
    const verified = blockchainResult.exists && 
                     isValid && 
                     (hashVerification === null || hashMatch) && 
                     (aiResult === null || (aiResult.isAuthentic && aiResult.confidence >= 60));

    // Determine verdict
    let verdict = 'SUSPICIOUS';
    if (verified) {
      verdict = 'VERIFIED';
    } else if (!hashMatch) {
      verdict = 'TAMPERING_DETECTED';
    } else if (aiResult && aiResult.tampering !== 'none') {
      verdict = aiResult.tampering === 'likely' ? 'LIKELY_FAKE' : 'SUSPICIOUS';
    }

    res.json({
      success: true,
      verified: verified,
      certificateId,
      verdict, // VERIFIED, SUSPICIOUS, TAMPERING_DETECTED, or LIKELY_FAKE
      confidence: aiResult ? aiResult.confidence : 100,
      blockchain: {
        exists: blockchainResult.exists,
        isValid: blockchainResult.isValid,
        onBlockchain: blockchainResult.onBlockchain,
        message: blockchainResult.message
      },
      hashVerification: hashVerification,
      ai: aiResult,
      message: verified ? 'Certificate verified successfully!' : 'Certificate verification failed - possible issues detected'
    });
  } catch (error) {
    console.error('Error verifying certificate:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to verify certificate',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
    });
  }
}

/**
 * Get certificate details from blockchain
 * @route GET /api/certificates/:certificateId
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
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
    });
  }
}

/**
 * Revoke a certificate (mark as invalid)
 * @route POST /api/certificates/:certificateId/revoke
 * @body {reason}
 */
async function revokeCertificate(req, res) {
  try {
    const { certificateId } = req.params;
    const { reason } = req.body;

    if (!certificateId) {
      return res.status(400).json({
        success: false,
        message: 'Certificate ID is required'
      });
    }

    const revocationReason = reason || 'Certificate revoked by administrator';
    
    const result = await blockchainService.revokeCertificate(
      certificateId,
      revocationReason
    );

    if (!result.success) {
      return res.status(400).json({
        success: false,
        message: 'Failed to revoke certificate',
        error: result.error || result.message
      });
    }

    res.json({
      success: true,
      message: 'Certificate revoked successfully',
      certificateId,
      reason: revocationReason,
      blockchain: result
    });
  } catch (error) {
    console.error('Error revoking certificate:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to revoke certificate',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
    });
  }
}

/**
 * Analyze certificate image/PDF for tampering
 * @route POST /api/certificates/analyze-image
 * @body {file: multipart file}
 */
async function analyzeImage(req, res) {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'Certificate image/PDF file is required'
      });
    }

    const filePath = req.file.path;
    console.log(`📸 Analyzing certificate image: ${req.file.filename}`);

    const analysisResult = await geminiService.analyzeImage(filePath);

    res.json({
      success: analysisResult.success,
      ...analysisResult,
      fileName: req.file.filename,
      fileSize: req.file.size
    });
  } catch (error) {
    console.error('Error analyzing image:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to analyze certificate image',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
    });
  }
}

/**
 * Extract data from certificate image/PDF
 * @route POST /api/certificates/extract-data
 * @body {file: multipart file}
 */
async function extractData(req, res) {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'Certificate image/PDF file is required'
      });
    }

    const filePath = req.file.path;
    console.log(`📄 Extracting data from certificate: ${req.file.filename}`);

    const extractionResult = await geminiService.extractCertificateData(filePath);

    res.json({
      success: extractionResult.success,
      ...extractionResult,
      fileName: req.file.filename
    });
  } catch (error) {
    console.error('Error extracting data:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to extract certificate data',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
    });
  }
}

module.exports = {
  issueCertificate,
  verifyCertificate,
  getCertificate,
  revokeCertificate,
  analyzeImage,
  extractData
};
