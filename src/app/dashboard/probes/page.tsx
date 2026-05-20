'use client';

import { useState } from 'react';
import { Battery, MapPin, Plus, Radio, Sprout } from 'lucide-react';
import { mockProbes } from '@/lib/mockData';
import { popularCropTypes } from '@/lib/types';

export default function ProbesPage() {
  const [open, setOpen] = useState(false);
  const probes = mockProbes;

  return (
    <div className="animate-fade-in">
      <div className="mb-6 flex items-center justify-between">
        <p className="text-sm text-muted-foreground">{probes.length} probe{probes.length !== 1 ? 's' : ''} connected.</p>
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
            <div className="mt-3 flex items-center gap-1.5 rounded-lg bg-secondary/60 px-3 py-2 text-sm">
              <Sprout className="h-4 w-4 text-primary" />
              <span className="font-medium text-foreground">{p.cropType}</span>
              {p.cropTypes && p.cropTypes.length > 0 && (
                <span className="text-xs text-muted-foreground">
                  ({p.cropTypes.join(', ')})
                </span>
              )}
            </div>
            <div className="mt-3 grid grid-cols-2 gap-3 text-sm">
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
            <p className="mt-1 text-sm text-muted-foreground">
              Each probe is configured for a specific crop type so the data relates directly to what you're growing.
            </p>
            <ol className="mt-4 list-decimal space-y-2 pl-5 text-sm text-muted-foreground">
              <li>Power on the probe and hold the sync button for 5 seconds.</li>
              <li>Wait for the LED to turn solid green.</li>
              <li>Enter the 8-digit code printed on the underside of the device.</li>
              <li>Choose a crop type for this probe from the list below.</li>
              <li>Confirm the location and give it a name.</li>
            </ol>
            <div className="mt-4">
              <label className="block text-sm font-medium text-foreground mb-2">Configure for crop type:</label>
              <div className="max-h-32 overflow-y-auto grid grid-cols-2 gap-1.5">
                {popularCropTypes.slice(0, 10).map((crop) => (
                  <label key={crop} className="flex items-center gap-2 px-2 py-1.5 rounded-lg border border-border text-xs hover:bg-secondary/50 cursor-pointer">
                    <input type="radio" name="crop-type" className="accent-primary" />
                    {crop}
                  </label>
                ))}
              </div>
              <p className="text-[10px] text-muted-foreground mt-1">Select the crop this probe will monitor</p>
            </div>
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
