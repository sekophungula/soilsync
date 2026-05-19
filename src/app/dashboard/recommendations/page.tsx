'use client';

import { useState } from 'react';
import { Lightbulb, Check, TrendingUp, Filter, Search, ChevronDown, Sparkles } from 'lucide-react';
import { useStore } from '@/lib/store';

export default function RecommendationsPage() {
  const { recommendations, markRecommendationDone, addToast } = useStore();
  const [filterPriority, setFilterPriority] = useState<string>('all');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filtered = recommendations.filter((r) => {
    if (filterPriority !== 'all' && r.priority !== filterPriority) return false;
    if (filterStatus !== 'all' && r.status !== filterStatus) return false;
    if (searchQuery && !r.title.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    return true;
  });

  const handleMarkDone = (id: string) => {
    markRecommendationDone(id);
    addToast('Action marked as complete!', 'success');
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold text-dark">Recommendations</h1>
        <p className="text-sm text-dark/50 mt-1">AI-powered insights to improve your soil health</p>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3">
        <div className="relative flex-1 min-w-[200px] max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-dark/40" />
          <input
            type="text"
            placeholder="Search recommendations..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 rounded-lg border border-cream-dark/50 bg-white text-sm focus:border-forest focus:ring-2 focus:ring-forest/20 outline-none transition-all"
          />
        </div>
        <select
          value={filterPriority}
          onChange={(e) => setFilterPriority(e.target.value)}
          className="px-3 py-2 rounded-lg border border-cream-dark/50 bg-white text-sm text-dark/70 focus:border-forest outline-none transition-all"
        >
          <option value="all">All Priorities</option>
          <option value="URGENT">Urgent</option>
          <option value="MEDIUM">Medium</option>
          <option value="LOW">Low</option>
        </select>
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="px-3 py-2 rounded-lg border border-cream-dark/50 bg-white text-sm text-dark/70 focus:border-forest outline-none transition-all"
        >
          <option value="all">All Status</option>
          <option value="pending">Pending</option>
          <option value="completed">Completed</option>
        </select>
      </div>

      {/* Success Stories */}
      <div className="bg-gradient-to-r from-forest/5 to-forest/10 rounded-xl border border-forest/20 p-5">
        <div className="flex items-center gap-2 mb-3">
          <Sparkles className="w-5 h-5 text-forest" />
          <h3 className="font-semibold text-dark text-sm">Success Stories</h3>
        </div>
        <p className="text-sm text-dark/70">
          Farmers who followed similar recommendations saw an average of <strong className="text-forest">+25% yield improvement</strong> and <strong className="text-forest">+18 points soil health increase</strong> within 6 months.
        </p>
      </div>

      {/* Recommendations List */}
      <div className="space-y-3">
        {filtered.length === 0 ? (
          <div className="text-center py-12 text-dark/40">
            <Lightbulb className="w-12 h-12 mx-auto mb-3 opacity-30" />
            <p>No recommendations match your filters</p>
          </div>
        ) : (
          filtered.map((rec, i) => (
            <div
              key={rec.id}
              className={`bg-white rounded-xl border p-5 card-hover animate-fade-in ${
                rec.status === 'completed' ? 'border-green-200 opacity-60' : 'border-cream-dark/30'
              }`}
              style={{ animationDelay: `${i * 80}ms` }}
            >
              <div className="flex items-start gap-4">
                <div className={`shrink-0 px-2.5 py-1 rounded text-[10px] font-bold ${
                  rec.priority === 'URGENT' ? 'bg-red-100 text-red-700' :
                  rec.priority === 'MEDIUM' ? 'bg-yellow-100 text-yellow-700' :
                  'bg-green-100 text-green-700'
                }`}>
                  {rec.priority}
                </div>
                <div className="flex-1">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className={`font-semibold text-dark ${rec.status === 'completed' ? 'line-through' : ''}`}>
                        {rec.title}
                      </h3>
                      <p className="text-sm text-dark/60 mt-1">{rec.description}</p>
                    </div>
                    {rec.status === 'pending' && (
                      <button
                        onClick={() => handleMarkDone(rec.id)}
                        className="shrink-0 px-3 py-1.5 rounded-lg bg-forest text-white text-xs font-medium hover:bg-forest-light transition-all"
                      >
                        <Check className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                  <div className="flex items-center gap-3 mt-3">
                    <div className="flex items-center gap-1 text-xs text-green-600">
                      <TrendingUp className="w-3 h-3" />
                      <span className="font-medium">{rec.impact}</span>
                    </div>
                    <span className="text-[10px] text-dark/40">
                      {rec.status === 'completed' ? 'Completed' : `Created ${new Date(rec.createdAt).toLocaleDateString('en-ZA')}`}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
