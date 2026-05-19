'use client';

import { useState } from 'react';
import {
  BarChart3, TrendingUp, TrendingDown, Activity, Leaf, Calendar,
  ArrowUp, ArrowDown
} from 'lucide-react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  AreaChart, Area, PieChart, Pie, Cell
} from 'recharts';
import { useStore } from '@/lib/store';

const weeklyData = [
  { week: 'W1', health: 62, moisture: 28, temp: 18 },
  { week: 'W2', health: 64, moisture: 26, temp: 19 },
  { week: 'W3', health: 63, moisture: 30, temp: 17 },
  { week: 'W4', health: 66, moisture: 32, temp: 20 },
  { week: 'W5', health: 65, moisture: 29, temp: 21 },
  { week: 'W6', health: 67, moisture: 31, temp: 19 },
  { week: 'W7', health: 68, moisture: 33, temp: 18 },
  { week: 'W8', health: 70, moisture: 35, temp: 20 },
];

const pieData = [
  { name: 'Optimal', value: 45, color: '#2D5016' },
  { name: 'Moderate', value: 35, color: '#E8A838' },
  { name: 'Needs Attention', value: 20, color: '#EF4444' },
];

export default function AnalyticsPage() {
  const { probes } = useStore();
  const [period, setPeriod] = useState<'weekly' | 'monthly' | 'quarterly'>('weekly');

  const currentScore = probes.reduce((sum, p) => {
    const last = p.healthHistory[p.healthHistory.length - 1];
    return sum + (last?.score || 65);
  }, 0) / probes.length;

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-dark">Analytics</h1>
          <p className="text-sm text-dark/50 mt-1">Deep dive into your farm's performance data</p>
        </div>
        <div className="flex gap-2">
          {(['weekly', 'monthly', 'quarterly'] as const).map((p) => (
            <button
              key={p}
              onClick={() => setPeriod(p)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                period === p ? 'bg-forest text-white' : 'bg-white text-dark/60 border border-cream-dark/30'
              }`}
            >
              {p.charAt(0).toUpperCase() + p.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid sm:grid-cols-3 gap-4">
        <div className="bg-white rounded-xl border border-cream-dark/30 p-4 card-hover">
          <div className="flex items-center gap-2 mb-2">
            <Activity className="w-4 h-4 text-forest" />
            <span className="text-xs text-dark/50">Avg Soil Health</span>
          </div>
          <div className="text-2xl font-bold text-dark">{Math.round(currentScore)}/100</div>
          <div className="flex items-center gap-1 text-xs text-green-600 mt-1">
            <ArrowUp className="w-3 h-3" />
            +4.2% this period
          </div>
        </div>
        <div className="bg-white rounded-xl border border-cream-dark/30 p-4 card-hover">
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp className="w-4 h-4 text-forest" />
            <span className="text-xs text-dark/50">Yield Potential</span>
          </div>
          <div className="text-2xl font-bold text-dark">2.8 t/ha</div>
          <div className="flex items-center gap-1 text-xs text-green-600 mt-1">
            <ArrowUp className="w-3 h-3" />
            +18% vs baseline
          </div>
        </div>
        <div className="bg-white rounded-xl border border-cream-dark/30 p-4 card-hover">
          <div className="flex items-center gap-2 mb-2">
            <Leaf className="w-4 h-4 text-forest" />
            <span className="text-xs text-dark/50">Soil Biology</span>
          </div>
          <div className="text-2xl font-bold text-dark">Good</div>
          <div className="flex items-center gap-1 text-xs text-green-600 mt-1">
            <ArrowUp className="w-3 h-3" />
            Microbial activity increasing
          </div>
        </div>
      </div>

      {/* Charts */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Health Trend */}
        <div className="bg-white rounded-xl border border-cream-dark/30 p-5 card-hover">
          <h2 className="font-semibold text-dark mb-4">Health Score Trend</h2>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={weeklyData}>
                <defs>
                  <linearGradient id="healthGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#2D5016" stopOpacity={0.15} />
                    <stop offset="95%" stopColor="#2D5016" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#E8DCC4" />
                <XAxis dataKey="week" tick={{ fontSize: 10, fill: '#666' }} />
                <YAxis domain={[50, 80]} tick={{ fontSize: 10, fill: '#666' }} />
                <Tooltip />
                <Area type="monotone" dataKey="health" stroke="#2D5016" strokeWidth={2} fill="url(#healthGrad)" name="Health Score" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Distribution */}
        <div className="bg-white rounded-xl border border-cream-dark/30 p-5 card-hover">
          <h2 className="font-semibold text-dark mb-4">Soil Health Distribution</h2>
          <div className="h-64 flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={90}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute flex flex-col items-center">
              <span className="text-2xl font-bold text-dark">{Math.round(currentScore)}%</span>
              <span className="text-[10px] text-dark/50">Overall</span>
            </div>
          </div>
          <div className="flex justify-center gap-4 mt-2">
            {pieData.map((item) => (
              <div key={item.name} className="flex items-center gap-1.5 text-xs">
                <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }} />
                <span className="text-dark/60">{item.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Production Progress */}
      <div className="bg-white rounded-xl border border-cream-dark/30 p-5 card-hover">
        <h2 className="font-semibold text-dark mb-4">Production Progress</h2>
        <div className="space-y-4">
          {[
            { label: 'Soil Health Improvement', current: 68, target: 85, color: '#2D5016' },
            { label: 'Moisture Optimization', current: 32, target: 40, color: '#4A7C2E' },
            { label: 'Microbial Activity', current: 45, target: 60, color: '#6B9E4A' },
            { label: 'pH Balance', current: 6.2, target: 6.8, color: '#8B5CF6', isDecimal: true },
          ].map((item, i) => (
            <div key={i} className="animate-fade-in" style={{ animationDelay: `${i * 100}ms` }}>
              <div className="flex items-center justify-between text-sm mb-1.5">
                <span className="text-dark/70">{item.label}</span>
                <span className="font-semibold text-dark">
                  {item.isDecimal ? item.current : item.current}/{item.isDecimal ? item.target : item.target}
                  {!item.isDecimal && '%'}
                </span>
              </div>
              <div className="w-full h-2.5 bg-cream-dark/30 rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-1000"
                  style={{
                    width: `${item.isDecimal ? (item.current / item.target) * 100 : (item.current / item.target) * 100}%`,
                    backgroundColor: item.color,
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
