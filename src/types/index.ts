export type SeverityLevel = 'critical' | 'high' | 'moderate' | 'low';

export type WaterwayType = 'river' | 'creek' | 'beach' | 'drain' | 'harbor';

export type TaskStatus = 'pending' | 'in_progress' | 'completed';

export interface Hotspot {
  id: string;
  name: string;
  zone: string;
  type: WaterwayType;
  coordinates: [number, number]; // [lat, lng]
  severity: SeverityLevel;
  estimatedWasteTonnes: number;
  lastReported: string;
  telemetrySource: string;
  image: string;
  polymerBreakdown: {
    petBottles: number; // percentage
    multilayerSachets: number;
    hdpeContainers: number;
    fishingGear: number;
    thermocolFoam: number;
  };
  tidalVelocity: string;
  blockageIndex: number; // 0 - 100
  recommendedAction: string;
  nearestWard: string;
  activeBarrierInstalled: boolean;
}

export interface CleanupTask {
  id: string;
  title: string;
  hotspotId: string;
  locationName: string;
  assignedCrew: string;
  priority: 'P1 - Critical' | 'P2 - High' | 'P3 - Medium';
  status: TaskStatus;
  targetDate: string;
  estimatedTonnes: number;
  divertedTonnes?: number;
  equipment: string[];
  notes: string;
  updatedAt: string;
}

export interface RiskPrediction {
  locationId: string;
  locationName: string;
  zone: string;
  waterwayType: WaterwayType;
  coordinates: [number, number];
  baseRisk: number; // 0 - 100
  currentRisk: number; // calculated dynamically
  timeToOceanInflowHours: number;
  riskLevel: 'Extreme' | 'High' | 'Elevated' | 'Guarded';
  keyVulnerability: string;
  preventiveProtocols: string[];
  blockageRisk: number;
}

export interface DetectionResult {
  fileName: string;
  imageUrl: string;
  analyzedAt: string;
  severity: SeverityLevel;
  overallScore: number; // 0 - 100
  estimatedTonnes: number;
  confidence: number;
  detectedItems: {
    label: string;
    count: number;
    percentage: number;
    box?: [number, number, number, number]; // [x, y, w, h]
  }[];
  primaryPolymer: string;
  recommendedAction: string;
  requiresUrgentIntervention: boolean;
  cleanlinessScore: number;
}
