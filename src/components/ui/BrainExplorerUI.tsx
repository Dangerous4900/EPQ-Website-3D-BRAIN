import { useState, useEffect, useMemo, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, Info, RotateCw, Eye, Layers, Focus, List, EyeOff, Droplet, Download, Ghost, AlertTriangle, Sparkles, Plus, Minus, Maximize, Minimize, Box } from 'lucide-react';
import { useStore, regionsMap } from '../../store/useStore';

// A mock database of brain parts for the search and info panel
const brainDatabase: Record<string, { title: string; description: string; mainFunction: string; functions: string[] }> = {
  'frontal_lobe': {
    title: 'Frontal Lobe',
    description: 'The largest lobe of the brain, located at the front of each cerebral hemisphere.',
    mainFunction: 'Executive control and voluntary motor initiation.',
    functions: ['Decision making', 'Problem solving', 'Conscious thought', 'Voluntary movement']
  },
  'parietal_lobe': {
    title: 'Parietal Lobe',
    description: 'Positioned above the temporal lobe and behind the frontal lobe.',
    mainFunction: 'Integration of sensory information and spatial navigation.',
    functions: ['Sensory perception', 'Spatial awareness', 'Proprioception']
  },
  'temporal_lobe': {
    title: 'Temporal Lobe',
    description: 'Located beneath the lateral fissure on both cerebral hemispheres.',
    mainFunction: 'Processing auditory input and memory encoding.',
    functions: ['Auditory processing', 'Memory formation', 'Language comprehension']
  },
  'occipital_lobe': {
    title: 'Occipital Lobe',
    description: 'The visual processing center of the mammalian brain.',
    mainFunction: 'Primary center for visual perception and processing.',
    functions: ['Visual perception', 'Color recognition', 'Depth perception']
  },
  'cerebellum': {
    title: 'Cerebellum',
    description: 'A major feature of the hindbrain of all vertebrates.',
    mainFunction: 'Coordination, precision, and timing of motor movements.',
    functions: ['Motor control', 'Coordination', 'Precision', 'Timing']
  },
  'brainstem': {
    title: 'Brainstem',
    description: 'The posterior part of the brain, continuous with the spinal cord.',
    mainFunction: 'Regulation of vital autonomic functions (breathing, heart rate).',
    functions: ['Breathing', 'Heart rate', 'Blood pressure', 'Sleep cycles']
  },
  'hippocampus': {
    title: 'Hippocampus',
    description: 'A complex brain structure embedded deep into temporal lobe.',
    mainFunction: 'Consolidation of information from short-term to long-term memory.',
    functions: ['Learning', 'Memory consolidation', 'Spatial navigation']
  },
  'amygdala': {
    title: 'Amygdala',
    description: 'Two almond-shaped clusters of nuclei deep within the temporal lobes.',
    mainFunction: 'Processing emotions, particularly fear and threat detection.',
    functions: ['Emotion processing', 'Fear response', 'Reward processing']
  },
  'prefrontal_cortex': {
    title: 'Prefrontal Cortex',
    description: 'The front part of the frontal lobe, involved in complex cognitive behavior and decision making.',
    mainFunction: 'Higher-level cognitive planning and personality expression.',
    functions: ['Executive function', 'Personality expression', 'Social behavior']
  },
  'premotor_cortex': {
    title: 'Premotor Cortex',
    description: 'An area of the motor cortex within the frontal lobe of the brain.',
    mainFunction: 'Planning and preparing for complex voluntary movements.',
    functions: ['Motor planning', 'Spatial guidance', 'Sensory motor integration']
  },
  'motor_cortex': {
    title: 'Precentral Gyrus (Motor Cortex)',
    description: 'The primary motor area of the brain, located in the frontal lobe.',
    mainFunction: 'Execution of voluntary movements.',
    functions: ['Voluntary movement', 'Motor control', 'Signal coordination']
  },
  'sensory_cortex': {
    title: 'Postcentral Gyrus (Sensory Cortex)',
    description: 'The primary somatosensory area of the human brain, located in the parietal lobe.',
    mainFunction: 'Primary processing of touch and tactile sensations.',
    functions: ['Sensory processing', 'Touch perception', 'Proprioception']
  },
  'inferior_frontal_gyrus': {
    title: 'Inferior Frontal Gyrus',
    description: 'A gyrus of the frontal lobe that contains the Broca’s area in the dominant hemisphere.',
    mainFunction: 'Language processing and cognitive control.',
    functions: ['Language processing', 'Speech production', 'Inhibition']
  },
  'orbitofrontal_cortex': {
    title: 'Orbitofrontal Cortex',
    description: 'A prefrontal cortex region in the frontal lobes which is involved in the cognitive process of decision-making.',
    mainFunction: 'Encoding the value of choices and impulsive control.',
    functions: ['Decision making', 'Emotion regulation', 'Reward evaluation']
  },
  'insular_cortex': {
    title: 'Insular Cortex',
    description: 'A portion of the cerebral cortex folded deep within the lateral sulcus.',
    mainFunction: 'Processing interoceptive awareness and emotional states.',
    functions: ['Interoception', 'Emotional awareness', 'Homeostasis']
  },
  'cingulate_gyrus': {
    title: 'Cingulate Gyrus',
    description: 'A part of the brain situated in the medial aspect of the cerebral cortex.',
    mainFunction: 'Regulating emotions and pain perception.',
    functions: ['Emotion processing', 'Memory', 'Resource allocation']
  },
  'midbrain': {
    title: 'Midbrain',
    description: 'A small part of the brain that serves as a relay station for visual and auditory systems.',
    mainFunction: 'Relaying visual and auditory reflexes.',
    functions: ['Visual processing', 'Auditory processing', 'Motor coordination']
  },
  'hypothalamus': {
    title: 'Hypothalamus',
    description: 'A small but important area in the center of the brain that helps control many body functions.',
    mainFunction: 'Maintaining homeostasis and controlling the endocrine system.',
    functions: ['Hormone control', 'Temperature regulation', 'Thirst/Hunger']
  },
  'caudate_nucleus': {
    title: 'Caudate Nucleus',
    description: 'One of the structures that make up the corpus striatum, which is a component of the basal ganglia.',
    mainFunction: 'Planning and execution of movement and learning.',
    functions: ['Motor processes', 'Learning', 'Reward system']
  },
  'putamen': {
    title: 'Putamen',
    description: 'A large structure located in the forebrain, part of the basal ganglia.',
    mainFunction: 'Regulation of movement and motor learning.',
    functions: ['Movement regulation', 'Motor learning', 'Implicit memory']
  },
  'globus_pallidus': {
    title: 'Globus Pallidus',
    description: 'A structure in the brain involved in the regulation of voluntary movement.',
    mainFunction: 'Scaling and filtering motor output.',
    functions: ['Motor control', 'Action selection', 'Muscle tone']
  },
  'corpus_callosum': {
    title: 'Corpus Callosum',
    description: 'A large bundle of more than 200 million myelinated nerve fibers that connect the two brain hemispheres.',
    mainFunction: 'Facilitating communication between the two cerebral hemispheres.',
    functions: ['Interhemispheric communication', 'Information integration', 'Cognition']
  },
  'lateral_ventricle': {
    title: 'Lateral Ventricles',
    description: 'Part of the ventricular system, containing cerebrospinal fluid.',
    mainFunction: 'Production and circulation of cerebrospinal fluid.',
    functions: ['CSF production', 'Brain cushioning', 'Waste removal']
  },
  'brocas_area': {
    title: 'Broca’s Area',
    description: 'A region in the frontal lobe of the dominant hemisphere, usually the left, with functions linked to speech production.',
    mainFunction: 'Primary center for speech production and articulation.',
    functions: ['Speech production', 'Language processing', 'Facial neuron control']
  },
  'wernickes_area': {
    title: 'Wernicke\'s Area',
    description: 'A region in the left temporal lobe that is important for language development and comprehension.',
    mainFunction: 'Primary center for language comprehension and semantics.',
    functions: ['Language comprehension', 'Semantic processing', 'Language recognition']
  },
  'vermis': {
    title: 'Vermis',
    description: 'The narrow, worm-like structure between the two hemispheres of the cerebellum.',
    mainFunction: 'Coordination of axial and limb movements.',
    functions: ['Posture control', 'Locomotion', 'Gaze control']
  },
  'entorhinal_cortex': {
    title: 'Entorhinal Cortex',
    description: 'An area of the brain located in the medial temporal lobe and functioning as a hub in a widespread network for memory, navigation and the perception of time.',
    mainFunction: 'Interface between the hippocampus and the neocortex for memory navigation.',
    functions: ['Memory formation', 'Spatial navigation', 'Temporal perception']
  },
  'parahippocampal_gyrus': {
    title: 'Parahippocampal Gyrus',
    description: 'A grey matter cortical region of the brain that surrounds the hippocampus and is part of the limbic system.',
    mainFunction: 'Memory encoding and environmental scene processing.',
    functions: ['Memory encoding', 'Memory retrieval', 'Environmental recognition']
  },
  'cerebral_peduncles': {
    title: 'Cerebral Peduncles',
    description: 'Two stalks that attach the cerebrum to the brainstem.',
    mainFunction: 'Conducting motor impulses from the cortex to the brainstem.',
    functions: ['Motor pathway', 'Nervous system connection', 'Reflex coordination']
  },
  'pituitary_gland': {
    title: 'Pituitary Gland',
    description: 'A small pea-sized gland that plays a major role in regulating vital body functions and general wellbeing.',
    mainFunction: 'Master gland responsible for hormone secretion regulation.',
    functions: ['Hormone regulation', 'Growth control', 'Metabolism management']
  },
  'optic_chiasm': {
    title: 'Optic Chiasm',
    description: 'The part of the brain where the optic nerves cross, essential for binocular vision.',
    mainFunction: 'Crossing of optic nerve fibers for binocular visual field integration.',
    functions: ['Visual pathway crossing', 'Depth perception', 'Binocular coordination']
  },
  'olfactory_tract': {
    title: 'Olfactory Tract',
    description: 'A bundle of nerve fibers connecting the olfactory bulb to the rest of the brain.',
    mainFunction: 'Conveying olfactory signals from the bulb to the olfactory cortex.',
    functions: ['Smell processing', 'Sensory transmission', 'Odor identification']
  },
  'olfactory_bulb': {
    title: 'Olfactory Bulb',
    description: 'A neural structure of the vertebrate forebrain involved in olfaction, the sense of smell.',
    mainFunction: 'First relay station for scent information processing.',
    functions: ['Odor detection', 'Signal processing', 'Information relay']
  },
  'medulla_oblongata_pyramid': {
    title: 'Medulla Oblongata: Pyramid',
    description: 'Paired white matter structures of the brainstem that contain motor fibers of the corticospinal and corticobulbar tracts.',
    mainFunction: 'Decussation of motor pathways for voluntary movement.',
    functions: ['Motor control', 'Voluntary movement', 'Signal transmission']
  },
  'medulla_oblongata_olive': {
    title: 'Medulla Oblongata: Olive',
    description: 'A pair of prominent oval structures in the medulla oblongata containing the olivary nuclei.',
    mainFunction: 'Motor learning and auditory sound perception.',
    functions: ['Motor learning', 'Auditory perception', 'Sound localization']
  },
  'pons': {
    title: 'Pons',
    description: 'The part of the brainstem that links the medulla oblongata and the thalamus.',
    mainFunction: 'Relaying signals between the cerebrum and cerebellum.',
    functions: ['Sleep regulation', 'Respiration', 'Facial sensations']
  },
  'middle_cerebellar_peduncles': {
    title: 'Middle Cerebellar Peduncles',
    description: 'Paired structures that connect the cerebellum to the pons and are composed entirely of centripetal fibers.',
    mainFunction: 'Relaying motor commands from the pons to the cerebellum.',
    functions: ['Motor coordination', 'Signal transmission', 'Cerebellum communication']
  },
  'dentate_nucleus': {
    title: 'Dentate Nucleus',
    description: 'A cluster of neurons, or nerve cells, in the central nervous system that has a dentate – tooth-edged – appearance.',
    mainFunction: 'Regulation of fine motor coordination and thought process planning.',
    functions: ['Planning motor movements', 'Initiation of voluntary movement', 'Cognitive functions']
  },
  'raphe_nuclei': {
    title: 'Raphe Nuclei',
    description: 'A moderate-size cluster of nuclei found in the brainstem that release serotonin to the rest of the brain.',
    mainFunction: 'Primary site for serotonin production in the central nervous system.',
    functions: ['Serotonin production', 'Mood regulation', 'Sleep-wake cycles', 'Pain modulation']
  },
  'medulla_oblongata': {
    title: 'Medulla Oblongata',
    description: 'The lowest part of the brainstem, continuous with the spinal cord.',
    mainFunction: 'Control of vital autonomic cardiovascular and respiratory functions.',
    functions: ['Autonomic functions', 'Breathing', 'Heart rate', 'Sneezing/Coughing reflexes']
  },
  'primary_visual_cortex': {
    title: 'Primary Visual Cortex',
    description: 'The most studied visual area in the brain, located in the occipital lobe.',
    mainFunction: 'Initial cortical processing of visual light inputs.',
    functions: ['Visual processing', 'Pattern recognition', 'Motion detection']
  },
  'primary_auditory_cortex': {
    title: 'Primary Auditory Cortex',
    description: 'The part of the temporal lobe that processes auditory information.',
    mainFunction: 'Initial cortical processing of auditory sound inputs.',
    functions: ['Sound processing', 'Pitch perception', 'Frequency mapping']
  },
  'optic_tract': {
    title: 'Optic Tract',
    description: 'A part of the visual system in the brain, it is a continuation of the optic nerve that relays information from the optic chiasm to the lateral geniculate nucleus.',
    mainFunction: 'Relaying visual data from the chiasm to the thalamus.',
    functions: ['Visual information relay', 'Sensory processing', 'Vision']
  },
  'inferior_cerebellar_peduncles': {
    title: 'Inferior Cerebellar Peduncles',
    description: 'A thick bundle of nerve fibers that connects the medulla oblongata with the cerebellum.',
    mainFunction: 'Carrying sensory information from the spinal cord to the cerebellum.',
    functions: ['Proprioception', 'Balance coordination', 'Sensory integration']
  },
  'basal_nucleus': {
    title: 'Basal Nucleus',
    description: 'A group of subcortical nuclei, of varied origin, in the brains of vertebrates, including humans, which are situated at the base of the forebrain.',
    mainFunction: 'Cholinergic input to the cortex for alertness and memory.',
    functions: ['Motor control', 'Executive functions', 'Emotional regulation']
  },
  'subthalamic_nucleus': {
    title: 'Subthalamic Nucleus',
    description: 'A small lens-shaped nucleus in the brain where it is, from a functional point of view, part of the basal ganglia system.',
    mainFunction: 'Modulation of motor output and decision inhibition.',
    functions: ['Motor coordination', 'Impulse control', 'Action suppression']
  },
  'anterior_nucleus': {
    title: 'Anterior Nucleus',
    description: 'A collection of nuclei in the rostral part of the dorsal thalamus.',
    mainFunction: 'Memory relay and emotional expression.',
    functions: ['Memory processing', 'Alertness', 'Learning']
  },
  'ventral_posteromedial_nucleus': {
    title: 'Ventral Posteromedial Nucleus',
    description: 'A nucleus of the thalamus that receives sensory information from the face and mouth.',
    mainFunction: 'Relay for sensory information from the face and taste.',
    functions: ['Sensory relay', 'Facial sensation', 'Taste processing']
  },
  'claustrum': {
    title: 'Claustrum',
    description: 'A thin, irregular, sheet-like neuronal structure hidden beneath the inner surface of the neocortex.',
    mainFunction: 'Coordinating large-scale neural networks for cross-modal integration.',
    functions: ['Information integration', 'Consciousness', 'Multisensory processing']
  },
  'anterior_limb': {
    title: 'Anterior Limb (Internal Capsule)',
    description: 'The portion of the internal capsule conveying cognitive and emotional signals.',
    mainFunction: 'Relaying information between the prefrontal cortex and thalamus.',
    functions: ['Cognitive relay', 'Emotional processing', 'Signal transmission']
  },
  'genu': {
    title: 'Genu (Internal Capsule)',
    description: 'The bend of the internal capsule, containing corticobulbar fibers.',
    mainFunction: 'Primary motor relay for head and neck muscles.',
    functions: ['Motor control', 'Bulbar signals', 'Signal relay']
  },
  'posterior_limb': {
    title: 'Posterior Limb (Internal Capsule)',
    description: 'The part of the internal capsule carrying the majority of corticospinal and sensory fibers.',
    mainFunction: 'Major pathway for body motor and sensory information.',
    functions: ['Motor pathway', 'Sensory pathway', 'Body coordination']
  },
  'thalamus': {
    title: 'Thalamus',
    description: 'A large mass of gray matter situated in the forebrain, relays sensory and motor signals to the cerebral cortex.',
    mainFunction: 'Ultimate sensory and motor relay station of the brain.',
    functions: ['Sensory relay', 'Motor integration', 'Consciousness regulation']
  },
  'superior_colliculus': {
    title: 'Superior Colliculus',
    description: 'A structure in the midbrain that is part of the circuit for coordinate transformation between sensory input and motor output.',
    mainFunction: 'Primary center for visual reflexes and tracking.',
    functions: ['Visual reflexes', 'Saccadic eye movements', 'Spatial attention']
  },
  'inferior_colliculus': {
    title: 'Inferior Colliculus',
    description: 'The principal midbrain nucleus of the auditory pathway.',
    mainFunction: 'Primary auditory relay and sound localization.',
    functions: ['Auditory processing', 'Sound frequency mapping', 'Startle reflex']
  },
  'pretectal_area': {
    title: 'Pretectal Area',
    description: 'A group of nuclei in the midbrain that receive inputs from the retina.',
    mainFunction: 'Mediating the pupillary light reflex.',
    functions: ['Pupillary reflex', 'Looming detection', 'Circadian rhythm modulation']
  },
  'fastigial_nucleus': {
    title: 'Fastigial Nucleus',
    description: 'The most medial of the cerebellar nuclei, receiving input from the vermis.',
    mainFunction: 'Regulating body balance and eye movements.',
    functions: ['Balance', 'Posture', 'Vestibular signal relay']
  },
  'globose_nucleus': {
    title: 'Globose Nucleus',
    description: 'One of the deep cerebellar nuclei located lateral to the fastigial nucleus.',
    mainFunction: 'Controlling muscle tone of axial and proximal limb muscles.',
    functions: ['Motor control', 'Muscle tone', 'Coordination']
  },
  'emboliform_nucleus': {
    title: 'Emboliform Nucleus',
    description: 'A deep cerebellar nucleus located lateral to the globose nucleus.',
    mainFunction: 'Assisting in the coordination of motor tasks.',
    functions: ['Motor coordination', 'Limb movement control']
  },
  'locus_coeruleus': {
    title: 'Locus Coeruleus',
    description: 'A nucleus in the pons involved with physiological responses to stress and panic.',
    mainFunction: 'Primary site of norepinephrine synthesis in the brain.',
    functions: ['Arousal', 'Attention', 'Stress response', 'Sleep-wake cycles']
  },
  'gracile_nucleus': {
    title: 'Gracile Nucleus',
    description: 'A nucleus in the medulla oblongata that relays sensory information from the lower body.',
    mainFunction: 'Relaying fine touch and proprioception from the lower body.',
    functions: ['Sensory relay', 'Fine touch', 'Proprioception']
  },
  'cuneate_nucleus': {
    title: 'Cuneate Nucleus',
    description: 'A nucleus in the medulla oblongata that relays sensory information from the upper body.',
    mainFunction: 'Relaying fine touch and proprioception from the upper body.',
    functions: ['Sensory relay', 'Fine touch', 'Proprioception']
  },
  'third_ventricle': {
    title: 'Third Ventricle',
    description: 'A narrow, median cavity filled with cerebrospinal fluid, located in the diencephalon.',
    mainFunction: 'Circulation of CSF and protection of the deep brain.',
    functions: ['CSF circulation', 'Metabolic waste removal', 'Protection']
  },
  'fourth_ventricle': {
    title: 'Fourth Ventricle',
    description: 'The cavity of the hindbrain, located between the cerebellum and the pons/medulla.',
    mainFunction: 'Circulation of CSF into the spinal cord and subarachnoid space.',
    functions: ['CSF distribution', 'Structural support', 'Waste clearance']
  },
  'cerebral_aqueduct': {
    title: 'Cerebral Aqueduct',
    description: 'A conduit for cerebrospinal fluid that connects the third and fourth ventricles.',
    mainFunction: 'Connecting the ventricular system through the midbrain.',
    functions: ['CSF flow', 'Hydrodynamic regulation']
  }
};

