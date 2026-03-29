import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useStore } from '../../store/useStore';
import { CheckCircle2, XCircle, BrainCircuit } from 'lucide-react';

const questions = [
  {
    q: "Which part of the brain is primarily responsible for forming new memories?",
    options: ["Amygdala", "Hippocampus", "Cerebellum", "Frontal Lobe"],
    answer: 1
  },
  {
    q: "What is the process of strengthening synaptic connections called?",
    options: ["Neurogenesis", "Synaptic Pruning", "Long-Term Potentiation", "Myelination"],
    answer: 2
  },
  {
    q: "Which type of memory holds information for a few seconds to a minute?",
    options: ["Sensory Memory", "Short-Term Memory", "Long-Term Memory", "Working Memory"],
    answer: 1
  }
];

export function MemorySimulationSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const { setCurrentSection } = useStore();
  const [currentQ, setCurrentQ] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [feedback, setFeedback] = useState<'correct' | 'wrong' | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setCurrentSection(5);
        }
      },
      { threshold: 0.5 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, [setCurrentSection]);

  const handleAnswer = (index: number) => {
    const isCorrect = index === questions[currentQ].answer;
    
    if (isCorrect) {
      setScore(s => s + 1);
      setFeedback('correct');
    } else {
      setFeedback('wrong');
    }

    setTimeout(() => {
      setFeedback(null);
      if (currentQ < questions.length - 1) {
        setCurrentQ(q => q + 1);
      } else {
        setShowResult(true);
      }
    }, 1500);
  };

  const resetQuiz = () => {
    setCurrentQ(0);
    setScore(0);
    setShowResult(false);
    setFeedback(null);
  };

  return (
    <section 
      ref={sectionRef}
      className="relative w-full min-h-screen flex items-center justify-center px-8 md:px-24 py-24"
    >
      <div className="z-10 w-full max-w-xl">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="glass-panel p-8 md:p-12"
        >
          <div className="flex items-center gap-4 mb-8">
            <BrainCircuit className="text-blue-400" size={32} />
            <h2 className="text-3xl font-serif">Memory & Learning</h2>
          </div>

          <AnimatePresence mode="wait">
            {!showResult ? (
              <motion.div
                key={`q-${currentQ}`}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <div className="flex justify-between items-center text-sm text-white/50 mb-4">
                  <span>Question {currentQ + 1} of {questions.length}</span>
                  <span>Score: {score}</span>
                </div>
                
                <h3 className="text-xl font-medium leading-relaxed mb-8">
                  {questions[currentQ].q}
                </h3>

                <div className="space-y-3">
                  {questions[currentQ].options.map((opt, i) => (
                    <button
                      key={i}
                      onClick={() => handleAnswer(i)}
                      disabled={feedback !== null}
                      className={`w-full text-left px-6 py-4 rounded-xl border transition-all duration-300 ${
                        feedback === 'correct' && i === questions[currentQ].answer
                          ? 'bg-green-500/20 border-green-500/50 text-green-300'
                          : feedback === 'wrong' && i === questions[currentQ].answer
                          ? 'bg-green-500/10 border-green-500/30 text-green-300/50' // Show correct answer dimly
                          : feedback === 'wrong' && i !== questions[currentQ].answer
                          ? 'bg-red-500/20 border-red-500/50 text-red-300' // Show wrong selection
                          : 'bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/30 text-white/80'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span>{opt}</span>
                        {feedback === 'correct' && i === questions[currentQ].answer && <CheckCircle2 size={20} className="text-green-400" />}
                        {feedback === 'wrong' && i !== questions[currentQ].answer && <XCircle size={20} className="text-red-400" />}
                      </div>
                    </button>
                  ))}
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="result"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-8"
              >
                <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-blue-500/20 border-4 border-blue-500/50 mb-6">
                  <span className="text-3xl font-mono text-blue-300">{score}/{questions.length}</span>
                </div>
                <h3 className="text-2xl font-serif mb-4">Simulation Complete</h3>
                <p className="text-white/60 mb-8">
                  {score === questions.length 
                    ? "Perfect! Your hippocampus has successfully formed strong new synaptic connections." 
                    : "Good effort. Repetition is key to long-term potentiation."}
                </p>
                <button 
                  onClick={resetQuiz}
                  className="glass-button w-full"
                >
                  Restart Simulation
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
