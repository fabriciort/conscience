'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import type { SubscriptionTier } from '@/lib/supabase/types';

export function useSubscription(userId: string | undefined) {
  const [tier, setTier] = useState<SubscriptionTier>('free');
  const [loading, setLoading] = useState(true);
  const supabase = createClient();

  useEffect(() => {
    if (!userId) {
      setLoading(false);
      return;
    }

    const getSubscription = async () => {
      // Get user profile tier
      const { data: profile } = await supabase
        .from('profiles')
        .select('subscription_tier')
        .eq('id', userId)
        .single();

      if (profile) {
        setTier(profile.subscription_tier);
      }

      setLoading(false);
    };

    getSubscription();
  }, [userId, supabase]);

  return { tier, loading };
}

