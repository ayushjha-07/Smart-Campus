import React, { useState, useEffect } from 'react';
import { Sliders, Mail, Smartphone, RefreshCw, AlertTriangle, Check, Volume2, Bell } from 'lucide-react';
import { useNotifications } from '../../context/NotificationContext';
import { 
  loadNotifPreferences, 
  saveNotifPreferences 
} from '../../data/mockNotifications';

export default function NotificationPreferences({ onPreferenceSaved }) {
  let notifCtx = null;
  try {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    notifCtx = useNotifications();
  } catch (_) {
    // Graceful fallback if rendered outside NotificationProvider
  }

  const apiPrefs = notifCtx?.preferences;
  const updatePreferencesApi = notifCtx?.updatePreferences;

  // Initialize with API preferences if available, or localStorage mock
  const [preferences, setPreferences] = useState(() => {
    const local = loadNotifPreferences() || {};
    return {
      complaint_updates: true,
      email_enabled: local.emailNotifications ?? false,
      push_enabled: local.pushNotifications ?? false,
      sound_enabled: false,
      department_alerts: true,
      system_announcements: true,
      critical_alerts_only: false,
      ...local,
      ...(apiPrefs || {}),
    };
  });

  const [savedToast, setSavedToast] = useState(false);
  const [savingKey, setSavingKey] = useState(null);

  // Sync state if apiPrefs updates from backend
  useEffect(() => {
    if (apiPrefs) {
      setPreferences((prev) => ({
        ...prev,
        ...apiPrefs,
      }));
    }
  }, [apiPrefs]);

  const handleToggle = async (key) => {
    const newValue = !preferences[key];
    const updated = { ...preferences, [key]: newValue };
    setPreferences(updated);
    setSavingKey(key);

    try {
      if (updatePreferencesApi) {
        await updatePreferencesApi({ [key]: newValue });
      }
      saveNotifPreferences(updated);

      if (onPreferenceSaved) {
        onPreferenceSaved(key, newValue);
      }

      setSavedToast(true);
      setTimeout(() => setSavedToast(false), 2200);
    } catch (err) {
      console.error('Failed to sync notification preferences:', err);
    } finally {
      setSavingKey(null);
    }
  };

  const options = [
    {
      key: 'complaint_updates',
      title: 'Complaint Status Updates',
      description: 'Step-by-step progress tracking notifications from triage to resolution.',
      icon: RefreshCw,
    },
    {
      key: 'email_enabled',
      title: 'Email Notifications',
      description: 'Receive ticket status digests and closure confirmations to student email.',
      icon: Mail,
    },
    {
      key: 'push_enabled',
      title: 'Push Notifications',
      description: 'Instant device alerts for immediate supervisor assignment updates.',
      icon: Smartphone,
    },
    {
      key: 'sound_enabled',
      title: 'Audio Chime Alerts',
      description: 'Gentle real-time audio tone on incoming critical announcements or updates.',
      icon: Volume2,
    },
    {
      key: 'department_alerts',
      title: 'Department Alerts',
      description: 'Direct alerts routed from facility, lab, hostel, or academic supervisors.',
      icon: Bell,
    },
    {
      key: 'critical_alerts_only',
      title: 'Critical Alerts Only',
      description: 'Urgent security, emergency maintenance, and high-priority broadcasts only.',
      icon: AlertTriangle,
    },
  ];

  return (
    <div className="bg-white dark:bg-[#0B2027] border border-[#DCE7E3] dark:border-white/10 rounded-2xl p-5 sm:p-6 shadow-2xs dark:shadow-xl space-y-4 sm:space-y-5 transition-colors">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-[#DCE7E3] dark:border-white/10 pb-4">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-500/30 flex items-center justify-center text-[#078A5A] dark:text-[#00B87A]">
            <Sliders className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-base sm:text-lg font-bold text-[#10213A] dark:text-[#F5F7F5]">
              Notification Preferences
            </h3>
            <p className="text-xs text-[#64748B] dark:text-[#91A7A5]">
              Choose how you want to receive real-time campus and complaint updates
            </p>
          </div>
        </div>

        {savedToast && (
          <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#078A5A] dark:text-[#00B87A] bg-emerald-50 dark:bg-emerald-950/40 px-2.5 py-1 rounded-full border border-emerald-200 dark:border-emerald-500/30 animate-fadeIn">
            <Check className="w-3 h-3" />
            <span>Saved to Cloud</span>
          </span>
        )}
      </div>

      {/* Toggles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5 sm:gap-4">
        {options.map((opt) => {
          const Icon = opt.icon;
          const isEnabled = Boolean(preferences[opt.key]);
          const isSaving = savingKey === opt.key;

          return (
            <div
              key={opt.key}
              onClick={() => !isSaving && handleToggle(opt.key)}
              className="p-3.5 sm:p-4 rounded-xl bg-[#F5F8F7] dark:bg-[#071A20] border border-[#DCE7E3] dark:border-white/5 hover:border-[#078A5A]/40 dark:hover:border-[#00B87A]/40 transition-all duration-200 cursor-pointer flex items-center justify-between gap-3 group shadow-2xs"
            >
              <div className="flex items-start gap-2.5 sm:gap-3 min-w-0">
                <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 mt-0.5 border shadow-2xs ${
                  isEnabled
                    ? 'bg-emerald-50 dark:bg-emerald-950/50 border-emerald-200 dark:border-emerald-500/30 text-[#078A5A] dark:text-[#00B87A]'
                    : 'bg-white dark:bg-white/5 border-slate-200 dark:border-white/10 text-slate-400'
                }`}>
                  <Icon className="w-4 h-4" />
                </div>

                <div className="min-w-0">
                  <h4 className="text-xs font-bold text-[#10213A] dark:text-[#F5F7F5] leading-tight">
                    {opt.title}
                  </h4>
                  <p className="text-[11px] text-[#64748B] dark:text-[#91A7A5] mt-0.5 leading-snug line-clamp-2">
                    {opt.description}
                  </p>
                </div>
              </div>

              {/* Toggle Switch */}
              <div
                className={`w-10 h-6 rounded-full transition-colors relative shrink-0 p-0.5 ${
                  isEnabled ? 'bg-[#078A5A] dark:bg-[#00B87A]' : 'bg-slate-300 dark:bg-white/20'
                }`}
              >
                <div
                  className={`w-5 h-5 rounded-full bg-white transition-transform shadow-sm ${
                    isEnabled ? 'translate-x-4' : 'translate-x-0'
                  }`}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
