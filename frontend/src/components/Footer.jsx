import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-brand-black border-t border-brand-cobalt/10 mt-auto">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-center md:text-left">
            <h3 className="font-black text-brand-cobalt mb-1 italic">BLOCKPROOF_CORE</h3>
            <p className="text-[10px] text-gray-500 uppercase tracking-widest">
              L2 Certification Protocol v1.0.4
            </p>
          </div>
          <div className="flex gap-4">
             <span className="px-3 py-1 bg-brand-cobalt/10 border border-brand-cobalt/20 rounded-md text-[9px] text-brand-glow font-mono uppercase">Status: Online</span>
             <span className="px-3 py-1 bg-brand-electric/10 border border-brand-electric/20 rounded-md text-[9px] text-brand-electric font-mono uppercase">AI: Active</span>
          </div>
          <div className="text-[10px] text-gray-600 font-mono">
            &copy; {new Date().getFullYear()} TERMINAL_ACCESS. NO RIGHTS RESERVED.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;