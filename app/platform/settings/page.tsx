'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import { useRouter } from 'next/navigation';

export default function SettingsPage() {
  const supabase = createClient();
  const router = useRouter();
  
  const [isLoading, setIsLoading] = useState(false);
  const [profile, setProfile] = useState<any>(null);
  const [formData, setFormData] = useState({
    full_name: '',
    email: '',
  });

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    
    if (user) {
      const { data: profileData } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();

      if (profileData) {
        setProfile(profileData);
        setFormData({
          full_name: profileData.full_name,
          email: profileData.email,
        });
      }
    }
  };

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const { data: { user } } = await supabase.auth.getUser();

    if (user) {
      const { error } = await supabase
        .from('profiles')
        .update({
          full_name: formData.full_name,
        })
        .eq('id', user.id);

      if (error) {
        alert(`Erro: ${error.message}`);
      } else {
        alert('✅ Perfil atualizado com sucesso!');
        loadProfile();
      }
    }

    setIsLoading(false);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/');
  };

  if (!profile) {
    return (
      <div className="flex items-center justify-center p-12">
        <div className="text-center">
          <div className="text-4xl mb-4">⏳</div>
          <p>Carregando...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[color:var(--text-primary)]">
          Configurações
        </h1>
        <p className="mt-2 text-[color:var(--text-muted)]">
          Gerencie suas informações pessoais e preferências
        </p>
      </div>

      {/* Profile Info */}
      <div className="space-y-6">
        <div className="rounded-lg border border-[color:var(--border-soft)] bg-white p-6">
          <h2 className="mb-4 text-lg font-semibold text-[color:var(--text-primary)]">
            Informações do Perfil
          </h2>

          <form onSubmit={handleUpdateProfile} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-[color:var(--text-primary)]">
                Nome Completo
              </label>
              <input
                type="text"
                value={formData.full_name}
                onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
                className="mt-1 w-full rounded-lg border border-[color:var(--border-soft)] bg-white px-4 py-2"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-[color:var(--text-primary)]">
                Email
              </label>
              <input
                type="email"
                value={formData.email}
                disabled
                className="mt-1 w-full rounded-lg border border-[color:var(--border-soft)] bg-gray-100 px-4 py-2 text-gray-500"
              />
              <p className="mt-1 text-xs text-[color:var(--text-muted)]">
                O email não pode ser alterado
              </p>
            </div>

            <div className="flex gap-3">
              <button
                type="submit"
                disabled={isLoading}
                className="rounded-full bg-[color:var(--coral)] px-6 py-2 font-semibold text-white hover:bg-[color:var(--coral)]/90 disabled:opacity-50"
              >
                {isLoading ? 'Salvando...' : 'Salvar Alterações'}
              </button>
            </div>
          </form>
        </div>

        {/* Account Info */}
        <div className="rounded-lg border border-[color:var(--border-soft)] bg-white p-6">
          <h2 className="mb-4 text-lg font-semibold text-[color:var(--text-primary)]">
            Informações da Conta
          </h2>

          <div className="space-y-4">
            <div>
              <p className="text-sm font-medium text-[color:var(--text-muted)]">
                Tipo de Conta
              </p>
              <p className="mt-1 text-lg font-semibold text-[color:var(--text-primary)]">
                {profile.role === 'researcher' ? 'Pesquisador' : 'Estudante/Visitante'}
              </p>
            </div>

            <div>
              <p className="text-sm font-medium text-[color:var(--text-muted)]">
                Plano Atual
              </p>
              <p className="mt-1 text-lg font-semibold text-[color:var(--text-primary)]">
                {profile.subscription_tier.charAt(0).toUpperCase() + profile.subscription_tier.slice(1)}
              </p>
            </div>

            <div>
              <p className="text-sm font-medium text-[color:var(--text-muted)]">
                Membro desde
              </p>
              <p className="mt-1 text-lg font-semibold text-[color:var(--text-primary)]">
                {new Date(profile.created_at).toLocaleDateString('pt-BR')}
              </p>
            </div>
          </div>
        </div>

        {/* Danger Zone */}
        <div className="rounded-lg border border-red-200 bg-red-50 p-6">
          <h2 className="mb-4 text-lg font-semibold text-red-900">
            Zona de Perigo
          </h2>

          <button
            onClick={handleLogout}
            className="rounded-full bg-red-600 px-6 py-2 font-semibold text-white hover:bg-red-700"
          >
            Sair da Conta
          </button>
        </div>
      </div>
    </div>
  );
}

