const express = require("express");
const router = express.Router();
const {
  issueCertificate,
  verifyCertificate,
  getCertificate,
  revokeCertificate,
} = require("../controllers/certificateController");

// ==================== CERTIFICATE ISSUANCE ====================
/**
 * POST /api/certificates/issue
 */
router.post("/certificates/issue", issueCertificate);

// ==================== CERTIFICATE VERIFICATION ====================
/**
 * POST /api/certificates/verify
 */
router.post("/certificates/verify", verifyCertificate);

/**
 * GET /api/certificates/:certificateId
 */
router.get("/certificates/:certificateId", getCertificate);

// ==================== CERTIFICATE REVOCATION ====================
/**
 * POST /api/certificates/:certificateId/revoke
 */
router.post("/certificates/:certificateId/revoke", revokeCertificate);

module.exports = router;
