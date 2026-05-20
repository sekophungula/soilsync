'use client';

import { healthSeries, mockProbes } from '@/lib/mockData';
import {
  AreaChart, Area, ResponsiveContainer, XAxis, YAxis, CartesianGrid, Tooltip,
} from 'recharts';
import { Wind, Droplet, Thermometer, FlaskConical, Zap, Gauge, Bug, Info, CheckCircle, AlertTriangle, ArrowUp, ArrowDown } from 'lucide-react';

// Plain-language explanations for each sensor reading
function getPlainLanguageExplanation(key: string, value: number): { status: 'good' | 'warning' | 'bad'; message: string } {
  switch (key) {
    case 'co2':
      if (value >= 45) return { status: 'good', message: 'Good microbial activity — the soil is alive and breathing well.' };
      if (value >= 30) return { status: 'warning', message: 'Microbes are active but could use more organic matter to feed them.' };
      return { status: 'bad', message: 'Low microbial activity. Add compost or manure to wake up the soil.' };
    case 'moisture':
      if (value >= 25 && value <= 40) return { status: 'good', message: 'Soil moisture is just right for your crops to grow well.' };
      if (value >= 15) return { status: 'warning', message: 'Soil is getting dry. Your crops may need more water soon.' };
      return { status: 'bad', message: 'Soil is too dry. Water your crops to prevent them from wilting.' };
    case 'temperature':
      if (value >= 18 && value <= 28) return { status: 'good', message: 'Soil temperature is good for planting and root growth.' };
      if (value >= 12) return { status: 'warning', message: 'Soil is a bit cool. Seeds may take longer to sprout.' };
      return { status: 'bad', message: 'Soil is too cold for most crops. Wait for warmer weather to plant.' };
    case 'ph':
      if (value >= 6.0 && value <= 7.0) return { status: 'good', message: 'pH levels are stable and balanced — crops can take up food easily.' };
      if (value >= 5.5) return { status: 'warning', message: 'Soil is becoming sour (acidic). Add wood ash or lime if it drops further.' };
      return { status: 'bad', message: 'Soil is too sour. Crops will struggle to grow. Add lime or wood ash to sweeten it.' };
    case 'conductivity':
      if (value >= 0.4 && value <= 1.0) return { status: 'good', message: 'Good nutrient levels — your crops have enough food in the soil.' };
      if (value >= 0.2) return { status: 'warning', message: 'Nutrient levels are a bit low. Adding compost will help feed your crops.' };
      return { status: 'bad', message: 'Very low nutrients. Your soil needs compost or fertilizer to grow healthy crops.' };
    case 'compaction':
      if (value <= 2.0) return { status: 'good', message: 'Soil is soft and loose — roots can grow deep and spread easily.' };
      if (value <= 3.0) return { status: 'warning', message: 'Soil is getting hard. Try not to dig too deep and let the soil rest.' };
      return { status: 'bad', message: 'Soil is too hard and compacted. Roots cannot grow well. Stop tilling and add organic matter.' };
    case 'earthworm':
      if (value >= 15) return { status: 'good', message: 'Plenty of earthworms — a sign of very healthy soil!' };
      if (value >= 8) return { status: 'warning', message: 'Some earthworms present. They will multiply as the soil gets healthier.' };
      return { status: 'bad', message: 'Very few earthworms. The soil needs more organic matter to attract them back.' };
    default:
      return { status: 'good', message: 'Reading is within normal range.' };
  }
}

const sensors = [
  { key: "co2", label: "CO₂ Respiration", value: "45 mg/m²/hr", regional: "38", icon: Wind, info: "Higher values indicate active microbial life." },
  { key: "moisture", label: "Soil Moisture", value: "32 %", regional: "29 %", icon: Droplet, info: "Optimal range: 25–40% for most crops." },
  { key: "temperature", label: "Temperature", value: "18 °C", regional: "20 °C", icon: Thermometer, info: "Affects seed germination and nutrient uptake." },
  { key: "ph", label: "pH Level", value: "6.2", regional: "6.5", icon: FlaskConical, info: "Most crops thrive at pH 6.0–7.0." },
  { key: "conductivity", label: "Conductivity", value: "0.8 mS/cm", regional: "0.7", icon: Zap, info: "Measures dissolved salts and nutrient availability." },
  { key: "compaction", label: "Compaction", value: "2.1 MPa", regional: "2.4", icon: Gauge, info: "Lower is better — eases root growth." },
  { key: "earthworm", label: "Earthworm Activity", value: "12/hr", regional: "9/hr", icon: Bug, info: "A strong indicator of biological health." },
];

