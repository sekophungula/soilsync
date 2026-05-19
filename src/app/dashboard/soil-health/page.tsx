'use client';

import { useState } from 'react';
import {
  Wind, Droplets, Thermometer, Beaker, Zap, Gauge, Activity,
  Info, TrendingUp, TrendingDown, Minus
} from 'lucide-react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart
} from 'recharts';
import { useStore } from '@/lib/store';

const metrics = [
  {
    key: 'co2Respiration',
    label: 'CO₂ Respiration',
    unit: 'mg/m²/hr',
    icon: Wind,
    color: '#4A7C2E',
    optimal: '40-60',
    description: 'Measures microbial activity in soil. Higher values indicate healthier soil biology and better nutrient cycling.',
    regionalAvg: 42,
  },
  {
    key: 'soilMoisture',
    label: 'Soil Moisture',
    unit: '%',
    icon: Droplets,
    color: '#2D5016',
    optimal: '25-40',
    description: 'Water content in soil. Critical for plant growth and microbial activity. Optimal range varies by crop and soil type.',
    regionalAvg: 28,
  },
  {
    key: 'temperature',
    label: 'Temperature',
    unit: '°C',
    icon: Thermometer,
    color: '#E8A838',
    optimal: '15-25',
    description: 'Soil temperature affects seed germination, root growth, and microbial activity. Optimal range for most crops.',
    regionalAvg: 19,
  },
  {
    key: 'pH',
    label: 'pH Level',
    unit: '',
    icon: Beaker,
    color: '#8B5CF6',
    optimal: '6.0-7.0',
    description: 'Measures soil acidity/alkalinity. Affects nutrient availability. Most crops thrive in slightly acidic to neutral soil.',
    regionalAvg: 6.3,
  },
  {
    key: 'conductivity',
    label: 'Conductivity',
    unit: 'mS/cm',
    icon: Zap,
    color: '#F59E0B',
    optimal: '0.4-1.2',
    description: 'Indicates soluble salt levels. High conductivity can indicate over-fertilization or salinity issues.',
    regionalAvg: 0.7,
  },
  {
    key: 'compaction',
    label: 'Compaction',
    unit: 'MPa',
    icon: Gauge,
    color: '#EF4444',
    optimal: '<2.0',
    description: 'Soil density that restricts root growth. Higher values indicate compacted soil that needs aeration or reduced tillage.',
    regionalAvg: 2.3,
  },
  {
    key: 'earthwormActivity',
    label: 'Earthworm Activity',
    unit: 'events/hr',
    icon: Activity,
    color: '#10B981',
    optimal: '10-25',
    description: 'Earthworm presence indicates healthy soil structure. They improve aeration, drainage, and nutrient cycling.',
    regionalAvg: 11,
  },
];

