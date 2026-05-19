'use client';

import Link from 'next/link';
import { Activity, Sparkles, Network, Leaf, Droplet, Thermometer, Gauge, ArrowRight } from 'lucide-react';
import Logo from '@/components/Logo';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Nav */}
      <header className="absolute inset-x-0 top-0 z-10">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
          <Link href="/" className="flex items-center gap-2">
            <Logo iconSize={32} textClassName="text-lg text-foreground" />
          </Link>
          <nav className="hidden gap-8 text-sm font-medium text-foreground/80 md:flex">
            <a href="#features" className="hover:text-primary">Features</a>
            <a href="#stats" className="hover:text-primary">Impact</a>
            <a href="#cta" className="hover:text-primary">Get started</a>
          </nav>
          <div className="flex items-center gap-2">
            <Link href="/setup" className="rounded-lg px-4 py-2 text-sm font-medium text-foreground/80 hover:text-foreground transition-colors">Log in</Link>
            <Link href="/setup" className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-accent transition-colors">Sign up</Link>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="bg-hero-gradient relative overflow-hidden">
        <div className="mx-auto grid max-w-7xl gap-12 px-6 pt-36 pb-24 md:grid-cols-2 md:items-center">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full bg-white/70 px-3 py-1 text-xs font-semibold text-primary ring-1 ring-primary/10">
              <Leaf className="h-3.5 w-3.5" /> Regenerative agriculture, measured.
            </span>
            <h1 className="mt-6 text-5xl font-extrabold leading-[1.05] tracking-tight text-foreground md:text-6xl">
              Measure Life. <br />
              Restore Health. <br />
              <span className="text-primary">Grow Food.</span>
            </h1>
            <p className="mt-6 max-w-lg text-lg text-foreground/70">
              AI-powered soil health monitoring for the modern farmer. Real-time readings,
              actionable recommendations, and a network that learns with you.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/setup"
                className="inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground hover:bg-accent transition-colors"
              >
                Get Started <ArrowRight className="h-4 w-4" />
              </Link>
              <a href="#features">
                <span className="inline-flex items-center rounded-lg border px-6 py-3 text-sm font-semibold text-foreground hover:bg-secondary transition-colors">Learn More</span>
              </a>
            </div>
          </div>

          {/* Hero visual */}
          <div className="relative">
            <div className="grid grid-cols-2 gap-4">
              {[
                { i: <Activity className="h-6 w-6" />, l: "CO₂ Resp.", v: "45 mg/m²/hr" },
                { i: <Droplet className="h-6 w-6" />, l: "Moisture", v: "32%" },
                { i: <Thermometer className="h-6 w-6" />, l: "Temp", v: "18 °C" },
                { i: <Gauge className="h-6 w-6" />, l: "Compaction", v: "2.1 MPa" },
              ].map((c, idx) => (
                <div key={idx} className="card-hover rounded-xl bg-card p-5 shadow-sm ring-1 ring-border">
                  <div className="flex items-center justify-between">
                    <span className="inline-flex h-9 w-9 items-center justify-center rounded-md bg-secondary text-primary">{c.i}</span>
                    <span className="h-2 w-2 rounded-full bg-[var(--success)]" />
                  </div>
                  <div className="mt-4 text-xs uppercase tracking-wide text-muted-foreground">{c.l}</div>
                  <div className="text-xl font-semibold">{c.v}</div>
                </div>
              ))}
            </div>
            <div className="mt-4 rounded-xl bg-primary p-5 text-primary-foreground shadow-lg">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-xs uppercase tracking-wide opacity-80">Overall Soil Health</div>
                  <div className="text-3xl font-bold">68/100</div>
                </div>
                <div className="text-right text-sm">
                  <div className="opacity-80">Trend</div>
                  <div className="font-semibold">↑ +2 this week</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="mx-auto max-w-7xl px-6 py-24">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight md:text-4xl">Built for the field, powered by intelligence</h2>
          <p className="mt-4 text-muted-foreground">Three layers working together to give your land its voice back.</p>
        </div>
        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {[
            { icon: <Activity className="h-6 w-6" />, title: "Real-Time Monitoring", desc: "Continuous readings from in-ground probes — moisture, CO₂, pH, compaction and more." },
            { icon: <Sparkles className="h-6 w-6" />, title: "AI Recommendations", desc: "Prioritized actions tailored to your soil, crops, weather and farming history." },
            { icon: <Network className="h-6 w-6" />, title: "Network Learning", desc: "Every farm makes every other farm smarter. Anonymous, regional insights you can trust." },
          ].map((f) => (
            <div key={f.title} className="card-hover rounded-xl bg-card p-7 ring-1 ring-border">
              <span className="inline-flex h-12 w-12 items-center justify-center rounded-lg bg-secondary text-primary">{f.icon}</span>
              <h3 className="mt-5 text-lg font-semibold">{f.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Stats */}
      <section id="stats" className="bg-primary text-primary-foreground">
        <div className="mx-auto grid max-w-7xl gap-10 px-6 py-16 md:grid-cols-3">
          {[
            { v: "2.5M", l: "Farmers we serve" },
            { v: "60%", l: "Soil degraded today" },
            { v: "R30B", l: "Impact potential" },
          ].map((s) => (
            <div key={s.l} className="text-center md:text-left">
              <div className="text-5xl font-extrabold tracking-tight">{s.v}</div>
              <div className="mt-2 text-sm uppercase tracking-wide opacity-80">{s.l}</div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section id="cta" className="mx-auto max-w-4xl px-6 py-24 text-center">
        <h2 className="text-3xl font-bold tracking-tight md:text-4xl">Start growing healthier soil today</h2>
        <p className="mt-3 text-muted-foreground">Join thousands of farmers measuring what matters.</p>
        <div className="mt-8 flex justify-center gap-3">
          <Link href="/setup" className="rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground hover:bg-accent transition-colors">Create free account</Link>
          <Link href="/setup" className="rounded-lg border px-6 py-3 text-sm font-semibold text-foreground hover:bg-secondary transition-colors">Log in</Link>
        </div>
      </section>

      <footer className="border-t bg-secondary/40">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-6 py-8 md:flex-row">
          <Logo iconSize={28} textClassName="text-sm text-foreground" />
          <p className="text-xs text-muted-foreground">© {new Date().getFullYear()} SoilSync. Grow what feeds us.</p>
          <div className="flex gap-5 text-xs text-muted-foreground">
            <a href="#" className="hover:text-primary">Privacy</a>
            <a href="#" className="hover:text-primary">Terms</a>
            <a href="#" className="hover:text-primary">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
