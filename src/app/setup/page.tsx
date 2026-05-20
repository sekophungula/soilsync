'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Check, ChevronRight, Radio, MapPin, Sprout, Globe, X } from 'lucide-react';
import Logo from '@/components/Logo';
import { useStore } from '@/lib/store';
import { provinces, soilTypes } from '@/lib/mockData';
import { southAfricanLanguages, popularCropTypes } from '@/lib/types';

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
  const [soilType, setSoilType] = useState('');
  const [language, setLanguage] = useState('en');
  const [selectedCrops, setSelectedCrops] = useState<string[]>([]);

  const handleStep1 = (e: React.FormEvent) => {
    e.preventDefault();
    if (name && email) {
      setStep(2);
    }
  };

  const handleStep2 = (e: React.FormEvent) => {
    e.preventDefault();
    if (farmName && farmSize && province) {
      setStep(3);
    }
  };

  const handleStep3 = (e: React.FormEvent) => {
    e.preventDefault();
    setStep(4);
  };

  const toggleCrop = (crop: string) => {
    setSelectedCrops(prev =>
      prev.includes(crop)
        ? prev.filter(c => c !== crop)
        : [...prev, crop]
    );
  };

  const handleComplete = () => {
    setLoading(true);
    setTimeout(() => {
      setAuth(name, email);
      setFarmSetup({
        farmName,
        farmSize: parseFloat(farmSize),
        province,
        primaryCrops: selectedCrops.join(', '),
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
          <Logo iconSize={80} textClassName="text-2xl font-bold text-forest" />
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
                <div className="w-28 h-28 rounded-xl bg-forest/10 flex items-center justify-center mx-auto mb-4 overflow-hidden">
                  <Image src="/soilsync logo.svg" alt="" width={64} height={64} className="object-contain" />
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
                    placeholder="Thandi Mokoena"
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
                    placeholder="thandi@email.co.za"
                    className="w-full px-4 py-2.5 rounded-lg border border-cream-dark/50 bg-cream/50 focus:bg-white focus:border-forest focus:ring-2 focus:ring-forest/20 outline-none transition-all text-dark"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-dark/80 mb-1.5">App Language</label>
                  <div className="relative">
                    <Globe className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-dark/40" />
                    <select
                      value={language}
                      onChange={(e) => setLanguage(e.target.value)}
                      className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-cream-dark/50 bg-cream/50 focus:bg-white focus:border-forest focus:ring-2 focus:ring-forest/20 outline-none transition-all text-dark appearance-none"
                    >
                      {southAfricanLanguages.map((lang) => (
                        <option key={lang.code} value={lang.code}>{lang.name}</option>
                      ))}
                    </select>
                  </div>
                  <p className="text-xs text-dark/40 mt-1">Language selection is for demo purposes only</p>
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
                    placeholder="Mokoena Family Farm"
                    className="w-full px-4 py-2.5 rounded-lg border border-cream-dark/50 bg-cream/50 focus:bg-white focus:border-forest focus:ring-2 focus:ring-forest/20 outline-none transition-all text-dark"
                    required
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-dark/80 mb-1.5">Size (m²)</label>
                    <input
                      type="number"
                      value={farmSize}
                      onChange={(e) => setFarmSize(e.target.value)}
                      placeholder="500"
                      min="0"
                      step="1"
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
                <h2 className="text-2xl font-bold text-dark">What are you growing?</h2>
                <p className="text-dark/60 mt-1">Select one or more crops you grow on your land</p>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-dark/80 mb-1.5">Crop Types</label>
                  <div className="max-h-48 overflow-y-auto grid grid-cols-2 gap-2 p-1">
                    {popularCropTypes.map((crop) => (
                      <button
                        key={crop}
                        type="button"
                        onClick={() => toggleCrop(crop)}
                        className={`flex items-center gap-2 px-3 py-2.5 rounded-lg border text-sm font-medium transition-all ${
                          selectedCrops.includes(crop)
                            ? 'border-forest bg-forest/5 text-forest'
                            : 'border-cream-dark/50 bg-cream/50 text-dark/60 hover:border-forest/30'
                        }`}
                      >
                        <div className={`w-4 h-4 rounded border-2 flex items-center justify-center transition-all ${
                          selectedCrops.includes(crop)
                            ? 'border-forest bg-forest'
                            : 'border-dark/30'
                        }`}>
                          {selectedCrops.includes(crop) && (
                            <Check className="w-3 h-3 text-white" />
                          )}
                        </div>
                        {crop}
                      </button>
                    ))}
                  </div>
                  {selectedCrops.length > 0 && (
                    <div className="mt-2 flex flex-wrap gap-1.5">
                      {selectedCrops.map(crop => (
                        <span key={crop} className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-forest/10 text-forest text-xs font-medium">
                          {crop}
                          <button type="button" onClick={() => toggleCrop(crop)} className="hover:text-forest/70">
                            <X className="w-3 h-3" />
                          </button>
                        </span>
                      ))}
                    </div>
                  )}
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
                  disabled={selectedCrops.length === 0}
                  className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-forest text-white font-semibold hover:bg-forest-light transition-all shadow-md disabled:opacity-50"
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
                <p className="text-dark/60 mt-1">We found 1 SoilSync probe nearby for your farm</p>
              </div>

              <div className="space-y-3 mb-6">
                {[
                  { id: 'P-001', name: 'Village Farm Probe', signal: 'Strong', crop: selectedCrops[0] || 'Mixed Crops' },
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
                      <div className="text-xs text-dark/50">ID: {probe.id} · Signal: {probe.signal} · Crop: {probe.crop}</div>
                    </div>
                    <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse-dot" />
                  </div>
                ))}
              </div>

              <p className="text-xs text-dark/40 text-center mb-4">
                Each probe is configured for the crops you selected. You can add more probes later.
              </p>

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
