import React from 'react';
import { 
  Layers, 
  Maximize2, 
  Cpu, 
  Database, 
  Workflow, 
  Zap, 
  Activity, 
  Thermometer 
} from 'lucide-react';

// Static asset imports for clinical specification images
import brainSingleTopView from '../../assets/images/brain_single_top_view_1780236976056.png';
import corpusCallosumImg from '../../assets/images/corpus_callosum_enhanced_1780232848493.png';
import fluidDiagramImg from '../../assets/images/fluid_diagram_1780229302136.png';
import neuronCellMonochrome from '../../assets/images/neuron_cell_monochrome_1780234505571.png';
import synapticMatrixImg from '../../assets/images/synaptic_matrix_1780229335965.png';
import bloodFlowImg from '../../assets/images/blood_flow_1780229352808.png';
import myelinAxonBranching from '../../assets/images/myelin_axon_branching_1780234523986.png';
import volumeCubeImg from '../../assets/images/volume_cube_1780229384091.png';

export interface SpecItem {
  key: string;
  val: string;
}

export interface SpecCategory {
  title: string;
  subtitle: string;
  icon: React.ReactNode;
  scanId: string;
  image: string;
  specs: SpecItem[];
}

export const specsCategories: SpecCategory[] = [
  {
    title: "PHYSICAL HOUSING & CHASSIS",
    subtitle: "The anatomical external matrix of human cognition",
    icon: <Layers size={18} className="text-white/70" />,
    scanId: "HOUSING_SCAN_01",
    image: brainSingleTopView,
    specs: [
      { key: "Model ID", val: "Homo sapiens brain (adult, neurotypical)" },
      { key: "Origin / Release", val: "~250,500–300,000 years ago (species debut)" },
      { key: "Form Factor", val: "Bilateral cerebral hemispheres with folded neocortex (gyri & sulci)" },
      { key: "Chassis Weight", val: "≈ 1.2 – 1.5 kg (avg. adult)" },
      { key: "Body Mass Ratio", val: "≈ 2.0% of total anatomical weight" }
    ]
  },
  {
    title: "COGNITIVE VOLUME & SPACE",
    subtitle: "Three-dimensional volume boundaries and mass footprint",
    icon: <Maximize2 size={18} className="text-white/70" />,
    scanId: "VOLUME_BOUNDS_02",
    image: volumeCubeImg,
    specs: [
      { key: "Internal Volume", val: "≈ 1,100 – 1,400 cm³" },
      { key: "Density Range", val: "1.03 - 1.05 g/cm³" },
      { key: "Spatial Enclosure", val: "Cranial vault / Neurocranium matrix" },
      { key: "Surface Area", val: "≈ 2,000 - 2,400 cm² (fully unpleated)" },
      { key: "Mass Density Ratio", val: "Optimized spatial packing factor within cranial shell" }
    ]
  },
  {
    title: "CENTRAL PROCESSING CORE (CPU)",
    subtitle: "The massively asynchronous cognitive processor engine",
    icon: <Cpu size={18} className="text-white/70" />,
    scanId: "PROCESSOR_GRID_03",
    image: neuronCellMonochrome,
    specs: [
      { key: "CPU Capacity", val: "≈ 86,000,000,000 discrete biological neurons" },
      { key: "Support Infrastructure", val: "Glia matrix ≈ 1:1 ratio (myelin, astrocytes, microglia)" },
      { key: "Architectural Cores", val: "Excitatory projection units (70–80%), Inhibitory gating (20–30%)" },
      { key: "Clock Engine", val: "Fully parallel, asynchronous, event-driven (no central clock cycle)" },
      { key: "Peak Firing Threshold", val: "Individual neuron thresholds peak ≈ 200 Hz (idle/base: 1-20 Hz)" }
    ]
  },
  {
    title: "ASSOCIATIVE MEMORY MATRIX",
    subtitle: "Distributed plastic synaptic storage pathways",
    icon: <Database size={18} className="text-white/70" />,
    scanId: "STORAGE_ARRAY_04",
    image: synapticMatrixImg,
    specs: [
      { key: "Long-Term Capacity", val: "Nearly infinite, high-capacity distributed associative storage" },
      { key: "Cache Buffer (L1)", val: "≈ 4 ± 1 items concurrently cached (Working memory limit)" },
      { key: "Storage Method", val: "Weighted plastic synaptic coefficients across complex networks" },
      { key: "Consolidation Retain", val: "Seconds to multi-decades, reinforced via long-term potentiation" },
      { key: "Dynamic Erasure", val: "Active garbage collection and synaptic pruning during sleep" }
    ]
  },
  {
    title: "INTERCONNECTS & SYSTEM BUS",
    subtitle: "Bilateral communications crossing the main hemispheric bridge",
    icon: <Workflow size={18} className="text-white/70" />,
    scanId: "INTERCONNECT_BUS_05",
    image: corpusCallosumImg,
    specs: [
      { key: "System Bus Link", val: "Corpus Callosum (~200 million myelinated axonal circuit fibers)" },
      { key: "Interhemispheric Rate", val: "Asynchronous parallel duplex crossing of motor and cognitive signals" },
      { key: "Signal Latency", val: "≈ 5.0 - 25.0 ms propagation delays across distant regions" },
      { key: "Max Cable Length", val: "Myelinated projection pathways extending up to 15.0 cm inside skull" },
      { key: "Fiber Bandwidth", val: "High concurrent traffic capacity with low crossover noise" }
    ]
  },
  {
    title: "HIGH-SPEED SIGNAL COOPERATION",
    subtitle: "Rapid signal propagation, saltatory myelin conduction",
    icon: <Zap size={18} className="text-white/70" />,
    scanId: "MYELIN_CONDUCTION_06",
    image: myelinAxonBranching,
    specs: [
      { key: "Propagation Velocity", val: "Saltatory conduction peaks ≈ 100 - 120 m/s inside pathways" },
      { key: "Insulation Matrix", val: "Multilayered myelin sheath wrapping from glial helper cells" },
      { key: "Signal Modulation", val: "Periodic nodes of Ranvier reinforcing electrical wave membrane potentials" },
      { key: "Signal Quality", val: "Highly isolated, low loss transmission over long-range axonal buses" },
      { key: "Tract Density", val: "Bundled white matter structures securing cross-hemispheric signaling" }
    ]
  },
  {
    title: "CRANIAL BLOOD FLOW & METABOLISM",
    subtitle: "Continuous vascular oxygenation & arterial perfusion",
    icon: <Activity size={18} className="text-white/70" />,
    scanId: "VASCULAR_NETWORK_07",
    image: bloodFlowImg,
    specs: [
      { key: "Perfusion Target", val: "Continuous supply of glucose fuel & high oxygen levels" },
      { key: "Circulation Ingress", val: "Internal carotid & vertebral arteries merging into Circle of Willis" },
      { key: "Resource Allocation", val: "≈ 20% of total resting metabolic footprint (~20-25 Watts peak)" },
      { key: "Vascular Grid Length", val: "≈ 600 kilometers of highly dense cerebral blood capillaries" },
      { key: "Arterial Regulation", val: "Local microvascular dilation matching regional brain activation" }
    ]
  },
  {
    title: "SUSTAINABILITY & CSF COOLING",
    subtitle: "Active cerebrospinal fluid sweeps and garbage clearance",
    icon: <Thermometer size={18} className="text-white/70" />,
    scanId: "COOLING_THERMAL_08",
    image: fluidDiagramImg,
    specs: [
      { key: "Active Power Draw", val: "Constant draw of 20 - 25 Watts supporting complex neural fire grids" },
      { key: "Convective Cooling", val: "Active cerebrospinal fluid (CSF) flow circulation through ventricular cavities" },
      { key: "Garbage Collect", val: "Sleep-state glymphatic sweep removing metabolic macromolecule slag" },
      { key: "System Lifecycle", val: "Maintained for average 75+ years with continuous adaptive repair" },
      { key: "Expansion Capacity", val: "Dynamic neural reweighting via learning experience and neuroplasticity" }
    ]
  }
];
