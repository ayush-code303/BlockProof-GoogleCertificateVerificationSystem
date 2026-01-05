import React from 'react';
import { Shield, Cpu, Lock, Globe } from 'lucide-react';

const About = () => {
  const tech = [
    { icon: <Shield size={24}/>, title: "Immutability", desc: "Hash records stored on Polygon L2 Ledger." },
    { icon: <Cpu size={24}/>, title: "AI Forensics", desc: "Gemini 1.5 Pro analyzes pixel inconsistency." },
    { icon: <Lock size={24}/>, title: "Encrypted", desc: "SHA-256 military-grade data protection." },
    { icon: <Globe size={24}/>, title: "Global Node", desc: "Instant verification from any terminal." }
  ];

  return (
    <div className="min-h-screen bg-brand-black pt-40 pb-20 px-6">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-20">
          <h1 className="text-5xl font-black text-white italic mb-4">SECURITY_PROTOCOL</h1>
          <div className="h-1 w-20 bg-brand-cobalt mx-auto rounded-full" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {tech.map((item, index) => (
            <div key={index} className="glass-card p-8 border-brand-cobalt/10 hover:border-brand-cobalt/40 transition-colors group">
              <div className="text-brand-cobalt mb-4 group-hover:text-brand-electric transition-colors">
                {item.icon}
              </div>
              <h3 className="text-xl font-bold text-white mb-2 uppercase tracking-tighter italic">{item.title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default About;