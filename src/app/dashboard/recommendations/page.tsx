'use client';

import { useState } from 'react';
import { Sparkles, Sprout, Droplet, Bug, Leaf } from 'lucide-react';
import { useStore } from '@/lib/store';
import { mockRecommendations } from '@/lib/mockData';
import type { Recommendation } from '@/lib/types';

const priorities = ["All", "URGENT", "MEDIUM", "LOW"] as const;
const statuses = ["All", "pending", "completed"] as const;

function priorityColor(p: Recommendation["priority"]) {
  return p === "URGENT" ? "bg-destructive text-destructive-foreground"
    : p === "MEDIUM" ? "bg-[var(--warn)] text-black"
    : "bg-[var(--success)] text-white";
}

function categoryIcon(category: string) {
  switch (category) {
    case 'soil-amendment': return <Bug className="h-4 w-4" />;
    case 'tillage': return <Leaf className="h-4 w-4" />;
    case 'planting': return <Sprout className="h-4 w-4" />;
    case 'irrigation': return <Droplet className="h-4 w-4" />;
    case 'grazing': return <Leaf className="h-4 w-4" />;
    default: return <Sprout className="h-4 w-4" />;
  }
}

export default function RecPage() {
  const { recommendations, addToast } = useStore();
  const [pri, setPri] = useState<(typeof priorities)[number]>("All");
  const [st, setSt] = useState<(typeof statuses)[number]>("All");

  const recs = recommendations.length > 0 ? recommendations : mockRecommendations;

  const list = recs.filter(r =>
    (pri === "All" || r.priority === pri) && (st === "All" || r.status === st),
  );

  return (
    <div className="animate-fade-in">
      <div className="mb-6 flex flex-wrap items-center gap-3">
        <div className="flex flex-wrap gap-1.5">
          {priorities.map(p => (
            <button
              key={p}
              onClick={() => setPri(p)}
              className={`rounded-full px-3 py-1 text-xs font-medium ring-1 ring-border transition ${
                pri === p ? "bg-primary text-primary-foreground" : "bg-card hover:bg-secondary"
              }`}
            >{p}</button>
          ))}
        </div>
        <div className="flex flex-wrap gap-1.5">
          {statuses.map(s => (
            <button
              key={s}
              onClick={() => setSt(s)}
              className={`rounded-full px-3 py-1 text-xs font-medium ring-1 ring-border transition ${
                st === s ? "bg-primary text-primary-foreground" : "bg-card hover:bg-secondary"
              }`}
            >{s}</button>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        {list.map(r => (
          <div key={r.id} className="card-hover rounded-xl bg-card p-5 ring-1 ring-border">
            <div className="flex flex-wrap items-center gap-3">
              <span className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold tracking-wide ${priorityColor(r.priority)}`}>{r.priority}</span>
              <span className="inline-flex items-center gap-1 text-[10px] uppercase text-muted-foreground">
                {categoryIcon(r.category)} {r.category}
              </span>
              <span className="text-[10px] uppercase text-muted-foreground">{r.status}</span>
            </div>
            <h3 className="mt-3 text-lg font-semibold">{r.title}</h3>
            <p className="mt-1 text-sm text-muted-foreground">{r.description}</p>
            <div className="mt-3 rounded-md bg-secondary/70 px-3 py-2 text-xs font-medium text-primary">
              What this means: {r.impact}
            </div>
            <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <Sparkles className="h-3.5 w-3.5 text-primary" />
                Other farmers who did this saw better harvests
              </div>
              <button
                className="rounded-lg bg-primary px-4 py-1.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-accent"
                onClick={() => addToast(`${r.title}: action recorded`, 'success')}
              >{r.cta}</button>
            </div>
          </div>
        ))}
        {list.length === 0 && (
          <p className="text-center text-sm text-muted-foreground">No recommendations match these filters.</p>
        )}
      </div>
    </div>
  );
}
