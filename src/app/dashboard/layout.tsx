'use client';

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import {
  LayoutDashboard, Radio, Activity, Lightbulb, BarChart3,
  Settings, Bell, LogOut, Menu, X,
} from 'lucide-react';
import Logo from '@/components/Logo';
import { useStore } from '@/lib/store';
import ToastContainer from '@/components/Toast';

const navItems = [
  { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard, exact: true },
  { href: '/dashboard/probes', label: 'My Probes', icon: Radio, exact: false },
  { href: '/dashboard/soil-health', label: 'Soil Health', icon: Activity, exact: false },
  { href: '/dashboard/recommendations', label: 'Recommendations', icon: Lightbulb, exact: false },
  { href: '/dashboard/analytics', label: 'Analytics', icon: BarChart3, exact: false },
  { href: '/dashboard/settings', label: 'Settings', icon: Settings, exact: false },
] as const;

const pageTitles: Record<string, string> = {
  '/dashboard': 'Dashboard',
  '/dashboard/probes': 'My Probes',
  '/dashboard/soil-health': 'Soil Health',
  '/dashboard/recommendations': 'Recommendations',
  '/dashboard/analytics': 'Analytics',
  '/dashboard/settings': 'Settings',
};

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const { isAuthenticated, userName, userEmail, logout } = useStore();
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const stored = localStorage.getItem('soilsync_user');
    const setupDone = localStorage.getItem('soilsync_setup');
    if (!stored || !setupDone) {
      router.push('/setup');
    }
  }, [router]);

  if (!mounted) return null;

  function handleLogout() {
    logout();
    router.push('/setup');
  }

  const name = userName || 'Farmer';
  const email = userEmail || 'farmer@soil.sync';
  const title = pageTitles[pathname] || 'SoilSync';

  return (
    <div className="min-h-screen bg-[var(--cream)]/40">
      <ToastContainer />

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-40 flex w-64 flex-col bg-sidebar text-sidebar-foreground transition-transform md:translate-x-0 ${
          open ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        }`}
      >
        <div className="flex items-center justify-between px-6 py-5">
          <Logo iconSize={64} textClassName="text-lg text-white" />
          <button className="md:hidden" onClick={() => setOpen(false)} aria-label="Close menu">
            <X className="h-5 w-5" />
          </button>
        </div>
        <nav className="flex-1 space-y-1 px-3">
          {navItems.map((it) => {
            const active = it.exact ? pathname === it.href : pathname.startsWith(it.href);
            const Icon = it.icon;
            return (
              <Link
                key={it.href}
                href={it.href}
                onClick={() => setOpen(false)}
                className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                  active
                    ? 'bg-sidebar-primary text-sidebar-primary-foreground shadow'
                    : 'text-sidebar-foreground/85 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground'
                }`}
              >
                <Icon className="h-4.5 w-4.5" />
                {it.label}
              </Link>
            );
          })}
        </nav>
        <div className="border-t border-sidebar-border p-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-sidebar-primary text-sm font-semibold text-sidebar-primary-foreground">
              {name.slice(0, 1).toUpperCase()}
            </div>
            <div className="min-w-0 flex-1">
              <div className="truncate text-sm font-semibold">{name}</div>
              <div className="truncate text-xs opacity-70">{email}</div>
            </div>
            <button onClick={handleLogout} className="rounded-md p-2 hover:bg-sidebar-accent" aria-label="Logout">
              <LogOut className="h-4 w-4" />
            </button>
          </div>
        </div>
      </aside>

      {/* Main */}
      <div className="md:pl-64">
        <header className="sticky top-0 z-30 flex items-center justify-between border-b bg-background/80 px-4 py-4 backdrop-blur md:px-8">
          <div className="flex items-center gap-3">
            <button className="md:hidden" onClick={() => setOpen(true)} aria-label="Open menu">
              <Menu className="h-5 w-5" />
            </button>
            <div>
              <h1 className="text-xl font-bold tracking-tight md:text-2xl">{title}</h1>
              <p className="text-xs text-muted-foreground">
                {new Date().toLocaleDateString(undefined, { weekday: "long", month: "long", day: "numeric", year: "numeric" })}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button className="relative rounded-md p-2 hover:bg-secondary transition-colors">
              <Bell className="h-4 w-4" />
              <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-destructive text-[10px] font-bold text-destructive-foreground">3</span>
            </button>
          </div>
        </header>
        <main className="px-4 py-6 md:px-8 md:py-8">{children}</main>
      </div>
    </div>
  );
}
