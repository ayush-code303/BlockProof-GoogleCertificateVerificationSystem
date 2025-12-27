import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const Result = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { type, data } = location.state || {};

  if (!data || !type) {
    return (
      <div className="min-h-[calc(100vh-200px)] bg-gray-50 py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <p className="text-gray-600 mb-4">No data available</p>
            <button onClick={() => navigate('/')} className="btn-primary">
              Go Home
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Render Issue Result
  if (type === 'issue') {
    const { certificate, blockchain } = data;
    return (
      <div className="min-h-[calc(100vh-200px)] bg-gray-50 py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            {/* Success Header */}
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-4">
                <svg
                  className="w-10 h-10 text-green-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h1 className="text-4xl font-bold mb-3 text-green-600">
                Certificate Issued Successfully!
              </h1>
              <p className="text-gray-600">
                Your certificate has been stored on the blockchain
              </p>
            </div>

            {/* Certificate Details */}
            <div className="card space-y-6">
              <div>
                <h2 className="text-2xl font-semibold mb-4">Certificate Details</h2>
              </div>

              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <p className="text-sm font-medium text-gray-700 mb-1">
                  Certificate ID (Save this for verification)
                </p>
                <p className="text-lg font-mono font-bold text-gray-900 break-all">
                  {certificate.certificateId}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Recipient Name</p>
                  <p className="font-medium">{certificate.recipientName}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">Issuer</p>
                  <p className="font-medium">{certificate.issuerName}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">Course/Title</p>
                  <p className="font-medium">{certificate.course}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">Issue Date</p>
                  <p className="font-medium">
                    {new Date(certificate.issueDate).toLocaleDateString()}
                  </p>
                </div>
              </div>

              {certificate.additionalInfo && (
                <div>
                  <p className="text-sm text-gray-600 mb-1">Additional Information</p>
                  <p className="font-medium">{certificate.additionalInfo}</p>
                </div>
              )}

              <div>
                <p className="text-sm text-gray-600 mb-1">Certificate Hash (SHA-256)</p>
                <p className="font-mono text-sm bg-gray-100 p-3 rounded break-all">
                  {certificate.hash}
                </p>
              </div>

              {blockchain.success && blockchain.transactionHash && (
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <p className="font-medium text-gray-900 mb-2">
                    Blockchain Transaction Details
                  </p>
                  <div className="space-y-2 text-sm">
                    <div>
                      <span className="text-gray-600">Transaction Hash: </span>
                      <span className="font-mono break-all">
                        {blockchain.transactionHash}
                      </span>
                    </div>
                    {blockchain.blockNumber && (
                      <div>
                        <span className="text-gray-600">Block Number: </span>
                        <span className="font-mono">{blockchain.blockNumber}</span>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Actions */}
            <div className="mt-8 flex space-x-4">
              <button
                onClick={() => navigate(`/verify?id=${certificate.certificateId}`)}
                className="btn-primary"
              >
                Verify This Certificate
              </button>
              <button onClick={() => navigate('/admin')} className="btn-secondary">
                Issue Another Certificate
              </button>
              <button onClick={() => navigate('/')} className="btn-secondary">
                Go Home
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Render Verification Result
  if (type === 'verify') {
    const { verified, blockchain, ai } = data;
    const isVerified = verified && blockchain.exists;

    return (
      <div className="min-h-[calc(100vh-200px)] bg-gray-50 py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            {/* Verification Header */}
            <div className="text-center mb-8">
              <div
                className={`inline-flex items-center justify-center w-20 h-20 rounded-full mb-4 ${
                  isVerified ? 'bg-green-100' : 'bg-red-100'
                }`}
              >
                {isVerified ? (
                  <svg
                    className="w-10 h-10 text-green-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                ) : (
                  <svg
                    className="w-10 h-10 text-red-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                )}
              </div>
              <h1
                className={`text-4xl font-bold mb-3 ${
                  isVerified ? 'text-green-600' : 'text-red-600'
                }`}
              >
                {isVerified ? 'Certificate Verified!' : 'Verification Failed'}
              </h1>
              <p className="text-gray-600">
                {isVerified
                  ? 'This certificate is authentic and valid'
                  : 'This certificate could not be verified'}
              </p>
            </div>

            {/* Verification Details */}
            <div className="space-y-6">
              {/* Blockchain Verification */}
              <div className="card">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-semibold mb-2">
                      Blockchain Verification
                    </h3>
                    <p className="text-sm text-gray-600">
                      Certificate existence on Ethereum/Polygon blockchain
                    </p>
                  </div>
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium ${
                      blockchain.exists
                        ? 'bg-green-100 text-green-800'
                        : 'bg-red-100 text-red-800'
                    }`}
                  >
                    {blockchain.exists ? 'Verified' : 'Not Found'}
                  </span>
                </div>

                {blockchain.exists && (
                  <div className="space-y-3">
                    <div>
                      <p className="text-sm text-gray-600 mb-1">Certificate ID</p>
                      <p className="font-mono text-sm bg-gray-100 p-2 rounded break-all">
                        {blockchain.certificateId}
                      </p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-gray-600 mb-1">Issuer</p>
                        <p className="font-medium">{blockchain.issuer}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600 mb-1">Recipient</p>
                        <p className="font-medium">{blockchain.recipient}</p>
                      </div>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 mb-1">Stored On</p>
                      <p className="font-medium">
                        {new Date(blockchain.timestamp).toLocaleString()}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 mb-1">
                        Certificate Hash (SHA-256)
                      </p>
                      <p className="font-mono text-xs bg-gray-100 p-2 rounded break-all">
                        {blockchain.hash}
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {/* AI Verification */}
              {ai && (
                <div className="card">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-semibold mb-2">AI Verification</h3>
                      <p className="text-sm text-gray-600">
                        Google Gemini AI analysis of certificate data
                      </p>
                    </div>
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium ${
                        ai.aiVerified
                          ? 'bg-green-100 text-green-800'
                          : 'bg-yellow-100 text-yellow-800'
                      }`}
                    >
                      {ai.aiVerified ? 'Verified' : 'Review Required'}
                    </span>
                  </div>
                  <div className="space-y-3">
                    <div>
                      <p className="text-sm text-gray-600 mb-1">Confidence Score</p>
                      <div className="flex items-center">
                        <div className="flex-1 bg-gray-200 rounded-full h-2 mr-3">
                          <div
                            className={`h-2 rounded-full ${
                              ai.confidence >= 70
                                ? 'bg-green-500'
                                : ai.confidence >= 40
                                ? 'bg-yellow-500'
                                : 'bg-red-500'
                            }`}
                            style={{ width: `${ai.confidence}%` }}
                          ></div>
                        </div>
                        <span className="font-bold">{ai.confidence}%</span>
                      </div>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 mb-1">AI Assessment</p>
                      <p className="text-gray-700">{ai.assessment}</p>
                    </div>
                    {ai.simulated && (
                      <p className="text-xs text-gray-500 italic">
                        * AI verification is in simulated mode (API not configured)
                      </p>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Actions */}
            <div className="mt-8 flex space-x-4">
              <button onClick={() => navigate('/verify')} className="btn-primary">
                Verify Another Certificate
              </button>
              <button onClick={() => navigate('/')} className="btn-secondary">
                Go Home
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return null;
};

export default Result;
