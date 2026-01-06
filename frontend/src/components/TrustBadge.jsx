import React from 'react';

import { motion } from 'framer-motion';

import { ShieldCheck, ShieldAlert, Fingerprint, Activity } from 'lucide-react';



const TrustBadge = ({ result }) => {

  // Destructuring with default values to prevent "null" errors

  const {

    trustScore = 0,

    verdict = "SUSPICIOUS",

    blockchain = { exists: false },

    ai = null

  } = result;



  const statusConfig = {

    VERIFIED: { color: 'text-green-500', bg: 'bg-green-500/10', border: 'border-green-500/50', icon: ShieldCheck },

    SUSPICIOUS: { color: 'text-yellow-500', bg: 'bg-yellow-500/10', border: 'border-yellow-500/50', icon: Activity },

    TAMPERING_DETECTED: { color: 'text-red-500', bg: 'bg-red-500/10', border: 'border-red-500/50', icon: ShieldAlert },

  };



  const config = statusConfig[verdict] || statusConfig.SUSPICIOUS;

  const Icon = config.icon;



  return (

    <motion.div

      initial={{ opacity: 0, scale: 0.9 }}

      animate={{ opacity: 1, scale: 1 }}

      className={`p-6 rounded-3xl border ${config.border} ${config.bg} backdrop-blur-xl max-w-md w-full shadow-2xl`}

    >

      <div className="flex justify-between items-start mb-8">

        <div>

          <h3 className="text-gray-500 text-[10px] font-bold uppercase tracking-widest mb-1">Security Verdict</h3>

          <p className={`text-3xl font-black ${config.color} tracking-tighter`}>

            {verdict.replace('_', ' ')}

          </p>

        </div>

        <div className={`p-3 rounded-2xl ${config.bg} border ${config.border}`}>

          <Icon size={32} className={config.color} />

        </div>

      </div>



      {/* Trust Meter */}

      <div className="space-y-3 mb-8">

        <div className="flex justify-between text-[11px] font-black text-gray-400 uppercase tracking-wider">

          <span>Reliability Score</span>

          <span className={config.color}>{trustScore}%</span>

        </div>

        <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">

          <motion.div

            initial={{ width: 0 }}

            animate={{ width: `${trustScore}%` }}

            transition={{ duration: 1.5, ease: "circOut" }}

            className={`h-full bg-gradient-to-r ${trustScore > 70 ? 'from-green-500 to-emerald-400' : 'from-orange-500 to-red-600'}`}

          />

        </div>

      </div>



      {/* Analysis Details */}

      <div className="grid grid-cols-2 gap-4">

        <div className="bg-white/5 p-4 rounded-2xl border border-white/5">

          <p className="text-[9px] text-gray-500 uppercase font-bold mb-1">Ledger Status</p>

          <p className="text-xs text-white font-bold flex items-center gap-2">

            <span className={`h-2 w-2 rounded-full animate-pulse ${blockchain.exists ? 'bg-green-500' : 'bg-red-500'}`} />

            {blockchain.exists ? 'On-Chain' : 'Offline'}

          </p>

        </div>

        <div className="bg-white/5 p-4 rounded-2xl border border-white/5">

          <p className="text-[9px] text-gray-500 uppercase font-bold mb-1">AI Forensic</p>

          <p className="text-xs text-white font-bold flex items-center gap-2">

            <Fingerprint size={14} className="text-blue-400" />

            {ai ? `${ai.confidence}%` : 'Skipped'}

          </p>

        </div>

      </div>



      <div className="mt-8 pt-6 border-t border-white/5 text-center">

        <p className="text-[10px] text-gray-600 font-medium tracking-tight">

          ID: <span className="text-gray-400">{result.certificateId}</span> • BlockProof Protocol v1.0

        </p>

      </div>

    </motion.div>

  );

};



export default TrustBadge;