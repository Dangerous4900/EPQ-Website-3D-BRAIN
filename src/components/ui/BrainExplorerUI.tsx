import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, Info, RotateCw, Eye, Layers, Focus, List, EyeOff, Droplet, Download, Ghost, AlertTriangle, Sparkles } from 'lucide-react';
import { useStore } from '../../store/useStore';

// A mock database of brain parts for the search and info panel
const brainDatabase: Record<string, { title: string; description: string; functions: string[] }> = {
  'frontal_lobe': {
    title: 'Frontal Lobe',
    description: 'The largest lobe of the brain, located at the front of each cerebral hemisphere.',
    functions: ['Decision making', 'Problem solving', 'Conscious thought', 'Voluntary movement']
  },
  'parietal_lobe': {
    title: 'Parietal Lobe',
    description: 'Positioned above the temporal lobe and behind the frontal lobe.',
    functions: ['Sensory perception', 'Spatial awareness', 'Proprioception']
  },
  'temporal_lobe': {
    title: 'Temporal Lobe',
    description: 'Located beneath the lateral fissure on both cerebral hemispheres.',
    functions: ['Auditory processing', 'Memory formation', 'Language comprehension']
  },
  'occipital_lobe': {
    title: 'Occipital Lobe',
    description: 'The visual processing center of the mammalian brain.',
    functions: ['Visual perception', 'Color recognition', 'Depth perception']
  },
  'cerebellum': {
    title: 'Cerebellum',
    description: 'A major feature of the hindbrain of all vertebrates.',
    functions: ['Motor control', 'Coordination', 'Precision', 'Timing']
  },
  'brainstem': {
    title: 'Brainstem',
    description: 'The posterior part of the brain, continuous with the spinal cord.',
    functions: ['Breathing', 'Heart rate', 'Blood pressure', 'Sleep cycles']
  },
  'hippocampus': {
    title: 'Hippocampus',
    description: 'A complex brain structure embedded deep into temporal lobe.',
    functions: ['Learning', 'Memory consolidation', 'Spatial navigation']
  },
  'amygdala': {
    title: 'Amygdala',
    description: 'Two almond-shaped clusters of nuclei deep within the temporal lobes.',
    functions: ['Emotion processing', 'Fear response', 'Reward processing']
  }
};

