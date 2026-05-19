'use client';

import { useEffect, useState, useCallback } from 'react';
import {
  Activity, Radio, AlertTriangle, TrendingUp, Wind, Droplets,
  Thermometer, Beaker, Zap, Gauge, Leaf, Sparkles, ChevronRight,
  Clock, Check, ExternalLink
} from 'lucide-react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart
} from 'recharts';
import { useStore } from '@/lib/store';
import { mockProbes, mockRecommendations, getOverallHealth, getTrend } from '@/lib/mockData';
import { SoilProbe, AIAnalysis } from '@/lib/types';

function generateRandomReading() {
  return {
    co2Respiration: Math.round((35 + Math.random() * 25) * 10) / 10,
    soilMoisture: Math.round((20 + Math.random() * 30) * 10) / 10,
    temperature: Math.round((14 + Math.random() * 12) * 10) / 10,
    pH: Math.round((5.5 + Math.random() * 1.5) * 10) / 10,
    conductivity: Math.round((0.3 + Math.random() * 1.0) * 100) / 100,
    compaction: Math.round((1.5 + Math.random() * 2.0) * 10) / 10,
    earthwormActivity: Math.round(5 + Math.random() * 20),
  };
}

const sensorConfig = [
  { key: 'co2Respiration', label: 'CO\u2082 Respiration', unit: 'mg/m\u00b2/hr', icon: Wind, color: '#4A7C2E' },
  { key: 'soilMoisture', label: 'Soil Moisture', unit: '%', icon: Droplets, color: '#2D5016' },
  { key: 'temperature', label: 'Temperature', unit: '\u00b0C', icon: Thermometer, color: '#E8A838' },
  { key: 'pH', label: 'pH Level', unit: '', icon: Beaker, color: '#8B5CF6' },
  { key: 'conductivity', label: 'Conductivity', unit: 'mS/cm', icon: Zap, color: '#F59E0B' },
  { key: 'compaction', label: 'Compaction', unit: 'MPa', icon: Gauge, color: '#EF4444' },
  { key: 'earthwormActivity', label: 'Earthworm Activity', unit: 'events/hr', icon: Activity, color: '#10B981' },
];

const timeSince = (minutes: number) => {
  if (minutes < 1) return 'Just now';
  if (minutes === 1) return '1 minute ago';
  if (minutes < 60) return `${minutes} minutes ago`;
  const hours = Math.floor(minutes / 60);
  if (hours === 1) return '1 hour ago';
  return `${hours} hours ago`;
};

