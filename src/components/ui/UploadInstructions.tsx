import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Info } from 'lucide-react';

export function UploadInstructions() {
  const [isVisible, setIsVisible] = useState(true);

  // Auto-hide after 15 seconds
  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(false), 15000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          className="fixed bottom-6 right-6 z-50 max-w-sm"
        >
          <div className="glass-panel p-4 relative">
            <button 
              onClick={() => setIsVisible(false)}
              className="absolute top-2 right-2 text-white/50 hover:text-white transition-colors"
            >
              <X size={16} />
            </button>
            
            <div className="flex items-start gap-3">
              <div className="mt-1 text-blue-400">
                <Info size={20} />
              </div>
              <div>
                <h3 className="font-semibold text-sm mb-1">Developer Instructions</h3>
                <p className="text-xs text-white/70 leading-relaxed">
                  To use your custom 3D brain model:
                  <br/>1. Create a <code className="bg-white/10 px-1 rounded">public/models/</code> directory.
                  <br/>2. Upload your file as <code className="bg-white/10 px-1 rounded">brain.glb</code>.
                  <br/>3. Uncomment the <code className="bg-white/10 px-1 rounded">useGLTF</code> lines in <code className="bg-white/10 px-1 rounded">src/components/BrainModel.tsx</code>.
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
