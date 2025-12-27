import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-50 border-t border-gray-200 mt-auto">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* About */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-3">BlockProof</h3>
            <p className="text-sm text-gray-600">
              Secure certificate verification system using blockchain technology and AI.
            </p>
          </div>

          {/* Links */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-3">Quick Links</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>
                <a href="/about" className="hover:text-google-blue">
                  About Us
                </a>
              </li>
              <li>
                <a href="/verify" className="hover:text-google-blue">
                  Verify Certificate
                </a>
              </li>
              <li>
                <a href="/admin" className="hover:text-google-blue">
                  Issue Certificate
                </a>
              </li>
            </ul>
          </div>

          {/* Technology */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-3">Technology</h3>
            <div className="flex flex-wrap gap-2">
              <span className="px-3 py-1 bg-gray-200 rounded-full text-xs text-gray-700">
                Blockchain
              </span>
              <span className="px-3 py-1 bg-gray-200 rounded-full text-xs text-gray-700">
                AI Verification
              </span>
              <span className="px-3 py-1 bg-gray-200 rounded-full text-xs text-gray-700">
                Ethereum
              </span>
              <span className="px-3 py-1 bg-gray-200 rounded-full text-xs text-gray-700">
                Google Gemini
              </span>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-200 text-center text-sm text-gray-600">
          <p>&copy; {new Date().getFullYear()} BlockProof. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
