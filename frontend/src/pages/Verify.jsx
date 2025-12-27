import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { certificateAPI } from '../utils/api';

const Verify = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [certificateId, setCertificateId] = useState(searchParams.get('id') || '');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    // If ID is in URL params, auto-verify
    const id = searchParams.get('id');
    if (id) {
      setCertificateId(id);
      handleVerify(id);
    }
  }, [searchParams]);

  const handleVerify = async (id = certificateId) => {
    if (!id.trim()) {
      setError('Please enter a certificate ID');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const result = await certificateAPI.verifyCertificate(id.trim());
      
      // Navigate to result page with verification data
      navigate('/result', {
        state: {
          type: 'verify',
          data: result,
        },
      });
    } catch (err) {
      setError(err.response?.data?.message || 'An error occurred while verifying the certificate');
      console.error('Error verifying certificate:', err);
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleVerify();
  };

  return (
    <div className="min-h-[calc(100vh-200px)] bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold mb-3">
              <span className="text-google-blue">Verify</span>{' '}
              <span className="text-google-red">Certificate</span>
            </h1>
            <p className="text-gray-600">
              Enter the certificate ID to verify its authenticity
            </p>
          </div>

          {/* Verification Form */}
          <div className="card">
            {error && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-red-800">{error}</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Certificate ID
                </label>
                <input
                  type="text"
                  value={certificateId}
                  onChange={(e) => setCertificateId(e.target.value)}
                  className="input-field"
                  placeholder="e.g., CERT-1234567890-ABCD1234"
                  required
                />
                <p className="mt-2 text-sm text-gray-500">
                  Enter the unique certificate ID provided when the certificate was issued
                </p>
              </div>

              {/* How Verification Works */}
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
                    <p className="font-medium mb-1">Two-Layer Verification:</p>
                    <ul className="list-disc list-inside space-y-1 text-gray-600">
                      <li>
                        <strong>Blockchain Layer:</strong> Checks if the certificate exists on
                        the blockchain and retrieves its hash
                      </li>
                      <li>
                        <strong>AI Layer:</strong> Uses Google Gemini AI to analyze
                        certificate data for authenticity
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="btn-primary w-full disabled:bg-gray-400 disabled:cursor-not-allowed"
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
                    Verifying Certificate...
                  </span>
                ) : (
                  'Verify Certificate'
                )}
              </button>
            </form>
          </div>

          {/* Additional Info */}
          <div className="mt-8 text-center text-gray-600">
            <p className="mb-4">Don't have a certificate ID?</p>
            <button
              onClick={() => navigate('/admin')}
              className="text-google-blue hover:underline"
            >
              Issue a new certificate →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Verify;
