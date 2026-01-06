import { motion } from 'framer-motion';



const Scanner = () => (

  <div className="relative w-72 h-48 border border-blue-500/20 rounded-xl overflow-hidden bg-blue-500/5 backdrop-blur-sm">

   

    {/* Moving Laser Line */}

    <motion.div

      animate={{ top: ['0%', '100%', '0%'] }}

      transition={{ duration: 2, repeat: Infinity, ease: "linear" }}

      className="absolute left-0 w-full h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent shadow-[0_0_20px_rgba(34,211,238,0.8)] z-10"

    />



    {/* Grid */}

    <div className="absolute inset-0 opacity-10 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:20px_20px]" />



    <div className="flex flex-col items-center justify-center h-full space-y-2">

      <div className="text-cyan-400 text-[10px] font-mono animate-pulse tracking-[0.2em]">

        AI FORENSIC ANALYSIS IN PROGRESS

      </div>



      <div className="w-32 h-1 bg-gray-800 rounded-full overflow-hidden">

        <motion.div

          animate={{ x: [-128, 128] }}

          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}

          className="w-full h-full bg-cyan-500"

        />

      </div>

    </div>

  </div>

);



export default Scanner;