// src/lib/supabase.ts
import { createClient } from '@supabase/supabase-js';
import { useAuth, useUser } from '@clerk/clerk-react';
import { useEffect, useState, useRef } from 'react';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL!;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: { persistSession: true, autoRefreshToken: true },
});

/**
 * Returns { ready, loading, error }
 *   ready  → Supabase session is valid
 *   loading → still fetching the token
 *   error   → something went wrong (shown in toast)
 */
export function useSupabaseAuth() {
  const { getToken } = useAuth();
  const { isSignedIn } = useUser();
  const [ready, setReady] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const mounted = useRef(true);

  useEffect(() => {
    if (!isSignedIn) {
      setReady(false);
      setLoading(false);
      return;
    }

    let cancelled = false;

    const sync = async () => {
      try {
        setLoading(true);
        setError(null);

        // 1. Get the Clerk JWT that Supabase understands
        const token = await getToken({ template: 'supabase' });
        if (!token) throw new Error('Clerk token is empty – check JWT template');

        if (cancelled) return;

        // 2. Set it on Supabase
        const { error: sessErr } = await supabase.auth.setSession({
          access_token: token,
          refresh_token: token, // Supabase accepts same token for refresh
        });

        if (sessErr) throw sessErr;

        if (mounted.current) {
          setReady(true);
        }
      } catch (e: any) {
        console.error('[SupabaseAuth] sync failed →', e);
        if (mounted.current) {
          setError(e.message ?? 'Unknown auth error');
        }
      } finally {
        if (mounted.current) setLoading(false);
      }
    };

    sync();

    return () => {
      cancelled = true;
      mounted.current = false;
    };
  }, [isSignedIn, getToken]);

  return { ready, loading, error };
}