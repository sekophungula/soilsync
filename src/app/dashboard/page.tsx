'use client';

import {
  Activity, Radio, AlertTriangle, TrendingUp, Wind, Droplet, Thermometer,
  FlaskConical, Zap, Gauge, Bug,
} from 'lucide-react';
import {
  LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend,
} from 'recharts';
import { useStore } from '@/lib/store';
import { mockProbes, mockRecommendations, getOverallHealth, healthSeries } from '@/lib/mockData';

const sensorIcons = {
  co2: Wind, moisture: Droplet, temperature: Thermometer, ph: FlaskConical,
  conductivity: Zap, compaction: Gauge, earthworm: Bug,
} as const;

const sensorMeta: Record<keyof typeof sensorIcons, { label: string; unit: string }> = {
  co2: { label: "CO₂ Respiration", unit: "mg/m²/hr" },
  moisture: { label: "Soil Moisture", unit: "%" },
  temperature: { label: "Temperature", unit: "°C" },
  ph: { label: "pH Level", unit: "" },
  conductivity: { label: "Conductivity", unit: "mS/cm" },
  compaction: { label: "Compaction", unit: "MPa" },
  earthworm: { label: "Earthworm Activity", unit: "events/hr" },
};

function StatCard({
  label, value, sub, accent, icon, trendOk,
}: { label: string; value: string; sub: React.ReactNode; accent: string; icon: React.ReactNode; trendOk?: boolean }) {
  return (
    <div className="card-hover rounded-xl bg-card p-5 ring-1 ring-border">
      <div className="flex items-center justify-between">
        <span className="text-xs font-medium uppercase tracking-wide text-muted-foreground">{label}</span>
        <span className={`inline-flex h-9 w-9 items-center justify-center rounded-lg ${accent}`}>{icon}</span>
      </div>
      <div className="mt-3 text-3xl font-bold tracking-tight">{value}</div>
      <div className={`mt-1 text-xs font-medium ${trendOk ? "text-[var(--success)]" : "text-muted-foreground"}`}>{sub}</div>
    </div>
  );
}

