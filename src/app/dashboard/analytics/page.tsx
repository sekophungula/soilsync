'use client';

import { healthSeries } from '@/lib/mockData';
import {
  BarChart, Bar, ResponsiveContainer, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from 'recharts';

export default function AnalyticsPage() {
  const data = healthSeries.slice(-14);
  return (
    <div className="animate-fade-in">
      <div className="rounded-xl bg-card p-5 ring-1 ring-border">
        <h2 className="text-base font-semibold">Weekly performance by probe</h2>
        <p className="text-xs text-muted-foreground">Last 14 days, soil health score</p>
        <div className="mt-4 h-[360px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} margin={{ left: -10, right: 10 }}>
              <CartesianGrid stroke="var(--cream-deep)" strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="date" tick={{ fontSize: 11 }} />
              <YAxis domain={[50, 80]} tick={{ fontSize: 11 }} />
              <Tooltip contentStyle={{ borderRadius: 8, fontSize: 12 }} />
              <Legend wrapperStyle={{ fontSize: 12 }} />
              <Bar dataKey="fieldA" name="Field A" fill="var(--forest)" radius={[4,4,0,0]} />
              <Bar dataKey="fieldB" name="Field B" fill="var(--forest-soft)" radius={[4,4,0,0]} />
              <Bar dataKey="fieldC" name="Field C" fill="var(--warn)" radius={[4,4,0,0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
