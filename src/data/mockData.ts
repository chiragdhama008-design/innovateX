import { Hotspot, CleanupTask, DetectionResult, RiskPrediction } from '../types';

export const INITIAL_HOTSPOTS: Hotspot[] = [
  {
    id: 'hs-01',
    name: 'Mithi River - BKC Sluice Confluence',
    zone: 'Central Suburbs (Ward L/H-East)',
    type: 'river',
    coordinates: [19.0558, 72.8423],
    severity: 'critical',
    estimatedWasteTonnes: 5.8,
    lastReported: '14 mins ago',
    telemetrySource: 'Drone Vision Cam #04 + Creek In-situ Flow Sensor',
    image: '/images/mithi-debris.jpg',
    polymerBreakdown: {
      petBottles: 42,
      multilayerSachets: 31,
      hdpeContainers: 14,
      fishingGear: 4,
      thermocolFoam: 9
    },
    tidalVelocity: '1.8 m/s (Ebb Tide)',
    blockageIndex: 88,
    recommendedAction: 'Immediate deployment of hydraulic boom and amphibious excavator at BKC culvert.',
    nearestWard: 'Ward H-East (Kalanagar)',
    activeBarrierInstalled: true
  },
  {
    id: 'hs-02',
    name: 'Mahim Creek Mangrove Estuary',
    zone: 'Island City Boundary (Ward G-North)',
    type: 'creek',
    coordinates: [19.0384, 72.8398],
    severity: 'critical',
    estimatedWasteTonnes: 4.2,
    lastReported: '32 mins ago',
    telemetrySource: 'Creek Sentinel IoT Debris Sonar #02',
    image: '/images/mangrove-debris.jpg',
    polymerBreakdown: {
      petBottles: 35,
      multilayerSachets: 38,
      hdpeContainers: 12,
      fishingGear: 6,
      thermocolFoam: 9
    },
    tidalVelocity: '2.1 m/s (Outgoing)',
    blockageIndex: 81,
    recommendedAction: 'Deploy surface skim vessel; manual crew dispatch to prevent mangrove root entrapment.',
    nearestWard: 'Ward G-North (Dharavi/Mahim)',
    activeBarrierInstalled: false
  },
  {
    id: 'hs-03',
    name: 'Malad Creek & Marve Mangroves',
    zone: 'Western Suburbs (Ward P-North)',
    type: 'creek',
    coordinates: [19.1834, 72.8126],
    severity: 'high',
    estimatedWasteTonnes: 3.6,
    lastReported: '1 hour ago',
    telemetrySource: 'Coastal Patrol Drone Unit 2',
    image: '/images/mangrove-debris.jpg',
    polymerBreakdown: {
      petBottles: 38,
      multilayerSachets: 29,
      hdpeContainers: 16,
      fishingGear: 11,
      thermocolFoam: 6
    },
    tidalVelocity: '1.2 m/s',
    blockageIndex: 72,
    recommendedAction: 'Reinforce floating containment netting before high tide transition.',
    nearestWard: 'Ward P-North (Malad West)',
    activeBarrierInstalled: true
  },
  {
    id: 'hs-04',
    name: 'Versova Beach Interceptor Outfall',
    zone: 'Western Suburbs (Ward K-West)',
    type: 'beach',
    coordinates: [19.1352, 72.8142],
    severity: 'high',
    estimatedWasteTonnes: 3.1,
    lastReported: '2 hours ago',
    telemetrySource: 'Community Beach Guardian Network & Smart Cam',
    image: '/images/hero-coastal.jpg',
    polymerBreakdown: {
      petBottles: 28,
      multilayerSachets: 24,
      hdpeContainers: 15,
      fishingGear: 26,
      thermocolFoam: 7
    },
    tidalVelocity: '0.9 m/s',
    blockageIndex: 65,
    recommendedAction: 'Dispatch mechanical sand sifter and mobile barrier crew to intercept incoming tide.',
    nearestWard: 'Ward K-West (Andheri West)',
    activeBarrierInstalled: true
  },
  {
    id: 'hs-05',
    name: 'Gorai Creek Drainage Outfall',
    zone: 'Northern Suburbs (Ward R-Central)',
    type: 'creek',
    coordinates: [19.2312, 72.8055],
    severity: 'moderate',
    estimatedWasteTonnes: 2.1,
    lastReported: '3 hours ago',
    telemetrySource: 'Automated Water Quality & Debris Cam #09',
    image: '/images/mithi-debris.jpg',
    polymerBreakdown: {
      petBottles: 45,
      multilayerSachets: 28,
      hdpeContainers: 11,
      fishingGear: 8,
      thermocolFoam: 8
    },
    tidalVelocity: '0.7 m/s',
    blockageIndex: 44,
    recommendedAction: 'Scheduled routine clearance with trash collection barge.',
    nearestWard: 'Ward R-Central (Borivali West)',
    activeBarrierInstalled: false
  },
  {
    id: 'hs-06',
    name: 'Juhu Koliwada Storm Drain',
    zone: 'Western Suburbs (Ward K-West)',
    type: 'drain',
    coordinates: [19.0988, 72.8258],
    severity: 'moderate',
    estimatedWasteTonnes: 1.7,
    lastReported: '4 hours ago',
    telemetrySource: 'Municipal Culvert Sensor #14',
    image: '/images/mithi-debris.jpg',
    polymerBreakdown: {
      petBottles: 51,
      multilayerSachets: 32,
      hdpeContainers: 9,
      fishingGear: 3,
      thermocolFoam: 5
    },
    tidalVelocity: '0.5 m/s',
    blockageIndex: 39,
    recommendedAction: 'Flush culvert intake screen; collect accumulation at weir gate.',
    nearestWard: 'Ward K-West (Juhu)',
    activeBarrierInstalled: true
  },
  {
    id: 'hs-07',
    name: 'Haji Ali Coastal Bay',
    zone: 'South Mumbai (Ward D)',
    type: 'beach',
    coordinates: [18.9778, 72.8094],
    severity: 'moderate',
    estimatedWasteTonnes: 1.4,
    lastReported: '5 hours ago',
    telemetrySource: 'South Coast CCTV Analytics',
    image: '/images/hero-coastal.jpg',
    polymerBreakdown: {
      petBottles: 30,
      multilayerSachets: 40,
      hdpeContainers: 18,
      fishingGear: 5,
      thermocolFoam: 7
    },
    tidalVelocity: '0.6 m/s',
    blockageIndex: 32,
    recommendedAction: 'Clean-up crew manual sweep along rocky promenade embankment.',
    nearestWard: 'Ward D (Tardeo/Mahalaxmi)',
    activeBarrierInstalled: false
  },
  {
    id: 'hs-08',
    name: 'Sassoon Docks Fisheries Outfall',
    zone: 'South Mumbai (Ward A)',
    type: 'harbor',
    coordinates: [18.9135, 72.8256],
    severity: 'high',
    estimatedWasteTonnes: 2.9,
    lastReported: '6 hours ago',
    telemetrySource: 'Harbor Security & Drone Scan',
    image: '/images/mangrove-debris.jpg',
    polymerBreakdown: {
      petBottles: 18,
      multilayerSachets: 16,
      hdpeContainers: 21,
      fishingGear: 39,
      thermocolFoam: 6
    },
    tidalVelocity: '1.1 m/s',
    blockageIndex: 68,
    recommendedAction: 'Targeted recovery of ghost nets and industrial fishing polymer crates.',
    nearestWard: 'Ward A (Colaba)',
    activeBarrierInstalled: true
  },
  {
    id: 'hs-09',
    name: 'Worli Seaface Storm Culvert',
    zone: 'South Mumbai (Ward G-South)',
    type: 'drain',
    coordinates: [19.0125, 72.8166],
    severity: 'low',
    estimatedWasteTonnes: 0.6,
    lastReported: '7 hours ago',
    telemetrySource: 'Storm Water Drain Flow Telemetry',
    image: '/images/mithi-debris.jpg',
    polymerBreakdown: {
      petBottles: 35,
      multilayerSachets: 35,
      hdpeContainers: 10,
      fishingGear: 5,
      thermocolFoam: 15
    },
    tidalVelocity: '0.4 m/s',
    blockageIndex: 18,
    recommendedAction: 'Normal baseline. Routine preventive inspection scheduled.',
    nearestWard: 'Ward G-South (Worli)',
    activeBarrierInstalled: true
  },
  {
    id: 'hs-10',
    name: 'Thane Creek Mangrove Sanctuary Outfall',
    zone: 'Eastern Waterfront (Ward T)',
    type: 'creek',
    coordinates: [19.0889, 72.9567],
    severity: 'moderate',
    estimatedWasteTonnes: 2.3,
    lastReported: '8 hours ago',
    telemetrySource: 'Mangrove Cell Satellite & Drone Telemetry',
    image: '/images/mangrove-debris.jpg',
    polymerBreakdown: {
      petBottles: 41,
      multilayerSachets: 33,
      hdpeContainers: 12,
      fishingGear: 7,
      thermocolFoam: 7
    },
    tidalVelocity: '0.8 m/s',
    blockageIndex: 47,
    recommendedAction: 'Deploy shallow-draft barrier boats to collect trapped plastic along mudflats.',
    nearestWard: 'Ward T (Mulund / Bhandup)',
    activeBarrierInstalled: false
  }
];

