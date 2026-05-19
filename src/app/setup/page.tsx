'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Check, ChevronRight, Radio, MapPin, Sprout, Shield } from 'lucide-react';
import Logo from '@/components/Logo';
import { useStore } from '@/lib/store';
import { provinces, soilTypes, cropOptions } from '@/lib/mockData';

export default function SetupPage() {
  const router = useRouter();
  const { setAuth, setFarmSetup, completeSetup, addToast } = useStore();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);

  // Form state
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [farmName, setFarmName] = useState('');
  const [farmSize, setFarmSize] = useState('');
  const [province, setProvince] = useState('');
  const [ownership, setOwnership] = useState('');
  const [primaryCrops, setPrimaryCrops] = useState('');
  const [soilType, setSoilType] = useState('');

  const handleStep1 = (e: React.FormEvent) => {
    e.preventDefault();
    if (name && email) {
      setStep(2);
    }
  };

  const handleStep2 = (e: React.FormEvent) => {
    e.preventDefault();
    if (farmName && farmSize && province && ownership) {
      setStep(3);
    }
  };

  const handleStep3 = (e: React.FormEvent) => {
    e.preventDefault();
    setStep(4);
  };

  const handleComplete = () => {
    setLoading(true);
    setTimeout(() => {
      setAuth(name, email);
      setFarmSetup({
        farmName,
        farmSize: parseFloat(farmSize),
        province,
        ownership: ownership as any,
        primaryCrops,
        soilType,
        setupComplete: true,
      });
      completeSetup();
      addToast('Farm setup complete! Welcome to SoilSync.', 'success');
      router.push('/dashboard');
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-cream flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-lg">
        {/* Logo */}
        <Link href="/" className="flex items-center justify-center mb-8 group">
          <Logo iconSize={40} textClassName="text-2xl font-bold text-forest" />
        </Link>

        {/* Progress Steps */}
        <div className="flex items-center justify-center gap-2 mb-8">
          {[1, 2, 3, 4].map((s) => (
            <div key={s} className="flex items-center gap-2">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold transition-all ${
                  s < step
                    ? 'bg-forest text-white'
                    : s === step
                    ? 'bg-forest text-white ring-4 ring-forest/20'
                    : 'bg-cream-dark/50 text-dark/40'
                }`}
              >
                {s < step ? <Check className="w-4 h-4" /> : s}
              </div>
              {s < 4 && (
                <div className={`w-8 h-0.5 ${s < step ? 'bg-forest' : 'bg-cream-dark/50'}`} />
              )}
            </div>
          ))}
        </div>

        {/* Card */}
        <div className="bg-white rounded-2xl shadow-xl border border-cream-dark/30 p-8 animate-fade-in">
          {/* Step 1: Personal Info */}
          {step === 1 && (
            <form onSubmit={handleStep1}>
              <div className="text-center mb-6">
                <div className="w-14 h-14 rounded-xl bg-forest/10 flex items-center justify-center mx-auto mb-4 overflow-hidden">
                  <Image src="/soilsync logo.svg" alt="" width={32} height={32} className="object-contain" />
                </div>
                <h2 className="text-2xl font-bold text-dark">Welcome to SoilSync</h2>
                <p className="text-dark/60 mt-1">Let's get to know you first</p>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-dark/80 mb-1.5">Full Name</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="John Farmer"
                    className="w-full px-4 py-2.5 rounded-lg border border-cream-dark/50 bg-cream/50 focus:bg-white focus:border-forest focus:ring-2 focus:ring-forest/20 outline-none transition-all text-dark"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-dark/80 mb-1.5">Email Address</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="john@farm.co.za"
                    className="w-full px-4 py-2.5 rounded-lg border border-cream-dark/50 bg-cream/50 focus:bg-white focus:border-forest focus:ring-2 focus:ring-forest/20 outline-none transition-all text-dark"
                    required
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full mt-6 inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-forest text-white font-semibold hover:bg-forest-light transition-all shadow-md"
              >
                Continue
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          )}

          {/* Step 2: Farm Details */}
          {step === 2 && (
            <form onSubmit={handleStep2}>
              <div className="text-center mb-6">
                <div className="w-14 h-14 rounded-xl bg-forest/10 flex items-center justify-center mx-auto mb-4">
                  <MapPin className="w-7 h-7 text-forest" />
                </div>
                <h2 className="text-2xl font-bold text-dark">Farm Details</h2>
                <p className="text-dark/60 mt-1">Tell us about your farm</p>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-dark/80 mb-1.5">Farm Name</label>
                  <input
                    type="text"
                    value={farmName}
                    onChange={(e) => setFarmName(e.target.value)}
                    placeholder="Green Valley Farm"
                    className="w-full px-4 py-2.5 rounded-lg border border-cream-dark/50 bg-cream/50 focus:bg-white focus:border-forest focus:ring-2 focus:ring-forest/20 outline-none transition-all text-dark"
                    required
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-dark/80 mb-1.5">Size (hectares)</label>
                    <input
                      type="number"
                      value={farmSize}
                      onChange={(e) => setFarmSize(e.target.value)}
                      placeholder="50"
                      min="0"
                      step="0.1"
                      className="w-full px-4 py-2.5 rounded-lg border border-cream-dark/50 bg-cream/50 focus:bg-white focus:border-forest focus:ring-2 focus:ring-forest/20 outline-none transition-all text-dark"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-dark/80 mb-1.5">Province</label>
                    <select
                      value={province}
                      onChange={(e) => setProvince(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-lg border border-cream-dark/50 bg-cream/50 focus:bg-white focus:border-forest focus:ring-2 focus:ring-forest/20 outline-none transition-all text-dark"
                      required
                    >
                      <option value="">Select...</option>
                      {provinces.map((p) => (
                        <option key={p} value={p}>{p}</option>
                      ))}
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-dark/80 mb-1.5">Ownership Type</label>
                  <div className="grid grid-cols-2 gap-3">
                    {[
                      { value: 'privately-owned', label: 'Private', icon: Shield },
                      { value: 'communal', label: 'Communal', icon: Sprout },
                      { value: 'leased', label: 'Leased', icon: MapPin },
                      { value: 'government', label: 'Government', icon: Shield },
                    ].map((opt) => (
                      <button
                        key={opt.value}
                        type="button"
                        onClick={() => setOwnership(opt.value)}
                        className={`flex items-center gap-2 px-3 py-2.5 rounded-lg border text-sm font-medium transition-all ${
                          ownership === opt.value
                            ? 'border-forest bg-forest/5 text-forest'
                            : 'border-cream-dark/50 bg-cream/50 text-dark/60 hover:border-forest/30'
                        }`}
                      >
                        <opt.icon className="w-4 h-4" />
                        {opt.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex gap-3 mt-6">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="flex-1 px-4 py-3 rounded-lg border-2 border-cream-dark/50 text-dark/60 font-medium hover:border-cream-dark transition-all"
                >
                  Back
                </button>
                <button
                  type="submit"
                  className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-forest text-white font-semibold hover:bg-forest-light transition-all shadow-md"
                >
                  Continue
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </form>
          )}

          {/* Step 3: Crops & Soil */}
          {step === 3 && (
            <form onSubmit={handleStep3}>
              <div className="text-center mb-6">
                <div className="w-14 h-14 rounded-xl bg-forest/10 flex items-center justify-center mx-auto mb-4">
                  <Sprout className="w-7 h-7 text-forest" />
                </div>
                <h2 className="text-2xl font-bold text-dark">Crops & Soil</h2>
                <p className="text-dark/60 mt-1">What are you growing?</p>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-dark/80 mb-1.5">Primary Crop</label>
                  <select
                    value={primaryCrops}
                    onChange={(e) => setPrimaryCrops(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-lg border border-cream-dark/50 bg-cream/50 focus:bg-white focus:border-forest focus:ring-2 focus:ring-forest/20 outline-none transition-all text-dark"
                    required
                  >
                    <option value="">Select primary crop...</option>
                    {cropOptions.map((c) => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-dark/80 mb-1.5">Soil Type</label>
                  <select
                    value={soilType}
                    onChange={(e) => setSoilType(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-lg border border-cream-dark/50 bg-cream/50 focus:bg-white focus:border-forest focus:ring-2 focus:ring-forest/20 outline-none transition-all text-dark"
                    required
                  >
                    <option value="">Select soil type...</option>
                    {soilTypes.map((s) => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="flex gap-3 mt-6">
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="flex-1 px-4 py-3 rounded-lg border-2 border-cream-dark/50 text-dark/60 font-medium hover:border-cream-dark transition-all"
                >
                  Back
                </button>
                <button
                  type="submit"
                  className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-forest text-white font-semibold hover:bg-forest-light transition-all shadow-md"
                >
                  Continue
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </form>
          )}

          {/* Step 4: Connect Probe (Demo) */}
          {step === 4 && (
            <div>
              <div className="text-center mb-6">
                <div className="w-14 h-14 rounded-xl bg-forest/10 flex items-center justify-center mx-auto mb-4">
                  <Radio className="w-7 h-7 text-forest" />
                </div>
                <h2 className="text-2xl font-bold text-dark">Connect Your Probe</h2>
                <p className="text-dark/60 mt-1">We found 3 SoilSync probes nearby</p>
              </div>

              <div className="space-y-3 mb-6">
                {[
                  { id: 'P-001', name: 'Field A - North Plot', signal: 'Strong' },
                  { id: 'P-002', name: 'Field B - South Plot', signal: 'Good' },
                  { id: 'P-003', name: 'Field C - East Plot', signal: 'Strong' },
                ].map((probe, i) => (
                  <div
                    key={probe.id}
                    className="flex items-center gap-4 p-4 rounded-xl border border-cream-dark/30 bg-cream/50 hover:bg-forest/5 hover:border-forest/30 transition-all cursor-pointer group"
                  >
                    <div className="w-10 h-10 rounded-lg bg-forest/10 flex items-center justify-center group-hover:bg-forest/20 transition-colors">
                      <Radio className="w-5 h-5 text-forest" />
                    </div>
                    <div className="flex-1">
                      <div className="font-semibold text-dark text-sm">{probe.name}</div>
                      <div className="text-xs text-dark/50">ID: {probe.id} · Signal: {probe.signal}</div>
                    </div>
                    <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse-dot" />
                  </div>
                ))}
              </div>

              <p className="text-xs text-dark/40 text-center mb-6">
                In this demo, probes are simulated. Real probes connect via Bluetooth or cellular.
              </p>

              <button
                onClick={handleComplete}
                disabled={loading}
                className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-forest text-white font-semibold hover:bg-forest-light transition-all shadow-md disabled:opacity-70"
              >
                {loading ? (
                  <>
                    <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                    Setting up your farm...
                  </>
                ) : (
                  <>
                    Complete Setup
                    <Check className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
