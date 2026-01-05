import React, { useState } from 'react';
import { Terminal, ShieldCheck } from 'lucide-react';
import axios from 'axios';

const Admin = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loginData, setLoginData] = useState({ id: '', password: '' });
  const [formData, setFormData] = useState({ recipientName: '', course: '' });

  const handleLogin = (e) => {
    e.preventDefault();
    if (loginData.id === 'admin' && loginData.password === 'root123') setIsLoggedIn(true);
    else alert(">>> ACCESS_DENIED");
  };

  const handleMint = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/certificates/issue', formData);
      alert("MINT_SUCCESS");
    } catch (err) { alert("MINT_FAILED"); }
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6">
        <div className="bg-black/80 border-l-2 border-t border-hacker-vivid p-8 w-full max-w-sm shadow-[0_0_50px_rgba(220,38,38,0.2)]">
          <h2 className="text-xl font-black text-white mb-8 tracking-widest italic neon-text-red">AUTHORIZE.exe</h2>
          <form onSubmit={handleLogin} className="space-y-6">
            <input type="text" placeholder="TERMINAL_ID" className="w-full bg-transparent border-b border-hacker-crimson p-3 text-hacker-vivid outline-none focus:border-white transition-all" onChange={(e) => setLoginData({...loginData, id: e.target.value})} />
            <input type="password" placeholder="ACCESS_KEY" className="w-full bg-transparent border-b border-hacker-crimson p-3 text-hacker-vivid outline-none focus:border-white transition-all" onChange={(e) => setLoginData({...loginData, password: e.target.value})} />
            <button className="w-full border border-hacker-vivid bg-hacker-vivid/10 py-4 text-xs font-black uppercase tracking-[0.4em] hover:bg-hacker-vivid hover:text-white transition-all">Execute_Auth</button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-10 px-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1 bg-black/60 border border-hacker-crimson/30 p-8">
          <p className="text-[10px] text-hacker-vivid mb-6 font-black underline tracking-[0.5em]">MINTING_PARAMETERS</p>
          <form onSubmit={handleMint} className="space-y-8">
             <input onChange={(e) => setFormData({...formData, recipientName: e.target.value})} type="text" placeholder="RECIPIENT_NAME" className="w-full bg-transparent border-b border-hacker-crimson/50 p-3 outline-none focus:border-hacker-vivid text-white" />
             <input onChange={(e) => setFormData({...formData, course: e.target.value})} type="text" placeholder="COURSE_TITLE" className="w-full bg-transparent border-b border-hacker-crimson/50 p-3 outline-none focus:border-hacker-vivid text-white" />
             <button className="w-full border border-hacker-crimson bg-hacker-crimson/10 py-5 font-black uppercase tracking-widest text-hacker-vivid hover:bg-hacker-vivid hover:text-white transition-all">Initialize_Mint</button>
          </form>
        </div>
        <div className="lg:col-span-2 bg-black border border-hacker-vivid/20 p-12 text-center relative overflow-hidden italic">
           <div className="absolute top-0 right-0 p-4 text-[9px] text-hacker-vivid animate-pulse">● SYNCING_CHAIN</div>
           <h1 className="text-6xl font-black text-white mb-4 underline decoration-hacker-vivid/40">{formData.recipientName || "ID_NAME"}</h1>
           <p className="text-hacker-vivid font-black tracking-[0.5em] text-sm">{formData.course || "MODULE_ID"}</p>
        </div>
      </div>
    </div>
  );
};

export default Admin;