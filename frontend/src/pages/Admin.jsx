import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { certificateAPI } from '../utils/api';

const Admin = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    recipientName: '',
    issuerName: '',
    course: '',
    issueDate: new Date().toISOString().split('T')[0],
    additionalInfo: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const result = await certificateAPI.issueCertificate(formData);
      
      if (result.success) {
        // Navigate to result page with certificate data
        navigate('/result', {
          state: {
            type: 'issue',
            data: result,
          },
        });
      } else {
        setError(result.message || 'Failed to issue certificate');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'An error occurred while issuing the certificate');
      console.error('Error issuing certificate:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-200px)] bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold mb-3">
              <span className="text-google-blue">Issue</span>{' '}
              <span className="text-google-red">Certificate</span>
            </h1>
            <p className="text-gray-600">
              Create and store a verified certificate on the blockchain
            </p>
          </div>

          {/* Form */}
          <div className="card">
            {error && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-red-800">{error}</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Recipient Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Recipient Name *
                </label>
                <input
                  type="text"
                  name="recipientName"
                  value={formData.recipientName}
                  onChange={handleChange}
                  required
                  className="input-field"
                  placeholder="Enter recipient's full name"
                />
              </div>

              {/* Issuer Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Issuer Name/Organization *
                </label>
                <input
                  type="text"
                  name="issuerName"
                  value={formData.issuerName}
                  onChange={handleChange}
                  required
                  className="input-field"
                  placeholder="Enter issuing organization name"
                />
              </div>

              {/* Course/Certificate Title */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Course/Certificate Title *
                </label>
                <input
                  type="text"
                  name="course"
                  value={formData.course}
                  onChange={handleChange}
                  required
                  className="input-field"
                  placeholder="e.g., Web Development Certification"
                />
              </div>

              {/* Issue Date */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Issue Date *
                </label>
                <input
                  type="date"
                  name="issueDate"
                  value={formData.issueDate}
                  onChange={handleChange}
                  required
                  className="input-field"
                />
              </div>

              {/* Additional Information */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Additional Information (Optional)
                </label>
                <textarea
                  name="additionalInfo"
                  value={formData.additionalInfo}
                  onChange={handleChange}
                  rows="4"
                  className="input-field"
                  placeholder="Add any additional details about the certificate"
                />
              </div>

              {/* Info Box */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="flex items-start">
                  <svg
                    className="w-5 h-5 text-google-blue mt-0.5 mr-3"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <div className="text-sm text-gray-700">
                    <p className="font-medium mb-1">How it works:</p>
                    <ul className="list-disc list-inside space-y-1 text-gray-600">
                      <li>A unique certificate ID will be generated automatically</li>
                      <li>Certificate data will be hashed using SHA-256</li>
                      <li>The hash will be stored on the blockchain</li>
                      <li>You'll receive the certificate ID for future verification</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <div className="flex space-x-4">
                <button
                  type="submit"
                  disabled={loading}
                  className="btn-primary flex-1 disabled:bg-gray-400 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <span className="flex items-center justify-center">
                      <svg
                        className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Issuing Certificate...
                    </span>
                  ) : (
                    'Issue Certificate'
                  )}
                </button>
                <button
                  type="button"
                  onClick={() => navigate('/')}
                  className="btn-secondary"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;