export const INITIAL_TASKS: CleanupTask[] = [
  {
    id: 'task-101',
    title: 'Emergency Boom Clearing & Hydraulic Extraction',
    hotspotId: 'hs-01',
    locationName: 'Mithi River - BKC Sluice Confluence',
    assignedCrew: 'BMC Storm Drain Recovery Unit Alpha',
    priority: 'P1 - Critical',
    status: 'in_progress',
    targetDate: 'Today, 14:00 IST',
    estimatedTonnes: 5.8,
    divertedTonnes: 2.4,
    equipment: ['Hydraulic Excavator', 'Trash Skimmer Catamaran', 'Heavy-duty Boom'],
    notes: 'Urgent clearing needed before the 17:30 spring high tide to prevent overflow into Mahim Bay.',
    updatedAt: '25 mins ago'
  },
  {
    id: 'task-102',
    title: 'Mangrove Root Plastic Extraction & Skimming',
    hotspotId: 'hs-02',
    locationName: 'Mahim Creek Mangrove Estuary',
    assignedCrew: 'Versova Ocean Guardians & BMC Clean Squad',
    priority: 'P1 - Critical',
    status: 'pending',
    targetDate: 'Today, 16:30 IST',
    estimatedTonnes: 4.2,
    divertedTonnes: 0,
    equipment: ['Inflatable Rafts', 'Manual Debris Rakes', 'Sorting Tarpaulins'],
    notes: 'Heavy multi-layer packaging entangled in Avicennia mangrove breathing roots.',
    updatedAt: '45 mins ago'
  },
  {
    id: 'task-103',
    title: 'Ghost Net & Industrial Polymer Recovery',
    hotspotId: 'hs-08',
    locationName: 'Sassoon Docks Fisheries Outfall',
    assignedCrew: 'Harbor Coastal Clean Fleet',
    priority: 'P2 - High',
    status: 'in_progress',
    targetDate: 'Tomorrow, 09:00 IST',
    estimatedTonnes: 2.9,
    divertedTonnes: 1.1,
    equipment: ['Winch Crane Vessel', 'Polymer Shredder Mobile Unit'],
    notes: 'Submerged nylon monofilament nets posing critical threat to local harbor marine fauna.',
    updatedAt: '1 hour ago'
  },
  {
    id: 'task-104',
    title: 'Tidal Interception & Sand Sifting',
    hotspotId: 'hs-04',
    locationName: 'Versova Beach Interceptor Outfall',
    assignedCrew: 'Beach Clean Warriors NGO & Ward K-West',
    priority: 'P2 - High',
    status: 'completed',
    targetDate: 'Yesterday, 17:00 IST',
    estimatedTonnes: 3.1,
    divertedTonnes: 3.1,
    equipment: ['Beach Tractor Sifter', 'Trash Compactor'],
    notes: 'Successfully diverted 3.1 tonnes of washed-up ocean debris into recycling stream.',
    updatedAt: 'Yesterday'
  },
  {
    id: 'task-105',
    title: 'Culvert Screen Maintenance & Debris Flush',
    hotspotId: 'hs-06',
    locationName: 'Juhu Koliwada Storm Drain',
    assignedCrew: 'Ward K-West Drain Maintenance Team',
    priority: 'P3 - Medium',
    status: 'completed',
    targetDate: 'Yesterday, 12:00 IST',
    estimatedTonnes: 1.7,
    divertedTonnes: 1.7,
    equipment: ['High-Pressure Jet Vac Truck', 'Manual Screen Hoist'],
    notes: 'Culvert blockage index decreased from 78% to 39%. Water flow restored.',
    updatedAt: 'Yesterday'
  },
  {
    id: 'task-106',
    title: 'Estuary Containment Line Reinforcement',
    hotspotId: 'hs-03',
    locationName: 'Malad Creek & Marve Mangroves',
    assignedCrew: 'Northern Coastal Protection Unit',
    priority: 'P2 - High',
    status: 'pending',
    targetDate: 'Tomorrow, 11:00 IST',
    estimatedTonnes: 3.6,
    divertedTonnes: 0,
    equipment: ['Containment Boom Tender', 'Floating Bins'],
    notes: 'Monsoon surge predicted to wash urban runoff from Malad West into Marve inlet.',
    updatedAt: '3 hours ago'
  }
];

