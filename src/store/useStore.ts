import { create } from 'zustand';

export interface PartSetting {
  customName: string;
  visible: boolean;
}

export const regionsMap: Record<string, { title: string; partIds: string[] }> = {
  'telencephalon': {
    title: 'Telencephalon (Cerebrum)',
    partIds: [
      // Cortical Lobes
      '1.1.1.0.0.glb', '1.1.1.1.0.glb', '1.1.1.3.0.glb', '1.1.1.3.1.glb', '1.1.1.4.0.glb', '1.1.1.5.1.glb', '1.1.1.5.2.glb', '1.1.1.6.1.glb', '1.1.1.6.2.glb', '1.1.1.7.0.glb', '1.1.1.8.0.glb',
      '1.1.2.0.0.glb', '1.1.2.1.0.glb', '1.1.2.1.1.glb', '1.1.2.1.2.glb', '1.1.2.2.1.glb', '1.1.2.2.2.glb',
      '1.1.3.0.0.glb', '1.1.3.1.0.glb', '1.1.3.1.1.glb', '1.1.3.2.0.glb',
      '1.1.4.0.0.glb', '1.1.4.4.0.glb', '1.1.4.5.0.glb', '1.1.4.5.1.glb', '1.1.4.6.0.glb', '1.1.4.7.0.glb',
      // Basal Ganglia & Claustrum
      '1.1.6.0.0.glb', '1.1.6.4.1.glb', '1.1.6.4.2.1.glb', '1.1.6.4.2.2.glb', '1.1.6.4.2.3.glb', '1.1.9.0.0.glb', '1.1.6.6.0.glb', '1.1.10.0.0.glb', '1.1.5.4.0.glb',
      // Limbic System
      '1.1.6.5.0.glb', '1.1.4.3.3.glb', '1.1.5.2.0.glb', '1.1.1.1.1.glb', '1.1.1.1.2.glb', '1.1.1.1.3.glb', '1.1.4.2.0.glb',
      // White Matter
      '1.1.5.1.0.glb', '1.1.5.3.1.glb', '1.1.5.3.2.glb', '1.1.5.3.3.glb'
    ]
  },
  'diencephalon': {
    title: 'Diencephalon (Deep Brain)',
    partIds: [
      '3.2.0.0.0.glb', '3.4.0.0.0.glb', '3.1.1.0.0.glb', '3.1.2.0.0.glb', '3.3.0.0.0.glb', 
      '3.2.1.0.0.glb', '3.2.2.0.0.glb', '3.4.2.0.0.glb', '3.4.1.0.0.glb', '3.4.3.0.0.glb', 
      '3.4.4.0.0.glb', '3.4.5.0.0.glb', '3.4.6.0.0.glb'
    ]
  },
  'mesencephalon': {
    title: 'Mesencephalon (Midbrain)',
    partIds: [
      '4.2.2.0.0.glb', '4.2.6.0.0.glb', '4.2.7.0.0.glb', '4.2.1.0.0.glb', 
      '6.8.1.0.0.glb', '6.8.2.0.0.glb'
    ]
  },
  'hindbrain': {
    title: 'Hindbrain / Brainstem',
    partIds: [
      // Cerebellum
      '2.1.0.0.0.glb', '2.3.0.0.0.glb', '2.4.1.1.0.glb', '2.4.1.2.0.glb', 
      '2.4.1.3.0.glb', '2.4.1.4.0.glb', '9.2.0.0.0.glb', '9.3.0.0.0.glb',
      // Pons & Medulla
      '4.1.0.0.0.glb', '4.1.1.0.0.glb', '4.1.2.0.0.glb', '4.3.0.0.0.glb', 
      '0.0.0.0.0.glb', '4.3.1.0.0.glb', '4.5.0.0.0.glb', '4.6.0.0.0.glb', 
      '4.7.0.0.0.glb'
    ]
  },
  'ventricular_system': {
    title: 'Ventricular System',
    partIds: [
      '5.1.1.0.0.glb', '5.2.1.0.0.glb', '5.2.2.0.0.glb', '5.3.0.0.0.glb', '5.4.0.0.0.glb'
    ]
  }
};

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
  hoveredPart: string | null;
  setHoveredPart: (part: string | null) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  autoRotate: boolean;
  setAutoRotate: (rotate: boolean) => void;
  meshMode: boolean;
  setMeshMode: (mesh: boolean) => void;
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
  activeRegion: string | null;
  setActiveRegion: (region: string | null) => void;
  zoomInTrigger: number;
  triggerZoomIn: () => void;
  zoomOutTrigger: number;
  triggerZoomOut: () => void;
  isUIMinimized: boolean;
  setIsUIMinimized: (minimized: boolean) => void;
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
  hoveredPart: null,
  setSelectedPart: (part) => set({ selectedPart: part, focusedPart: null }),
  setFocusedPart: (part) => set({ selectedPart: part, focusedPart: part }),
  setHoveredPart: (part) => set({ hoveredPart: part }),
  searchQuery: '',
  setSearchQuery: (query) => set({ searchQuery: query }),
  autoRotate: true,
  setAutoRotate: (rotate) => set({ autoRotate: rotate }),
  meshMode: false,
  setMeshMode: (mesh) => set({ meshMode: mesh }),
  resetCameraTrigger: 0,
  triggerResetCamera: () => set((state) => ({ 
    resetCameraTrigger: state.resetCameraTrigger + 1,
    isDissected: false,
    meshMode: false,
    transparencyLevel: 1.0,
    sliceX: 30,
    sliceY: 30,
    sliceZ: 30,
    activeSliceAxis: null,
    cameraView: 'default',
    autoRotate: true,
    glassyMode: false,
    fadeUnselected: false,
    activeRegion: null,
    selectedPart: null,
    focusedPart: null,
    hoveredPart: null,
    searchQuery: '',
    isPartsListOpen: false
  })),
  partSettings: {},
  setPartSetting: (id, settings) => set((state) => ({
    partSettings: {
      ...state.partSettings,
      [id]: { ...(state.partSettings[id] || { customName: id.replace('.glb', ''), visible: true }), ...settings }
    }
  })),
  initPartSettings: (ids) => set((state) => {
    const customNames: Record<string, string> = {
      '1.1.1.1.0.glb': 'Frontal region',
      '1.1.1.0.0.glb': 'Frontal Lobe',
      '1.1.1.3.0.glb': 'Frontal Lobe',
      '1.1.1.3.1.glb': 'Broca’s area',
      '1.1.1.4.0.glb': 'Premotor Cortex',
      '1.1.1.5.1.glb': 'Precentral Gyrus (Motor Cortex)',
      '1.1.1.5.2.glb': 'Precentral Gyrus',
      '1.1.1.6.1.glb': 'Frontal region',
      '1.1.1.6.2.glb': 'Frontal region',
      '1.1.1.1.1.glb': 'Dentate gyrus region',
      '1.1.1.1.2.glb': 'Parahippocampal gyrus',
      '1.1.1.1.3.glb': 'Dentate gyrus region',
      '1.1.2.1.0.glb': 'Parietal region',
      '1.1.2.1.1.glb': 'Postcentral Gyrus (Sensory Cortex)',
      '1.1.2.1.2.glb': 'Postcentral Gyrus',
      '1.1.2.2.1.glb': 'Parietal region',
      '1.1.2.2.2.glb': 'Parietal region',
      '1.1.2.0.0.glb': 'Parietal Lobe',
      '1.1.3.1.1.glb': 'Visual cortex area',
      '1.1.3.2.0.glb': 'Visual cortex area',
      '1.1.3.0.0.glb': 'Occipital Lobe',
      '1.1.3.1.0.glb': 'Primary visual cortex',
      '1.1.4.0.0.glb': 'Temporal Lobe',
      '1.1.4.2.0.glb': 'Entorhinal cortex',
      '1.1.4.4.0.glb': 'Temporal region',
      '1.1.4.5.0.glb': 'Olfactory tract',
      '1.1.4.5.1.glb': 'Olfactory bulb',
      '1.1.4.6.0.glb': 'Primary auditory cortex',
      '1.1.4.7.0.glb': 'Wernicke\'s area',
      '1.1.4.3.3.glb': 'Hippocampus proper',
      '1.1.4.3.2.glb': 'Dentate gyrus',
      '1.1.4.3.1.glb': 'Subiculum',
      '1.1.6.0.0.glb': 'Basal ganglia region',
      '1.1.6.4.1.glb': 'Caudate nucleus',
      '1.1.6.4.2.1.glb': 'Putamen',
      '1.1.6.4.2.2.glb': 'Globus pallidus internal segment',
      '1.1.6.4.2.3.glb': 'Globus pallidus external segment',
      '1.1.6.5.0.glb': 'Amygdala',
      '1.1.6.6.0.glb': 'Basal ganglia region',
      '1.1.5.0.0.glb': 'Insular Cortex',
      '1.1.5.1.0.glb': 'Corpus Callosum',
      '1.1.5.2.0.glb': 'Fornix',
      '1.1.5.3.1.glb': 'Anterior limb',
      '1.1.5.3.2.glb': 'Genu',
      '1.1.5.3.3.glb': 'Posterior limb',
      '1.1.5.4.0.glb': 'Claustrum',
      '2.1.0.0.0.glb': 'Cerebellum',
      '2.3.0.0.0.glb': 'Vermis',
      '2.4.1.1.0.glb': 'Fastigial nucleus',
      '2.4.1.2.0.glb': 'Globose nucleus',
      '2.4.1.3.0.glb': 'Emboliform nucleus',
      '2.4.1.4.0.glb': 'Dentate nucleus',
      '3.1.1.0.0.glb': 'Pineal gland',
      '3.1.2.0.0.glb': 'Habenula',
      '3.2.0.0.0.glb': 'Hypothalamus',
      '3.2.1.0.0.glb': 'Mammillary bodies',
      '3.2.2.0.0.glb': 'Pituitary gland',
      '3.4.0.0.0.glb': 'Thalamus',
      '3.4.2.0.0.glb': 'Thalamic nuclei',
      '3.4.3.0.0.glb': 'Ventral anterior nucleus',
      '3.4.4.0.0.glb': 'Dorsomedial nucleus',
      '3.4.5.0.0.glb': 'Ventral posterolateral nucleus',
      '4.1.0.0.0.glb': 'Medulla oblongata',
      '4.1.1.0.0.glb': 'Medulla oblongata : Pyramid',
      '4.1.2.0.0.glb': 'Medulla oblongata : Olive',
      '4.2.0.0.0.glb': 'Hypothalamus',
      '4.2.2.0.0.glb': 'Pretectal area',
      '4.2.6.0.0.glb': 'Superior colliculus',
      '4.2.7.0.0.glb': 'Inferior colliculus',
      '4.2.1.0.0.glb': 'Cerebral peduncles',
      '4.3.0.0.0.glb': 'Brain stem : Pons',
      '4.3.1.0.0.glb': 'Locus coeruleus',
      '4.5.0.0.0.glb': 'Raphe nuclei',
      '4.6.0.0.0.glb': 'Gracile nucleus',
      '4.7.0.0.0.glb': 'Cuneate nucleus',
      '5.1.0.0.0.glb': 'fourth ventricle',
      '5.1.1.0.0.glb': 'Rhomboid fossa',
      '5.2.0.0.0.glb': 'Lateral ventricles',
      '5.2.1.0.0.glb': 'Lateral ventricles : Anterior horn',
      '5.2.2.0.0.glb': 'Lateral ventricles : Body',
      '5.2.3.0.0.glb': 'Lateral ventricles',
      '5.2.4.0.0.glb': 'Lateral ventricles',
      '5.3.0.0.0.glb': 'Third ventricle',
      '5.4.0.0.0.glb': 'Cerebral aqueduct',
      '6.8.1.0.0.glb': 'Optic tract',
      '6.8.2.0.0.glb': 'Optic chiasm',
      '1.1.9.0.0.glb': 'Basal nucleus',
      '1.1.7.0.0.glb': 'Frontal region',
      '1.1.8.0.0.glb': 'Frontal region',
      '1.1.1.7.0.glb': 'Inferior Frontal Gyrus',
      '1.1.1.8.0.glb': 'Orbitofrontal Cortex',
      '3.3.0.0.0.glb': 'Subthalamic nucleus',
      '3.4.1.0.0.glb': 'Anterior nucleus',
      '3.4.6.0.0.glb': 'Ventral posteromedial nucleus',
      '7.1.1.0.0.glb': 'Lateral Ventricle (Left)',
      '7.1.2.0.0.glb': 'Lateral Ventricle (Right)',
      '7.2.1.0.0.glb': 'Third Ventricle',
      '7.3.0.0.0.glb': 'Fourth Ventricle',
      '9.2.0.0.0.glb': 'Middle cerebellar peduncles',
      '9.3.0.0.0.glb': 'Inferior cerebellar peduncles',
      '1.1.10.0.0.glb': 'Nucleus accumbens',
      '0.0.0.0.0.glb': 'Brainstem',
    };

    const initiallyHidden = [
      '1.1.5.0.0.glb',
      '1.1.7.0.0.glb',
      '1.1.8.0.0.glb',
      '4.0.0.0.0.glb', 
      '4.2.0.0.0.glb',
      '4.3.2.0.0.glb', 
      '5.5.6.0.0.glb',
      '7.2.1.1.0.glb',
      '7.2.1.0.0.glb',
      '7.1.1.0.0.glb',
      '7.1.2.0.0.glb',
      '2.1.1.0.0.glb',
      '1.1.3.1.1.glb',
      '1.1.3.2.0.glb',
      '4.8.3.0.0.glb',
      '7.2.1.2.0.glb',
      '1.1.1.8.0.glb',
      '1.1.1.7.0.glb',
      '1.1.3.3.0.glb',
      '6.12.0.0.0.glb',
      '1.1.1.1.1.glb',
      '1.1.1.1.3.glb'
    ];

    const newSettings = { ...state.partSettings };
    let changed = false;

    ids.forEach(id => {
      // Only include if it has a custom name (not just the ID) and is not blacklisted
      if (!newSettings[id] && customNames[id] && !initiallyHidden.includes(id)) {
        newSettings[id] = { 
          customName: customNames[id], 
          visible: true
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
  sliceX: 30,
  setSliceX: (pos) => set({ sliceX: pos }),
  sliceY: 30,
  setSliceY: (pos) => set({ sliceY: pos }),
  sliceZ: 30,
  setSliceZ: (pos) => set({ sliceZ: pos }),
  activeSliceAxis: null,
  setActiveSliceAxis: (axis) => set((state) => ({
    activeSliceAxis: axis,
    fadeUnselected: axis !== null ? false : state.fadeUnselected
  })),
  cameraView: 'default',
  setCameraView: (view) => set({ cameraView: view }),
  fadeUnselected: false,
  setFadeUnselected: (fade) => set({ fadeUnselected: fade }),
  activeRegion: null,
  setActiveRegion: (region) => set({ activeRegion: region }),
  zoomInTrigger: 0,
  triggerZoomIn: () => set((state) => ({ zoomInTrigger: state.zoomInTrigger + 1 })),
  zoomOutTrigger: 0,
  triggerZoomOut: () => set((state) => ({ zoomOutTrigger: state.zoomOutTrigger + 1 })),
  isUIMinimized: false,
  setIsUIMinimized: (minimized) => set({ isUIMinimized: minimized }),
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

