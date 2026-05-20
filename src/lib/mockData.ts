import { SoilProbe, Recommendation } from './types';

function generateHealthHistory(days: number): { date: string; score: number }[] {
  const data: { date: string; score: number }[] = [];
  let score = 62;
  for (let i = days; i >= 0; i--) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    score += (Math.random() - 0.45) * 3;
    score = Math.max(55, Math.min(78, score));
    data.push({
      date: date.toISOString().split('T')[0],
      score: Math.round(score * 10) / 10,
    });
  }
  return data;
}

function randomReading() {
  return {
    co2Respiration: Math.round((35 + Math.random() * 25) * 10) / 10,
    soilMoisture: Math.round((20 + Math.random() * 30) * 10) / 10,
    temperature: Math.round((14 + Math.random() * 12) * 10) / 10,
    pH: Math.round((5.5 + Math.random() * 1.5) * 10) / 10,
    conductivity: Math.round((0.3 + Math.random() * 1.0) * 100) / 100,
    compaction: Math.round((1.5 + Math.random() * 2.0) * 10) / 10,
    earthwormActivity: Math.round(5 + Math.random() * 20),
  };
}

export const mockProbes: SoilProbe[] = [
  {
    id: 'probe-1',
    name: 'Grazing Field Probe',
    location: 'North grazing area',
    status: 'online',
    batteryLevel: 87,
    lastSync: '2 minutes ago',
    readings: randomReading(),
    healthHistory: generateHealthHistory(90),
    cropType: 'Grass (Grazing)',
  },
  {
    id: 'probe-2',
    name: 'Maize Patch Probe',
    location: 'South maize field',
    status: 'online',
    batteryLevel: 62,
    lastSync: '5 minutes ago',
    readings: randomReading(),
    healthHistory: generateHealthHistory(90),
    cropType: 'Maize',
  },
  {
    id: 'probe-3',
    name: 'Mixed Garden Probe',
    location: 'Backyard garden',
    status: 'online',
    batteryLevel: 94,
    lastSync: '1 minute ago',
    readings: randomReading(),
    healthHistory: generateHealthHistory(90),
    cropType: 'Mixed Crops',
    cropTypes: ['Cabbage', 'Spinach', 'Tomato', 'Onion'],
  },
];

export const mockRecommendations: Recommendation[] = [
  {
    id: 'rec-1',
    priority: 'URGENT',
    title: 'Add compost to your soil',
    description: 'The soil is low on food for your plants. Spread a layer of compost or kraal manure to feed the soil and help your crops grow stronger.',
    impact: 'Healthier crops and better harvest',
    cta: 'Mark as Done',
    category: 'soil-amendment',
    status: 'pending',
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 'rec-2',
    priority: 'MEDIUM',
    title: 'Stop digging so much',
    description: 'The soil is getting too hard from too much digging. Try not to dig the soil too deep — just scratch the top layer when planting. This keeps the good bugs alive in the soil.',
    impact: 'Soil stays soft for roots to grow',
    cta: 'Learn More',
    category: 'tillage',
    status: 'pending',
    createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 'rec-3',
    priority: 'LOW',
    title: 'Plant cover crops to trap moisture',
    description: 'Dry season is coming. Plant cowpeas or beans between your main crops to keep water in the soil and add food for the next planting.',
    impact: 'More water stays in the ground',
    cta: 'Get Seeds',
    category: 'planting',
    status: 'pending',
    createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 'rec-4',
    priority: 'MEDIUM',
    title: 'Water your crops more often',
    description: 'The soil is getting dry. Your crops need more water to stay healthy. Try watering in the early morning or evening when the sun is not too hot.',
    impact: 'Prevent crops from drying out',
    cta: 'Set Schedule',
    category: 'irrigation',
    status: 'pending',
    createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 'rec-5',
    priority: 'LOW',
    title: 'Check if your soil is too sour',
    description: 'The soil is becoming sour (acidic). If it gets too sour, your crops will struggle to grow. Adding wood ash or lime can help sweeten the soil.',
    impact: 'Crops can take up food from soil better',
    cta: 'Order Lime',
    category: 'soil-testing',
    status: 'pending',
    createdAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 'rec-6',
    priority: 'LOW',
    title: 'Grass probe is stable for grazing',
    description: 'Your grazing field is in good shape. The grass has enough water and the soil is healthy. Your livestock can graze here without damaging the land.',
    impact: 'Good grazing for your animals',
    cta: 'View Details',
    category: 'grazing',
    status: 'pending',
    createdAt: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 'rec-7',
    priority: 'MEDIUM',
    title: 'Plant different crops together',
    description: 'Growing only one crop can wear out the soil. Try planting maize with beans and pumpkin together — they help each other grow and keep the soil healthy.',
    impact: 'Better harvest and healthier soil',
    cta: 'Learn More',
    category: 'planting',
    status: 'pending',
    createdAt: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000).toISOString(),
  },
];

export const provinces = [
  'Eastern Cape',
  'Free State',
  'Gauteng',
  'KwaZulu-Natal',
  'Limpopo',
  'Mpumalanga',
  'North West',
  'Northern Cape',
  'Western Cape',
];

export const soilTypes = [
  'Sandy',
  'Loamy',
  'Clay',
  'Silty',
  'Peaty',
  'Chalky',
  'Sandy Loam',
  'Clay Loam',
];

export const cropOptions = [
  'Maize',
  'Wheat',
  'Soybeans',
  'Sunflower',
  'Sorghum',
  'Cotton',
  'Vegetables',
  'Fruit',
  'Mixed Crops',
  'Livestock & Crops',
];

export function getOverallHealth(): number {
  const scores = mockProbes.map(p => {
    const history = p.healthHistory;
    return history[history.length - 1]?.score || 65;
  });
  return Math.round(scores.reduce((a, b) => a + b, 0) / scores.length);
}

export function getTrend(): { direction: 'up' | 'down' | 'stable'; value: number } {
  const current = getOverallHealth();
  const prev = getOverallHealth() - 2 + Math.round(Math.random() * 4);
  const diff = current - prev;
  return {
    direction: diff > 0.5 ? 'up' : diff < -0.5 ? 'down' : 'stable',
    value: Math.abs(Math.round(diff)),
  };
}

// Health series matching soil-sync-grow format
export type HealthPoint = { date: string; fieldA: number; fieldB: number; fieldC: number };

function genSeries(): HealthPoint[] {
  const out: HealthPoint[] = [];
  const start = new Date();
  start.setDate(start.getDate() - 89);
  let a = 64, b = 61, c = 67;
  for (let i = 0; i < 90; i++) {
    const d = new Date(start);
    d.setDate(start.getDate() + i);
    a = Math.max(58, Math.min(75, a + (Math.random() - 0.45) * 1.6));
    b = Math.max(55, Math.min(72, b + (Math.random() - 0.5) * 1.8));
    c = Math.max(60, Math.min(78, c + (Math.random() - 0.45) * 1.5));
    out.push({
      date: d.toISOString().slice(5, 10),
      fieldA: Math.round(a),
      fieldB: Math.round(b),
      fieldC: Math.round(c),
    });
  }
  return out;
}
export const healthSeries = genSeries();
