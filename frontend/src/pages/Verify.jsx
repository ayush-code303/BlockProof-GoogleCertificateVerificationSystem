import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Verify = () => {
  const [certId, setCertId] = useState('');
  const [isScanning, setIsScanning] = useState(false);
  const navigate = useNavigate();

  const handleVerify = (e) => {
    e.preventDefault();
    if (!certId) return;

    setIsScanning(true);

    // Fake delay for the "Cool" Scanning Effect
    setTimeout(() => {
      setIsScanning(false);
      navigate(`/result?id=${certId}`);
    }, 3500); 
  };

  return (
    <div className="min-h-screen pt-32 pb-20 px-6 flex flex-col items-center">
      <div className="max-w-3xl w-full">
        {/* Header Text */}
        <div className="text-center mb-12">
          <h2 className="text-sm font-mono text-brand-accent tracking-[0.3em] uppercase mb-4">
            Validation Terminal
          </h2>
          <h1 className="text-4xl md:text-6xl font-black mb-6">
            Verify <span className="text-gradient">Authenticity</span>
          </h1>
        </div>

        {/* Scanner Box */}
        <div className="glass-card p-2 md:p-8 relative overflow-hidden">
          {/* Animated Scanning Line */}
          {isScanning && (
            <div className="absolute inset-0 z-20 pointer-events-none">
              <div className="w-full h-[2px] bg-brand-accent shadow-[0_0_20px_#22d3ee] animate-scan-move" />
              <div className="absolute inset-0 bg-brand-accent/5 animate-pulse" />
            </div>
          )}

          <form onSubmit={handleVerify} className="relative z-10 space-y-6">
            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-500 uppercase ml-2 tracking-widest">
                Certificate Digital Fingerprint (ID)
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={certId}
                  onChange={(e) => setCertId(e.target.value)}
                  placeholder="Enter Hash or Certificate ID..."
                  className="w-full bg-white/5 border border-white/10 p-5 rounded-2xl text-xl font-mono focus:outline-none focus:border-brand-primary/50 transition-all placeholder:text-gray-700"
                />
                <div className="absolute right-4 top-1/2 -translate-y-1/2">
                   <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                </div>
              </div>
            </div>

            <button
              disabled={isScanning}
              className={`w-full py-5 rounded-2xl font-black text-xl tracking-tighter transition-all ${
                isScanning 
                ? 'bg-gray-800 text-gray-500 cursor-not-allowed' 
                : 'btn-gradient active:scale-[0.98]'
              }`}
            >
              {isScanning ? 'ENCRYPTING & SCANNING...' : 'START VERIFICATION'}
            </button>
          </form>
        </div>

        {/* Status Messages (Only during scan) */}
        {isScanning && (
          <div className="mt-8 font-mono text-xs text-brand-accent space-y-2 text-center animate-fade-in">
            <p className="">{'>'} INITIALIZING POLYGON MAINNET CONNECTION...</p>
            <p className="animate-pulse">{'>'} FETCHING SHA-256 HASH FROM BLOCK 1928374...</p>
            <p className="">{'>'} GEMINI AI ANALYSIS IN PROGRESS...</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Verify;