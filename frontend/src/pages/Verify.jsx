import React, { useState } from 'react';
import axios from 'axios';
import Scanner from '../components/Scanner';
import { useNavigate } from 'react-router-dom';
import { Search } from 'lucide-react';

const Verify = () => {
  const [certId, setCertId] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleVerify = async (e) => {
    e.preventDefault();
    if (!certId) return;
    setLoading(true);
    try {
      const response = await axios.post('http://localhost:5000/api/certificates/verify', { certificateId: certId });
      setTimeout(() => {
        setLoading(false);
        navigate('/result', { state: { result: response.data } });
      }, 3000); // 3 sec delay for "Hacking Scan" feel
    } catch (error) {
      setLoading(false);
      alert("CRITICAL_ERROR: HASH_NOT_FOUND");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-hacker-base px-6">
      {loading ? (
        <Scanner />
      ) : (
        <div className="w-full max-w-2xl text-center space-y-12">
          <div className="space-y-4">
            <h1 className="text-6xl font-black text-white tracking-tighter uppercase italic neon-text-red">
              Verify <span className="text-hacker-crimson">Forensics.</span>
            </h1>
            <p className="text-gray-500 tracking-[0.2em] text-xs uppercase underline decoration-hacker-crimson/40">
              Input Certificate ID for deep-chain analysis
            </p>
          </div>

          <form onSubmit={handleVerify} className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-hacker-crimson to-transparent blur opacity-25 group-focus-within:opacity-100 transition duration-1000"></div>
            <div className="relative flex items-center bg-black border border-hacker-crimson/50 p-2">
              <div className="pl-4 text-hacker-crimson">
                <Search size={20} />
              </div>
              <input
                className="w-full bg-transparent p-4 outline-none text-hacker-vivid font-mono text-sm placeholder:text-hacker-dark"
                placeholder="ENTER_UNIQUE_CERT_HASH..."
                value={certId}
                onChange={(e) => setCertId(e.target.value)}
              />
              <button className="cyber-btn h-full py-4 px-10">Execute_Scan</button>
            </div>
          </form>

          <div className="grid grid-cols-3 gap-4">
            {['Blockchain_Proof', 'AI_Tamper_Check', 'Encryption_Validated'].map((item) => (
               <div key={item} className="p-3 border border-hacker-crimson/10 bg-hacker-crimson/5 text-[9px] font-black uppercase text-gray-500 tracking-widest">
                  {item}
               </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Verify;