import React, { useState } from 'react';
import { motion } from 'framer-motion';

const Admin = () => {
  const [formData, setFormData] = useState({
    recipientName: '',
    course: '',
    issuer: 'BlockProof Authority',
    date: new Date().toISOString().split('T')[0]
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-screen pt-32 pb-20 px-6 bg-[#050505]">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
        
        {/* LEFT: The Control Form */}
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          className="space-y-8"
        >
          <div>
            <h2 className="text-brand-accent font-mono text-xs tracking-[0.4em] uppercase mb-4 text-gradient">Secure Minting Terminal</h2>
            <h1 className="text-4xl md:text-5xl font-black text-white leading-tight">
              Issue Digital <br /> Credentials.
            </h1>
          </div>

          <form className="space-y-6">
            <div className="space-y-2">
              <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest ml-2">Recipient Full Name</label>
              <input 
                name="recipientName"
                onChange={handleChange}
                type="text" 
                placeholder="Ex: Aryan Sharma"
                className="w-full bg-white/5 border border-white/10 p-4 rounded-xl focus:outline-none focus:border-brand-primary/50 transition-all font-medium text-white"
              />
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest ml-2">Certification Title</label>
              <input 
                name="course"
                onChange={handleChange}
                type="text" 
                placeholder="Ex: Blockchain Architecture"
                className="w-full bg-white/5 border border-white/10 p-4 rounded-xl focus:outline-none focus:border-brand-primary/50 transition-all font-medium text-white"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest ml-2">Issue Date</label>
                <input 
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  type="date" 
                  className="w-full bg-white/5 border border-white/10 p-4 rounded-xl focus:outline-none focus:border-brand-primary/50 text-white"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest ml-2">Network</label>
                <div className="w-full bg-white/5 border border-white/10 p-4 rounded-xl text-brand-accent font-bold text-sm flex items-center">
                  <span className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></span>
                  Polygon Mainnet
                </div>
              </div>
            </div>

            <button className="btn-gradient w-full py-5 text-xl font-black tracking-tighter shadow-2xl">
              MINT CERTIFICATE ON-CHAIN
            </button>
          </form>
        </motion.div>

        {/* RIGHT: Real-time Live Preview */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="sticky top-40"
        >
          <p className="text-center text-[10px] text-gray-500 uppercase tracking-[0.3em] mb-6">Live Preview (Draft)</p>
          
          {/* Certificate Preview Card */}
          <div className="glass-card p-8 aspect-[1.4/1] flex flex-col justify-between relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-br from-brand-primary/10 to-transparent opacity-50"></div>
            
            <div className="relative z-10 flex justify-between items-start">
              <div className="text-2xl font-black italic">BP.</div>
              <div className="text-[10px] font-mono text-gray-500">Preview Only</div>
            </div>

            <div className="relative z-10 text-center">
              <p className="text-[8px] uppercase tracking-[0.4em] text-brand-accent mb-4">Blockchain Certified</p>
              <h2 className="text-xs text-gray-400 mb-2 uppercase tracking-widest">This is to certify that</h2>
              <h1 className="text-3xl font-bold mb-4 min-h-[40px]">
                {formData.recipientName || 'RECIPIENT NAME'}
              </h1>
              <div className="h-[1px] w-24 bg-white/20 mx-auto mb-4"></div>
              <p className="text-sm font-medium text-gray-300 italic">
                {formData.course || 'COURSE OR ACHIEVEMENT TITLE'}
              </p>
            </div>

            <div className="relative z-10 flex justify-between items-end">
              <div className="text-[8px] text-gray-600 font-mono">
                DATE: {formData.date}
              </div>
              <div className="text-[8px] text-gray-600 font-mono">
                ISSUER: {formData.issuer}
              </div>
            </div>
          </div>

          <div className="mt-6 flex items-center justify-center space-x-2 text-[10px] text-gray-500 italic">
            <svg className="w-3 h-3 text-brand-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            <span>Certificates are permanently stored using SHA-256 and IPFS.</span>
          </div>
        </motion.div>

      </div>
    </div>
  );
};

export default Admin;