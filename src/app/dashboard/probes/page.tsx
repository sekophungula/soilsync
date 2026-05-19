'use client';

import { useState } from 'react';
import { Battery, MapPin, Plus, Radio } from 'lucide-react';
import { mockProbes } from '@/lib/mockData';

export default function ProbesPage() {
  const [open, setOpen] = useState(false);
  const probes = mockProbes;

  return (
    <div className="animate-fade-in">
      <div className="mb-6 flex items-center justify-between">
        <p className="text-sm text-muted-foreground">{probes.length} probes connected.</p>
        <button
          onClick={() => setOpen(true)}
          className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-accent"
        >
          <Plus className="h-4 w-4" /> Add New Probe
        </button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {probes.map((p) => (
          <div key={p.id} className="card-hover rounded-xl bg-card p-5 ring-1 ring-border">
            <div className="flex items-center justify-between">
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-secondary text-primary">
                <Radio className="h-5 w-5" />
              </span>
              <span className="rounded-full bg-[var(--success)] px-2.5 py-0.5 text-[10px] font-bold text-white">
                {p.status === "online" ? "Online" : "Offline"}
              </span>
            </div>
            <h3 className="mt-4 text-lg font-semibold">{p.name}</h3>
            <p className="mt-1 flex items-center gap-1.5 text-xs text-muted-foreground">
              <MapPin className="h-3.5 w-3.5" /> {p.location}
            </p>
            <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
              <div className="rounded-lg bg-secondary/60 p-3">
                <div className="flex items-center gap-1.5 text-[11px] text-muted-foreground">
                  <Battery className="h-3.5 w-3.5" /> Battery
                </div>
                <div className="mt-1 font-semibold">{p.batteryLevel}%</div>
              </div>
              <div className="rounded-lg bg-secondary/60 p-3">
                <div className="text-[11px] text-muted-foreground">Last sync</div>
                <div className="mt-1 font-semibold">{p.lastSync}</div>
              </div>
            </div>
            <div className="mt-4 flex gap-2">
              <button className="flex-1 rounded-lg border px-3 py-1.5 text-sm font-medium transition-colors hover:bg-secondary">Configure</button>
              <button className="flex-1 rounded-lg bg-primary px-3 py-1.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-accent">View Data</button>
            </div>
          </div>
        ))}
      </div>

      {/* Dialog */}
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40" onClick={() => setOpen(false)}>
          <div className="w-full max-w-md rounded-xl bg-card p-6 ring-1 ring-border" onClick={(e) => e.stopPropagation()}>
            <h2 className="text-lg font-semibold">Set up a new probe</h2>
            <p className="mt-1 text-sm text-muted-foreground">Follow these steps to register a new SoilSync probe.</p>
            <ol className="mt-4 list-decimal space-y-2 pl-5 text-sm text-muted-foreground">
              <li>Power on the probe and hold the sync button for 5 seconds.</li>
              <li>Wait for the LED to turn solid green.</li>
              <li>Enter the 8-digit code printed on the underside of the device.</li>
              <li>Choose a field name and confirm GPS location.</li>
            </ol>
            <button
              onClick={() => setOpen(false)}
              className="mt-5 w-full rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-accent"
            >
              Got it
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
