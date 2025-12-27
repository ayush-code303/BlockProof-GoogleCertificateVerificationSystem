import React from 'react';

const About = () => {
  return (
    <div className="min-h-[calc(100vh-200px)] bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-3">
              <span className="text-google-blue">About</span>{' '}
              <span className="text-google-red">BlockProof</span>
            </h1>
            <p className="text-xl text-gray-600">
              Revolutionizing Certificate Verification with Blockchain & AI
            </p>
          </div>

          {/* Mission */}
          <div className="card mb-8">
            <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
            <p className="text-gray-700 leading-relaxed">
              BlockProof aims to eliminate certificate fraud and streamline the verification
              process by leveraging cutting-edge blockchain technology and artificial
              intelligence. We provide a secure, transparent, and efficient way to issue and
              verify certificates, ensuring trust and authenticity in the digital age.
            </p>
          </div>

          {/* Technology Stack */}
          <div className="card mb-8">
            <h2 className="text-2xl font-semibold mb-6">Technology Stack</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Frontend */}
              <div>
                <h3 className="font-semibold text-lg mb-3 text-google-blue">Frontend</h3>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-center">
                    <svg
                      className="w-5 h-5 text-google-green mr-2"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                    React.js - Modern UI library
                  </li>
                  <li className="flex items-center">
                    <svg
                      className="w-5 h-5 text-google-green mr-2"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                    Tailwind CSS - Google-inspired UI
                  </li>
                  <li className="flex items-center">
                    <svg
                      className="w-5 h-5 text-google-green mr-2"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                    Vite - Fast build tool
                  </li>
                  <li className="flex items-center">
                    <svg
                      className="w-5 h-5 text-google-green mr-2"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                    React Router - Navigation
                  </li>
                </ul>
              </div>

              {/* Backend */}
              <div>
                <h3 className="font-semibold text-lg mb-3 text-google-red">Backend</h3>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-center">
                    <svg
                      className="w-5 h-5 text-google-green mr-2"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                    Node.js + Express - Server framework
                  </li>
                  <li className="flex items-center">
                    <svg
                      className="w-5 h-5 text-google-green mr-2"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                    Ethers.js - Blockchain interaction
                  </li>
                  <li className="flex items-center">
                    <svg
                      className="w-5 h-5 text-google-green mr-2"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                    Multer - File upload handling
                  </li>
                  <li className="flex items-center">
                    <svg
                      className="w-5 h-5 text-google-green mr-2"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                    SHA-256 - Cryptographic hashing
                  </li>
                </ul>
              </div>
            </div>

            <div className="mt-6 pt-6 border-t border-gray-200">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Blockchain */}
                <div>
                  <h3 className="font-semibold text-lg mb-3 text-google-yellow">
                    Blockchain
                  </h3>
                  <ul className="space-y-2 text-gray-700">
                    <li className="flex items-center">
                      <svg
                        className="w-5 h-5 text-google-green mr-2"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd"
                        />
                      </svg>
                      Ethereum / Polygon Testnet
                    </li>
                    <li className="flex items-center">
                      <svg
                        className="w-5 h-5 text-google-green mr-2"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd"
                        />
                      </svg>
                      Solidity Smart Contracts
                    </li>
                  </ul>
                </div>

                {/* AI */}
                <div>
                  <h3 className="font-semibold text-lg mb-3 text-google-green">
                    Artificial Intelligence
                  </h3>
                  <ul className="space-y-2 text-gray-700">
                    <li className="flex items-center">
                      <svg
                        className="w-5 h-5 text-google-green mr-2"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd"
                        />
                      </svg>
                      Google Gemini API
                    </li>
                    <li className="flex items-center">
                      <svg
                        className="w-5 h-5 text-google-green mr-2"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd"
                        />
                      </svg>
                      AI-powered data validation
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* How It Works */}
          <div className="card mb-8">
            <h2 className="text-2xl font-semibold mb-6">Two-Layer Verification System</h2>

            <div className="space-y-6">
              {/* Layer 1 */}
              <div className="flex items-start">
                <div className="flex-shrink-0 w-12 h-12 bg-google-blue text-white rounded-full flex items-center justify-center font-bold text-xl mr-4">
                  1
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Blockchain Verification</h3>
                  <p className="text-gray-700 mb-2">
                    Certificate data is hashed using SHA-256 cryptographic algorithm and
                    stored on Ethereum or Polygon blockchain. This creates an immutable,
                    tamper-proof record.
                  </p>
                  <ul className="list-disc list-inside text-gray-600 text-sm space-y-1">
                    <li>Generates unique certificate hash</li>
                    <li>Stores hash on blockchain with timestamp</li>
                    <li>Enables instant verification of authenticity</li>
                    <li>Cannot be altered or deleted</li>
                  </ul>
                </div>
              </div>

              {/* Layer 2 */}
              <div className="flex items-start">
                <div className="flex-shrink-0 w-12 h-12 bg-google-red text-white rounded-full flex items-center justify-center font-bold text-xl mr-4">
                  2
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">AI Verification</h3>
                  <p className="text-gray-700 mb-2">
                    Google Gemini AI analyzes certificate data for consistency, format
                    validity, and potential anomalies. Provides confidence score and
                    assessment.
                  </p>
                  <ul className="list-disc list-inside text-gray-600 text-sm space-y-1">
                    <li>Validates data format and structure</li>
                    <li>Detects potential inconsistencies</li>
                    <li>Provides confidence score (0-100)</li>
                    <li>Offers detailed assessment report</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Benefits */}
          <div className="card">
            <h2 className="text-2xl font-semibold mb-6">Key Benefits</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex items-start">
                <svg
                  className="w-6 h-6 text-google-blue mr-3 mt-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                  />
                </svg>
                <div>
                  <h3 className="font-semibold mb-1">Tamper-Proof</h3>
                  <p className="text-sm text-gray-600">
                    Blockchain ensures certificates cannot be altered or forged
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <svg
                  className="w-6 h-6 text-google-red mr-3 mt-1"
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
                <div>
                  <h3 className="font-semibold mb-1">Instant Verification</h3>
                  <p className="text-sm text-gray-600">
                    Verify certificates in seconds, not days
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <svg
                  className="w-6 h-6 text-google-yellow mr-3 mt-1"
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
                <div>
                  <h3 className="font-semibold mb-1">AI-Powered</h3>
                  <p className="text-sm text-gray-600">
                    Advanced AI validation for extra security
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <svg
                  className="w-6 h-6 text-google-green mr-3 mt-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <div>
                  <h3 className="font-semibold mb-1">Globally Accessible</h3>
                  <p className="text-sm text-gray-600">
                    Verify from anywhere in the world
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
