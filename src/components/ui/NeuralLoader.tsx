import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';

const LOADING_MESSAGES = [
  'Initializing neural network...',
  'Mapping synaptic pathways...',
  'Loading cerebellar structure...',
  'Calibrating cortical coordinates...',
  'Configuring thalamic nuclei...',
  'Resolving limbic system connections...',
  'Optimizing 3D rendering pipeline...',
  'Finalizing synaptic atlas...'
];

export function NeuralLoader() {
  const [messageIndex, setMessageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setMessageIndex((prev) => (prev + 1) % LOADING_MESSAGES.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#070708] select-none">
      {/* Background ambient radial gradients */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-amber-500/5 blur-[120px] rounded-full" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-blue-500/5 blur-[100px] rounded-full" />

      <div className="relative flex flex-col items-center max-w-sm text-center px-6">
        {/* Sleek rotating ring loader */}
        <div className="relative w-24 h-24 mb-8">
          <motion.div 
            className="absolute inset-0 rounded-full border-2 border-amber-500/10 border-t-amber-500/80"
            animate={{ rotate: 360 }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
          />
          <motion.div 
            className="absolute inset-2 rounded-full border-2 border-blue-500/5 border-t-blue-500/60"
            animate={{ rotate: -360 }}
            transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
          />
          {/* Pulsing center icon */}
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.div
              animate={{ scale: [0.9, 1.1, 0.9], opacity: [0.6, 1, 0.6] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            >
              <Sparkles className="w-6 h-6 text-amber-500/80" />
            </motion.div>
          </div>
        </div>

        {/* Brand Header */}
        <h1 className="text-lg font-medium font-sans tracking-[0.2em] text-white/90 mb-2 uppercase">
          Brain Atlas
        </h1>
        
        {/* Dynamic cycling instructions */}
        <div className="relative h-6 mt-2 overflow-hidden w-64">
          <p className="text-xs font-mono tracking-wider text-white/50 animate-pulse">
            {LOADING_MESSAGES[messageIndex]}
          </p>
        </div>

        {/* Minimal Progress Bar */}
        <div className="w-48 h-[2px] bg-white/5 rounded-full overflow-hidden mt-6">
          <motion.div 
            className="h-full bg-gradient-to-r from-amber-500/80 to-yellow-400"
            animate={{ 
              width: ['0%', '30%', '55%', '85%', '99%'],
            }}
            transition={{ 
              duration: 20,
              ease: 'easeOut'
            }}
          />
        </div>
      </div>
    </div>
  );
}