export const MOCK_DETECTIONS: Record<string, DetectionResult> = {
  mithi: {
    fileName: 'mithi_river_bkc_culvert_scan_04.jpg',
    imageUrl: '/images/mithi-debris.jpg',
    analyzedAt: 'Just now (Simulated Inference)',
    severity: 'critical',
    overallScore: 92,
    estimatedTonnes: 3.4,
    confidence: 0.94,
    detectedItems: [
      { label: 'PET Water Bottles (Bisleri/Kinley)', count: 184, percentage: 46 },
      { label: 'Multi-layer Metallized Sachets', count: 122, percentage: 31 },
      { label: 'Rigid HDPE Containers & Crates', count: 48, percentage: 12 },
      { label: 'Polystyrene / Thermocol Debris', count: 32, percentage: 8 },
      { label: 'Synthetic Nylon Cordage', count: 14, percentage: 3 }
    ],
    primaryPolymer: 'Polyethylene Terephthalate (PET Type 1) & Multi-layer Films',
    recommendedAction: 'URGENT: Deploy hydraulic trash boom within 2 hours. Severe risk of open sea discharge during incoming spring tide.',
    requiresUrgentIntervention: true,
    cleanlinessScore: 8
  },
  mangrove: {
    fileName: 'mahim_creek_mangrove_roots_inspection.jpg',
    imageUrl: '/images/mangrove-debris.jpg',
    analyzedAt: 'Just now (Simulated Inference)',
    severity: 'critical',
    overallScore: 86,
    estimatedTonnes: 2.7,
    confidence: 0.91,
    detectedItems: [
      { label: 'Thin Polyethylene Carry Bags (LDPE)', count: 210, percentage: 42 },
      { label: 'Food Packaging & Snack Wrappers', count: 165, percentage: 33 },
      { label: 'Single-Use Takeaway Containers', count: 65, percentage: 13 },
      { label: 'Discarded Netting Fragments', count: 35, percentage: 7 },
      { label: 'PET Beverage Bottles', count: 25, percentage: 5 }
    ],
    primaryPolymer: 'Low-Density Polyethylene (LDPE Type 4) & Multi-material Wrappers',
    recommendedAction: 'IMMEDIATE INTERVENTION: Mangrove pneumatophore root asphyxiation hazard. Deploy specialized manual eco-clean team.',
    requiresUrgentIntervention: true,
    cleanlinessScore: 14
  },
  beach: {
    fileName: 'versova_coastal_interceptor_aerial.jpg',
    imageUrl: '/images/hero-coastal.jpg',
    analyzedAt: 'Just now (Simulated Inference)',
    severity: 'high',
    overallScore: 74,
    estimatedTonnes: 1.9,
    confidence: 0.89,
    detectedItems: [
      { label: 'Marine Plastic Debris & Bottles', count: 140, percentage: 35 },
      { label: 'Commercial Monofilament Fishing Line', count: 104, percentage: 26 },
      { label: 'Rigid Caps & Microplastic Granules', count: 88, percentage: 22 },
      { label: 'Expanded Polystyrene Floats', count: 44, percentage: 11 },
      { label: 'FMCG Laminates', count: 24, percentage: 6 }
    ],
    primaryPolymer: 'Mixed Marine Debris (PET + Polyamide Fishing Gear)',
    recommendedAction: 'HIGH PRIORITY: Interceptor boom holding 82% capacity. Schedule trash collection barge before tidal reversal.',
    requiresUrgentIntervention: false,
    cleanlinessScore: 26
  },
  clean: {
    fileName: 'marine_drive_baseline_inspection.jpg',
    imageUrl: '/images/hero-coastal.jpg',
    analyzedAt: 'Just now (Simulated Inference)',
    severity: 'low',
    overallScore: 12,
    estimatedTonnes: 0.08,
    confidence: 0.96,
    detectedItems: [
      { label: 'Scattered Plastic Wrappers', count: 5, percentage: 62 },
      { label: 'Isolated Bottle Cap', count: 3, percentage: 38 }
    ],
    primaryPolymer: 'Incidental Litter',
    recommendedAction: 'ROUTINE MONITORING: Coastal boundary is clear. Baseline environmental telemetry within acceptable thresholds.',
    requiresUrgentIntervention: false,
    cleanlinessScore: 88
  }
};