// Numeric values for plain-language evaluation
const sensorValues: Record<string, number> = {
  co2: 45,
  moisture: 32,
  temperature: 18,
  ph: 6.2,
  conductivity: 0.8,
  compaction: 2.1,
  earthworm: 12,
};

export default function SoilHealthPage() {
  return (
    <div className="animate-fade-in">
      <p className="mb-6 text-sm text-muted-foreground">
        Detailed breakdown across {mockProbes.length} probe{mockProbes.length !== 1 ? 's' : ''} — compared with your regional average.
      </p>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {sensors.map((s) => {
          const Icon = s.icon;
          const numericValue = sensorValues[s.key];
          const explanation = getPlainLanguageExplanation(s.key, numericValue);
          return (
            <div key={s.key} className="card-hover rounded-xl bg-card p-5 ring-1 ring-border">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-secondary text-primary">
                    <Icon className="h-5 w-5" />
                  </span>
                  <div>
                    <h3 className="text-sm font-semibold">{s.label}</h3>
                    <p className="text-xs text-muted-foreground">Regional avg: {s.regional}</p>
                  </div>
                </div>
                <div title={s.info}>
                  <Info className="h-4 w-4 text-muted-foreground" />
                </div>
              </div>
              <div className="mt-4 text-2xl font-bold">{s.value}</div>

              {/* Plain-language explanation */}
              <div className={`mt-3 flex items-start gap-2 rounded-lg p-3 text-xs ${
                explanation.status === 'good' ? 'bg-green-50 text-green-800' :
                explanation.status === 'warning' ? 'bg-amber-50 text-amber-800' :
                'bg-red-50 text-red-800'
              }`}>
                {explanation.status === 'good' ? (
                  <CheckCircle className="h-4 w-4 shrink-0 mt-0.5" />
                ) : explanation.status === 'warning' ? (
                  <AlertTriangle className="h-4 w-4 shrink-0 mt-0.5" />
                ) : (
                  <AlertTriangle className="h-4 w-4 shrink-0 mt-0.5" />
                )}
                <span>{explanation.message}</span>
              </div>

              <div className="mt-3 h-16">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={healthSeries.slice(-30)} margin={{ left: 0, right: 0, top: 5, bottom: 0 }}>
                    <defs>
                      <linearGradient id={`grad-${s.key}`} x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="var(--forest)" stopOpacity={0.4} />
                        <stop offset="100%" stopColor="var(--forest)" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <Area type="monotone" dataKey="fieldA" stroke="var(--forest)" strokeWidth={2} fill={`url(#grad-${s.key})`} />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-8 rounded-xl bg-card p-5 ring-1 ring-border">
        <h2 className="text-base font-semibold">Your farm vs. Regional average</h2>
        <p className="text-xs text-muted-foreground">90-day soil health score</p>
        <div className="mt-4 h-[280px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={healthSeries} margin={{ left: -10, right: 10, top: 5, bottom: 0 }}>
              <defs>
                <linearGradient id="you" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="var(--forest)" stopOpacity={0.5} />
                  <stop offset="100%" stopColor="var(--forest)" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="region" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="var(--warn)" stopOpacity={0.4} />
                  <stop offset="100%" stopColor="var(--warn)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid stroke="var(--cream-deep)" strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="date" tick={{ fontSize: 11 }} interval={11} />
              <YAxis domain={[50, 80]} tick={{ fontSize: 11 }} />
              <Tooltip contentStyle={{ borderRadius: 8, fontSize: 12 }} />
              <Area type="monotone" dataKey="fieldA" name="Your farm" stroke="var(--forest)" strokeWidth={2.5} fill="url(#you)" />
              <Area type="monotone" dataKey="fieldC" name="Regional avg" stroke="var(--warn)" strokeWidth={2} fill="url(#region)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
