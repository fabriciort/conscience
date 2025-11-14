'use client';

import { useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import { useUserContext } from '@/lib/contexts/UserContext';
import { devMockSubscription, DEV_CONFIG } from '@/lib/utils/dev-helpers';
import type { SubscriptionTier } from '@/lib/supabase/types';

export function DevToolbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { user, profile, tier } = useUserContext();
  const supabase = createClient();

  if (!DEV_CONFIG.enableDevToolbar) {
    return null;
  }

  const handleQuickLogin = async (email: string) => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password: 'test123456', // Standard test password
    });

    if (error) {
      console.error('Quick login error:', error);
      alert(`Erro ao fazer login: ${error.message}`);
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  const handleChangeTier = async (newTier: SubscriptionTier) => {
    if (!user) {
      alert('Faça login primeiro');
      return;
    }

    const { error } = await devMockSubscription(user.id, newTier);
    if (error) {
      alert(`Erro ao mudar tier: ${error.message}`);
    } else {
      alert(`Tier alterado para: ${newTier}`);
      window.location.reload(); // Reload to update UI
    }
  };

  return (
    <>
      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-4 right-4 z-50 flex h-12 w-12 items-center justify-center rounded-full bg-black text-white shadow-lg hover:bg-gray-800"
        title="Dev Tools"
      >
        🛠️
      </button>

      {/* Panel */}
      {isOpen && (
        <div className="fixed bottom-20 right-4 z-50 w-80 rounded-lg border border-gray-300 bg-white p-4 shadow-2xl">
          <div className="mb-3 flex items-center justify-between">
            <h3 className="text-sm font-bold">🛠️ DEV MODE</h3>
            <button
              onClick={() => setIsOpen(false)}
              className="text-gray-500 hover:text-gray-700"
            >
              ✕
            </button>
          </div>

          {/* Current User Info */}
          <div className="mb-4 rounded bg-gray-100 p-2 text-xs">
            <p className="font-semibold">
              {user ? `Logado: ${profile?.full_name}` : 'Não logado'}
            </p>
            {profile && (
              <>
                <p>Role: {profile.role}</p>
                <p>Tier: {tier}</p>
              </>
            )}
          </div>

          {/* Quick Login */}
          <div className="mb-4">
            <p className="mb-2 text-xs font-semibold">Login Rápido:</p>
            <div className="space-y-1">
              <button
                onClick={() => handleQuickLogin(DEV_CONFIG.testUsers.viewer)}
                className="w-full rounded bg-blue-500 px-3 py-1 text-xs text-white hover:bg-blue-600"
              >
                👤 Viewer (Free)
              </button>
              <button
                onClick={() => handleQuickLogin(DEV_CONFIG.testUsers.premium)}
                className="w-full rounded bg-purple-500 px-3 py-1 text-xs text-white hover:bg-purple-600"
              >
                ⭐ Viewer (Advanced)
              </button>
              <button
                onClick={() => handleQuickLogin(DEV_CONFIG.testUsers.researcher)}
                className="w-full rounded bg-green-500 px-3 py-1 text-xs text-white hover:bg-green-600"
              >
                🎓 Researcher
              </button>
            </div>
          </div>

          {/* Change Tier */}
          {user && profile?.role === 'viewer' && (
            <div className="mb-4">
              <p className="mb-2 text-xs font-semibold">Mudar Tier:</p>
              <div className="grid grid-cols-2 gap-1">
                <button
                  onClick={() => handleChangeTier('free')}
                  className="rounded bg-gray-500 px-2 py-1 text-xs text-white hover:bg-gray-600"
                  disabled={tier === 'free'}
                >
                  Free
                </button>
                <button
                  onClick={() => handleChangeTier('essential')}
                  className="rounded bg-blue-500 px-2 py-1 text-xs text-white hover:bg-blue-600"
                  disabled={tier === 'essential'}
                >
                  Essential
                </button>
                <button
                  onClick={() => handleChangeTier('advanced')}
                  className="rounded bg-purple-500 px-2 py-1 text-xs text-white hover:bg-purple-600"
                  disabled={tier === 'advanced'}
                >
                  Advanced
                </button>
                <button
                  onClick={() => handleChangeTier('corporate')}
                  className="rounded bg-amber-500 px-2 py-1 text-xs text-white hover:bg-amber-600"
                  disabled={tier === 'corporate'}
                >
                  Corporate
                </button>
              </div>
            </div>
          )}

          {/* Logout */}
          {user && (
            <button
              onClick={handleLogout}
              className="w-full rounded bg-red-500 px-3 py-2 text-xs font-semibold text-white hover:bg-red-600"
            >
              🚪 Logout
            </button>
          )}

          {/* Quick Links */}
          <div className="mt-4 border-t pt-3">
            <p className="mb-2 text-xs font-semibold">Quick Links:</p>
            <div className="space-y-1 text-xs">
              <a href="/platform/feed" className="block text-blue-600 hover:underline">
                → Platform Feed
              </a>
              <a href="/studio/dashboard" className="block text-green-600 hover:underline">
                → Studio Dashboard
              </a>
              <a href="/pricing" className="block text-purple-600 hover:underline">
                → Pricing
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

