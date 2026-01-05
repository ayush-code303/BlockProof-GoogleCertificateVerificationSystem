import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import TrustBadge from '../components/TrustBadge';

const Result = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const resultData = location.state?.result;

  return (
    <div className="min-h-screen bg-hacker-base flex flex-col items-center justify-center p-6 relative overflow-hidden">
      {/* Glitch Overlay */}
      <div className="absolute inset-0 bg-hacker-crimson/5 opacity-20 pointer-events-none animate-pulse" />
      
      <div className="z-10 w-full max-w-xl text-center">
        {resultData ? (
          <div className="space-y-12">
            <div className="space-y-2">
              <span className="text-[10px] font-black text-hacker-vivid tracking-[0.8em] uppercase">Scan_Report_Output</span>
              <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-hacker-crimson to-transparent" />
            </div>
            
            <TrustBadge result={resultData} />

            <button 
              onClick={() => navigate('/verify')}
              className="group text-hacker-dark hover:text-hacker-vivid transition-all text-[10px] font-black uppercase tracking-[.4em]"
            >
              [ ← TERMINATE_SESSION_&_RESCAN ]
            </button>
          </div>
        ) : (
          <div className="terminal-box border-hacker-vivid">
            <p className="text-hacker-vivid mb-6 font-black animate-glitch">ERROR: NO_METADATA_RECEIVED</p>
            <button onClick={() => navigate('/verify')} className="cyber-btn">Return_To_Base</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Result;