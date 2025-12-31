import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <div className="fixed top-6 left-0 right-0 z-50 px-4">
      <header className="max-w-4xl mx-auto glass-card px-6 py-4 flex items-center justify-between">
        <Link to="/" className="text-2xl font-black tracking-tighter hover:opacity-80 transition-opacity">
          B<span className="text-brand-primary">P</span>.
        </Link>
        
        <nav className="hidden md:flex items-center space-x-8 text-sm font-medium">
          <Link to="/" className="hover:text-brand-accent transition-colors">Home</Link>
          <Link to="/verify" className="hover:text-brand-accent transition-colors">Verify</Link>
          <Link to="/admin" className="hover:text-brand-accent transition-colors">Admin</Link>
          <Link to="/about" className="hover:text-brand-accent transition-colors">About</Link>
        </nav>
        
        <button className="bg-white text-black px-5 py-2 rounded-full text-xs font-bold hover:bg-brand-accent transition-all">
          Connect Wallet
        </button>
      </header>
    </div>
  );
};

export default Header;