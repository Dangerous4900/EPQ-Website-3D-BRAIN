import { motion } from 'framer-motion';
import { HelpCircle, ChevronLeft, ShieldAlert } from 'lucide-react';

interface NotFoundPageProps {
  onNavigate: (tab: 'home' | 'brain' | 'about') => void;
}

export function NotFoundPage({ onNavigate }: NotFoundPageProps) {
  return (
    <div className="relative z-10 w-full max-w-xl mx-auto px-6 py-24 min-h-screen text-white flex flex-col justify-center items-center font-sans text-center select-none overflow-y-auto">
      
      {/* Visual Accent */}
      <motion.div 
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="mb-8 w-16 h-16 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/50"
      >
        <ShieldAlert size={28} className="animate-pulse" />
      </motion.div>

      {/* Primary Message */}
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
        className="space-y-4"
      >
        <span className="text-xs uppercase tracking-[0.25em] text-white/40 font-mono font-bold">
          404 ERROR • ACCESS DENIED
        </span>
        <h1 className="text-4xl md:text-5xl font-serif text-white tracking-tight">
          Coordinate Deselected
        </h1>
        <p className="text-sm text-white/50 max-w-sm mx-auto leading-relaxed font-light">
          The brain coordinates you reached have either been surgically bypassed or does not exist in our neurological database.
        </p>
      </motion.div>

      {/* Return Action Button */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        className="pt-8"
      >
        <button
          onClick={() => onNavigate('home')}
          className="px-6 py-3 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
        >
          <ChevronLeft size={14} />
          Return to Hub
        </button>
      </motion.div>

      {/* Technical coordinate code */}
      <div className="absolute bottom-12 text-[10px] uppercase tracking-widest text-white/20 font-mono">
        ERR_NEURAL_PATHWAY_DISRUPTED
      </div>
    </div>
  );
}
