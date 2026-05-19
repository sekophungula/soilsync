'use client';

import { useState } from 'react';
import { Radio, Plus, Battery, MapPin, Clock, Wifi, WifiOff, X } from 'lucide-react';
import { useStore } from '@/lib/store';

export default function ProbesPage() {
  const { probes, addToast } = useStore();
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-dark">My Probes</h1>
          <p className="text-sm text-dark/50 mt-1">Manage your soil monitoring probes</p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-forest text-white text-sm font-semibold hover:bg-forest-light transition-all shadow-sm"
        >
          <Plus className="w-4 h-4" />
          Add New Probe
        </button>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {probes.map((probe, i) => (
          <div
            key={probe.id}
            className="bg-white rounded-xl border border-cream-dark/30 p-5 card-hover animate-fade-in"
            style={{ animationDelay: `${i * 100}ms` }}
          >
            <div className="flex items-start justify-between mb-4">
              <div className="w-10 h-10 rounded-lg bg-forest/10 flex items-center justify-center">
                <Radio className="w-5 h-5 text-forest" />
              </div>
              <div className="flex items-center gap-1.5">
                {probe.status === 'online' ? (
                  <>
                    <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse-dot" />
                    <span className="text-[10px] text-green-600 font-medium">Online</span>
                  </>
                ) : (
                  <>
                    <span className="w-2 h-2 rounded-full bg-red-500" />
                    <span className="text-[10px] text-red-600 font-medium">Offline</span>
                  </>
                )}
              </div>
            </div>

            <h3 className="font-semibold text-dark mb-1">{probe.name}</h3>
            <div className="flex items-center gap-1 text-xs text-dark/50 mb-3">
              <MapPin className="w-3 h-3" />
              {probe.location}
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="text-dark/60 flex items-center gap-1">
                  <Battery className="w-3 h-3" />
                  Battery
                </span>
                <span className={`font-semibold ${probe.batteryLevel > 50 ? 'text-green-600' : probe.batteryLevel > 20 ? 'text-yellow-600' : 'text-red-600'}`}>
                  {probe.batteryLevel}%
                </span>
              </div>
              <div className="w-full h-1.5 bg-cream-dark/30 rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all ${
                    probe.batteryLevel > 50 ? 'bg-green-500' : probe.batteryLevel > 20 ? 'bg-yellow-500' : 'bg-red-500'
                  }`}
                  style={{ width: `${probe.batteryLevel}%` }}
                />
              </div>
              <div className="flex items-center gap-1 text-[10px] text-dark/40 mt-2">
                <Clock className="w-3 h-3" />
                Last sync: {probe.lastSync}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add Probe Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/30 z-50 flex items-center justify-center p-4" onClick={() => setShowModal(false)}>
          <div className="bg-white rounded-2xl shadow-xl max-w-md w-full p-6 animate-fade-in" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-dark">Add New Probe</h2>
              <button onClick={() => setShowModal(false)} className="p-1 rounded-lg hover:bg-cream transition-colors">
                <X className="w-5 h-5 text-dark/50" />
              </button>
            </div>

            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-cream/80 border border-cream-dark/30">
                <h3 className="font-semibold text-dark text-sm mb-2">Setup Instructions</h3>
                <ol className="space-y-2 text-xs text-dark/60">
                  <li className="flex items-start gap-2">
                    <span className="w-5 h-5 rounded-full bg-forest/10 text-forest flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5">1</span>
                    Place the SoilSync probe in your chosen field location
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-5 h-5 rounded-full bg-forest/10 text-forest flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5">2</span>
                    Press the power button until the LED blinks green
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-5 h-5 rounded-full bg-forest/10 text-forest flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5">3</span>
                    Wait for the probe to connect to the network (30-60 seconds)
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-5 h-5 rounded-full bg-forest/10 text-forest flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5">4</span>
                    The probe will appear in your dashboard automatically
                  </li>
                </ol>
              </div>

              <p className="text-xs text-dark/40 text-center">
                In this demo, probes are simulated. Real probes connect automatically when powered on.
              </p>

              <button
                onClick={() => {
                  setShowModal(false);
                  addToast('New probe connection simulated. In production, probes connect automatically.', 'info');
                }}
                className="w-full px-4 py-2.5 rounded-lg bg-forest text-white text-sm font-semibold hover:bg-forest-light transition-all"
              >
                Simulate Probe Connection
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
