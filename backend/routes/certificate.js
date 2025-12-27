const express = require('express');
const router = express.Router();
const {
  issueCertificate,
  verifyCertificate,
  getCertificate
} = require('../controllers/certificateController');

// Issue a new certificate
router.post('/issue-certificate', issueCertificate);

// Verify a certificate
router.post('/verify-certificate', verifyCertificate);

// Get certificate details by ID
router.get('/certificate/:certificateId', getCertificate);

module.exports = router;
