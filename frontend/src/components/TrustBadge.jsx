import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, ShieldAlert, Activity } from 'lucide-react';

const TrustBadge = ({ result }) => {
  const { trustScore = 0, verdict = "SUSPICIOUS", blockchain = { exists: false }, ai = { confidence: 0 } } = result;

  const config = {
    VERIFIED: { color: 'text-brand-glow', border: 'border-brand-glow/40', bg: 'bg-brand-glow/5', icon: ShieldCheck },
    SUSPICIOUS: { color: 'text-yellow-500', border: 'border-yellow-500/40', bg: 'bg-yellow-500/5', icon: Activity },
    TAMPERING_DETECTED: { color: 'text-brand-electric', border: 'border-brand-electric/40', bg: 'bg-brand-electric/5', icon: ShieldAlert },
  }[verdict] || { color: 'text-gray-500', border: 'border-gray-500', bg: 'bg-gray-500/5', icon: Activity };

  const Icon = config.icon;

  return (
    <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className={`p-8 rounded-[2rem] border ${config.border} ${config.bg} backdrop-blur-2xl shadow-2xl relative overflow-hidden`}>
      <div className="absolute top-0 right-0 p-4 opacity-10 font-black text-6xl italic -rotate-12 select-none">
        {verdict}
      </div>
      
      <div className="flex justify-between items-start mb-10">
        <div>
          <p className="text-[10px] font-black text-gray-500 uppercase tracking-[0.4em] mb-2">Verdict_ID: {result.certificateId}</p>
          <h2 className={`text-4xl font-black ${config.color} tracking-tighter italic`}>{verdict.replace('_', ' ')}</h2>
        </div>
        <div className={`p-4 rounded-2xl ${config.bg} border ${config.border}`}>
          <Icon size={40} className={config.color} />
        </div>
      </div>

      <div className="space-y-6">
        <div className="space-y-2">
          <div className="flex justify-between text-[10px] font-bold text-gray-400 uppercase tracking-widest">
            <span>Reliability Score</span>
            <span className={config.color}>{trustScore}%</span>
          </div>
          <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
            <motion.div initial={{ width: 0 }} animate={{ width: `${trustScore}%` }} className={`h-full bg-gradient-to-r from-brand-cobalt to-brand-electric`} />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white/5 p-4 rounded-2xl border border-white/5">
            <p className="text-[9px] text-gray-500 uppercase font-bold mb-1 italic">Ledger_Audit</p>
            <p className="text-xs text-white font-black">{blockchain.exists ? 'SYNCED_ON_CHAIN' : 'OFFLINE_RECORD'}</p>
          </div>
          <div className="bg-white/5 p-4 rounded-2xl border border-white/5">
            <p className="text-[9px] text-gray-500 uppercase font-bold mb-1 italic">AI_Confidence</p>
            <p className="text-xs text-white font-black">{ai.confidence}%_MATCH</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default TrustBadge;