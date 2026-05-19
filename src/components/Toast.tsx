'use client';

import { useStore } from '@/lib/store';
import { X, CheckCircle, AlertCircle, Info } from 'lucide-react';

export default function ToastContainer() {
  const { toasts, removeToast } = useStore();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed top-4 right-4 z-[100] flex flex-col gap-2 max-w-sm w-full">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className="toast-enter flex items-start gap-3 p-4 rounded-xl bg-white shadow-lg border border-cream-dark/30"
        >
          {toast.type === 'success' && <CheckCircle className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />}
          {toast.type === 'error' && <AlertCircle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />}
          {toast.type === 'info' && <Info className="w-5 h-5 text-forest shrink-0 mt-0.5" />}
          <p className="text-sm text-dark flex-1">{toast.message}</p>
          <button onClick={() => removeToast(toast.id)} className="shrink-0 text-dark/30 hover:text-dark/60 transition-colors">
            <X className="w-4 h-4" />
          </button>
        </div>
      ))}
    </div>
  );
}