export const RISK_LOCATIONS: RiskPrediction[] = [
  {
    locationId: 'pred-01',
    locationName: 'Mithi River Outfall at Mahim Bay',
    zone: 'Central Suburbs / Island City',
    waterwayType: 'river',
    coordinates: [19.0558, 72.8423],
    baseRisk: 88,
    currentRisk: 94,
    timeToOceanInflowHours: 1.8,
    riskLevel: 'Extreme',
    keyVulnerability: 'Uncontrolled monsoon surge flushing BKC & Kurla stormwater directly into Arabian Sea.',
    preventiveProtocols: [
      'Pre-deploy floating catamaran trash boom at Dharavi-Mahim bottleneck',
      'Lower sluice retention screens at Kurla junction',
      'Alert BMC Ward H-East rapid response watercraft'
    ],
    blockageRisk: 91
  },
  {
    locationId: 'pred-02',
    locationName: 'Mahim Creek Mangrove Estuary',
    zone: 'Island City Boundary',
    waterwayType: 'creek',
    coordinates: [19.0384, 72.8398],
    baseRisk: 82,
    currentRisk: 89,
    timeToOceanInflowHours: 2.4,
    riskLevel: 'Extreme',
    keyVulnerability: 'High tide reverse-flow traps tons of urban plastic in fragile mangrove root nurseries.',
    preventiveProtocols: [
      'Activate tidal barrier deflection booms',
      'Station manual barrier tenders at railway culvert choke points',
      'Dispatch vacuum skimmer trucks along service roads'
    ],
    blockageRisk: 84
  },
  {
    locationId: 'pred-03',
    locationName: 'Malad Creek Drainage Confluence',
    zone: 'Western Suburbs',
    waterwayType: 'creek',
    coordinates: [19.1834, 72.8126],
    baseRisk: 74,
    currentRisk: 81,
    timeToOceanInflowHours: 3.1,
    riskLevel: 'High',
    keyVulnerability: 'Heavy commercial and domestic plastic packaging dumping from Link Road culverts.',
    preventiveProtocols: [
      'Install secondary containment nets along Marve bridge',
      'Inspect filtration grates at Chincholi Bunder',
      'Deploy drone continuous monitoring pass'
    ],
    blockageRisk: 76
  },
  {
    locationId: 'pred-04',
    locationName: 'Versova Coastal Interceptor Basin',
    zone: 'Western Suburbs',
    waterwayType: 'beach',
    coordinates: [19.1352, 72.8142],
    baseRisk: 68,
    currentRisk: 77,
    timeToOceanInflowHours: 4.2,
    riskLevel: 'High',
    keyVulnerability: 'Stormwater outfall carries floating packaging directly past beach breakers during heavy rain.',
    preventiveProtocols: [
      'Stage heavy beach sifters at northern sandbar',
      'Close upstream emergency flap gates if sea surge exceeds 3.5m',
      'Coordinate volunteer surge cleanup brigade'
    ],
    blockageRisk: 69
  },
  {
    locationId: 'pred-05',
    locationName: 'Sassoon Docks Tidal Basin',
    zone: 'South Mumbai',
    waterwayType: 'harbor',
    coordinates: [18.9135, 72.8256],
    baseRisk: 62,
    currentRisk: 70,
    timeToOceanInflowHours: 4.8,
    riskLevel: 'Elevated',
    keyVulnerability: 'Disused fishing gear and packing foam accumulates around pier pilings.',
    preventiveProtocols: [
      'Mandatory dockside net surrender checkpoint',
      'Position harbor skimmer launch at south jetty',
      'Deploy oil & plastic absorption curtains'
    ],
    blockageRisk: 60
  },
  {
    locationId: 'pred-06',
    locationName: 'Gorai Creek Creekhead',
    zone: 'Northern Suburbs',
    waterwayType: 'creek',
    coordinates: [19.2312, 72.8055],
    baseRisk: 46,
    currentRisk: 52,
    timeToOceanInflowHours: 6.5,
    riskLevel: 'Elevated',
    keyVulnerability: 'Tourist litter and weekend resort plastic runoff in creek marshland.',
    preventiveProtocols: [
      'Routine trash collection boat sweeps',
      'Citizen reporting kiosks verification',
      'Drainage screen clearing at Gorai Jetty'
    ],
    blockageRisk: 42
  }
];

