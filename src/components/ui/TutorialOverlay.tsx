import { useStore } from '../../store/useStore';
import { X, ChevronRight, ChevronLeft, Check } from 'lucide-react';

const TUTORIAL_STEPS = [
  {
    title: "Welcome to Brain Explorer",
    description: "Experience the human brain in interactive 3D. This tutorial will guide you through all the advanced visualization and analysis tools at your disposal.",
    position: "center"
  },
  {
    title: "Minimize UI",
    description: "Want an unobstructed view of the brain? Use the Minimize button in the top right corner to hide all control panels. Click again to Maximize the controls.",
    position: "top"
  },
  {
    title: "Navigation & Zoom",
    description: "Click and drag to rotate the model. Use your mouse wheel or the Zoom In/Out (+/-) buttons in the toolbar to see fine details or the whole structure.",
    position: "left"
  },
  {
    title: "Auto-Rotate",
    description: "Enable Auto-Rotate in the left toolbar to automatically spin the model, allowing you to observe the complex 3D topology from every angle hands-free.",
    position: "left"
  },
  {
    title: "Brain Regions Selector",
    description: "Click the Brain Regions button in the toolbar to open the Regions Selector. You can isolate specific networks (like the Cerebral Cortex or Limbic System) to focus study on related paths.",
    position: "left"
  },
  {
    title: "Explode & Fade Others",
    description: "Explode View pulls all brain components apart to reveal internal relations. Fade Others dims unselected components, making the focused structures pop.",
    position: "left"
  },
  {
    title: "Cross-Section Slicing",
    description: "Slice through the brain along Sagittal, Horizontal, or Coronal planes. Drag the slider to adjust depth, giving you a detailed view inside the brain's solid core.",
    position: "left"
  },
  {
    title: "Anatomical Parts List",
    description: "Examine every integrated structure in the Parts List. Search by name, toggle visibility, and use the custom Focus button to center and highlight key areas.",
    position: "left"
  },
  {
    title: "Cinematic Metal Effect",
    description: "On the bottom right, toggle the Metal Effect to instantly transform the brain's appearance with reflective shaders that highlight physical geometry and contours.",
    position: "bottom"
  },
  {
    title: "3D Export",
    description: "Ready to share or presentation-ready? Download the interactive model as an industry-standard GLB file with the Export button in the top-left panel.",
    position: "left"
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
