import React from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-[calc(100vh-200px)]">
      {/* Hero Section */}
      <div className="bg-white">
        <div className="container mx-auto px-4 py-16">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-5xl font-bold mb-6">
              <span className="text-google-blue">Block</span>
              <span className="text-google-red">Proof</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Secure Certificate Verification Using Blockchain & AI
            </p>
            <p className="text-gray-500 mb-12">
              A revolutionary two-layer verification system combining blockchain technology
              and artificial intelligence to ensure the authenticity of your certificates.
            </p>

            {/* Search/Verify Bar */}
            <div className="bg-white shadow-lg rounded-full p-2 max-w-2xl mx-auto mb-8">
              <div className="flex items-center">
                <input
                  type="text"
                  placeholder="Enter Certificate ID to verify..."
                  className="flex-1 px-6 py-3 rounded-full focus:outline-none"
                  onKeyPress={(e) => {
                    if (e.key === 'Enter' && e.target.value) {
                      navigate(`/verify?id=${e.target.value}`);
                    }
                  }}
                />
                <button
                  className="bg-google-blue text-white px-8 py-3 rounded-full hover:bg-blue-600 transition-colors"
                  onClick={(e) => {
                    const input = e.target.previousSibling;
                    if (input.value) {
                      navigate(`/verify?id=${input.value}`);
                    }
                  }}
                >
                  Verify
                </button>
              </div>
            </div>

            <div className="flex justify-center space-x-4">
              <button
                onClick={() => navigate('/verify')}
                className="btn-primary"
              >
                Verify Certificate
              </button>
              <button
                onClick={() => navigate('/admin')}
                className="btn-secondary"
              >
                Issue Certificate
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            Why Choose BlockProof?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="card text-center">
              <div className="w-16 h-16 bg-google-blue rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-8 h-8 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3">Blockchain Security</h3>
              <p className="text-gray-600">
                SHA-256 hashing and Ethereum/Polygon blockchain ensure tamper-proof
                certificate storage.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="card text-center">
              <div className="w-16 h-16 bg-google-red rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-8 h-8 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3">AI Verification</h3>
              <p className="text-gray-600">
                Google Gemini AI analyzes certificate data for authenticity and
                consistency.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="card text-center">
              <div className="w-16 h-16 bg-google-green rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-8 h-8 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3">Instant Verification</h3>
              <p className="text-gray-600">
                Get real-time verification results with our two-layer security system.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* How It Works */}
      <div className="bg-white py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
          <div className="max-w-3xl mx-auto space-y-8">
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0 w-10 h-10 bg-google-blue text-white rounded-full flex items-center justify-center font-bold">
                1
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Issue Certificate</h3>
                <p className="text-gray-600">
                  Create a certificate with recipient details, course information, and
                  metadata. The system generates a unique ID and SHA-256 hash.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0 w-10 h-10 bg-google-red text-white rounded-full flex items-center justify-center font-bold">
                2
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Blockchain Storage</h3>
                <p className="text-gray-600">
                  The certificate hash is stored on Ethereum or Polygon testnet,
                  creating an immutable record that cannot be altered.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0 w-10 h-10 bg-google-green text-white rounded-full flex items-center justify-center font-bold">
                3
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Verify Anytime</h3>
                <p className="text-gray-600">
                  Enter the certificate ID to verify. The system checks the blockchain
                  and uses AI to validate the certificate data.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
