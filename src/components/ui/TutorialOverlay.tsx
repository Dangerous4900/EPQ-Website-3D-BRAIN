import { useStore } from '../../store/useStore';
import { X, ChevronRight, ChevronLeft, Check } from 'lucide-react';

const TUTORIAL_STEPS = [
  {
    title: "Welcome to Brain Explorer",
    description: "This interactive 3D model lets you explore the human brain in detail. Let's take a quick tour of the features.",
    position: "center"
  },
  {
    title: "Search & Select",
    description: "Use the search bar at the top to find specific brain regions, or click directly on the 3D model to select a part.",
    position: "top"
  },
  {
    title: "View Controls",
    description: "Use the toolbar on the left to toggle Auto-Rotate, X-Ray mode, Explode view, or Fade unselected parts.",
    position: "left"
  },
  {
    title: "Cross Sections",
    description: "Use the sliders on the left to slice the brain along the X (Side to Side) or Y (Up to Down) axis to see inside.",
    position: "left"
  },
  {
    title: "Parts List",
    description: "Open the Parts List to toggle the visibility of individual brain regions or rename them.",
    position: "left"
  },
  {
    title: "Glass Effect",
    description: "The model features a beautiful translucent glass material by default. If it's hard to see or unclear, you can toggle it off using the 'Glass Effect' button in the bottom right corner.",
    position: "bottom"
  },
  {
    title: "Export",
    description: "Click the Export button to download the entire brain model as a 3D file (.glb). Note that this exports the full structural model, regardless of your current view or selections.",
    position: "bottom"
  }
];

export function TutorialOverlay() {
  const { 
    showWelcome, setShowWelcome, 
    isTutorialActive, setIsTutorialActive, 
    tutorialStep, setTutorialStep 
  } = useStore();

  if (!showWelcome && !isTutorialActive) return null;

  if (showWelcome) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
        <div className="glass-panel p-8 max-w-md w-full mx-4 relative animate-in fade-in zoom-in duration-300">
          <h2 className="text-2xl font-serif mb-4 text-white">Welcome to Brain Explorer</h2>
          <p className="text-white/80 mb-8 leading-relaxed">
            Explore the human brain in interactive 3D. Would you like a quick tutorial explaining all the features?
          </p>
          <div className="flex gap-4">
            <button 
              onClick={() => setShowWelcome(false)}
              className="flex-1 py-3 px-4 rounded-lg border border-white/20 text-white/70 hover:text-white hover:bg-white/10 transition-colors"
            >
              Skip
            </button>
            <button 
              onClick={() => {
                setShowWelcome(false);
                setIsTutorialActive(true);
                setTutorialStep(0);
              }}
              className="flex-1 py-3 px-4 rounded-lg bg-white/20 text-white hover:bg-white/30 transition-colors font-medium"
            >
              Start Tutorial
            </button>
          </div>
        </div>
      </div>
    );
  }

  const step = TUTORIAL_STEPS[tutorialStep];
  const isLastStep = tutorialStep === TUTORIAL_STEPS.length - 1;

  const getPositionClasses = () => {
    switch (step.position) {
      case 'top': return 'top-24 left-1/2 -translate-x-1/2';
      case 'left': return 'top-1/2 left-24 -translate-y-1/2 md:left-80';
      case 'bottom': return 'bottom-24 left-1/2 -translate-x-1/2';
      case 'center': default: return 'top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2';
    }
  };

  return (
    <div className="fixed inset-0 z-50 pointer-events-none">
      {/* Dim background slightly during tutorial */}
      <div className="absolute inset-0 bg-black/20 backdrop-blur-[2px]" />
      
      <div className={`absolute ${getPositionClasses()} transition-all duration-500 ease-in-out pointer-events-auto`}>
        <div className="glass-panel p-6 w-80 shadow-2xl relative">
          <button 
            onClick={() => setIsTutorialActive(false)}
            className="absolute top-4 right-4 text-white/40 hover:text-white transition-colors"
          >
            <X size={18} />
          </button>
          
          <div className="mb-2 text-xs font-mono text-white/50 uppercase tracking-wider">
            Step {tutorialStep + 1} of {TUTORIAL_STEPS.length}
          </div>
          
          <h3 className="text-lg font-medium text-white mb-2">{step.title}</h3>
          <p className="text-sm text-white/70 mb-6 leading-relaxed">
            {step.description}
          </p>
          
          <div className="flex justify-between items-center">
            <button 
              onClick={() => setTutorialStep(Math.max(0, tutorialStep - 1))}
              disabled={tutorialStep === 0}
              className={`p-2 rounded-lg transition-colors ${tutorialStep === 0 ? 'opacity-30 cursor-not-allowed' : 'hover:bg-white/10 text-white'}`}
            >
              <ChevronLeft size={20} />
            </button>
            
            <div className="flex gap-1.5">
              {TUTORIAL_STEPS.map((_, idx) => (
                <div 
                  key={idx} 
                  className={`w-1.5 h-1.5 rounded-full transition-colors ${idx === tutorialStep ? 'bg-white' : 'bg-white/20'}`}
                />
              ))}
            </div>
            
            <button 
              onClick={() => {
                if (isLastStep) {
                  setIsTutorialActive(false);
                } else {
                  setTutorialStep(tutorialStep + 1);
                }
              }}
              className="p-2 rounded-lg hover:bg-white/10 text-white transition-colors flex items-center gap-1"
            >
              {isLastStep ? <Check size={20} /> : <ChevronRight size={20} />}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
