import { createClient } from '@/lib/supabase/server';
import { NextResponse } from 'next/server';
import type { Profile } from '@/lib/supabase/types';

export async function GET(request: Request) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get('code');

  if (code) {
    const supabase = await createClient();
    await supabase.auth.exchangeCodeForSession(code);
  }

  // URL to redirect to after sign in process completes
  // Get user profile to determine redirect
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (user) {
    const { data: profile } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', user.id)
      .single() as { data: Profile | null };

    if (profile?.role === 'researcher' || profile?.role === 'admin') {
      return NextResponse.redirect(new URL('/studio/dashboard', request.url));
    }
  }

  return NextResponse.redirect(new URL('/platform/feed', request.url));
}

