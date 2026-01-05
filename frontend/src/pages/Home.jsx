import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="relative min-h-screen bg-brand-black overflow-hidden flex flex-col justify-center">
      {/* Background Glow */}
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-brand-cobalt/10 blur-[120px] rounded-full" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-brand-electric/10 blur-[120px] rounded-full" />

      <div className="container mx-auto px-4 relative z-10 text-center">
        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }}
          className="inline-block px-4 py-1.5 mb-8 glass-card rounded-full text-[10px] font-black tracking-[0.3em] text-brand-glow uppercase border-brand-cobalt/30"
        >
          Secured by Polygon & Gemini_v1.5
        </motion.div>
        
        <h1 className="text-6xl md:text-9xl font-black text-white mb-6 tracking-tighter italic">
          Block<span className="text-brand-cobalt">Proof.</span>
        </h1>
        
        <p className="text-lg text-gray-500 max-w-2xl mx-auto mb-12 font-medium tracking-tight">
          Next-generation credential verification. We use cryptographic hashing for immutability 
          and AI forensics to detect deep-level tampering.
        </p>
        
        <div className="flex flex-col md:flex-row justify-center gap-6">
          <button 
            onClick={() => navigate('/verify')} 
            className="px-10 py-4 bg-brand-cobalt text-white rounded-2xl font-black uppercase tracking-tighter hover:bg-brand-electric transition-all shadow-[0_0_30px_rgba(37,99,235,0.3)]"
          >
            Start Verification
          </button>
          <button 
            onClick={() => navigate('/admin')} 
            className="px-10 py-4 glass-card text-white rounded-2xl font-black uppercase tracking-tighter hover:bg-white/10 transition-all border-white/10"
          >
            Terminal Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;