export interface ProbeReading {
  co2Respiration: number; // mg/m²/hr
  soilMoisture: number; // %
  temperature: number; // °C
  pH: number;
  conductivity: number; // mS/cm
  compaction: number; // MPa
  earthwormActivity: number; // events/hr
}

export interface SoilProbe {
  id: string;
  name: string;
  location: string;
  status: 'online' | 'offline';
  batteryLevel: number;
  lastSync: string;
  readings: ProbeReading;
  healthHistory: { date: string; score: number }[];
}

export interface Recommendation {
  id: string;
  priority: 'URGENT' | 'MEDIUM' | 'LOW';
  title: string;
  description: string;
  impact: string;
  cta: string;
  category: string;
  status: 'pending' | 'completed';
  createdAt: string;
}

export interface FarmSetup {
  farmName: string;
  farmSize: number;
  province: string;
  ownership: 'privately-owned' | 'communal' | 'leased' | 'government';
  primaryCrops: string;
  soilType: string;
  setupComplete: boolean;
}

export interface UserProfile {
  name: string;
  email: string;
  farm: FarmSetup | null;
}

export interface AIAnalysis {
  daily: string;
  weekly: string;
  monthly: string;
  trend: 'improving' | 'stable' | 'declining';
  progress: number;
}