function generateDailySummary(
  avgHealth: number, avgMoisture: number, avgTemp: number,
  avgCO2: number, avgPH: number, compactionAvg: number, wormAvg: number
): string {
  const moistureStatus = avgMoisture >= 30 ? 'good' : avgMoisture >= 20 ? 'moderate' : 'low';
  const tempStatus = avgTemp >= 15 && avgTemp <= 25 ? 'optimal' : avgTemp > 25 ? 'warm' : 'cool';
  const co2Status = avgCO2 >= 45 ? 'active' : avgCO2 >= 35 ? 'moderate' : 'low';
  const phStatus = avgPH >= 6.0 && avgPH <= 7.0 ? 'optimal' : avgPH < 6.0 ? 'acidic' : 'alkaline';

  const moistureText = moistureStatus === 'good'
    ? 'Your crops have enough water to drink today. The roots are happy and nutrient uptake is flowing well.'
    : moistureStatus === 'moderate'
    ? 'Your soil is a bit thirsty. Plants may start to feel stressed if this continues \u2014 consider watering today.'
    : 'Your soil is dry. Crops are likely struggling \u2014 they need water soon to avoid wilting and yield loss.';

  const tempText = tempStatus === 'optimal'
    ? 'Perfect temperature for root growth and microbial activity. Your soil biology is working efficiently.'
    : tempStatus === 'warm'
    ? 'A bit warm \u2014 watch for moisture loss through evaporation. Consider mulching to keep the soil cool.'
    : 'On the cooler side \u2014 microbial activity slows down in cold soil. Seed germination may be delayed.';

  const co2Text = co2Status === 'active'
    ? 'Great news! Your soil microbes are breathing actively, which means they are breaking down organic matter and releasing nutrients for your crops.'
    : co2Status === 'moderate'
    ? 'Moderate microbial activity. Your soil biology is working, but could use a boost \u2014 adding compost would help feed the microbes.'
    : 'Low microbial activity. The soil food web is sluggish. Adding organic matter will wake up the biology and improve nutrient cycling.';

  const phText = phStatus === 'optimal'
    ? 'Your pH is in the sweet spot \u2014 nutrients like nitrogen, phosphorus, and potassium are readily available to your crops.'
    : phStatus === 'acidic'
    ? 'Your soil is acidic. At this pH, essential nutrients get locked up and crops cannot access them. Consider applying lime to bring it back to balance.'
    : 'Your soil is alkaline. Some nutrients like iron and zinc become harder for plants to absorb. Sulphur or organic matter can help lower it.';

  const compactionText = compactionAvg < 2.0
    ? 'Soil is loose and airy \u2014 roots can grow deep and water drains well. Great structure!'
    : compactionAvg < 3.0
    ? 'Getting compacted. Roots may struggle to push through. Consider reducing tillage or using a cover crop with deep roots to break it up.'
    : 'Heavily compacted. Roots cannot penetrate, water pools on the surface, and air cannot reach the root zone. Aeration or no-till practices are urgently needed.';

  const wormText = wormAvg >= 12
    ? 'Worms are thriving! They are your best workers \u2014 tilling the soil, creating drainage channels, and leaving nutrient-rich castings.'
    : wormAvg >= 6
    ? 'Some worm activity, but not ideal. Worms are a sign of healthy soil \u2014 if numbers stay low, check for compaction or chemical residues.'
    : 'Very few worms. This is a red flag \u2014 worms avoid unhealthy soil. Focus on reducing chemicals and adding organic matter to bring them back.';

  const bottomLine = avgHealth >= 68
    ? 'Your soil is in decent shape. Small tweaks to moisture management and organic matter will keep it improving.'
    : 'Your soil needs attention today. Focus on the areas flagged above \u2014 especially moisture and biology \u2014 to get back on track.';

  return [
    '\ud83c\udf31 **What your soil is telling you today:**',
    '',
    `Your soil health score is ${Math.round(avgHealth)}/100 \u2014 ${avgHealth >= 68 ? 'looking good, but there is room to grow.' : 'it needs some attention today.'}`,
    '',
    `**Moisture (${Math.round(avgMoisture)}%):** ${moistureText}`,
    '',
    `**Temperature (${Math.round(avgTemp)}\u00b0C):** ${tempText}`,
    '',
    `**CO\u2082 Respiration (${Math.round(avgCO2)} mg/m\u00b2/hr):** ${co2Text}`,
    '',
    `**pH (${avgPH.toFixed(1)}):** ${phText}`,
    '',
    `**Compaction (${compactionAvg.toFixed(1)} MPa):** ${compactionText}`,
    '',
    `**Earthworms (${Math.round(wormAvg)} events/hr):** ${wormText}`,
    '',
    `**\ud83d\udc49 Bottom line for today:** ${bottomLine}`,
  ].join('\n');
}

