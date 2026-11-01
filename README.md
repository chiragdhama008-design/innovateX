# PlasticGuard – AI-Powered Coastal Plastic Pollution Monitoring & Prevention Platform

> **"Detect. Predict. Prevent. Protect our Oceans."**

Developed for **Techfest IIT Bombay – InnovateX**  
**Theme 3:** Rising Plastic Pollution in Coastal Cities (Focus: Mumbai Megacity)

---

## 🌊 Overview

**PlasticGuard** is an intelligent environmental monitoring and prevention platform built to tackle coastal plastic pollution at its origin: urban drainage canals, river systems, and coastal mangrove creeks before plastic waste washes into the open Arabian Sea.

Rather than relying on reactive and expensive post-beachfall cleanups, PlasticGuard deploys a synchronized pipeline of:
1. **Multi-Modal Visual Telemetry**: IoT flow sensors, autonomous drone patrols, and culvert smart cameras.
2. **AI Neural Polymer Classifier**: Fast optical classification detecting PET single-use bottles, multi-layer metallized sachets, HDPE containers, polystyrene, and abandoned fishing nets.
3. **Hydrodynamic Risk Simulator**: Forecasting plastic congestion choke points and ocean wash-out windows based on monsoon rainfall intensity (mm/hr) and Arabian Sea tidal heights.
4. **Municipal Task Dispatch**: Direct orchestration of Brihanmumbai Municipal Corporation (BMC) storm water crews and volunteer skimmers.

---

## 🚀 Key Features & Modules

### 1. Landing Page
- High-impact environmental intelligence branding with realistic Mumbai coastal drone imagery.
- Live telemetry counters (148.5 MT monitored, 42 hotspots tracked, 128.2 MT diverted).
- Clear problem vs. solution breakdown highlighting Mumbai's monsoon outflow dynamics.
- 4-step pipeline explanation and direct navigation to all modules.

### 2. Main Environmental Dashboard
- **5 Core KPI Cards**: Total Hotspots, Critical Interventions, Estimated Detected Waste, Diverted Tonnes, and Cleaning Operations Completed.
- **Interactive Recharts Visualizations**:
  - Plastic Waste Inflow vs Ocean Interception (Area Chart with gradient fill).
  - Waste Intercepted by Location (Mithi River, Mahim Creek, Versova Beach, Malad Creek, Sassoon Docks).
  - Monthly Pollution Trends correlated with Monsoon Rainfall Factors.
  - Polymer Fingerprint Distribution (PET, LDPE, HDPE, Nets, Thermocol).
- Live critical telemetry alert feed with direct inspection links.

### 3. Interactive Mumbai Coastal Map (Leaflet + OpenStreetMap)
- Centered on Mumbai's vulnerable coastal waterways:
  - Mithi River BKC Sluice Confluence
  - Mahim Creek Mangrove Estuary
  - Malad Creek & Marve Mangroves
  - Versova Beach Interceptor Outfall
  - Gorai Creek Drainage Outfall
  - Juhu Koliwada Storm Drain
  - Haji Ali Coastal Bay
  - Sassoon Docks Fisheries Outfall
  - Thane Creek Mangrove Sanctuary
  - Worli Seaface Storm Culvert
- Color-coded severity markers (Red = Critical, Orange = High, Yellow = Moderate, Green = Low).
- Marker click opens a rich slide-over drawer showing real hotspot photos, estimated waste tonnage, culvert blockage indices, tidal currents, and a one-click **"Dispatch Clean-up Task"** button.

### 4. AI Computer Vision Lab
- Drag-and-drop or upload custom coastal/drainage photographs.
- 4 instant sample presets:
  - *Mithi River Culvert (Critical Accumulation)*
  - *Mahim Creek Mangrove (Entangled LDPE films)*
  - *Versova Beach Interceptor (Marine Debris & Discarded Nets)*
  - *Marine Drive Seawall (Clean Baseline Reference)*
- Radar laser scanning line animation.
- Simulated YOLOv8 + ResNet-50 bounding box overlay with confidence scores.
- Polymer classification breakdown and urgent cleanup recommendations.
- Direct **"Dispatch Clean-up Task"** action from AI detection results.

### 5. AI Hydrodynamic Risk Predictor
- Interactive environmental simulation sliders:
  - **Monsoon Rainfall Intensity**: 0 mm/h to 120 mm/h (Torrential Deluge).
  - **Arabian Sea Tidal Height**: 1.0m (Neap Low) to 5.0m (Spring King Tide).
  - **Sluice Gate Status**: Clear vs. Debris Clogged.
- Dynamically recalculates risk scores, accumulation probability, and hours until uncontrolled ocean discharge for each coastal zone in real time.
- **"Broadcast Early Warning to BMC Wards"** emergency dispatch trigger.

### 6. Municipal Waste Action & Dispatch Centre
- Comprehensive operational task board with status filtering (Pending, In Progress, Completed).
- Interactive status updates:
  - Click **"Start Operation"** to move a task to *In Progress*.
  - Click **"Complete & Log Weight"** to enter certified diverted waste tonnage.
- Interactive modal to dispatch new cleanup crews with equipment assignments.

### 7. Reports & Analytics
- Environmental impact summary metrics (348.5 MT Diverted, 18,400+ Marine Fauna Saved, 14.8 sq. km Mangroves Protected).
- Real downloadable **CSV Audit Dataset Export**.
- Printable Environmental Audit Summary (compatible with browser print-to-PDF).
- Tabular records preview of all audited coastal monitoring stations.

### 8. Citizen & Field Debris Reporting
- Top navigation button to report unmonitored plastic accumulation directly into the live map.

---

## 🛠️ Technology Stack

- **Frontend:** React 19 + TypeScript + Vite
- **Styling:** Tailwind CSS v4 + Vanilla CSS Design Tokens (Glassmorphism, custom radar animations)
- **Geospatial Mapping:** Leaflet + OpenStreetMap (CartoDB Dark Matter)
- **Data Visualizations:** Recharts (Area, Bar, Composed, Pie Charts)
- **Icons:** Lucide React
- **Typography:** Google Fonts (*Outfit*, *Plus Jakarta Sans*, *JetBrains Mono*)

---

## 💻 Running Locally

```bash
# 1. Install dependencies
npm install

# 2. Start the local development server
npm run dev

# 3. Open in your browser
http://localhost:5173/
```

To build for production:
```bash
npm run build
```
