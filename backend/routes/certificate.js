const express = require("express");
const router = express.Router();
const {
  issueCertificate,
  verifyCertificate,
  getCertificate,
  revokeCertificate,
} = require("../controllers/certificateController");

// ==================== CERTIFICATE ISSUANCE ====================
router.post("/certificates/issue", issueCertificate);

// ==================== CERTIFICATE VERIFICATION ====================
router.post("/certificates/verify", verifyCertificate);

router.get("/certificates/:certificateId", getCertificate);

// ==================== CERTIFICATE REVOCATION ====================
router.post("/certificates/:certificateId/revoke", revokeCertificate);

module.exports = router;