function generateWeeklySummary(
  avgHealth: number, avgMoisture: number, avgTemp: number,
  avgCO2: number, avgPH: number, compactionAvg: number
): string {
  const moistureStatus = avgMoisture >= 30 ? 'good' : avgMoisture >= 20 ? 'moderate' : 'low';
  const tempStatus = avgTemp >= 15 && avgTemp <= 25 ? 'optimal' : avgTemp > 25 ? 'warm' : 'cool';
  const co2Status = avgCO2 >= 45 ? 'active' : avgCO2 >= 35 ? 'moderate' : 'low';
  const phStatus = avgPH >= 6.0 && avgPH <= 7.0 ? 'optimal' : avgPH < 6.0 ? 'acidic' : 'alkaline';

  const waterText = moistureStatus === 'good'
    ? 'Your crops had consistent access to water \u2014 this supports steady growth and reduces stress.'
    : moistureStatus === 'moderate'
    ? 'Water availability was inconsistent. Plants may have experienced some stress, which can affect fruit and grain development.'
    : 'Dry conditions dominated the week. This will impact yield potential if it continues \u2014 consider investing in irrigation or water retention strategies.';

  const tempText = tempStatus === 'optimal'
    ? 'Ideal temperatures all week \u2014 your soil biology has been working at full capacity, breaking down organic matter and releasing nutrients.'
    : 'Temperature fluctuations may have slowed down biological activity. Mulching helps buffer against temperature swings.';

  const co2Text = co2Status === 'active'
    ? 'working hard \u2014 this means nutrients are being cycled efficiently for your crops.'
    : co2Status === 'moderate'
    ? 'working, but not at full capacity. Adding compost or liquid seaweed can give them a boost.'
    : 'struggling. Without active microbes, nutrients stay locked in the soil and your crops cannot access them.';

  const phText = phStatus === 'optimal'
    ? 'perfectly balanced \u2014 all major nutrients are available for uptake.'
    : phStatus === 'acidic'
    ? 'trending acidic \u2014 this locks up phosphorus and makes aluminium more available, which can harm roots.'
    : 'trending alkaline \u2014 iron and manganese become less available, leading to yellowing leaves and poor growth.';

  let keyInsight: string;
  if (avgMoisture < 25) {
    keyInsight = 'Prioritise irrigation improvements. Your crops are likely water-stressed, which directly reduces yield.';
  } else if (avgPH < 6.0) {
    keyInsight = 'Plan a lime application. Correcting pH is one of the highest-return investments you can make in soil health.';
  } else if (compactionAvg > 2.5) {
    keyInsight = 'Consider introducing a deep-rooted cover crop like radish or lucerne to break up compaction naturally.';
  } else {
    keyInsight = 'Keep doing what you are doing \u2014 consistent management is building long-term soil health.';
  }

  return [
    '\ud83d\udcca **Your farm\u2019s weekly report \u2014 what it means for your crops:**',
    '',
    `**Overall trend:** Your soil health averaged ${Math.round(avgHealth)}/100 this week \u2014 ${avgHealth >= 68 ? 'a solid performance with gradual improvement.' : 'stable but not yet where it needs to be for optimal yields.'}`,
    '',
    `**Water story:** Moisture averaged ${Math.round(avgMoisture)}% across the week. ${waterText}`,
    '',
    `**Soil temperature (${Math.round(avgTemp)}\u00b0C):** ${tempText}`,
    '',
    `**Biology check:** CO\u2082 respiration at ${Math.round(avgCO2)} mg/m\u00b2/hr tells us your soil microbes are ${co2Text}`,
    '',
    `**pH stability:** At ${avgPH.toFixed(1)}, your pH is ${phText}`,
    '',
    `**\ud83d\udd11 Key insight for next week:** ${keyInsight}`,
  ].join('\n');
}

