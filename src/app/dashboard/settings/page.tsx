'use client';

import { useStore } from '@/lib/store';
import { mockProbes } from '@/lib/mockData';

function Row({ label, defaultOn = false }: { label: string; defaultOn?: boolean }) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-sm">{label}</span>
      <label className="relative inline-flex h-5 w-9 cursor-pointer items-center">
        <input type="checkbox" defaultChecked={defaultOn} className="peer sr-only" />
        <span className="absolute inset-0 rounded-full bg-input transition-colors peer-checked:bg-primary" />
        <span className="absolute left-0.5 top-0.5 h-4 w-4 rounded-full bg-white transition-transform peer-checked:translate-x-4" />
      </label>
    </div>
  );
}

export default function SettingsPage() {
  const { userName, userEmail, addToast } = useStore();

  return (
    <div className="animate-fade-in">
      <div className="grid gap-6 lg:grid-cols-3">
        <section className="rounded-xl bg-card p-6 ring-1 ring-border lg:col-span-2">
          <h2 className="text-base font-semibold">Profile</h2>
          <p className="text-xs text-muted-foreground">Update your personal information.</p>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <div>
              <label className="text-sm font-medium">Name</label>
              <input defaultValue={userName || 'Farmer'} className="mt-1.5 w-full rounded-lg border bg-background px-3 py-2 text-sm ring-1 ring-border" />
            </div>
            <div>
              <label className="text-sm font-medium">Email</label>
              <input defaultValue={userEmail || 'farmer@soil.sync'} className="mt-1.5 w-full rounded-lg border bg-background px-3 py-2 text-sm ring-1 ring-border" />
            </div>
            <div>
              <label className="text-sm font-medium">Phone</label>
              <input placeholder="+27 ..." className="mt-1.5 w-full rounded-lg border bg-background px-3 py-2 text-sm ring-1 ring-border" />
            </div>
            <div>
              <label className="text-sm font-medium">Province</label>
              <input defaultValue="Limpopo" className="mt-1.5 w-full rounded-lg border bg-background px-3 py-2 text-sm ring-1 ring-border" />
            </div>
          </div>
          <button
            onClick={() => addToast('Profile saved', 'success')}
            className="mt-5 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-accent"
          >
            Save changes
          </button>
        </section>

        <section className="rounded-xl bg-card p-6 ring-1 ring-border">
          <h2 className="text-base font-semibold">Notifications</h2>
          <p className="text-xs text-muted-foreground">Choose how we reach you.</p>
          <div className="mt-4 space-y-4">
            <Row label="Email alerts" defaultOn />
            <Row label="SMS alerts" />
            <Row label="Weekly summary" defaultOn />
          </div>
        </section>

        <section className="rounded-xl bg-card p-6 ring-1 ring-border lg:col-span-2">
          <h2 className="text-base font-semibold">Probes</h2>
          <p className="text-xs text-muted-foreground">Rename, calibrate, or remove devices.</p>
          <div className="mt-4 divide-y">
            {mockProbes.map(p => (
              <div key={p.id} className="flex flex-wrap items-center justify-between gap-3 py-3">
                <div>
                  <div className="font-medium">{p.name}</div>
                  <div className="text-xs text-muted-foreground">{p.location}</div>
                </div>
                <div className="flex gap-2">
                  <button className="rounded-lg border px-3 py-1.5 text-sm font-medium transition-colors hover:bg-secondary">Rename</button>
                  <button className="rounded-lg border px-3 py-1.5 text-sm font-medium transition-colors hover:bg-secondary">Calibrate</button>
                  <button className="rounded-lg px-3 py-1.5 text-sm font-medium text-destructive transition-colors hover:bg-secondary">Remove</button>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="rounded-xl bg-card p-6 ring-1 ring-border">
          <h2 className="text-base font-semibold">Account</h2>
          <p className="text-xs text-muted-foreground">Security and account actions.</p>
          <div className="mt-4 space-y-3">
            <button
              onClick={() => addToast('Password reset email sent', 'info')}
              className="w-full rounded-lg border px-4 py-2 text-sm font-medium transition-colors hover:bg-secondary"
            >
              Change password
            </button>
            <hr className="border-border" />
            <button
              onClick={() => addToast('Account deletion is disabled in demo', 'error')}
              className="w-full rounded-lg px-4 py-2 text-sm font-medium text-destructive transition-colors hover:bg-secondary"
            >
              Delete account
            </button>
          </div>
        </section>
      </div>
    </div>
  );
}
