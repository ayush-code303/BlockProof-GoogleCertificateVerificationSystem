const express = require("express");
const router = express.Router();

// Controller import
const certificateController = require("../controllers/certificateController");

// Destructuring functions from controller
const {
  issueCertificate,
  verifyCertificate,
  getCertificate,
  revokeCertificate,
} = certificateController;

// Define Routes with Callback Functions
// POST: /api/certificates/issue
router.post("/certificates/issue", issueCertificate);

// POST: /api/certificates/verify
router.post("/certificates/verify", verifyCertificate);

// GET: /api/certificates/:certificateId
router.get("/certificates/:certificateId", getCertificate);

// POST: /api/certificates/:certificateId/revoke
router.post("/certificates/:certificateId/revoke", revokeCertificate);

module.exports = router;
