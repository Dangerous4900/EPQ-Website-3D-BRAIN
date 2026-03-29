import { create } from 'zustand';

export interface PartSetting {
  customName: string;
  visible: boolean;
}

interface AppState {
  currentSection: number;
  setCurrentSection: (section: number) => void;
  isModelLoaded: boolean;
  setModelLoaded: (loaded: boolean) => void;
  activeLobe: string | null;
  setActiveLobe: (lobe: string | null) => void;
  isDissected: boolean;
  setDissected: (dissected: boolean) => void;
  pulseActive: boolean;
  setPulseActive: (active: boolean) => void;
  scaleLevel: number; // 0: human, 1: neuron, 2: galaxy
  setScaleLevel: (level: number) => void;
  timelineYear: number;
  setTimelineYear: (year: number) => void;
  selectedPart: string | null;
  setSelectedPart: (part: string | null) => void;
  focusedPart: string | null;
  setFocusedPart: (part: string | null) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  autoRotate: boolean;
  setAutoRotate: (rotate: boolean) => void;
  xRayMode: boolean;
  setXRayMode: (xray: boolean) => void;
  resetCameraTrigger: number;
  triggerResetCamera: () => void;
  partSettings: Record<string, PartSetting>;
  setPartSetting: (id: string, settings: Partial<PartSetting>) => void;
  initPartSettings: (ids: string[]) => void;
  isPartsListOpen: boolean;
  setPartsListOpen: (isOpen: boolean) => void;
  transparencyLevel: number;
  setTransparencyLevel: (level: number) => void;
  sliceX: number;
  setSliceX: (pos: number) => void;
  sliceY: number;
  setSliceY: (pos: number) => void;
  activeSliceAxis: 'x' | 'y';
  setActiveSliceAxis: (axis: 'x' | 'y') => void;
  fadeUnselected: boolean;
  setFadeUnselected: (fade: boolean) => void;
  exportTrigger: number;
  triggerExport: () => void;
  showWelcome: boolean;
  setShowWelcome: (show: boolean) => void;
  tutorialStep: number;
  setTutorialStep: (step: number) => void;
  isTutorialActive: boolean;
  setIsTutorialActive: (active: boolean) => void;
  glassyMode: boolean;
  setGlassyMode: (glassy: boolean) => void;
}

export const useStore = create<AppState>((set) => ({
  currentSection: 0,
  setCurrentSection: (section) => set({ currentSection: section }),
  isModelLoaded: false,
  setModelLoaded: (loaded) => set({ isModelLoaded: loaded }),
  activeLobe: null,
  setActiveLobe: (lobe) => set({ activeLobe: lobe }),
  isDissected: false,
  setDissected: (dissected) => set({ isDissected: dissected }),
  pulseActive: false,
  setPulseActive: (active) => set({ pulseActive: active }),
  scaleLevel: 0,
  setScaleLevel: (level) => set({ scaleLevel: level }),
  timelineYear: 2024,
  setTimelineYear: (year) => set({ timelineYear: year }),
  selectedPart: null,
  focusedPart: null,
  setSelectedPart: (part) => set({ selectedPart: part, focusedPart: null }),
  setFocusedPart: (part) => set({ selectedPart: part, focusedPart: part }),
  searchQuery: '',
  setSearchQuery: (query) => set({ searchQuery: query }),
  autoRotate: true,
  setAutoRotate: (rotate) => set({ autoRotate: rotate }),
  xRayMode: false,
  setXRayMode: (xray) => set({ xRayMode: xray }),
  resetCameraTrigger: 0,
  triggerResetCamera: () => set((state) => ({ 
    resetCameraTrigger: state.resetCameraTrigger + 1,
    isDissected: false,
    xRayMode: false,
    transparencyLevel: 1.0,
    sliceX: 10,
    sliceY: 10,
    activeSliceAxis: 'x',
    fadeUnselected: false,
    selectedPart: null,
    focusedPart: null,
    searchQuery: '',
    isPartsListOpen: false
  })),
  partSettings: {},
  setPartSetting: (id, settings) => set((state) => ({
    partSettings: {
      ...state.partSettings,
      [id]: { ...(state.partSettings[id] || { customName: id.replace('.glb', ''), visible: id !== '1.1.5.0.0.glb' }), ...settings }
    }
  })),
  initPartSettings: (ids) => set((state) => {
    if (Object.keys(state.partSettings).length > 0) return state;
    
    const customNames: Record<string, string> = {
      '1.1.1.3.0.glb': 'Prefrontal Cortex',
      '1.1.1.4.0.glb': 'Premotor Cortex',
      '1.1.1.5.1.glb': 'Precentral Gyrus',
      '1.1.2.1.1.glb': 'Postcentral Gyrus',
      '1.1.2.0.0.glb': 'Parietal Lobe',
      '1.1.3.0.0.glb': 'Occipital Lobe',
    };

    const newSettings: Record<string, PartSetting> = {};
    ids.forEach(id => {
      newSettings[id] = { 
        customName: customNames[id] || id.replace('.glb', ''), 
        visible: id !== '1.1.5.0.0.glb' 
      };
    });
    return { partSettings: newSettings };
  }),
  isPartsListOpen: false,
  setPartsListOpen: (isOpen) => set({ isPartsListOpen: isOpen }),
  transparencyLevel: 1.0,
  setTransparencyLevel: (level) => set({ transparencyLevel: level }),
  sliceX: 10,
  setSliceX: (pos) => set({ sliceX: pos }),
  sliceY: 10,
  setSliceY: (pos) => set({ sliceY: pos }),
  activeSliceAxis: 'x',
  setActiveSliceAxis: (axis) => set({ activeSliceAxis: axis }),
  fadeUnselected: false,
  setFadeUnselected: (fade) => set({ fadeUnselected: fade }),
  exportTrigger: 0,
  triggerExport: () => set((state) => ({ exportTrigger: state.exportTrigger + 1 })),
  showWelcome: true,
  setShowWelcome: (show) => set({ showWelcome: show }),
  tutorialStep: 0,
  setTutorialStep: (step) => set({ tutorialStep: step }),
  isTutorialActive: false,
  setIsTutorialActive: (active) => set({ isTutorialActive: active }),
  glassyMode: true,
  setGlassyMode: (glassy) => set({ glassyMode: glassy }),
}));

