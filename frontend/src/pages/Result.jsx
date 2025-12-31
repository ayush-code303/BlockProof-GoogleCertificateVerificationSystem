import React, { useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

const Result = () => {
  // --- Tilt Animation Logic ---
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"]);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;

    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <div className="min-h-screen pt-32 pb-20 px-6 flex flex-col items-center justify-center bg-[#050505]">
      
      {/* 3D TILT CARD */}
      <motion.div
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{ rotateY, rotateX, transformStyle: "preserve-3d" }}
        className="relative w-full max-w-2xl h-[400px] cursor-pointer"
      >
        {/* Shine Effect Overlay */}
        <div className="absolute inset-0 z-10 bg-gradient-to-br from-white/20 via-transparent to-transparent opacity-0 hover:opacity-100 transition-opacity duration-500 rounded-[32px] pointer-events-none" />

        <div 
          style={{ transform: "translateZ(75px)" }}
          className="glass-card h-full p-10 border-white/20 relative shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)] flex flex-col justify-between"
        >
          {/* Certificate Content */}
          <div className="flex justify-between items-start">
            <div style={{ transform: "translateZ(50px)" }}>
              <h4 className="text-brand-accent font-mono text-[10px] tracking-[0.4em] mb-2 uppercase">Official Blockchain Record</h4>
              <h2 className="text-3xl font-black italic tracking-tighter">CERTIFICATE</h2>
            </div>
            <div className="bg-green-500 text-black p-2 rounded font-bold text-[10px]">VERIFIED</div>
          </div>

          <div className="space-y-4" style={{ transform: "translateZ(40px)" }}>
            <p className="text-gray-400 text-sm">This is to certify that</p>
            <h1 className="text-4xl font-bold text-gradient">ARYAN SHARMA</h1>
            <p className="text-gray-400 text-xs leading-relaxed">
              Has successfully completed the verification protocol under BlockProof Node 771. 
              The identity and credentials have been hashed and stored permanently on the Ethereum network.
            </p>
          </div>

          <div className="flex justify-between items-end border-t border-white/10 pt-6" style={{ transform: "translateZ(30px)" }}>
            <div>
              <p className="text-[8px] text-gray-600 uppercase">Issue ID</p>
              <p className="text-[10px] font-mono">BP-992-X102</p>
            </div>
            <div className="text-right">
              <p className="text-[8px] text-gray-600 uppercase">Timestamp</p>
              <p className="text-[10px] font-mono">2025-12-31 13:45 UTC</p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Verification Summary below card */}
      <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-4 w-full max-w-4xl">
         <div className="glass-card p-4 text-center">
            <p className="text-xs text-gray-500 mb-1">Blockchain</p>
            <p className="text-green-400 font-bold uppercase text-xs">Confirmed</p>
         </div>
         <div className="glass-card p-4 text-center">
            <p className="text-xs text-gray-500 mb-1">AI Match</p>
            <p className="text-brand-accent font-bold uppercase text-xs">99.9% Authentic</p>
         </div>
         <div className="glass-card p-4 text-center">
            <p className="text-xs text-gray-500 mb-1">Status</p>
            <p className="text-white font-bold uppercase text-xs">Immutable</p>
         </div>
      </div>
    </div>
  );
};

export default Result;