'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import type { User } from '@supabase/supabase-js';
import type { ProfileWithResearcherData } from '@/lib/supabase/types';

export function useUser() {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<ProfileWithResearcherData | null>(null);
  const [loading, setLoading] = useState(true);
  const supabase = createClient();

  useEffect(() => {
    // Get initial session
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);

      if (user) {
        // Get profile with researcher data
        const { data: profileData } = await supabase
          .from('profiles')
          .select(`
            *,
            researcher_profile:researcher_profiles(*)
          `)
          .eq('id', user.id)
          .single();

        setProfile(profileData as ProfileWithResearcherData);
      }
      
      setLoading(false);
    };

    getUser();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      setUser(session?.user ?? null);

      if (session?.user) {
        const { data: profileData } = await supabase
          .from('profiles')
          .select(`
            *,
            researcher_profile:researcher_profiles(*)
          `)
          .eq('id', session.user.id)
          .single();

        setProfile(profileData as ProfileWithResearcherData);
      } else {
        setProfile(null);
      }

      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, [supabase]);

  return { user, profile, loading };
}

