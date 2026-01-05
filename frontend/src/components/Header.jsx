import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-black/90 border-b border-hacker-crimson/30 backdrop-blur-md font-mono">
      <div className="max-w-7xl mx-auto px-6 py-3 flex justify-between items-center">
        <Link to="/" className="text-xl font-black tracking-tighter text-white uppercase italic">
          <span className="text-hacker-vivid">RED_</span>PROTOCOL<span className="text-hacker-crimson">_v4</span>
        </Link>
        <nav className="flex gap-8 text-[11px] font-bold tracking-[.3em] uppercase text-gray-500">
          <Link to="/" className="hover:text-hacker-vivid hover:drop-shadow-[0_0_5px_#ff0000] transition-all">Dash</Link>
          <Link to="/verify" className="hover:text-hacker-vivid hover:drop-shadow-[0_0_5px_#ff0000] transition-all">Verify_Scan</Link>
          <Link to="/admin" className="hover:text-hacker-vivid hover:drop-shadow-[0_0_5px_#ff0000] transition-all text-hacker-crimson">Admin_Node</Link>
        </nav>
        <div className="text-[9px] text-hacker-vivid animate-pulse font-black tracking-widest border border-hacker-crimson/50 px-2 py-1 bg-hacker-crimson/5">
          ● SYSTEM_ENCRYPTED
        </div>
      </div>
    </header>
  );
};

export default Header;