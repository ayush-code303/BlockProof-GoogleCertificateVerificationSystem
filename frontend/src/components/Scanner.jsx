import { motion } from 'framer-motion';

const Scanner = () => (
  <div className="relative w-full max-w-md h-64 border-2 border-hacker-crimson/30 bg-black/90 overflow-hidden">
    <div className="absolute inset-0 opacity-10 bg-[linear-gradient(to_right,#dc2626_1px,transparent_1px),linear-gradient(to_bottom,#dc2626_1px,transparent_1px)] bg-[size:15px_15px]" />
    <motion.div 
      animate={{ top: ['0%', '100%', '0%'] }} 
      transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
      className="absolute left-0 w-full h-[2px] bg-hacker-vivid shadow-[0_0_20px_#ff0000] z-20"
    />
    <div className="flex flex-col items-center justify-center h-full space-y-4">
      <div className="text-hacker-vivid text-xs font-black animate-pulse tracking-[0.5em]">AI_FORENSICS_RUNNING</div>
      <div className="text-[9px] text-gray-600 uppercase tracking-widest">Hash_Verification_In_Progress...</div>
    </div>
  </div>
);

export default Scanner;