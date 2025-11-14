import type { SubscriptionTier, UserRole } from '@/lib/supabase/types';

// Tier hierarchy for access control
const TIER_HIERARCHY: SubscriptionTier[] = ['free', 'essential', 'advanced', 'corporate'];

/**
 * Check if user has access to content based on subscription tier
 */
export function canAccessContent(
  userTier: SubscriptionTier,
  contentTier: SubscriptionTier
): boolean {
  const userIndex = TIER_HIERARCHY.indexOf(userTier);
  const contentIndex = TIER_HIERARCHY.indexOf(contentTier);
  
  return userIndex >= contentIndex;
}

/**
 * Check if user has researcher/admin role
 */
export function isResearcher(role: UserRole): boolean {
  return role === 'researcher' || role === 'admin';
}

/**
 * Check if user is admin
 */
export function isAdmin(role: UserRole): boolean {
  return role === 'admin';
}

/**
 * Get tier display name
 */
export function getTierDisplayName(tier: SubscriptionTier): string {
  const names: Record<SubscriptionTier, string> = {
    free: 'Gratuito',
    essential: 'Essencial',
    advanced: 'Avançado',
    corporate: 'Corporate Labs',
  };
  return names[tier];
}

/**
 * Get tier color for UI
 */
export function getTierColor(tier: SubscriptionTier): string {
  const colors: Record<SubscriptionTier, string> = {
    free: 'text-gray-600 bg-gray-100',
    essential: 'text-blue-600 bg-blue-100',
    advanced: 'text-purple-600 bg-purple-100',
    corporate: 'text-amber-600 bg-amber-100',
  };
  return colors[tier];
}