export const ACCUMULATION_TRENDS = [
  { month: 'Jan', detected: 28.4, collected: 25.1, divertedToRecycling: 21.8, monsoonFactor: 1.0 },
  { month: 'Feb', detected: 26.1, collected: 24.3, divertedToRecycling: 20.9, monsoonFactor: 1.0 },
  { month: 'Mar', detected: 31.8, collected: 28.5, divertedToRecycling: 24.2, monsoonFactor: 1.1 },
  { month: 'Apr', detected: 34.5, collected: 30.2, divertedToRecycling: 25.8, monsoonFactor: 1.2 },
  { month: 'May', detected: 48.2, collected: 41.6, divertedToRecycling: 36.1, monsoonFactor: 1.6 },
  { month: 'Jun', detected: 92.4, collected: 81.3, divertedToRecycling: 71.5, monsoonFactor: 3.2 },
  { month: 'Jul', detected: 114.7, collected: 98.6, divertedToRecycling: 86.4, monsoonFactor: 4.1 },
  { month: 'Aug', detected: 108.2, collected: 94.1, divertedToRecycling: 83.0, monsoonFactor: 3.8 },
  { month: 'Sep', detected: 76.9, collected: 68.4, divertedToRecycling: 59.8, monsoonFactor: 2.6 },
  { month: 'Oct', detected: 42.1, collected: 38.5, divertedToRecycling: 33.2, monsoonFactor: 1.4 }
];

