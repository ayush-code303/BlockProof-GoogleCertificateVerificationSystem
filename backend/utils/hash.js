const crypto = require('crypto');

/**
 * Generate SHA-256 hash from certificate data
 * @param {Object} certificateData - Certificate information
 * @returns {string} - SHA-256 hash
 */
function generateHash(certificateData) {
  const dataString = JSON.stringify(certificateData);
  return crypto.createHash('sha256').update(dataString).digest('hex');
}

/**
 * Generate SHA-256 hash from file buffer
 * @param {Buffer} fileBuffer - File content buffer
 * @returns {string} - SHA-256 hash
 */
function generateFileHash(fileBuffer) {
  return crypto.createHash('sha256').update(fileBuffer).digest('hex');
}

module.exports = {
  generateHash,
  generateFileHash
};
