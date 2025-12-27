import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const certificateAPI = {
  // Issue a new certificate
  issueCertificate: async (certificateData) => {
    const response = await api.post('/issue-certificate', certificateData);
    return response.data;
  },

  // Verify a certificate
  verifyCertificate: async (certificateId, certificateData = null) => {
    const response = await api.post('/verify-certificate', {
      certificateId,
      certificateData,
    });
    return response.data;
  },

  // Get certificate details
  getCertificate: async (certificateId) => {
    const response = await api.get(`/certificate/${certificateId}`);
    return response.data;
  },

  // Health check
  healthCheck: async () => {
    const response = await api.get('/health');
    return response.data;
  },
};

export default api;