export function BrainExplorerUI() {
  const { 
    selectedPart, setSelectedPart, 
    focusedPart, setFocusedPart,
    searchQuery, setSearchQuery,
    autoRotate, setAutoRotate,
    meshMode, setMeshMode,
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
    activeRegion, setActiveRegion,
    glassyMode, setGlassyMode,
    triggerExport,
    triggerZoomIn, triggerZoomOut,
    isUIMinimized, setIsUIMinimized,
    hoveredPart, setHoveredPart
  } = useStore();
  
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchResults, setSearchResults] = useState<string[]>([]);
  const [partsListSearch, setPartsListSearch] = useState('');
  const [isRegionsOpen, setIsRegionsOpen] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const mouseTarget = useRef({ x: 0, y: 0 });
  const mouseCurrent = useRef({ x: 0, y: 0 });

  useEffect(() => {
    let initialized = false;
    const handleMouseMove = (e: MouseEvent) => {
      if (!initialized) {
        mouseCurrent.current = { x: e.clientX, y: e.clientY };
        initialized = true;
      }
      mouseTarget.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    
    let animFrame: number;
    const lerp = () => {
      const ease = 0.12; // buttery delayed glide for elegant hover trailing
      mouseCurrent.current.x += (mouseTarget.current.x - mouseCurrent.current.x) * ease;
      mouseCurrent.current.y += (mouseTarget.current.y - mouseCurrent.current.y) * ease;
      setMousePos({ x: mouseCurrent.current.x, y: mouseCurrent.current.y });
      animFrame = requestAnimationFrame(lerp);
    };
    
    animFrame = requestAnimationFrame(lerp);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animFrame);
    };
  }, []);

  const blacklist = useMemo(() => [
    '1.1.5.0.0.glb', '1.1.7.0.0.glb', '1.1.8.0.0.glb', '4.0.0.0.0.glb',
    '4.2.0.0.0.glb', '4.3.2.0.0.glb', '5.5.6.0.0.glb', '7.2.1.0.0.glb',
    '7.1.1.0.0.glb', '7.1.2.0.0.glb', '1.1.5.5.0.glb', '4.8.1.0.0.glb',
    '4.8.2.0.0.glb', '7.2.1.1.0.glb', '4.8.3.0.0.glb', '7.2.2.0.0.glb',
    '7.2.1.2.0.glb', '1.1.1.8.0.glb', '1.1.1.7.0.glb', '1.1.3.3.0.glb',
    '1.1.3.2.0.glb', '6.12.0.0.0.glb', '1.1.4.6.1.glb', '9.1.0.0.0.glb',
    '1.1.1.1.1.glb', '1.1.1.1.3.glb'
  ], []);

  // Handle search filtering
  useEffect(() => {
    if (!searchQuery.trim()) {
      setSearchResults([]);
      return;
    }
    
    const query = searchQuery.toLowerCase();
    const results = Object.keys(partSettings).filter(key => {
      if (blacklist.includes(key)) return false;
      const setting = partSettings[key];
      if (!setting || !setting.visible) return false;
      return (setting.customName || '').toLowerCase().includes(query) || key.toLowerCase().includes(query);
    });
    
    setSearchResults(results);
  }, [searchQuery, partSettings, blacklist]);

  // When a part is selected from the 3D model, try to match it to our database
  // The GLTF node names might not exactly match our keys, so we do a fuzzy match
  const getPartInfo = (partName: string | null) => {
    if (!partName) return null;
    
    // Normalize: lowercase, replace non-alphanumeric with underscore, collapse multiple underscores
    const normalize = (s: string) => s.toLowerCase().replace(/[^a-z0-9]/g, '_').replace(/_{2,}/g, '_').replace(/^_+|_+$/g, '');
    const normalizedName = normalize(partName);
    
    // Exact match on normalized keys
    if (brainDatabase[normalizedName]) {
      return brainDatabase[normalizedName];
    }
    
    // Partial match
    const match = Object.keys(brainDatabase).find(key => {
      const normalizedKey = normalize(key);
      return normalizedName.includes(normalizedKey) || normalizedKey.includes(normalizedName);
    });
    
    if (match) return brainDatabase[match];
    
    // Fallback for unknown parts clicked on the model
    return {
      title: partName,
      description: 'A structural component of the brain model.',
      mainFunction: 'Structural integrity and neural connectivity.',
      functions: ['Structure', 'Connectivity']
    };
  };

  const partSetting = selectedPart ? partSettings[selectedPart] : null;
  const partInfo = partSetting ? getPartInfo(partSetting.customName) : null;

  return (
    <div className="fixed inset-0 z-40 pointer-events-none flex flex-col justify-between pt-24 pb-6 px-6 md:pt-28 md:pb-12 md:px-12">
      
      {/* Minimize/Maximize Button */}
      <div className="absolute top-24 md:top-28 right-6 md:right-12 pointer-events-auto z-[60]">
        <button
          onClick={() => setIsUIMinimized(!isUIMinimized)}
          className="p-3 rounded-full glass-panel border border-white/20 text-white/70 hover:text-white hover:bg-white/10 transition-all shadow-lg"
          title={isUIMinimized ? "Show Atlas UI" : "Hide Atlas UI"}
        >
          {isUIMinimized ? <Maximize size={20} /> : <Minimize size={20} />}
        </button>
      </div>

      {/* Top Bar: Search and Tools */}
      {!isUIMinimized && (
        <div className="flex justify-between items-start w-full">
          {/* Tools Panel */}
          <div className="flex flex-col gap-2 pointer-events-auto">
            <div className="glass-panel p-2 flex flex-col gap-2">
              <button 
                onClick={() => {
                  setPartsListOpen(!isPartsListOpen);
                  if (isRegionsOpen) setIsRegionsOpen(false);
                }}
                className={`p-3 rounded-lg transition-colors flex items-center gap-2 ${isPartsListOpen ? 'bg-white/20 text-white' : 'text-white/70 hover:text-white hover:bg-white/10'}`}
                title="Parts List"
              >
                <List size={20} />
                <span className="text-sm hidden md:inline">Parts List</span>
              </button>

              <button 
                onClick={() => {
                  setIsRegionsOpen(!isRegionsOpen);
                  if (isPartsListOpen) setPartsListOpen(false);
                }}
                className={`p-3 rounded-lg transition-colors flex items-center gap-2 ${isRegionsOpen ? 'bg-white/20 text-white' : 'text-white/70 hover:text-white hover:bg-white/10'}`}
                title="Regions Selector"
              >
                <Box size={20} />
                <span className="text-sm hidden md:inline">Brain Regions</span>
              </button>
              
              <div className="h-px bg-white/10 my-1 mx-2" />
              
              <button 
                onClick={() => triggerZoomIn()}
                className="p-3 rounded-lg transition-colors flex items-center gap-2 text-white/70 hover:text-white hover:bg-white/10"
                title="Zoom In"
              >
                <Plus size={20} />
                <span className="text-sm hidden md:inline">Zoom In</span>
              </button>
              <button 
                onClick={() => triggerZoomOut()}
                className="p-3 rounded-lg transition-colors flex items-center gap-2 text-white/70 hover:text-white hover:bg-white/10"
                title="Zoom Out"
              >
                <Minus size={20} />
                <span className="text-sm hidden md:inline">Zoom Out</span>
              </button>

              <div className="h-px bg-white/10 my-1 mx-2" />

              <button 
                onClick={() => setAutoRotate(!autoRotate)}
              className={`p-3 rounded-lg transition-colors flex items-center gap-2 ${autoRotate ? 'bg-white/20 text-white' : 'text-white/70 hover:text-white hover:bg-white/10'}`}
              title="Toggle Auto-Rotate"
            >
              <RotateCw size={20} />
              <span className="text-sm hidden md:inline">Auto-Rotate</span>
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
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-xs text-white/70">Outer Transparency</label>
              </div>
              <input
                type="range"
                min="0"
                max="1"
                step="0.5"
                value={1 - transparencyLevel}
                onChange={(e) => setTransparencyLevel(1 - parseFloat(e.target.value))}
                className="w-full h-1.5 bg-white/20 rounded-lg appearance-none cursor-pointer"
              />
            </div>
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-xs text-white/70">
                  Slice Plane ({!activeSliceAxis ? 'None' : activeSliceAxis === 'x' ? 'Sagittal' : activeSliceAxis === 'y' ? 'Horizontal' : 'Coronal'})
                </label>
                <span className="text-xs text-white/50">
                  {!activeSliceAxis ? 'Off' : 
                   activeSliceAxis === 'x' ? (sliceX < 29 ? 'Active' : 'Ready') : 
                   activeSliceAxis === 'y' ? (sliceY < 29 ? 'Active' : 'Ready') : 
                   (sliceZ < 29 ? 'Active' : 'Ready')}
                </span>
              </div>
              
              {activeSliceAxis && (
                <input
                  type="range"
                  min="0"
                  max="60"
                  step="0.1"
                  value={
                    activeSliceAxis === 'x' 
                      ? Math.max(0, Math.min(60, 30 - sliceX)) 
                      : activeSliceAxis === 'y' 
                      ? Math.max(0, Math.min(60, 30 - sliceY)) 
                      : Math.max(0, Math.min(60, 30 - sliceZ))
                  }
                  onChange={(e) => {
                    const progress = parseFloat(e.target.value);
                    const clipConstant = 30 - progress;
                    if (activeSliceAxis === 'x') setSliceX(clipConstant);
                    else if (activeSliceAxis === 'y') setSliceY(clipConstant);
                    else setSliceZ(clipConstant);
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
                      setSliceX(30);
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
                      setSliceY(30);
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
                      setSliceZ(30);
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
      </div>
      )}

      {/* Bottom/Side Panel: Selected Part Info */}
      <AnimatePresence>
        {!isUIMinimized && selectedPart && partSetting && partInfo && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="absolute bottom-20 md:bottom-24 right-6 md:right-12 w-80 md:w-96 max-h-[calc(100vh-220px)] md:max-h-[calc(100vh-280px)] pointer-events-auto z-40 flex flex-col"
          >
            <div className="glass-panel p-5 relative overflow-hidden flex flex-col max-h-full">
              {/* Background accent */}
              <div className="absolute -top-10 -right-10 w-32 h-32 bg-white/10 rounded-full blur-3xl pointer-events-none" />
              
              {/* Header: Title and Close button - Non-scrollable */}
              <div className="flex items-center justify-between gap-3 mb-4 shrink-0 pr-6 border-b border-white/5 pb-3">
                <div className="flex items-center gap-2.5">
                  <div className="p-2 rounded-lg bg-white/10 border border-white/20 shrink-0">
                    <Info size={18} className="text-white" />
                  </div>
                  <h3 className="text-lg md:text-xl font-serif capitalize text-white truncate max-w-[180px] md:max-w-[240px]" title={partSetting.customName}>
                    {partSetting.customName}
                  </h3>
                </div>
                <button 
                  onClick={() => setSelectedPart(null)}
                  className="absolute top-4 right-4 text-white/40 hover:text-white transition-colors z-10 p-1 rounded-full hover:bg-white/5"
                >
                  <X size={18} />
                </button>
              </div>
              
              {/* Content Area - Scrollable */}
              <div className="flex-1 overflow-y-auto pr-1 space-y-4">
                <p className="text-xs md:text-sm text-white/70 leading-relaxed">
                  {partInfo.description}
                </p>

                {partInfo.mainFunction && (
                  <div className="p-3 rounded-lg bg-white/5 border border-white/10">
                    <h4 className="text-[10px] uppercase tracking-widest text-white/40 mb-1 font-semibold">Main Function</h4>
                    <p className="text-xs md:text-sm text-white font-medium italic">"{partInfo.mainFunction}"</p>
                  </div>
                )}
                
                <div>
                  <h4 className="text-[10px] md:text-xs uppercase tracking-widest text-white/40 mb-2.5 font-semibold">Associated Functions</h4>
                  <div className="flex flex-wrap gap-2">
                    {partInfo.functions.map((func, i) => (
                      <span 
                        key={i} 
                        className="text-[11px] px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-white/80 hover:bg-white/10 transition-colors"
                      >
                        {func}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Parts List Sidebar */}
      <AnimatePresence>
        {!isUIMinimized && isPartsListOpen && (
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="absolute top-24 md:top-28 left-6 md:left-12 bottom-6 w-80 glass-panel flex flex-col overflow-hidden pointer-events-auto z-50"
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
                .filter(([id]) => !blacklist.includes(id))
                .filter(([id, setting]) => {
                  // Only show parts that don't match their ID (meaning they have a proper name)
                  // This is a safety check in case extra parts leaked into the settings
                  const isUnnamed = id.replace('.glb', '') === setting.customName;
                  return !isUnnamed && (
                    (setting.customName || '').toLowerCase().includes(partsListSearch.toLowerCase()) || 
                    id.toLowerCase().includes(partsListSearch.toLowerCase())
                  );
                })
                .map(([id, setting]) => (
                <div 
                  key={id} 
                  onClick={() => setSelectedPart(id === selectedPart ? null : id)}
                  className={`flex items-center gap-2 p-2 rounded cursor-pointer transition-all hover:bg-white/5 ${selectedPart === id ? 'bg-white/10 border-l-2 border-amber-500/50 pl-3' : 'pl-2'}`}
                >
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      setPartSetting(id, { visible: !setting.visible });
                    }}
                    className="text-white/50 hover:text-white shrink-0"
                    title={setting.visible ? "Hide part" : "Show part"}
                  >
                    {setting.visible ? <Eye size={16} /> : <EyeOff size={16} className="text-red-400" />}
                  </button>
                  <span className="text-sm py-1 w-full truncate text-white/95 font-medium select-none">
                    {setting.customName}
                  </span>
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      const nextFocused = id === focusedPart ? null : id;
                      setFocusedPart(nextFocused);
                      if (nextFocused) {
                        setFadeUnselected(true);
                      }
                    }}
                    className={`p-1 rounded shrink-0 ${focusedPart === id ? 'text-white bg-amber-500/25' : 'text-white/30 hover:text-white hover:bg-white/10'}`}
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

      {/* Regions Sidebar */}
      <AnimatePresence>
        {!isUIMinimized && isRegionsOpen && (
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="absolute top-24 md:top-28 left-6 md:left-12 bottom-6 w-80 glass-panel flex flex-col overflow-hidden pointer-events-auto z-50"
          >
            <div className="p-4 border-b border-white/10 flex justify-between items-center bg-black/40">
              <h3 className="font-semibold">Brain Regions</h3>
              <button onClick={() => setIsRegionsOpen(false)} className="text-white/50 hover:text-white">
                <X size={18} />
              </button>
            </div>
            
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              <p className="text-xs text-white/40 mb-4 px-1 italic">
                Select a region to isolate its structural components. Unselected areas will be faded out.
              </p>
              
              {Object.entries(regionsMap).map(([key, region]) => (
                <button
                  key={key}
                  onClick={() => setActiveRegion(activeRegion === key ? null : key)}
                  className={`w-full text-left p-4 rounded-xl border transition-all ${
                    activeRegion === key 
                    ? 'bg-white text-black border-white shadow-lg scale-[1.02]' 
                    : 'bg-white/5 border-white/10 text-white/80 hover:bg-white/10 hover:border-white/20'
                  }`}
                >
                  <div className="flex justify-between items-start mb-1">
                    <span className={`text-[10px] uppercase tracking-widest font-bold ${activeRegion === key ? 'text-black/60' : 'text-white/40'}`}>
                      Structure
                    </span>
                    {activeRegion === key && <Sparkles size={14} className="text-amber-500" />}
                  </div>
                  <div className="text-lg font-serif">{region.title}</div>
                  <div className={`text-[10px] mt-2 ${activeRegion === key ? 'text-black/40' : 'text-white/30'}`}>
                    {region.partIds.length} parts included
                  </div>
                </button>
              ))}

              {activeRegion && (
                <button
                  onClick={() => setActiveRegion(null)}
                  className="w-full py-3 mt-6 text-sm text-center text-white/50 hover:text-white border border-dashed border-white/10 rounded-lg hover:bg-white/5 transition-all"
                >
                  Clear Selection
                </button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Metal Mode Toggle (Bottom Right) */}
      {!isUIMinimized && (
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
      )}

      {/* Tooltip on Hover */}
      <AnimatePresence>
        {hoveredPart && (() => {
          const hoveredSetting = partSettings[hoveredPart];
          const hoveredName = hoveredSetting?.customName || hoveredPart.replace('.glb', '').replace(/[\_\.]/g, ' ');
          const hoveredInfo = getPartInfo(hoveredName);
          return (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.12 }}
              style={{
                position: 'fixed',
                left: mousePos.x + 20,
                top: mousePos.y + 20,
              }}
              className="pointer-events-none z-[100] px-4 py-3 glass-panel select-none rounded-xl shadow-[inset_0_1px_3px_rgba(255,255,255,0.25),0_12px_40px_rgba(0,0,0,0.85)] border border-white/20 flex flex-col gap-1.5 backdrop-blur-2xl bg-[#09090b]/85 max-w-[280px]"
            >
              <div className="flex items-center gap-1.5">
                <div className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                <span className="text-xs font-bold text-white tracking-wide font-sans capitalize line-clamp-1">
                  {hoveredName}
                </span>
              </div>
              {hoveredInfo?.mainFunction && (
                <p className="text-[10px] text-white/60 leading-relaxed italic border-t border-white/5 pt-1.5 font-medium">
                  "{hoveredInfo.mainFunction}"
                </p>
              )}
              <div className="text-[8px] uppercase tracking-widest text-white/30 font-semibold font-mono mt-0.5">
                Click to explore parts in detail
              </div>
            </motion.div>
          );
        })()}
      </AnimatePresence>
    </div>
  );
}