export function BrainExplorerUI() {
  const { 
    selectedPart, setSelectedPart, 
    focusedPart, setFocusedPart,
    searchQuery, setSearchQuery,
    autoRotate, setAutoRotate,
    xRayMode, setXRayMode,
    isDissected, setDissected,
    triggerResetCamera,
    partSettings, setPartSetting,
    isPartsListOpen, setPartsListOpen,
    transparencyLevel, setTransparencyLevel,
    sliceX, setSliceX,
    sliceY, setSliceY,
    sliceZ, setSliceZ,
    activeSliceAxis, setActiveSliceAxis,
    cameraView, setCameraView,
    fadeUnselected, setFadeUnselected,
    glassyMode, setGlassyMode,
    triggerExport
  } = useStore();
  
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchResults, setSearchResults] = useState<string[]>([]);
  const [partsListSearch, setPartsListSearch] = useState('');
  const [showXRayWarning, setShowXRayWarning] = useState(false);

  const handleXRayToggle = () => {
    if (!xRayMode) {
      setShowXRayWarning(true);
    } else {
      setXRayMode(false);
    }
  };

  const confirmXRayMode = () => {
    setXRayMode(true);
    setShowXRayWarning(false);
  };

  // Handle search filtering
  useEffect(() => {
    if (!searchQuery.trim()) {
      setSearchResults([]);
      return;
    }
    
    const query = searchQuery.toLowerCase();
    const results = Object.keys(partSettings).filter(key => {
      const setting = partSettings[key];
      return setting.customName.toLowerCase().includes(query) || key.toLowerCase().includes(query);
    });
    
    setSearchResults(results);
  }, [searchQuery, partSettings]);

  // When a part is selected from the 3D model, try to match it to our database
  // The GLTF node names might not exactly match our keys, so we do a fuzzy match
  const getPartInfo = (partName: string | null) => {
    if (!partName) return null;
    
    const normalizedName = partName.toLowerCase().replace(/\s+/g, '_');
    
    // Exact match
    if (brainDatabase[normalizedName]) {
      return brainDatabase[normalizedName];
    }
    
    // Partial match
    const match = Object.keys(brainDatabase).find(key => 
      normalizedName.includes(key) || key.includes(normalizedName)
    );
    
    if (match) return brainDatabase[match];
    
    // Fallback for unknown parts clicked on the model
    return {
      title: partName,
      description: 'A structural component of the brain model.',
      functions: ['Structure', 'Connectivity']
    };
  };

  const partSetting = selectedPart ? partSettings[selectedPart] : null;
  const partInfo = partSetting ? getPartInfo(partSetting.customName) : null;

  return (
    <div className="fixed inset-0 z-40 pointer-events-none flex flex-col justify-between p-6 md:p-12">
      
      {/* X-Ray Warning Modal */}
      <AnimatePresence>
        {showXRayWarning && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm pointer-events-auto p-4"
          >
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="glass-panel p-6 max-w-md w-full border border-white/20 shadow-2xl"
            >
              <div className="flex items-center gap-3 mb-4 text-amber-400">
                <AlertTriangle size={24} />
                <h2 className="text-xl font-semibold text-white">Performance Warning</h2>
              </div>
              <p className="text-white/80 mb-6 leading-relaxed">
                X-Ray mode uses advanced volumetric and transparency rendering which requires significant memory and GPU power. 
                <br/><br/>
                If you are on a low-end system or mobile device, enabling this might cause stuttering or crash the application.
              </p>
              <div className="flex justify-end gap-3">
                <button 
                  onClick={() => setShowXRayWarning(false)}
                  className="px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors"
                >
                  Cancel
                </button>
                <button 
                  onClick={confirmXRayMode}
                  className="px-4 py-2 rounded-lg bg-amber-500/80 hover:bg-amber-500 text-white font-medium transition-colors"
                >
                  Enable X-Ray
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Top Bar: Search and Tools */}
      <div className="flex justify-between items-start w-full">
        {/* Tools Panel */}
        <div className="flex flex-col gap-2 pointer-events-auto">
          <div className="glass-panel p-2 flex flex-col gap-2">
            <button 
              onClick={() => setPartsListOpen(!isPartsListOpen)}
              className={`p-3 rounded-lg transition-colors flex items-center gap-2 ${isPartsListOpen ? 'bg-white/20 text-white' : 'text-white/70 hover:text-white hover:bg-white/10'}`}
              title="Parts List"
            >
              <List size={20} />
              <span className="text-sm hidden md:inline">Parts List</span>
            </button>
            <button 
              onClick={() => setAutoRotate(!autoRotate)}
              className={`p-3 rounded-lg transition-colors flex items-center gap-2 ${autoRotate ? 'bg-white/20 text-white' : 'text-white/70 hover:text-white hover:bg-white/10'}`}
              title="Toggle Auto-Rotate"
            >
              <RotateCw size={20} />
              <span className="text-sm hidden md:inline">Auto-Rotate</span>
            </button>
            <button 
              onClick={handleXRayToggle}
              className={`p-3 rounded-lg transition-colors flex items-center gap-2 ${xRayMode ? 'bg-white/20 text-white' : 'text-white/70 hover:text-white hover:bg-white/10'}`}
              title="Toggle X-Ray Mode"
            >
              <Eye size={20} />
              <span className="text-sm hidden md:inline">X-Ray Mode</span>
            </button>
            <button 
              onClick={() => setDissected(!isDissected)}
              className={`p-3 rounded-lg transition-colors flex items-center gap-2 ${isDissected ? 'bg-white/20 text-white' : 'text-white/70 hover:text-white hover:bg-white/10'}`}
              title="Toggle Explode View"
            >
              <Layers size={20} />
              <span className="text-sm hidden md:inline">Explode View</span>
            </button>
            <button 
              onClick={() => setFadeUnselected(!fadeUnselected)}
              className={`p-3 rounded-lg transition-colors flex items-center gap-2 ${fadeUnselected ? 'bg-white/20 text-white' : 'text-white/70 hover:text-white hover:bg-white/10'}`}
              title="Toggle Fade Others"
            >
              <Ghost size={20} />
              <span className="text-sm hidden md:inline">Fade Others</span>
            </button>
            <button 
              onClick={() => triggerResetCamera()}
              className="p-3 rounded-lg transition-colors flex items-center gap-2 text-white/70 hover:text-white hover:bg-white/10"
              title="Reset View"
            >
              <Focus size={20} />
              <span className="text-sm hidden md:inline">Reset View</span>
            </button>
            <button 
              onClick={() => triggerExport()}
              className="p-3 rounded-lg transition-colors flex items-center gap-2 text-white/70 hover:text-white hover:bg-white/10"
              title="Export as GLB"
            >
              <Download size={20} />
              <span className="text-sm hidden md:inline">Export GLB</span>
            </button>
          </div>
          
          {/* Sliders Panel */}
          <div className="glass-panel p-4 flex flex-col gap-4 mt-2">
            {!glassyMode && (
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="text-xs text-white/70">Transparency</label>
                  <span className="text-xs text-white/50">{Math.round((1 - transparencyLevel) * 100)}%</span>
                </div>
                <input
                  type="range"
                  min="0.1"
                  max="1"
                  step="0.05"
                  value={transparencyLevel}
                  onChange={(e) => setTransparencyLevel(parseFloat(e.target.value))}
                  className="w-full h-1.5 bg-white/20 rounded-lg appearance-none cursor-pointer"
                />
              </div>
            )}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-xs text-white/70">
                  Slice Plane ({!activeSliceAxis ? 'None' : activeSliceAxis === 'x' ? 'Sagittal' : activeSliceAxis === 'y' ? 'Horizontal' : 'Coronal'})
                </label>
                <span className="text-xs text-white/50">
                  {!activeSliceAxis ? 'Off' : 
                   activeSliceAxis === 'x' ? (sliceX < 10 ? 'Active' : 'Ready') : 
                   activeSliceAxis === 'y' ? (sliceY < 10 ? 'Active' : 'Ready') : 
                   (sliceZ < 10 ? 'Active' : 'Ready')}
                </span>
              </div>
              
              {activeSliceAxis && (
                <input
                  type="range"
                  min="-10"
                  max="10"
                  step="0.1"
                  value={activeSliceAxis === 'x' ? sliceX : activeSliceAxis === 'y' ? sliceY : sliceZ}
                  onChange={(e) => {
                    const val = parseFloat(e.target.value);
                    if (activeSliceAxis === 'x') setSliceX(val);
                    else if (activeSliceAxis === 'y') setSliceY(val);
                    else setSliceZ(val);
                  }}
                  className="w-full h-1.5 bg-white/20 rounded-lg appearance-none cursor-pointer mb-3"
                />
              )}

              <div className="flex flex-wrap gap-2">
                <button 
                  onClick={() => {
                    if (activeSliceAxis === 'x') {
                      setActiveSliceAxis(null);
                      setCameraView('default');
                    } else {
                      setActiveSliceAxis('x');
                      setCameraView('sagittal');
                      setSliceX(10);
                    }
                  }}
                  className={`flex-1 py-1.5 text-[10px] uppercase tracking-wider rounded transition-colors ${activeSliceAxis === 'x' ? 'bg-white/20 text-white' : 'bg-black/20 text-white/50 hover:bg-white/10'}`}
                >
                  Sagittal
                </button>
                <button 
                  onClick={() => {
                    if (activeSliceAxis === 'y') {
                      setActiveSliceAxis(null);
                      setCameraView('default');
                    } else {
                      setActiveSliceAxis('y');
                      setCameraView('horizontal');
                      setSliceY(10);
                    }
                  }}
                  className={`flex-1 py-1.5 text-[10px] uppercase tracking-wider rounded transition-colors ${activeSliceAxis === 'y' ? 'bg-white/20 text-white' : 'bg-black/20 text-white/50 hover:bg-white/10'}`}
                >
                  Horizontal
                </button>
                <button 
                  onClick={() => {
                    if (activeSliceAxis === 'z') {
                      setActiveSliceAxis(null);
                      setCameraView('default');
                    } else {
                      setActiveSliceAxis('z');
                      setCameraView('coronal');
                      setSliceZ(10);
                    }
                  }}
                  className={`flex-1 py-1.5 text-[10px] uppercase tracking-wider rounded transition-colors ${activeSliceAxis === 'z' ? 'bg-white/20 text-white' : 'bg-black/20 text-white/50 hover:bg-white/10'}`}
                >
                  Coronal
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Search Panel */}
        <div className="w-full max-w-md ml-auto pointer-events-auto">
          <div className={`glass-panel overflow-hidden transition-all duration-300 ${isSearchOpen ? 'bg-black/40' : ''}`}>
            <div className="flex items-center p-2">
              <button 
                onClick={() => setIsSearchOpen(!isSearchOpen)}
                className="p-3 text-white/70 hover:text-white transition-colors"
              >
                <Search size={20} />
              </button>
              <input
                type="text"
                placeholder="Search regions..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  if (!isSearchOpen) setIsSearchOpen(true);
                }}
                onFocus={() => setIsSearchOpen(true)}
                className="bg-transparent border-none outline-none text-white w-full py-2 placeholder:text-white/30"
              />
              {searchQuery && (
                <button 
                  onClick={() => {
                    setSearchQuery('');
                    setSearchResults([]);
                  }}
                  className="p-3 text-white/40 hover:text-white transition-colors"
                >
                  <X size={16} />
                </button>
              )}
            </div>
            
            {/* Search Results Dropdown */}
            <AnimatePresence>
              {isSearchOpen && searchResults.length > 0 && (
                <motion.div 
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="border-t border-white/10 max-h-60 overflow-y-auto"
                >
                    {searchResults.map(key => (
                    <button
                      key={key}
                      onClick={() => {
                        setSelectedPart(key);
                        setIsSearchOpen(false);
                        setSearchQuery('');
                      }}
                      className="w-full text-left px-5 py-3 hover:bg-white/10 transition-colors flex items-center gap-3"
                    >
                      <span className="text-sm">{partSettings[key]?.customName || key}</span>
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Bottom/Side Panel: Selected Part Info */}
      <AnimatePresence>
        {selectedPart && partSetting && partInfo && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="w-full max-w-sm pointer-events-auto mt-auto"
          >
            <div className="glass-panel p-6 relative overflow-hidden">
              {/* Background accent */}
              <div className="absolute -top-10 -right-10 w-32 h-32 bg-white/10 rounded-full blur-3xl pointer-events-none" />
              
              <button 
                onClick={() => setSelectedPart(null)}
                className="absolute top-4 right-4 text-white/40 hover:text-white transition-colors z-10"
              >
                <X size={18} />
              </button>
              
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 rounded-lg bg-white/10 border border-white/20">
                  <Info size={20} className="text-white" />
                </div>
                <h3 className="text-xl font-serif capitalize">{partSetting.customName}</h3>
              </div>
              
              <p className="text-sm text-white/70 leading-relaxed mb-6">
                {partInfo.description}
              </p>
              
              <div>
                <h4 className="text-xs uppercase tracking-widest text-white/40 mb-3">Key Functions</h4>
                <div className="flex flex-wrap gap-2">
                  {partInfo.functions.map((func, i) => (
                    <span 
                      key={i} 
                      className="text-xs px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-white/80"
                    >
                      {func}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Parts List Sidebar */}
      <AnimatePresence>
        {isPartsListOpen && (
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="absolute top-24 left-6 md:left-12 bottom-6 w-80 glass-panel flex flex-col overflow-hidden pointer-events-auto z-50"
          >
            <div className="p-4 border-b border-white/10 flex justify-between items-center bg-black/40">
              <h3 className="font-semibold">Parts</h3>
              <button onClick={() => setPartsListOpen(false)} className="text-white/50 hover:text-white">
                <X size={18} />
              </button>
            </div>
            <div className="p-2 border-b border-white/10 bg-black/20">
              <div className="relative">
                <Search size={14} className="absolute left-2 top-1/2 -translate-y-1/2 text-white/40" />
                <input
                  type="text"
                  placeholder="Search parts..."
                  value={partsListSearch}
                  onChange={(e) => setPartsListSearch(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded px-7 py-1.5 text-sm text-white outline-none focus:border-white/30 transition-colors"
                />
                {partsListSearch && (
                  <button
                    onClick={() => setPartsListSearch('')}
                    className="absolute right-2 top-1/2 -translate-y-1/2 text-white/40 hover:text-white"
                  >
                    <X size={12} />
                  </button>
                )}
              </div>
            </div>
            <div className="flex-1 overflow-y-auto p-2 space-y-1">
              {Object.entries(partSettings)
                .filter(([id, setting]) => setting.customName.toLowerCase().includes(partsListSearch.toLowerCase()) || id.toLowerCase().includes(partsListSearch.toLowerCase()))
                .map(([id, setting]) => (
                <div key={id} className={`flex items-center gap-2 p-2 rounded hover:bg-white/5 ${selectedPart === id ? 'bg-white/10' : ''}`}>
                  <button 
                    onClick={() => setPartSetting(id, { visible: !setting.visible })}
                    className="text-white/50 hover:text-white"
                    title={setting.visible ? "Hide part" : "Show part"}
                  >
                    {setting.visible ? <Eye size={16} /> : <EyeOff size={16} className="text-red-400" />}
                  </button>
                  <input 
                    type="text" 
                    value={setting.customName}
                    onChange={(e) => setPartSetting(id, { customName: e.target.value })}
                    className="bg-transparent border border-transparent hover:border-white/20 focus:border-white/50 rounded px-2 py-1 text-sm w-full outline-none transition-colors"
                  />
                  <button 
                    onClick={() => setFocusedPart(id === focusedPart ? null : id)}
                    className={`p-1 rounded ${focusedPart === id ? 'text-white' : 'text-white/30 hover:text-white'}`}
                    title="Focus part"
                  >
                    <Focus size={14} />
                  </button>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Metal Mode Toggle (Bottom Right) */}
      <div className="absolute bottom-6 right-6 md:right-12 pointer-events-auto z-50">
        <button
          onClick={() => setGlassyMode(!glassyMode)}
          className={`flex items-center gap-2 px-4 py-2 rounded-full glass-panel border transition-all duration-300 ${glassyMode ? 'border-amber-400/50 text-amber-100 shadow-[0_0_15px_rgba(251,191,36,0.2)]' : 'border-white/10 text-white/60 hover:text-white hover:border-white/30'}`}
          title="Toggle Metal Effect"
        >
          <Sparkles size={16} className={glassyMode ? 'text-amber-400' : ''} />
          <span className="text-sm font-medium">Metal Effect</span>
        </button>
      </div>
    </div>
  );
}
