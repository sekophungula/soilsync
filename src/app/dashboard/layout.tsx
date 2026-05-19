'use client';

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import {
  Leaf, LayoutDashboard, Radio, Activity, Lightbulb, BarChart3,
  Settings, Bell, LogOut, Menu, X, ChevronLeft, ChevronRight, User
} from 'lucide-react';
import { useStore } from '@/lib/store';
import ToastContainer from '@/components/Toast';

const navItems = [
  { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/dashboard/probes', label: 'My Probes', icon: Radio },
  { href: '/dashboard/soil-health', label: 'Soil Health', icon: Activity },
  { href: '/dashboard/recommendations', label: 'Recommendations', icon: Lightbulb },
  { href: '/dashboard/analytics', label: 'Analytics', icon: BarChart3 },
  { href: '/dashboard/settings', label: 'Settings', icon: Settings },
];

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const { isAuthenticated, userName, logout, sidebarCollapsed, toggleSidebar } = useStore();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Check localStorage for auth
    const stored = localStorage.getItem('soilsync_user');
    const setupDone = localStorage.getItem('soilsync_setup');
    if (!stored || !setupDone) {
      router.push('/setup');
    }
  }, [router]);

  if (!mounted) return null;

  const initials = userName ? userName.split(' ').map(n => n[0]).join('').toUpperCase() : '?';

  return (
    <div className="min-h-screen bg-cream flex">
      <ToastContainer />

      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black/30 z-40 lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed lg:static inset-y-0 left-0 z-50 bg-forest text-white flex flex-col transition-all duration-300 ${
          sidebarCollapsed ? 'w-16' : 'w-64'
        } ${mobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}
      >
        {/* Logo */}
        <div className={`flex items-center h-16 px-4 border-b border-white/10 ${sidebarCollapsed ? 'justify-center' : 'gap-3'}`}>
          <div className="w-8 h-8 rounded-lg bg-white/15 flex items-center justify-center shrink-0">
            <Leaf className="w-4 h-4 text-white" />
          </div>
          {!sidebarCollapsed && (
            <span className="font-bold text-lg">SoilSync</span>
          )}
        </div>

        {/* Navigation */}
        <nav className="flex-1 py-4 px-2 space-y-1 overflow-y-auto">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
                  sidebarCollapsed ? 'justify-center' : ''
                } ${
                  isActive
                    ? 'bg-white/15 text-white'
                    : 'text-white/60 hover:text-white hover:bg-white/10'
                }`}
              >
                <item.icon className="w-5 h-5 shrink-0" />
                {!sidebarCollapsed && <span>{item.label}</span>}
              </Link>
            );
          })}
        </nav>

        {/* User section */}
        <div className={`p-4 border-t border-white/10 ${sidebarCollapsed ? 'text-center' : ''}`}>
          <div className={`flex items-center gap-3 ${sidebarCollapsed ? 'flex-col' : ''}`}>
            <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center text-xs font-bold shrink-0">
              {initials}
            </div>
            {!sidebarCollapsed && (
              <div className="flex-1 min-w-0">
                <div className="text-sm font-medium truncate">{userName || 'Farmer'}</div>
                <div className="text-xs text-white/50">View Profile</div>
              </div>
            )}
            <button
              onClick={() => { logout(); router.push('/setup'); }}
              className={`p-1.5 rounded-lg hover:bg-white/10 transition-colors text-white/50 hover:text-white ${sidebarCollapsed ? 'mt-2' : ''}`}
              title="Logout"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Collapse button (desktop) */}
        <button
          onClick={toggleSidebar}
          className="hidden lg:flex items-center justify-center h-8 border-t border-white/10 text-white/40 hover:text-white hover:bg-white/5 transition-colors"
        >
          {sidebarCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
        </button>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col min-h-screen">
        {/* Top header */}
        <header className="bg-white border-b border-cream-dark/30 h-16 flex items-center px-4 lg:px-6 sticky top-0 z-30">
          <button
            onClick={() => setMobileOpen(true)}
            className="lg:hidden p-2 rounded-lg hover:bg-forest/5 transition-colors mr-3"
          >
            <Menu className="w-5 h-5 text-dark" />
          </button>

          <div className="flex-1" />

          <div className="flex items-center gap-4">
            <button className="relative p-2 rounded-lg hover:bg-forest/5 transition-colors">
              <Bell className="w-5 h-5 text-dark/60" />
              <span className="absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full bg-red-500 text-white text-[10px] font-bold flex items-center justify-center">
                3
              </span>
            </button>
            <div className="hidden sm:flex items-center gap-2 text-sm text-dark/60">
              <User className="w-4 h-4" />
              <span>{userName || 'Farmer'}</span>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 p-4 lg:p-6 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
