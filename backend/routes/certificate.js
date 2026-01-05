const express = require("express");
const router = express.Router();
const certificateController = require("../controllers/certificateController");

// Destructuring with safety check
const {
  issueCertificate,
  verifyCertificate,
  getCertificate,
  revokeCertificate,
} = certificateController;

// Routes
router.post("/certificates/issue", issueCertificate);
router.post("/certificates/verify", verifyCertificate);

// Line 23: Yahan error tha, ab ye fix ho jayega
router.get("/certificates/:certificateId", getCertificate);

router.post("/certificates/:certificateId/revoke", revokeCertificate);

module.exports = router;