export default function SoilHealthPage() {
  const { probes } = useStore();
  const [selectedMetric, setSelectedMetric] = useState(metrics[0]);
  const [showTooltip, setShowTooltip] = useState(false);

  const currentProbe = probes[0];
  const currentValue = currentProbe?.readings[selectedMetric.key as keyof typeof currentProbe.readings] as number || 0;
  const isOptimal = (() => {
    if (selectedMetric.key === 'compaction') return currentValue < 2.0;
    if (selectedMetric.key === 'pH') return currentValue >= 6.0 && currentValue <= 7.0;
    return true;
  })();

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold text-dark">Soil Health</h1>
        <p className="text-sm text-dark/50 mt-1">Detailed breakdown of all soil health metrics</p>
      </div>

      {/* Metric Selector */}
      <div className="flex flex-wrap gap-2">
        {metrics.map((metric) => (
          <button
            key={metric.key}
            onClick={() => setSelectedMetric(metric)}
            className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-medium transition-all ${
              selectedMetric.key === metric.key
                ? 'bg-forest text-white shadow-sm'
                : 'bg-white text-dark/60 border border-cream-dark/30 hover:border-forest/30'
            }`}
          >
            <metric.icon className="w-3.5 h-3.5" />
            {metric.label}
          </button>
        ))}
      </div>

      {/* Main Metric Card */}
      <div className="bg-white rounded-xl border border-cream-dark/30 p-6 card-hover">
        <div className="flex items-start justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl" style={{ backgroundColor: `${selectedMetric.color}15` }}>
              <selectedMetric.icon className="w-6 h-6 m-3" style={{ color: selectedMetric.color }} />
            </div>
            <div>
              <h2 className="text-xl font-bold text-dark">{selectedMetric.label}</h2>
              <div className="flex items-center gap-2 text-sm text-dark/50">
                <span>Optimal: {selectedMetric.optimal} {selectedMetric.unit}</span>
                <button
                  onClick={() => setShowTooltip(!showTooltip)}
                  className="p-0.5 rounded-full hover:bg-cream transition-colors"
                >
                  <Info className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
          <div className="text-right">
            <div className="text-3xl font-bold text-dark">{currentValue}{selectedMetric.unit}</div>
            <div className={`text-xs font-medium mt-1 ${isOptimal ? 'text-green-600' : 'text-yellow-600'}`}>
              {isOptimal ? 'Within optimal range' : 'Outside optimal range'}
            </div>
          </div>
        </div>

        {showTooltip && (
          <div className="mb-4 p-3 rounded-lg bg-cream/80 border border-cream-dark/30 text-xs text-dark/70 leading-relaxed animate-fade-in">
            {selectedMetric.description}
          </div>
        )}

        {/* Comparison */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="p-4 rounded-xl bg-cream/80 border border-cream-dark/30">
            <div className="text-xs text-dark/50 mb-1">Your Farm</div>
            <div className="text-lg font-bold text-dark">{currentValue}{selectedMetric.unit}</div>
          </div>
          <div className="p-4 rounded-xl bg-cream/80 border border-cream-dark/30">
            <div className="text-xs text-dark/50 mb-1">Regional Average</div>
            <div className="text-lg font-bold text-dark">{selectedMetric.regionalAvg}{selectedMetric.unit}</div>
          </div>
        </div>

        {/* Mini Chart */}
        <div className="h-48">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={currentProbe?.healthHistory.slice(-30) || []}>
              <defs>
                <linearGradient id="metricGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={selectedMetric.color} stopOpacity={0.15} />
                  <stop offset="95%" stopColor={selectedMetric.color} stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#E8DCC4" />
              <XAxis dataKey="date" tick={{ fontSize: 10, fill: '#666' }} tickFormatter={(v) => new Date(v).getDate().toString()} />
              <YAxis domain={[40, 90]} tick={{ fontSize: 10, fill: '#666' }} />
              <Tooltip />
              <Area type="monotone" dataKey="score" stroke={selectedMetric.color} strokeWidth={2} fill="url(#metricGrad)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* All Metrics Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {metrics.map((metric, i) => {
          const val = currentProbe?.readings[metric.key as keyof typeof currentProbe.readings] as number || 0;
          const vsRegional = val > metric.regionalAvg ? 'up' : val < metric.regionalAvg ? 'down' : 'stable';
          return (
            <div
              key={metric.key}
              className="bg-white rounded-xl border border-cream-dark/30 p-4 card-hover animate-fade-in"
              style={{ animationDelay: `${i * 80}ms` }}
            >
              <div className="flex items-center gap-2 mb-3">
                <metric.icon className="w-4 h-4" style={{ color: metric.color }} />
                <span className="text-xs font-medium text-dark/60">{metric.label}</span>
              </div>
              <div className="text-xl font-bold text-dark mb-1">
                {val}{metric.unit}
              </div>
              <div className="flex items-center gap-1 text-xs">
                {vsRegional === 'up' ? (
                  <TrendingUp className="w-3 h-3 text-green-600" />
                ) : vsRegional === 'down' ? (
                  <TrendingDown className="w-3 h-3 text-red-500" />
                ) : (
                  <Minus className="w-3 h-3 text-dark/40" />
                )}
                <span className={vsRegional === 'up' ? 'text-green-600' : vsRegional === 'down' ? 'text-red-500' : 'text-dark/40'}>
                  {vsRegional === 'up' ? 'Above' : vsRegional === 'down' ? 'Below' : 'At'} regional avg
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
