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
  cropType: string; // The crop type this probe is configured for
  cropTypes?: string[]; // Multiple crop types if "mixed-crops"
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
  farmSize: number; // in square meters
  province: string;
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

// South African languages for the language selector
export const southAfricanLanguages = [
  { code: 'en', name: 'English' },
  { code: 'af', name: 'Afrikaans' },
  { code: 'zu', name: 'isiZulu' },
  { code: 'xh', name: 'isiXhosa' },
  { code: 'st', name: 'Sesotho' },
  { code: 'tn', name: 'Setswana' },
  { code: 'ts', name: 'Xitsonga' },
  { code: 'ss', name: 'siSwati' },
  { code: 've', name: 'Tshivenḓa' },
  { code: 'nr', name: 'isiNdebele' },
];

// 20 popular crop types for South African village farmers
export const popularCropTypes = [
  'Maize',
  'Grass (Grazing)',
  'Sorghum',
  'Sunflower',
  'Dry Beans',
  'Groundnuts',
  'Sweet Potato',
  'Pumpkin',
  'Butternut',
  'Cabbage',
  'Spinach',
  'Tomato',
  'Onion',
  'Carrot',
  'Potato',
  'Sugar Beans',
  'Cowpeas',
  'Millet',
  'Cassava',
  'Mixed Crops',
];
