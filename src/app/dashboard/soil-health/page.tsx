'use client';

import { healthSeries, mockProbes } from '@/lib/mockData';
import {
  AreaChart, Area, ResponsiveContainer, XAxis, YAxis, CartesianGrid, Tooltip,
} from 'recharts';
import { Wind, Droplet, Thermometer, FlaskConical, Zap, Gauge, Bug, Info } from 'lucide-react';

const sensors = [
  { key: "co2", label: "CO₂ Respiration", value: "45 mg/m²/hr", regional: "38", icon: Wind, info: "Higher values indicate active microbial life." },
  { key: "moisture", label: "Soil Moisture", value: "32 %", regional: "29 %", icon: Droplet, info: "Optimal range: 25–40% for most crops." },
  { key: "temperature", label: "Temperature", value: "18 °C", regional: "20 °C", icon: Thermometer, info: "Affects seed germination and nutrient uptake." },
  { key: "ph", label: "pH Level", value: "6.2", regional: "6.5", icon: FlaskConical, info: "Most crops thrive at pH 6.0–7.0." },
  { key: "conductivity", label: "Conductivity", value: "0.8 mS/cm", regional: "0.7", icon: Zap, info: "Measures dissolved salts and nutrient availability." },
  { key: "compaction", label: "Compaction", value: "2.1 MPa", regional: "2.4", icon: Gauge, info: "Lower is better — eases root growth." },
  { key: "earthworm", label: "Earthworm Activity", value: "12/hr", regional: "9/hr", icon: Bug, info: "A strong indicator of biological health." },
];

export default function SoilHealthPage() {
  return (
    <div className="animate-fade-in">
      <p className="mb-6 text-sm text-muted-foreground">
        Detailed breakdown across {mockProbes.length} probes — compared with your regional average.
      </p>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {sensors.map((s) => {
          const Icon = s.icon;
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
              <div className="mt-3 h-20">
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
              <p className="mt-2 text-xs text-muted-foreground">{s.info}</p>
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
