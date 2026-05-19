'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  Settings, User, Bell, Radio, Shield, Save, LogOut, Trash2,
  ChevronRight, Eye, EyeOff
} from 'lucide-react';
import { useStore } from '@/lib/store';

export default function SettingsPage() {
  const router = useRouter();
  const { userName, userEmail, logout, addToast } = useStore();

  const [name, setName] = useState(userName || '');
  const [email, setEmail] = useState(userEmail || '');
  const [phone, setPhone] = useState('+27 82 123 4567');
  const [emailAlerts, setEmailAlerts] = useState(true);
  const [smsAlerts, setSmsAlerts] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [saving, setSaving] = useState(false);

  const handleSaveProfile = () => {
    setSaving(true);
    setTimeout(() => {
      setSaving(false);
      addToast('Profile updated successfully!', 'success');
    }, 1000);
  };

  const handleChangePassword = () => {
    if (!currentPassword || !newPassword) {
      addToast('Please fill in both password fields', 'error');
      return;
    }
    addToast('Password changed successfully!', 'success');
    setCurrentPassword('');
    setNewPassword('');
  };

  const handleDeleteAccount = () => {
    if (confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      logout();
      router.push('/setup');
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold text-dark">Settings</h1>
        <p className="text-sm text-dark/50 mt-1">Manage your account and preferences</p>
      </div>

      {/* Profile Settings */}
      <div className="bg-white rounded-xl border border-cream-dark/30 p-6 card-hover">
        <div className="flex items-center gap-2 mb-5">
          <User className="w-5 h-5 text-forest" />
          <h2 className="font-semibold text-dark">Profile Settings</h2>
        </div>
        <div className="space-y-4 max-w-md">
          <div>
            <label className="block text-sm font-medium text-dark/80 mb-1.5">Full Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2.5 rounded-lg border border-cream-dark/50 bg-cream/50 focus:bg-white focus:border-forest focus:ring-2 focus:ring-forest/20 outline-none transition-all text-dark"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-dark/80 mb-1.5">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2.5 rounded-lg border border-cream-dark/50 bg-cream/50 focus:bg-white focus:border-forest focus:ring-2 focus:ring-forest/20 outline-none transition-all text-dark"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-dark/80 mb-1.5">Phone Number</label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full px-4 py-2.5 rounded-lg border border-cream-dark/50 bg-cream/50 focus:bg-white focus:border-forest focus:ring-2 focus:ring-forest/20 outline-none transition-all text-dark"
            />
          </div>
          <button
            onClick={handleSaveProfile}
            disabled={saving}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-forest text-white text-sm font-semibold hover:bg-forest-light transition-all disabled:opacity-70"
          >
            {saving ? (
              <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
            ) : (
              <Save className="w-4 h-4" />
            )}
            {saving ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </div>

      {/* Notification Preferences */}
      <div className="bg-white rounded-xl border border-cream-dark/30 p-6 card-hover">
        <div className="flex items-center gap-2 mb-5">
          <Bell className="w-5 h-5 text-forest" />
          <h2 className="font-semibold text-dark">Notification Preferences</h2>
        </div>
        <div className="space-y-4 max-w-md">
          {[
            { label: 'Email Alerts', description: 'Receive daily soil health reports via email', checked: emailAlerts, onChange: setEmailAlerts },
            { label: 'SMS Alerts', description: 'Get urgent alerts via SMS when action is needed', checked: smsAlerts, onChange: setSmsAlerts },
          ].map((item) => (
            <div key={item.label} className="flex items-center justify-between p-3 rounded-lg bg-cream/80 border border-cream-dark/30">
              <div>
                <div className="text-sm font-medium text-dark">{item.label}</div>
                <div className="text-xs text-dark/50">{item.description}</div>
              </div>
              <button
                onClick={() => item.onChange(!item.checked)}
                className={`relative w-10 h-6 rounded-full transition-all ${
                  item.checked ? 'bg-forest' : 'bg-cream-dark/50'
                }`}
              >
                <div className={`absolute top-0.5 w-5 h-5 rounded-full bg-white shadow-sm transition-all ${
                  item.checked ? 'left-[18px]' : 'left-0.5'
                }`} />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Change Password */}
      <div className="bg-white rounded-xl border border-cream-dark/30 p-6 card-hover">
        <div className="flex items-center gap-2 mb-5">
          <Shield className="w-5 h-5 text-forest" />
          <h2 className="font-semibold text-dark">Change Password</h2>
        </div>
        <div className="space-y-4 max-w-md">
          <div className="relative">
            <label className="block text-sm font-medium text-dark/80 mb-1.5">Current Password</label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                className="w-full px-4 py-2.5 pr-10 rounded-lg border border-cream-dark/50 bg-cream/50 focus:bg-white focus:border-forest focus:ring-2 focus:ring-forest/20 outline-none transition-all text-dark"
              />
              <button
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-dark/40 hover:text-dark/60"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-dark/80 mb-1.5">New Password</label>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full px-4 py-2.5 rounded-lg border border-cream-dark/50 bg-cream/50 focus:bg-white focus:border-forest focus:ring-2 focus:ring-forest/20 outline-none transition-all text-dark"
            />
          </div>
          <button
            onClick={handleChangePassword}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-forest text-white text-sm font-semibold hover:bg-forest-light transition-all"
          >
            Update Password
          </button>
        </div>
      </div>

      {/* Danger Zone */}
      <div className="bg-white rounded-xl border border-red-200 p-6 card-hover">
        <div className="flex items-center gap-2 mb-5">
          <Trash2 className="w-5 h-5 text-red-500" />
          <h2 className="font-semibold text-dark">Danger Zone</h2>
        </div>
        <p className="text-sm text-dark/60 mb-4">
          Once you delete your account, there is no going back. Please be certain.
        </p>
        <button
          onClick={handleDeleteAccount}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-red-500 text-white text-sm font-semibold hover:bg-red-600 transition-all"
        >
          <Trash2 className="w-4 h-4" />
          Delete Account
        </button>
      </div>
    </div>
  );
}
