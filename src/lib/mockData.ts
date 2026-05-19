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
    name: 'Field A - North Plot',
    location: 'North Section, Plot 3',
    status: 'online',
    batteryLevel: 87,
    lastSync: '2 minutes ago',
    readings: randomReading(),
    healthHistory: generateHealthHistory(90),
  },
  {
    id: 'probe-2',
    name: 'Field B - South Plot',
    location: 'South Section, Plot 7',
    status: 'online',
    batteryLevel: 62,
    lastSync: '5 minutes ago',
    readings: randomReading(),
    healthHistory: generateHealthHistory(90),
  },
  {
    id: 'probe-3',
    name: 'Field C - East Plot',
    location: 'East Section, Plot 1',
    status: 'online',
    batteryLevel: 94,
    lastSync: '1 minute ago',
    readings: randomReading(),
    healthHistory: generateHealthHistory(90),
  },
];

export const mockRecommendations: Recommendation[] = [
  {
    id: 'rec-1',
    priority: 'URGENT',
    title: 'Add Organic Matter',
    description: 'Low microbial activity detected. Apply 5cm compost layer to improve soil biology.',
    impact: '+15 points soil health in 30 days',
    cta: 'Mark as Done',
    category: 'soil-amendment',
    status: 'pending',
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 'rec-2',
    priority: 'MEDIUM',
    title: 'Stop Tilling',
    description: 'Compaction increasing. Switch to no-till planting methods to preserve soil structure.',
    impact: 'Reduce compaction by 40%',
    cta: 'Learn More',
    category: 'tillage',
    status: 'pending',
    createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 'rec-3',
    priority: 'LOW',
    title: 'Plant Cover Crop',
    description: 'Dry season approaching. Plant cowpeas to retain moisture and fix nitrogen.',
    impact: '+20% water retention',
    cta: 'Get Seeds',
    category: 'planting',
    status: 'pending',
    createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 'rec-4',
    priority: 'MEDIUM',
    title: 'Adjust Irrigation Schedule',
    description: 'Soil moisture levels dropping. Increase irrigation frequency to maintain optimal 30-40% range.',
    impact: 'Prevent crop water stress',
    cta: 'Set Schedule',
    category: 'irrigation',
    status: 'pending',
    createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 'rec-5',
    priority: 'LOW',
    title: 'Test Soil pH Balance',
    description: 'pH trending acidic. Consider lime application if pH drops below 5.5.',
    impact: 'Maintain nutrient availability',
    cta: 'Order Lime',
    category: 'soil-testing',
    status: 'pending',
    createdAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
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
