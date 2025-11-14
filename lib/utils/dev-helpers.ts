import { createClient } from '@/lib/supabase/client';
import type { SubscriptionTier } from '@/lib/supabase/types';

export const DEV_CONFIG = {
  enableDevToolbar: process.env.NODE_ENV === 'development',
  bypassEmailVerification: true,
  mockPayments: true,
  showDebugInfo: process.env.NODE_ENV === 'development',
  
  // Test users for quick login
  testUsers: {
    viewer: 'viewer@test.com',
    premium: 'premium@test.com',
    researcher: 'researcher@test.com',
  }
};

/**
 * Mock subscription purchase for development
 */
export async function devMockSubscription(
  userId: string,
  tier: SubscriptionTier
) {
  if (process.env.NODE_ENV !== 'development') {
    console.warn('devMockSubscription should only be used in development');
    return { data: null, error: new Error('Not in development mode') };
  }

  const supabase = createClient();
  
  // Create subscription record
  const { data: subscription, error: subError } = await supabase
    .from('subscriptions')
    .insert({
      user_id: userId,
      tier,
      starts_at: new Date().toISOString(),
      expires_at: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString(),
      is_active: true,
      payment_provider: 'mock',
    })
    .select()
    .single();

  if (subError) {
    console.error('Error creating mock subscription:', subError);
    return { data: null, error: subError };
  }

  // Update profile tier
  const { data: profile, error: profileError } = await supabase
    .from('profiles')
    .update({ subscription_tier: tier })
    .eq('id', userId)
    .select()
    .single();

  if (profileError) {
    console.error('Error updating profile tier:', profileError);
    return { data: null, error: profileError };
  }

  return { data: { subscription, profile }, error: null };
}

/**
 * Generate slug from title
 */
export function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // Remove accents
    .replace(/[^a-z0-9\s-]/g, '') // Remove special chars
    .trim()
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/-+/g, '-'); // Replace multiple hyphens with single
}

/**
 * Format duration in seconds to readable format
 */
export function formatDuration(seconds: number): string {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;

  if (hours > 0) {
    return `${hours}:${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  }
  return `${minutes}:${String(secs).padStart(2, '0')}`;
}

/**
 * Format view count
 */
export function formatViewCount(count: number): string {
  if (count >= 1000000) {
    return `${(count / 1000000).toFixed(1)}M`;
  }
  if (count >= 1000) {
    return `${(count / 1000).toFixed(1)}K`;
  }
  return count.toString();
}