export const LOCATION_WASTE_DATA = [
  { location: 'Mithi River', detected: 48.6, collected: 43.2, criticalAlerts: 14 },
  { location: 'Mahim Creek', detected: 38.2, collected: 33.8, criticalAlerts: 11 },
  { location: 'Malad Creek', detected: 31.5, collected: 27.9, criticalAlerts: 8 },
  { location: 'Versova Beach', detected: 27.4, collected: 25.8, criticalAlerts: 6 },
  { location: 'Sassoon Docks', detected: 22.1, collected: 19.8, criticalAlerts: 5 },
  { location: 'Gorai Creek', detected: 16.3, collected: 14.9, criticalAlerts: 3 },
  { location: 'Juhu Drains', detected: 14.8, collected: 13.9, criticalAlerts: 2 },
  { location: 'Thane Creek', detected: 18.5, collected: 16.2, criticalAlerts: 4 }
];

export const POLYMER_DISTRIBUTION = [
  { name: 'PET Bottles (Type 1)', value: 38, fill: '#06b6d4' },
  { name: 'Multi-layer Sachets / Pouches', value: 29, fill: '#3b82f6' },
  { name: 'HDPE Rigid Containers (Type 2)', value: 15, fill: '#10b981' },
  { name: 'Abandoned Fishing Nets / Gear', value: 11, fill: '#f59e0b' },
  { name: 'Polystyrene & Thermocol (Type 6)', value: 7, fill: '#ec4899' }
];

export const CLEANUP_SLA_STATS = [
  { status: 'Completed < 6 hrs', count: 142, percentage: 68 },
  { status: 'Completed 6-12 hrs', count: 48, percentage: 23 },
  { status: 'Completed > 12 hrs', count: 19, percentage: 9 }
];

export const OVERALL_STATS = {
  totalHotspots: 42,
  criticalHotspots: 6,
  estimatedWasteDetectedTonnes: 148.5,
  totalWasteCollectedTonnes: 128.2,
  cleaningOperationsCompleted: 218,
  activeDronesAndSensors: 34,
  divertedFromOceanRate: 86.3, // percentage
  mangroveAreaProtectedSqKm: 14.8,
  marineFaunaSavedEst: 18400
};