export default function DashboardPage() {
  const { recommendations, addToast } = useStore();
  const overallHealth = getOverallHealth();

  const probes = mockProbes.map(p => ({
    ...p,
    readings: {
      co2: p.readings.co2Respiration,
      moisture: p.readings.soilMoisture,
      temperature: p.readings.temperature,
      ph: p.readings.pH,
      conductivity: p.readings.conductivity,
      compaction: p.readings.compaction,
      earthworm: p.readings.earthwormActivity,
    },
  }));

  const recs = recommendations.length > 0 ? recommendations : mockRecommendations;

  return (
    <div className="animate-fade-in">
      {/* Stat cards */}
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <StatCard
          label="Overall Soil Health" value={`${overallHealth}/100`}
          sub={<>↑ +2 from last week</>}
          trendOk
          icon={<Activity className="h-4.5 w-4.5 text-primary" />}
          accent="bg-secondary"
        />
        <div className="card-hover rounded-xl bg-card p-5 ring-1 ring-border">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium uppercase tracking-wide text-muted-foreground">Active Probes</span>
            <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-secondary">
              <Radio className="h-4.5 w-4.5 text-primary" />
            </span>
          </div>
          <div className="mt-3 flex items-baseline gap-3">
            <span className="text-3xl font-bold tracking-tight">3</span>
            <span className="rounded-full bg-[var(--success)] px-2 py-0.5 text-[10px] font-bold text-white">All online</span>
          </div>
          <div className="mt-1 text-xs text-muted-foreground">Synced moments ago</div>
        </div>
        <div className="card-hover rounded-xl bg-card p-5 ring-1 ring-border">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium uppercase tracking-wide text-muted-foreground">Action Items</span>
            <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-secondary">
              <AlertTriangle className="h-4.5 w-4.5 text-primary" />
            </span>
          </div>
          <div className="mt-3 flex items-baseline gap-3">
            <span className="text-3xl font-bold tracking-tight">{recs.filter(r => r.status === 'pending').length}</span>
            <span className="rounded-full bg-destructive px-2 py-0.5 text-[10px] font-bold text-destructive-foreground">2 urgent</span>
          </div>
          <div className="mt-1 text-xs text-muted-foreground">3 pending review</div>
        </div>
        <StatCard
          label="Estimated Yield" value="2.8 t/ha"
          sub={<>↑ +18% potential</>} trendOk
          icon={<TrendingUp className="h-4.5 w-4.5 text-primary" />}
          accent="bg-secondary"
        />
      </div>

      <div className="mt-6 grid gap-6 xl:grid-cols-3">
        {/* Chart */}
        <div className="rounded-xl bg-card p-5 ring-1 ring-border xl:col-span-2">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h2 className="text-base font-semibold">Soil Health Trends</h2>
              <p className="text-xs text-muted-foreground">Last 90 days · per probe</p>
            </div>
          </div>
          <div className="h-[320px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={healthSeries} margin={{ left: -10, right: 10, top: 5, bottom: 0 }}>
                <CartesianGrid stroke="var(--cream-deep)" strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="date" tick={{ fontSize: 11, fill: "var(--muted-foreground)" }} interval={11} />
                <YAxis domain={[50, 80]} tick={{ fontSize: 11, fill: "var(--muted-foreground)" }} />
                <Tooltip
                  contentStyle={{
                    background: "white", border: "1px solid var(--cream-deep)",
                    borderRadius: 8, fontSize: 12,
                  }}
                />
                <Legend wrapperStyle={{ fontSize: 12 }} />
                <Line type="monotone" dataKey="fieldA" name="Field A" stroke="var(--forest)" strokeWidth={2.5} dot={false} />
                <Line type="monotone" dataKey="fieldB" name="Field B" stroke="var(--forest-soft)" strokeWidth={2} dot={false} />
                <Line type="monotone" dataKey="fieldC" name="Field C" stroke="var(--warn)" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Live sensor readings */}
        <div className="space-y-4">
          <h2 className="text-base font-semibold">Live Sensor Readings</h2>
          <div className="max-h-[460px] space-y-4 overflow-y-auto pr-1">
            {probes.map((p) => (
              <div key={p.id} className="card-hover rounded-xl bg-card p-5 ring-1 ring-border">
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="h-2 w-2 rounded-full bg-[var(--success)]" />
                      <span className="text-sm font-semibold">{p.name}</span>
                    </div>
                    <p className="mt-0.5 text-xs text-muted-foreground">Last updated: {p.lastSync}</p>
                  </div>
                  <span className="rounded-full border px-2 py-0.5 text-[10px] font-medium text-muted-foreground">Online</span>
                </div>
                <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
                  {(Object.keys(sensorIcons) as (keyof typeof sensorIcons)[]).map((k) => {
                    const Icon = sensorIcons[k];
                    const m = sensorMeta[k];
                    return (
                      <div key={k} className="rounded-lg bg-secondary/60 p-3">
                        <div className="flex items-center gap-2 text-[11px] text-muted-foreground">
                          <Icon className="h-3.5 w-3.5 text-primary" /> {m.label}
                        </div>
                        <div className="mt-1 font-semibold">
                          {p.readings[k]}{m.unit && <span className="ml-1 text-xs font-normal text-muted-foreground">{m.unit}</span>}
                        </div>
                      </div>
                    );
                  })}
                </div>
                <button className="mt-4 w-full rounded-lg border px-3 py-1.5 text-sm font-medium transition-colors hover:bg-secondary">
                  View Details
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recommendations */}
      <div className="mt-6 rounded-xl bg-card p-5 ring-1 ring-border">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-base font-semibold">Recommended Actions</h2>
          <button className="rounded-lg px-3 py-1.5 text-sm font-medium text-primary hover:bg-secondary transition-colors">View all</button>
        </div>
        <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
          {recs.slice(0, 3).map((r) => {
            const pColor =
              r.priority === "URGENT" ? "bg-destructive text-destructive-foreground" :
              r.priority === "MEDIUM" ? "bg-[var(--warn)] text-black" :
              "bg-[var(--success)] text-white";
            return (
              <div key={r.id} className="rounded-xl border bg-background p-5 transition-shadow hover:shadow-md">
                <div className="flex items-center justify-between">
                  <span className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold tracking-wide ${pColor}`}>{r.priority}</span>
                  <span className="text-[10px] uppercase text-muted-foreground">{r.category}</span>
                </div>
                <h3 className="mt-3 text-base font-semibold">{r.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{r.description}</p>
                <div className="mt-3 rounded-md bg-secondary/70 px-3 py-2 text-xs font-medium text-primary">
                  Impact: {r.impact}
                </div>
                <button
                  className="mt-4 w-full rounded-lg bg-primary px-3 py-1.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-accent"
                  onClick={() => addToast(`${r.title}: action recorded`, 'success')}
                >
                  {r.cta || 'Mark as Done'}
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
