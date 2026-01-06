import React from 'react';

import { useNavigate } from 'react-router-dom';



const Home = () => {

  const navigate = useNavigate();



  return (

    <div className="relative overflow-hidden">

      {/* Hero Section */}

      <div className="container mx-auto px-4 pt-24 pb-20 relative z-10">

        <div className="text-center">

          <div className="inline-block px-4 py-1.5 mb-6 glass-card rounded-full text-xs font-bold tracking-widest text-brand-accent uppercase">

            Powered by Ethereum & Gemini AI

          </div>

          <h1 className="text-6xl md:text-8xl font-black mb-6 tracking-tight">

            Next Gen <br />

            <span className="text-gradient">BlockProof</span>

          </h1>

          <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-10 leading-relaxed">

            Immutable blockchain security meets advanced AI verification.

            The gold standard for digital credentials.

          </p>

         

          <div className="flex flex-col md:flex-row justify-center gap-6 mb-20">

            <button onClick={() => navigate('/verify')} className="btn-gradient">

              Verify Certificate

            </button>

            <button onClick={() => navigate('/admin')} className="px-8 py-3 glass-card hover:bg-white/10 font-bold">

              Issue Credentials

            </button>

          </div>

        </div>



        {/* Bento Grid Features */}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">

          <div className="glass-card p-8 md:col-span-2 relative overflow-hidden group">

            <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-brand-primary/20 rounded-full blur-3xl group-hover:bg-brand-primary/40 transition-all"></div>

            <h3 className="text-2xl font-bold mb-4">Dual-Layer Security</h3>

            <p className="text-gray-400">First, we verify the hash on the Polygon/Ethereum network. Then, Gemini AI analyzes the metadata for anomalies.</p>

          </div>

         

          <div className="glass-card p-8 group">

            <div className="text-brand-accent mb-4">

              <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>

            </div>

            <h3 className="text-xl font-bold mb-2">Instant OCR</h3>

            <p className="text-gray-400 text-sm">Upload an image and let our AI extract and verify data instantly.</p>

          </div>



          <div className="glass-card p-8 border-brand-accent/30 bg-brand-accent/5">

            <h3 className="text-xl font-bold mb-2">Tamper Proof</h3>

            <p className="text-gray-400 text-sm">Once recorded, a certificate's hash can never be changed or deleted.</p>

          </div>



          <div className="glass-card p-8 md:col-span-2 flex items-center justify-between">

            <div>

              <h3 className="text-xl font-bold mb-2">Trusted Globally</h3>

              <p className="text-gray-400 text-sm">Architecture designed for global scalability.</p>

            </div>

            <div className="flex -space-x-3">

              {[1,2,3,4].map(i => <div key={i} className="w-10 h-10 rounded-full border-2 border-brand-black bg-gray-800"></div>)}

            </div>

          </div>

        </div>

      </div>

    </div>

  );

};



export default Home;