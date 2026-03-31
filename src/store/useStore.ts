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
  sliceZ: number;
  setSliceZ: (pos: number) => void;
  activeSliceAxis: 'x' | 'y' | 'z' | null;
  setActiveSliceAxis: (axis: 'x' | 'y' | 'z' | null) => void;
  cameraView: 'default' | 'coronal' | 'sagittal' | 'horizontal';
  setCameraView: (view: 'default' | 'coronal' | 'sagittal' | 'horizontal') => void;
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
    sliceZ: 10,
    activeSliceAxis: null,
    cameraView: 'default',
    autoRotate: true,
    glassyMode: false,
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
    const customNames: Record<string, string> = {
      '1.1.1.1.1.glb': 'Superior Frontal Gyrus',
      '1.1.1.1.2.glb': 'Superior Frontal Gyrus',
      '1.1.1.1.3.glb': 'Superior Frontal Gyrus',
      '1.1.1.3.0.glb': 'Prefrontal Cortex',
      '1.1.1.4.0.glb': 'Premotor Cortex',
      '1.1.1.5.1.glb': 'Precentral Gyrus (Motor Cortex)',
      '1.1.1.7.0.glb': 'Broca Area (Inferior Frontal Gyrus)',
      '1.1.1.8.0.glb': 'Orbitofrontal Cortex (Middle Frontal Gyrus)',
      '1.1.2.1.1.glb': 'Postcentral Gyrus (Sensory Cortex)',
      '1.1.2.0.0.glb': 'Parietal Lobe',
      '1.1.3.0.0.glb': 'Occipital Lobe (Visual Cortex)',
      '1.1.4.0.0.glb': 'Temporal Lobe',
      '1.1.4.6.0.glb': 'Wernicke Area',
      '1.1.5.0.0.glb': 'Insular Cortex',
      '1.1.5.1.0.glb': 'Cingulate Gyrus',
      '1.1.5.3.1.glb': 'Hippocampus',
      '1.1.5.3.2.glb': 'Amygdala',
      '2.1.0.0.0.glb': 'Cerebellum (Left)',
      '2.1.1.0.0.glb': 'Cerebellum (Right)',
      '3.1.1.0.0.glb': 'Midbrain',
      '3.1.2.0.0.glb': 'Pons',
      '3.2.0.0.0.glb': 'Medulla Oblongata',
      '4.1.0.0.0.glb': 'Thalamus (Left)',
      '4.1.1.0.0.glb': 'Thalamus (Right)',
      '4.2.0.0.0.glb': 'Hypothalamus',
      '5.1.0.0.0.glb': 'Caudate Nucleus',
      '5.2.0.0.0.glb': 'Putamen',
      '5.3.0.0.0.glb': 'Globus Pallidus',
      '7.1.1.0.0.glb': 'Lateral Ventricle (Left)',
      '7.1.2.0.0.glb': 'Lateral Ventricle (Right)',
      '7.2.1.0.0.glb': 'Third Ventricle',
      '7.3.0.0.0.glb': 'Fourth Ventricle',
      '9.1.0.0.0.glb': 'Corpus Callosum',
      '0.0.0.0.0.glb': 'Brainstem',
    };

    const newSettings = { ...state.partSettings };
    let changed = false;

    ids.forEach(id => {
      if (!newSettings[id]) {
        newSettings[id] = { 
          customName: customNames[id] || id.replace('.glb', ''), 
          visible: id !== '1.1.5.0.0.glb' 
        };
        changed = true;
      }
    });

    if (!changed) return state;
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
  sliceZ: 10,
  setSliceZ: (pos) => set({ sliceZ: pos }),
  activeSliceAxis: null,
  setActiveSliceAxis: (axis) => set({ activeSliceAxis: axis }),
  cameraView: 'default',
  setCameraView: (view) => set({ cameraView: view }),
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
  glassyMode: false,
  setGlassyMode: (glassy) => set({ glassyMode: glassy }),
}));

