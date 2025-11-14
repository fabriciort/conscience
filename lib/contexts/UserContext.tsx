'use client';

import { createContext, useContext, type ReactNode } from 'react';
import { useUser } from '@/lib/hooks/useUser';
import { useSubscription } from '@/lib/hooks/useSubscription';
import type { User } from '@supabase/supabase-js';
import type { ProfileWithResearcherData, SubscriptionTier } from '@/lib/supabase/types';

interface UserContextType {
  user: User | null;
  profile: ProfileWithResearcherData | null;
  tier: SubscriptionTier;
  loading: boolean;
  isResearcher: boolean;
  isViewer: boolean;
  isAdmin: boolean;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: ReactNode }) {
  const { user, profile, loading: userLoading } = useUser();
  const { tier, loading: tierLoading } = useSubscription(user?.id);

  const loading = userLoading || tierLoading;

  const value: UserContextType = {
    user,
    profile,
    tier,
    loading,
    isResearcher: profile?.role === 'researcher' || profile?.role === 'admin',
    isViewer: profile?.role === 'viewer',
    isAdmin: profile?.role === 'admin',
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}

export function useUserContext() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUserContext must be used within a UserProvider');
  }
  return context;
}

