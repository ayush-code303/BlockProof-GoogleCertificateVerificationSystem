import axios from "axios";

// API base URL from environment or default to localhost

const API_BASE_URL =
  import.meta.env.VITE_API_URL || "http://localhost:5000/api";

/**

 * Axios instance with default config

 */

const api = axios.create({
  baseURL: API_BASE_URL,

  headers: {
    "Content-Type": "application/json",
  },

  timeout: 30000, // 30 second timeout
});

/**

 * Certificate API endpoints

 * All methods return response.data directly

 */

export const certificateAPI = {
  /**

   * Issue a new certificate

   * POST /api/certificates/issue

   */

  issueCertificate: async (certificateData) => {
    const response = await api.post("/certificates/issue", certificateData);

    return response.data;
  },

  /**

   * Verify certificate using blockchain + AI

   * POST /api/certificates/verify

   */

  verifyCertificate: async (certificateId, certificateData = null) => {
    const response = await api.post("/certificates/verify", {
      certificateId,

      certificateData,
    });

    return response.data;
  },

  /**

   * Get certificate details from blockchain

   * GET /api/certificates/:certificateId

   */

  getCertificate: async (certificateId) => {
    const response = await api.get(`/certificates/${certificateId}`);

    return response.data;
  },

  /**

   * Revoke a certificate

   * POST /api/certificates/:certificateId/revoke

   */

  revokeCertificate: async (certificateId, reason) => {
    const response = await api.post(`/certificates/${certificateId}/revoke`, {
      reason,
    });

    return response.data;
  },

  /**

   * Analyze certificate image for tampering

   * POST /api/certificates/analyze-image

   */

  analyzeImage: async (file) => {
    const formData = new FormData();

    formData.append("file", file);

    const response = await api.post("/certificates/analyze-image", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return response.data;
  },

  /**

   * Extract data from certificate image (OCR-like)

   * POST /api/certificates/extract-data

   */

  extractData: async (file) => {
    const formData = new FormData();

    formData.append("file", file);

    const response = await api.post("/certificates/extract-data", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return response.data;
  },

  /**

   * Health check - verify API is running

   * GET /api/health

   */

  healthCheck: async () => {
    const response = await api.get("/health");

    return response.data;
  },

  /**

   * Get API status and available features

   * GET /api/status

   */

  getStatus: async () => {
    const response = await api.get("/status");

    return response.data;
  },
};

/**

 * Error handler - centralized error handling

 */

api.interceptors.response.use(
  (response) => response,

  (error) => {
    if (error.response) {
      console.error("API Error:", error.response.data);
    } else if (error.request) {
      console.error("No response from API:", error.request);
    } else {
      console.error("Error:", error.message);
    }

    return Promise.reject(error);
  }
);

export default api;
