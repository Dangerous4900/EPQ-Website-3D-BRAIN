# Brain Atlas Project Guidelines

This file serves as a reference for the project's state. The user has declared the state as of May 7th, 2026, as the "og" (original) state. If the user requests to "revert to og", please restore the application to match the logic described here.

## The "og" State (Checkpoint: May 7th, 2026)

### 1. Functional Features
- **Zoom Controls:** Plus/Minus buttons in the left toolbar.
- **Minimize UI:** Toggle button in the top right to hide all panels for an unobstructed view.
- **Improved Tutorial:** A 10-step guide explaining all features including Metal Effects, Zoom, and Slicing.
- **Auto-Rotate, 3D Mesh, Explode, Fade:** Core visualization tools in the main toolbar.
- **Slicing:** Sagittal, Horizontal, and Coronal cross-sections.

### 2. Brain Part Classification Logic

#### **Outer / Transparent Parts** (Affected by Outer Transparency slider)
- **Lobe Prefix Whitelist:**
    - Frontal Lobe (`1.1.1.`)
    - Parietal Lobe (`1.1.2.`)
    - Occipital Lobe (`1.1.3.`)
    - Temporal Lobe (`1.1.4.`)
    - Cerebellum (`2.`)
    - Outer Regions (`1.1.6.*`, `1.1.7.*`, `1.1.8.*`, `1.1.9.*`, `1.1.10.*`)
- **Specific Removals from Inner (Now Transparent Outer):**
    - `7.2.1.2.0`, `7.2.2.0.0`
    - `7.3.0.0.0` (Fourth Ventricle)
    - Middle cerebellar peduncles (`9.2.0.0.0`)
    - Medulla oblongata / Pyramid / Olive (`4.1.0.0.0`, `4.1.1.0.0`, `4.1.2.0.0`, `3.2.0.0.0`)
    - Brain stem : Pons (`4.3.0.0.0`)
    - Corpus Callosum (`9.1.0.0.0`, `9.3.0.0.0`)
    - Optic system parts (`6.12.0.0.0`)

#### **Inner / Subcortical / Solid Parts** (Remain opaque/solid)
- **Primary Inner Prefixes:** `3.*`, `4.*`, `5.*`, `6.*`, `7.*`, `9.*`, `0.*` (excluding the transparent list above).
- **Specific Solid Whitelist:**
    - Corpus Callosum (`1.1.5.1.0`, `1.1.5.2.*`)
    - Anterior limb (`1.1.5.3.1`)
    - Genu (`1.1.5.3.2`)
    - Posterior limb (`1.1.5.3.3`)
    - Claustrum (`1.1.5.4.0`)
    - Dentate gyrus regions (`1.1.4.3.2`, `1.1.1.1.1`, `1.1.1.1.3`, `1.1.4.3.1`)
    - Hippocampus proper (`1.1.4.3.3`)
    - Parahippocampal gyrus (`1.1.1.1.2`)
    - Dentate nucleus (`2.4.1.4.0`), Fastigial nucleus (`2.4.1.1.0`), Globose nucleus (`2.4.1.2.0`), Emboliform nucleus (`2.4.1.3.0`)
    - Diencephalon: Subthalamus (`3.3.0.0.0`), Geniculate bodies (`3.4.6.0.0`, `3.4.7.0.0`), Mammillary bodies (`3.2.1.0.0`), Thalamic nuclei (`3.4.2.0.0`), Pineal gland (`3.1.1.0.0`), Habenula (`3.1.2.0.0`)
    - Fornix (`1.1.5.2.0`)
    - Mesencephalon: Red nucleus (`4.2.5.0.0`), Core components (`4.2.7.0.0`, `4.2.6.0.0`, `4.2.2.0.0`)
    - Specific regions: `1.1.6.4.1` (Caudate nucleus), `1.1.6.4.2.1` (Putamen), `1.1.6.4.2.2`, `1.1.6.4.2.3`, `1.1.10.0.0` (Nucleus accumbens)

