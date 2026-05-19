'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Leaf, Activity, Sparkles, Network, ArrowRight, Menu, X, ChevronRight } from 'lucide-react';

export default function LandingPage() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-cream">
      {/* Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-white/90 backdrop-blur-md shadow-sm' : 'bg-transparent'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            <Link href="/" className="flex items-center gap-2.5 group">
              <div className="w-9 h-9 rounded-lg bg-forest flex items-center justify-center transition-transform group-hover:scale-105">
                <Leaf className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-forest">SoilSync</span>
            </Link>

            {/* Desktop nav */}
            <div className="hidden md:flex items-center gap-8">
              <a href="#features" className="text-sm font-medium text-dark/70 hover:text-forest transition-colors">Features</a>
              <a href="#stats" className="text-sm font-medium text-dark/70 hover:text-forest transition-colors">Impact</a>
              <Link href="/setup" className="text-sm font-medium text-dark/70 hover:text-forest transition-colors">Get Started</Link>
              <Link
                href="/setup"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-forest text-white text-sm font-semibold hover:bg-forest-light transition-all shadow-sm hover:shadow-md"
              >
                Start Free Trial
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-forest/5 transition-colors"
            >
              {mobileMenuOpen ? <X className="w-6 h-6 text-dark" /> : <Menu className="w-6 h-6 text-dark" />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-cream-dark/30 animate-fade-in">
            <div className="px-4 py-4 space-y-3">
              <a href="#features" className="block px-3 py-2 rounded-lg text-sm font-medium text-dark/70 hover:bg-forest/5 hover:text-forest transition-colors">Features</a>
              <a href="#stats" className="block px-3 py-2 rounded-lg text-sm font-medium text-dark/70 hover:bg-forest/5 hover:text-forest transition-colors">Impact</a>
              <Link href="/setup" className="block px-3 py-2 rounded-lg text-sm font-medium text-dark/70 hover:bg-forest/5 hover:text-forest transition-colors">Get Started</Link>
              <Link
                href="/setup"
                className="block text-center px-5 py-2.5 rounded-lg bg-forest text-white text-sm font-semibold hover:bg-forest-light transition-colors"
              >
                Start Free Trial
              </Link>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="gradient-hero min-h-screen flex items-center pt-20 pb-16 px-4">
        <div className="max-w-7xl mx-auto w-full">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div className="animate-fade-in">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-forest/10 text-forest text-xs font-semibold mb-6">
                <span className="w-1.5 h-1.5 rounded-full bg-forest animate-pulse-dot" />
                AI-Powered Soil Intelligence
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-dark leading-[1.1] tracking-tight mb-6">
                Measure Life.
                <br />
                <span className="text-forest">Restore Health.</span>
                <br />
                Grow Food.
              </h1>
              <p className="text-lg sm:text-xl text-dark/60 max-w-lg mb-8 leading-relaxed">
                AI-powered soil health monitoring for the modern farmer. Real-time insights, smart recommendations, and a community of regenerative growers.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link
                  href="/setup"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-forest text-white font-semibold hover:bg-forest-light transition-all shadow-md hover:shadow-lg"
                >
                  Get Started
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <a
                  href="#features"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border-2 border-forest/30 text-forest font-semibold hover:border-forest hover:bg-forest/5 transition-all"
                >
                  Learn More
                  <ChevronRight className="w-4 h-4" />
                </a>
              </div>
            </div>

            {/* Hero visual */}
            <div className="hidden lg:flex items-center justify-center animate-fade-in">
              <div className="relative w-full max-w-lg aspect-square">
                {/* Decorative circles */}
                <div className="absolute inset-0 rounded-full bg-forest/5 animate-pulse" style={{ animationDuration: '4s' }} />
                <div className="absolute inset-4 rounded-full bg-forest/10" />
                <div className="absolute inset-8 rounded-full bg-forest/15" />

                {/* Icon grid */}
                <div className="absolute inset-0 grid grid-cols-3 gap-4 p-12">
                  <div className="flex items-center justify-center">
                    <div className="w-14 h-14 rounded-xl bg-white/80 backdrop-blur shadow-sm flex items-center justify-center">
                      <Activity className="w-7 h-7 text-forest" />
                    </div>
                  </div>
                  <div className="flex items-center justify-center">
                    <div className="w-14 h-14 rounded-xl bg-white/80 backdrop-blur shadow-sm flex items-center justify-center">
                      <Leaf className="w-7 h-7 text-forest" />
                    </div>
                  </div>
                  <div className="flex items-center justify-center">
                    <div className="w-14 h-14 rounded-xl bg-white/80 backdrop-blur shadow-sm flex items-center justify-center">
                      <Sparkles className="w-7 h-7 text-forest" />
                    </div>
                  </div>
                  <div className="flex items-center justify-center">
                    <div className="w-14 h-14 rounded-xl bg-white/80 backdrop-blur shadow-sm flex items-center justify-center">
                      <Network className="w-7 h-7 text-forest" />
                    </div>
                  </div>
                  <div className="flex items-center justify-center">
                    <div className="w-14 h-14 rounded-xl bg-white/80 backdrop-blur shadow-sm flex items-center justify-center">
                      <svg className="w-7 h-7 text-forest" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v18m0 0l-3-3m3 3l3-3" />
                      </svg>
                    </div>
                  </div>
                  <div className="flex items-center justify-center">
                    <div className="w-14 h-14 rounded-xl bg-white/80 backdrop-blur shadow-sm flex items-center justify-center">
                      <svg className="w-7 h-7 text-forest" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5m.75-9l3-3 2.148 2.148A12.061 12.061 0 0116.5 7.605" />
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Center logo */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-20 h-20 rounded-2xl bg-forest shadow-xl flex items-center justify-center">
                    <Leaf className="w-10 h-10 text-white" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 lg:py-28 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-dark mb-4">
              Everything you need to <span className="text-forest">restore your soil</span>
            </h2>
            <p className="text-lg text-dark/60 max-w-2xl mx-auto">
              From real-time monitoring to AI-powered recommendations, SoilSync gives you the tools to make data-driven decisions.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Activity,
                title: 'Real-Time Monitoring',
                description: 'Track soil health metrics 24/7 with wireless probes. Get instant alerts when conditions change.',
                color: 'from-forest to-forest-light',
              },
              {
                icon: Sparkles,
                title: 'AI Recommendations',
                description: 'Smart algorithms analyze your data and provide personalized actions to improve soil health.',
                color: 'from-forest-light to-accent',
              },
              {
                icon: Network,
                title: 'Network Learning',
                description: 'Compare with regional farms. Learn from what works and contribute to collective knowledge.',
                color: 'from-accent to-forest',
              },
            ].map((feature, i) => (
              <div
                key={i}
                className="group p-8 rounded-2xl bg-cream border border-cream-dark/30 card-hover animate-fade-in"
                style={{ animationDelay: `${i * 150}ms` }}
              >
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-5 shadow-sm`}>
                  <feature.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-dark mb-3">{feature.title}</h3>
                <p className="text-dark/60 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section id="stats" className="py-20 lg:py-28 px-4 gradient-hero">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
            {[
              { number: '2.5M', label: 'Farmers in SA', sub: 'Smallholder farmers' },
              { number: '60%', label: 'Soil Degraded', sub: 'Needs restoration' },
              { number: 'R30B', label: 'Impact Potential', sub: 'Annual value' },
            ].map((stat, i) => (
              <div
                key={i}
                className="text-center p-8 rounded-2xl bg-white/60 backdrop-blur border border-white/80 animate-fade-in"
                style={{ animationDelay: `${i * 150}ms` }}
              >
                <div className="text-4xl sm:text-5xl font-bold text-forest mb-2">{stat.number}</div>
                <div className="text-lg font-semibold text-dark mb-1">{stat.label}</div>
                <div className="text-sm text-dark/50">{stat.sub}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 lg:py-28 px-4 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-forest/10 text-forest text-xs font-semibold mb-6">
            <Leaf className="w-3.5 h-3.5" />
            Join the Regenerative Movement
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-dark mb-4">
            Ready to transform your farm?
          </h2>
          <p className="text-lg text-dark/60 max-w-xl mx-auto mb-8">
            Join thousands of farmers using SoilSync to monitor, analyze, and improve their soil health.
          </p>
          <Link
            href="/setup"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-lg bg-forest text-white font-semibold hover:bg-forest-light transition-all shadow-md hover:shadow-lg text-lg"
          >
            Start Your Free Trial
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-dark text-white/60 py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-forest flex items-center justify-center">
                <Leaf className="w-4 h-4 text-white" />
              </div>
              <span className="text-lg font-bold text-white">SoilSync</span>
            </div>
            <div className="flex items-center gap-6 text-sm">
              <Link href="/" className="hover:text-white transition-colors">Home</Link>
              <a href="#features" className="hover:text-white transition-colors">Features</a>
              <a href="#stats" className="hover:text-white transition-colors">Impact</a>
              <Link href="/setup" className="hover:text-white transition-colors">Get Started</Link>
            </div>
            <div className="text-sm">
              &copy; {new Date().getFullYear()} SoilSync. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
