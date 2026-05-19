'use client';

import { create } from 'zustand';
import { SoilProbe, Recommendation, FarmSetup, AIAnalysis } from './types';
import { mockProbes, mockRecommendations } from './mockData';

interface Toast {
  id: string;
  message: string;
  type: 'success' | 'error' | 'info';
}

interface AppState {
  // Auth
  isAuthenticated: boolean;
  userName: string;
  userEmail: string;
  farmSetup: FarmSetup | null;
  setupComplete: boolean;

  // Data
  probes: SoilProbe[];
  recommendations: Recommendation[];

  // UI
  toasts: Toast[];
  sidebarCollapsed: boolean;

  // AI Analysis
  aiAnalysis: AIAnalysis | null;
  aiLoading: boolean;

  // Actions
  setAuth: (name: string, email: string) => void;
  logout: () => void;
  setFarmSetup: (farm: FarmSetup) => void;
  completeSetup: () => void;
  updateProbes: (probes: SoilProbe[]) => void;
  markRecommendationDone: (id: string) => void;
  addToast: (message: string, type: 'success' | 'error' | 'info') => void;
  removeToast: (id: string) => void;
  toggleSidebar: () => void;
  setAiAnalysis: (analysis: AIAnalysis) => void;
  setAiLoading: (loading: boolean) => void;
}

export const useStore = create<AppState>((set) => ({
  isAuthenticated: false,
  userName: '',
  userEmail: '',
  farmSetup: null,
  setupComplete: false,
  probes: mockProbes,
  recommendations: mockRecommendations,
  toasts: [],
  sidebarCollapsed: false,
  aiAnalysis: null,
  aiLoading: false,

  setAuth: (name, email) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('soilsync_user', JSON.stringify({ name, email }));
    }
    set({ isAuthenticated: true, userName: name, userEmail: email });
  },

  logout: () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('soilsync_user');
      localStorage.removeItem('soilsync_farm');
      localStorage.removeItem('soilsync_setup');
    }
    set({
      isAuthenticated: false,
      userName: '',
      userEmail: '',
      farmSetup: null,
      setupComplete: false,
    });
  },

  setFarmSetup: (farm) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('soilsync_farm', JSON.stringify(farm));
    }
    set({ farmSetup: farm });
  },

  completeSetup: () => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('soilsync_setup', 'true');
    }
    set({ setupComplete: true });
  },

  updateProbes: (probes) => set({ probes }),

  markRecommendationDone: (id) =>
    set((state) => ({
      recommendations: state.recommendations.map((r) =>
        r.id === id ? { ...r, status: 'completed' as const } : r
      ),
    })),

  addToast: (message, type) => {
    const id = Math.random().toString(36).substring(7);
    set((state) => ({
      toasts: [...state.toasts, { id, message, type }],
    }));
    setTimeout(() => {
      set((state) => ({
        toasts: state.toasts.filter((t) => t.id !== id),
      }));
    }, 4000);
  },

  removeToast: (id) =>
    set((state) => ({
      toasts: state.toasts.filter((t) => t.id !== id),
    })),

  toggleSidebar: () =>
    set((state) => ({ sidebarCollapsed: !state.sidebarCollapsed })),

  setAiAnalysis: (analysis) => set({ aiAnalysis: analysis }),
  setAiLoading: (loading) => set({ aiLoading: loading }),
}));