#### **Renamed Parts (Checkpoint: May 11th, 2026 - Reverted to Descriptive Names)**
- `1.1.5.4.0` (Claustrum)
- `1.1.6.4.1` (Caudate nucleus)
- `1.1.6.4.2.1` (Putamen)
- `1.1.6.4.2.2` (Globus pallidus internal segment)
- `1.1.6.4.2.3` (Globus pallidus external segment)
- `5.2.0.0.0` (Lateral ventricles - was Putamen)
- `5.2.2.0.0` (Lateral ventricles : Body)
- `1.1.1.1.2` (Parahippocampal gyrus)
- `1.1.4.3.3` (Hippocampus proper)
- `1.1.4.3.2` (Dentate gyrus)
- `1.1.4.3.1` (Subiculum)
- `1.1.10.0.0` (Nucleus accumbens)
- `1.1.5.1.0` (Corpus Callosum - was Cingulate Gyrus)
- `3.1.1.0.0` (Pineal gland)
- `3.1.2.0.0` (Habenula)
- `5.4.0.0.0` (Cerebral aqueduct)
- `4.2.6.0.0` (Superior colliculus)
- `4.2.7.0.0` (Inferior colliculus)
- `4.2.2.0.0` (Pretectal area)
- `5.1.0.0.0` -> fourth ventricle
- `5.1.1.0.0` -> Rhomboid fossa
- `4.7.0.0.0` -> Cuneate nucleus
- `4.6.0.0.0` -> Gracile nucleus
- `4.3.1.0.0` -> locus coeruleus
- `5.3.0.0.0` -> Third ventricle
- `3.4.5.0.0` -> Ventral posterolateral nucleus
- `3.4.4.0.0` -> Dorsomedial nucleus
- `3.4.3.0.0` -> Ventral anterior nucleus
- `3.4.0.0.0` -> Thalamus
- `1.1.5.3.3` -> Posterior limb (formerly Subiculum)
- `1.1.5.3.2` -> Genu (formerly Amygdala)
- `1.1.5.3.1` -> Anterior limb (formerly Hippocampus)

#### **Blacklisted / Removed Parts** (Completely hidden)
- Insular Cortex (`1.1.5.0.0`)
- Frontal lobe regions: `1.1.7.0.0`, `1.1.8.0.0`
- Hypothalamus / Cerebral peduncles: `4.0.0.0.0`, `4.2.0.0.0`
- `4.3.2.0.0`, `5.5.6.0.0`
- Third Ventricle (`7.2.1.0.0`)
- Lateral Ventricles (`7.1.1.0.0`, `7.1.2.0.0`)
- Sub-parts: `1.1.5.5.0`, `4.8.1.0.0`, `4.8.2.0.0`, `7.2.1.1.0`, `4.8.3.0.0`
- Ventricular system: `7.2.2.0.0`, `7.2.1.2.0`
- Frontal regions: `1.1.1.8.0` (Orbitofrontal Cortex), `1.1.1.7.0` (Inferior Frontal Gyrus)
- Occipital system: `1.1.3.3.0`, `6.12.0.0.0`

## Reverting to "Perfect" or "OG"
If the user says "revert to perfect", restore the application to match the "Perfect" state (Checkpoint: May 12th, 2026).
If the user says "revert to og", restore the application to match the "og" state (Checkpoint: May 7th, 2026).

## The "Perfect" State (Checkpoint: May 12th, 2026)

### 1. Functional Features
- **Regions Selector:** A sidebar in the main toolbar allows users to isolate specific structural regions (Cerebral Cortex, Limbic System, etc.).
- **Interactive Isolation:** When a region is active, only the parts within that region can be hovered or clicked. Other parts are faded and non-interactive.
- **Main Function Info:** Each brain part's info panel now includes a "Main Function" summary in addition to its description and list of associated functions.
- **Removed Search regions... Bar:** The top-right search input has been removed in favor of the Regions Selector and Parts List.

### 2. Revised Blacklist / Removed
- **Auditory Region Removed:** `1.1.4.6.1.glb` is explicitly removed from all views/lists.
- **3D Mesh Removed:** The 3D Mesh toggle has been removed from the toolbar.

### 3. Navigation Controls
- Zoom In/Out, Auto-Rotate, Explode View, Fade Others (unselected parts), Reset View, and Export GLB remain as core features.
- Slice views (Horizontal, Sagittal, Coronal) remain functional.
