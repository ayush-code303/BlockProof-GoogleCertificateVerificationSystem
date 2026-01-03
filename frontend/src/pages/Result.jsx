import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import TrustBadge from '../components/TrustBadge';

const Result = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  // Data nikalne ka sabse safe tarika
  const resultData = location.state?.result;

  console.log("Current Result Data in Page:", resultData); // Debugging ke liye

  return (
    <div className="min-h-screen bg-[#050505] flex flex-col items-center justify-center p-6 relative">
      {/* Glow Effect */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-blue-600/10 blur-[120px] pointer-events-none" />

      <div className="z-10 w-full max-w-md">
        {resultData ? (
          <div className="flex flex-col items-center">
            <h2 className="text-gray-400 mb-8 uppercase tracking-[0.3em] text-xs font-bold">
              Analysis Report Generated
            </h2>
            
            {/* TrustBadge card */}
            <TrustBadge result={resultData} />

            <button 
              onClick={() => navigate('/verify')}
              className="mt-10 text-gray-500 hover:text-white transition-colors text-sm"
            >
              ← Verify Another Document
            </button>
          </div>
        ) : (
          <div className="text-center bg-white/5 p-10 rounded-3xl border border-white/10">
            <p className="text-gray-400 mb-6 font-mono text-sm">No verification data received.</p>
            <button 
              onClick={() => navigate('/verify')} 
              className="bg-blue-600 px-6 py-2 rounded-xl text-sm font-bold"
            >
              Back to Verification
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Result;