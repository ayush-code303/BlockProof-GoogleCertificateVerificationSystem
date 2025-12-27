const express = require('express');
const router = express.Router();
const multer = require('multer');
const {
  issueCertificate,
  verifyCertificate,
  getCertificate,
  revokeCertificate,
  analyzeImage,
  extractData
} = require('../controllers/certificateController');

/**
 * Multer configuration for file uploads
 * Accepts images and PDFs, max 5MB
 */
const upload = multer({
  dest: './uploads/',
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
  fileFilter: (req, file, cb) => {
    const allowedMimes = ['image/jpeg', 'image/png', 'image/gif', 'application/pdf'];
    if (allowedMimes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Invalid file type. Only JPG, PNG, GIF, and PDF allowed.'));
    }
  }
});

// ==================== CERTIFICATE ISSUANCE ====================

/**
 * POST /api/certificates/issue
 * Issue a new certificate with blockchain storage
 * @body {recipientName, issuerName, course, issueDate, additionalInfo}
 */
router.post('/certificates/issue', issueCertificate);

// ==================== CERTIFICATE VERIFICATION ====================

/**
 * POST /api/certificates/verify
 * Verify certificate using blockchain + AI two-layer verification
 * @body {certificateId, certificateData (optional)}
 */
router.post('/certificates/verify', verifyCertificate);

/**
 * GET /api/certificates/:certificateId
 * Get certificate details from blockchain
 */
router.get('/certificates/:certificateId', getCertificate);

// ==================== CERTIFICATE REVOCATION ====================

/**
 * POST /api/certificates/:certificateId/revoke
 * Revoke a certificate (mark as invalid)
 * @body {reason}
 */
router.post('/certificates/:certificateId/revoke', revokeCertificate);

// ==================== IMAGE ANALYSIS (AI) ====================

/**
 * POST /api/certificates/analyze-image
 * Analyze certificate image for tampering using AI
 * @body {file: multipart}
 */
router.post('/certificates/analyze-image', upload.single('file'), analyzeImage);

/**
 * POST /api/certificates/extract-data
 * Extract certificate data from image using AI (OCR-like)
 * @body {file: multipart}
 */
router.post('/certificates/extract-data', upload.single('file'), extractData);

module.exports = router;