function generateMonthlySummary(
  avgHealth: number, avgMoisture: number, avgTemp: number,
  avgCO2: number, avgPH: number, compactionAvg: number, wormAvg: number
): string {
  const moistureStatus = avgMoisture >= 30 ? 'good' : avgMoisture >= 20 ? 'moderate' : 'low';
  const co2Status = avgCO2 >= 45 ? 'active' : avgCO2 >= 35 ? 'moderate' : 'low';

  const monthName = new Date().toLocaleDateString('en-ZA', { month: 'long', year: 'numeric' });

  let yieldText: string;
  if (avgHealth >= 70) {
    yieldText = 'At this health level, your soil can support strong yields. Expect good grain/fruit fill and plant vigour.';
  } else if (avgHealth >= 60) {
    yieldText = 'Yield potential is moderate. You may see some stress-related losses, especially during dry spells or heat waves.';
  } else {
    yieldText = 'Yield potential is at risk. Poor soil health directly translates to smaller plants, lower yields, and reduced quality.';
  }

  const waterText = moistureStatus === 'good'
    ? 'using water efficiently. Healthy soil with good organic matter acts like a sponge, holding water for longer.'
    : moistureStatus === 'moderate'
    ? 'losing more water than ideal. Each 1% increase in organic matter can hold an extra 20,000 litres of water per hectare.'
    : 'struggling with water retention. Building soil organic matter should be your top priority \u2014 it is the best investment for drought resilience.';

  const lifeText = co2Status === 'active' && wormAvg >= 12
    ? 'Your soil is alive and thriving! Active microbes and earthworms mean nutrients are being cycled naturally, reducing your fertiliser needs over time.'
    : 'Your soil biology needs a boost. Think of it as your underground workforce \u2014 without them, you are paying for fertilisers that the soil cannot efficiently use.';

  const trendText = avgHealth >= 68
    ? 'Your soil health is on an upward trajectory. The practices you are implementing \u2014 whether it is reduced tillage, cover cropping, or compost additions \u2014 are working. Keep going!'
    : 'Soil health has been stable but not improving. This is a plateau \u2014 to break through, consider adding a new practice like compost tea, biochar, or a diverse cover crop mix.';

  const forecastText = avgHealth >= 68
    ? 'If current trends continue, expect +3-5 points improvement in the next 30 days. Your crops will benefit from better nutrient availability and water holding capacity.'
    : 'With targeted interventions (focus on the weakest metric first), you could see +5-8 points improvement in 60 days. Small changes compound over time.';

  let priorityText: string;
  if (avgMoisture < 25) {
    priorityText = 'Improve water management \u2014 this is your biggest yield-limiting factor right now.';
  } else if (avgPH < 6.0 || avgPH > 7.0) {
    priorityText = 'Correct your pH \u2014 it is the foundation that all other nutrients depend on.';
  } else if (compactionAvg > 2.5) {
    priorityText = 'Address soil compaction \u2014 it is silently restricting root growth and water infiltration.';
  } else {
    priorityText = 'Build organic matter \u2014 it improves everything: water holding, nutrient cycling, and soil structure.';
  }

  return [
    '\ud83d\udcc8 **Monthly soil health assessment \u2014 ' + monthName + '**',
    '',
    `**The big picture:** Your soil health score is ${Math.round(avgHealth)}/100. ${avgHealth >= 68 ? 'This is a solid score \u2014 your soil is functioning well and supporting crop growth effectively.' : 'This is below optimal \u2014 your soil is not performing at its best, which means your crops are not reaching their full potential either.'}`,
    '',
    '**What this means for your production:**',
    '',
    `\ud83c\udf3e **Yield impact:** ${yieldText}`,
    '',
    `\ud83d\udca7 **Water efficiency:** With ${Math.round(avgMoisture)}% average moisture, your farm is ${waterText}`,
    '',
    `\ud83e\udeb1 **Soil life:** ${lifeText}`,
    '',
    `**\ud83d\udcca 30-day trend:** ${trendText}`,
    '',
    `**\ud83d\udd2e Forecast for next month:** ${forecastText}`,
    '',
    `**\ud83c\udfaf Your top priority this month:** ${priorityText}`,
  ].join('\n');
}

export default function DashboardPage() {
  const { recommendations, markRecommendationDone, addToast, farmSetup, aiAnalysis, setAiAnalysis, aiLoading, setAiLoading } = useStore();
  const [currentProbes, setCurrentProbes] = useState<SoilProbe[]>(mockProbes);
  const [currentTime, setCurrentTime] = useState('');
  const [showAiSummary, setShowAiSummary] = useState(false);
  const [aiSummaryPeriod, setAiSummaryPeriod] = useState<'daily' | 'weekly' | 'monthly'>('daily');

  // Update time
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(now.toLocaleDateString('en-ZA', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      }));
    };
    updateTime();
    const interval = setInterval(updateTime, 30000);
    return () => clearInterval(interval);
  }, []);

  // Simulate real-time data updates
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentProbes(prev => prev.map(probe => ({
        ...probe,
        readings: generateRandomReading(),
        lastSync: timeSince(Math.floor(Math.random() * 10)),
        healthHistory: [
          ...probe.healthHistory.slice(1),
          {
            date: new Date().toISOString().split('T')[0],
            score: Math.round((60 + Math.random() * 15) * 10) / 10,
          },
        ],
      })));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  // Generate AI Analysis
  const generateAiSummary = useCallback(async (period: 'daily' | 'weekly' | 'monthly') => {
    setAiLoading(true);
    setAiSummaryPeriod(period);

    // Simulate AI analysis with realistic data
    setTimeout(() => {
      const avgHealth = currentProbes.reduce((sum, p) => {
        const last = p.healthHistory[p.healthHistory.length - 1];
        return sum + (last?.score || 65);
      }, 0) / currentProbes.length;

      const avgMoisture = currentProbes.reduce((sum, p) => sum + p.readings.soilMoisture, 0) / currentProbes.length;
      const avgTemp = currentProbes.reduce((sum, p) => sum + p.readings.temperature, 0) / currentProbes.length;
      const avgCO2 = currentProbes.reduce((sum, p) => sum + p.readings.co2Respiration, 0) / currentProbes.length;
      const avgPH = currentProbes.reduce((sum, p) => sum + p.readings.pH, 0) / currentProbes.length;
      const compactionAvg = currentProbes.reduce((sum, p) => sum + p.readings.compaction, 0) / currentProbes.length;
      const wormAvg = currentProbes.reduce((sum, p) => sum + p.readings.earthwormActivity, 0) / currentProbes.length;

      const summaries: Record<string, AIAnalysis> = {
        daily: {
          daily: generateDailySummary(avgHealth, avgMoisture, avgTemp, avgCO2, avgPH, compactionAvg, wormAvg),
          weekly: '',
          monthly: '',
          trend: avgHealth >= 68 ? 'improving' : 'stable',
          progress: Math.round(avgHealth),
        },
        weekly: {
          daily: '',
          weekly: generateWeeklySummary(avgHealth, avgMoisture, avgTemp, avgCO2, avgPH, compactionAvg),
          monthly: '',
          trend: avgHealth >= 68 ? 'improving' : 'stable',
          progress: Math.round(avgHealth),
        },
        monthly: {
          daily: '',
          weekly: '',
          monthly: generateMonthlySummary(avgHealth, avgMoisture, avgTemp, avgCO2, avgPH, compactionAvg, wormAvg),
          trend: avgHealth >= 68 ? 'improving' : 'stable',
          progress: Math.round(avgHealth),
        },
      };

      setAiAnalysis(summaries[period]);
      setShowAiSummary(true);
      setAiLoading(false);
    }, 2000);
  }, [currentProbes, setAiAnalysis, setAiLoading]);

  const overallHealth = getOverallHealth();
  const trend = getTrend();

  const handleMarkDone = (id: string) => {
    markRecommendationDone(id);
    addToast('Action marked as complete!', 'success');
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div>
          <h1 className="text-2xl font-bold text-dark">Dashboard</h1>
          <p className="text-sm text-dark/50">{currentTime}</p>
        </div>
        {farmSetup && (
          <div className="text-sm text-dark/60 bg-white px-4 py-2 rounded-lg border border-cream-dark/30">
            {farmSetup.farmName} &middot; {farmSetup.farmSize}ha &middot; {farmSetup.province}
          </div>
        )}
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          {
            label: 'Overall Soil Health',
            value: `${overallHealth}/100`,
            sub: trend.direction === 'up' ? `\u2191 +${trend.value} from last week` : trend.direction === 'down' ? `\u2193 -${trend.value} from last week` : '\u2192 Stable',
            subColor: trend.direction === 'up' ? 'text-green-600' : trend.direction === 'down' ? 'text-red-500' : 'text-dark/50',
            badge: overallHealth >= 70 ? 'Good' : overallHealth >= 60 ? 'Moderate' : 'Needs Attention',
            badgeColor: overallHealth >= 70 ? 'bg-green-100 text-green-700' : overallHealth >= 60 ? 'bg-yellow-100 text-yellow-700' : 'bg-red-100 text-red-700',
            icon: Activity,
            iconBg: 'bg-forest/10 text-forest',
          },
          {
            label: 'Active Probes',
            value: `${currentProbes.filter(p => p.status === 'online').length}`,
            sub: 'All Online',
            subColor: 'text-green-600',
            badge: '',
            badgeColor: '',
            icon: Radio,
            iconBg: 'bg-blue-100 text-blue-600',
          },
          {
            label: 'Action Items',
            value: `${recommendations.filter(r => r.status === 'pending').length}`,
            sub: `${recommendations.filter(r => r.priority === 'URGENT' && r.status === 'pending').length} Urgent`,
            subColor: 'text-red-500',
            badge: '',
            badgeColor: '',
            icon: AlertTriangle,
            iconBg: 'bg-orange-100 text-orange-600',
          },
          {
            label: 'Estimated Yield',
            value: '2.8 t/ha',
            sub: '\u2191 +18% potential',
            subColor: 'text-green-600',
            badge: '',
            badgeColor: '',
            icon: TrendingUp,
            iconBg: 'bg-green-100 text-green-600',
          },
        ].map((stat, i) => (
          <div key={i} className="bg-white rounded-xl border border-cream-dark/30 p-4 card-hover animate-fade-in" style={{ animationDelay: `${i * 100}ms` }}>
            <div className="flex items-start justify-between mb-3">
              <div className={`w-10 h-10 rounded-lg ${stat.iconBg} flex items-center justify-center`}>
                <stat.icon className="w-5 h-5" />
              </div>
              {stat.badge && (
                <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${stat.badgeColor}`}>
                  {stat.badge}
                </span>
              )}
            </div>
            <div className="text-2xl font-bold text-dark">{stat.value}</div>
            <div className="text-xs text-dark/50 mt-0.5">{stat.label}</div>
            <div className={`text-xs font-medium mt-1 ${stat.subColor}`}>{stat.sub}</div>
          </div>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid xl:grid-cols-3 gap-6">
        {/* Soil Health Chart */}
        <div className="xl:col-span-2 bg-white rounded-xl border border-cream-dark/30 p-5 card-hover">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold text-dark">Soil Health Trends (Last 90 Days)</h2>
            <div className="flex items-center gap-3 text-xs">
              {currentProbes.map((probe, i) => (
                <div key={probe.id} className="flex items-center gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: ['#2D5016', '#4A7C2E', '#6B9E4A'][i] }} />
                  <span className="text-dark/60">{probe.name.split('-')[0].trim()}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={currentProbes[0]?.healthHistory || []}>
                <defs>
                  <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#2D5016" stopOpacity={0.15} />
                    <stop offset="95%" stopColor="#2D5016" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#E8DCC4" />
                <XAxis
                  dataKey="date"
                  tick={{ fontSize: 10, fill: '#666' }}
                  tickFormatter={(val) => {
                    const d = new Date(val);
                    return `${d.getDate()}/${d.getMonth() + 1}`;
                  }}
                  interval={14}
                />
                <YAxis domain={[40, 90]} tick={{ fontSize: 10, fill: '#666' }} />
                <Tooltip
                  contentStyle={{
                    background: '#fff',
                    border: '1px solid #E8DCC4',
                    borderRadius: '8px',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
                  }}
                  labelFormatter={(val) => new Date(val).toLocaleDateString('en-ZA')}
                />
                {currentProbes.map((probe, i) => (
                  <Area
                    key={probe.id}
                    type="monotone"
                    dataKey="score"
                    data={probe.healthHistory}
                    stroke={['#2D5016', '#4A7C2E', '#6B9E4A'][i]}
                    strokeWidth={2}
                    fill="url(#colorScore)"
                    dot={false}
                    name={probe.name}
                  />
                ))}
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Live Sensor Readings */}
        <div className="bg-white rounded-xl border border-cream-dark/30 p-5 card-hover">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold text-dark">Live Sensor Readings</h2>
            <div className="flex items-center gap-1.5 text-xs text-green-600">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse-dot" />
              Live
            </div>
          </div>

          <div className="space-y-4 max-h-[400px] overflow-y-auto pr-1">
            {currentProbes.slice(0, 2).map((probe) => (
              <div key={probe.id} className="p-3 rounded-xl bg-cream/80 border border-cream-dark/30">
                <div className="flex items-center justify-between mb-2">
                  <div className="font-medium text-sm text-dark">{probe.name}</div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse-dot" />
                    <span className="text-[10px] text-green-600 font-medium">Online</span>
                  </div>
                </div>
                <div className="text-[10px] text-dark/40 mb-2 flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  Updated {probe.lastSync}
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {sensorConfig.slice(0, 6).map((sensor) => {
                    const value = probe.readings[sensor.key as keyof typeof probe.readings];
                    return (
                      <div key={sensor.key} className="flex items-center gap-1.5 text-xs">
                        <sensor.icon className="w-3 h-3 text-forest shrink-0" />
                        <span className="text-dark/60">{sensor.label}:</span>
                        <span className="font-semibold text-dark">{value}{sensor.unit}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

          <button className="w-full mt-3 text-xs text-forest font-medium hover:text-forest-light transition-colors flex items-center justify-center gap-1 py-2">
            View All Details
            <ChevronRight className="w-3 h-3" />
          </button>
        </div>
      </div>

      {/* AI Summary Section */}
      <div className="bg-white rounded-xl border border-cream-dark/30 p-5 card-hover">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-forest" />
            <h2 className="font-semibold text-dark">AI Soil Analysis</h2>
          </div>
          <div className="flex items-center gap-2">
            {(['daily', 'weekly', 'monthly'] as const).map((period) => (
              <button
                key={period}
                onClick={() => generateAiSummary(period)}
                disabled={aiLoading}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  aiSummaryPeriod === period && showAiSummary
                    ? 'bg-forest text-white'
                    : 'bg-cream text-dark/60 hover:bg-cream-dark/50'
                }`}
              >
                {period.charAt(0).toUpperCase() + period.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {aiLoading ? (
          <div className="flex items-center justify-center py-8">
            <div className="flex flex-col items-center gap-3">
              <div className="w-8 h-8 border-2 border-forest border-t-transparent rounded-full animate-spin" />
              <span className="text-sm text-dark/50">Analyzing soil data...</span>
            </div>
          </div>
        ) : showAiSummary && aiAnalysis ? (
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className={`px-2.5 py-1 rounded-full text-xs font-semibold ${
                aiAnalysis.trend === 'improving' ? 'bg-green-100 text-green-700' :
                aiAnalysis.trend === 'declining' ? 'bg-red-100 text-red-700' :
                'bg-yellow-100 text-yellow-700'
              }`}>
                {aiAnalysis.trend === 'improving' ? '\u2191 Improving' : aiAnalysis.trend === 'declining' ? '\u2193 Declining' : '\u2192 Stable'}
              </div>
              <div className="flex-1 h-2 bg-cream-dark/30 rounded-full overflow-hidden">
                <div
                  className="h-full bg-forest rounded-full transition-all duration-1000"
                  style={{ width: `${aiAnalysis.progress}%` }}
                />
              </div>
              <span className="text-xs font-semibold text-dark">{aiAnalysis.progress}/100</span>
            </div>

            <div className="p-4 rounded-xl bg-cream/80 border border-cream-dark/30">
              <p className="text-sm text-dark/80 leading-relaxed whitespace-pre-line">
                {aiSummaryPeriod === 'daily' ? aiAnalysis.daily :
                 aiSummaryPeriod === 'weekly' ? aiAnalysis.weekly :
                 aiAnalysis.monthly}
              </p>
            </div>

            <div className="flex items-center gap-2 text-xs text-dark/40">
              <Sparkles className="w-3 h-3" />
              AI-powered analysis based on real-time sensor data
            </div>
          </div>
        ) : (
          <div className="text-center py-8">
            <Sparkles className="w-10 h-10 text-forest/30 mx-auto mb-3" />
            <p className="text-sm text-dark/50">Select a period above to generate an AI-powered soil analysis</p>
          </div>
        )}
      </div>

      {/* AI Recommendations */}
      <div className="bg-white rounded-xl border border-cream-dark/30 p-5 card-hover">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-semibold text-dark">Recommended Actions</h2>
          <span className="text-xs text-dark/40">{recommendations.filter(r => r.status === 'pending').length} pending</span>
        </div>

        <div className="space-y-3">
          {recommendations.filter(r => r.status === 'pending').slice(0, 4).map((rec, i) => (
            <div
              key={rec.id}
              className="flex items-start gap-4 p-4 rounded-xl bg-cream/80 border border-cream-dark/30 card-hover animate-fade-in"
              style={{ animationDelay: `${i * 100}ms` }}
            >
              <div className={`shrink-0 px-2 py-1 rounded text-[10px] font-bold ${
                rec.priority === 'URGENT' ? 'bg-red-100 text-red-700' :
                rec.priority === 'MEDIUM' ? 'bg-yellow-100 text-yellow-700' :
                'bg-green-100 text-green-700'
              }`}>
                {rec.priority}
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-dark text-sm">{rec.title}</h3>
                <p className="text-xs text-dark/60 mt-0.5">{rec.description}</p>
                <div className="flex items-center gap-2 mt-2">
                  <TrendingUp className="w-3 h-3 text-green-600" />
                  <span className="text-xs text-green-600 font-medium">{rec.impact}</span>
                </div>
              </div>
              <button
                onClick={() => handleMarkDone(rec.id)}
                className="shrink-0 px-3 py-1.5 rounded-lg border border-forest/30 text-forest text-xs font-medium hover:bg-forest hover:text-white transition-all"
              >
                <Check className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
