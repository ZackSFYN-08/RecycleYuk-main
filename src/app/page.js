"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@supabase/supabase-js';
import { getDashboardPath } from '@/utils/supabase';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();

        if (session) {
          // Jika sudah login, redirect ke dashboard sesuai role
          const { data: profile } = await supabase
            .from('profiles')
            .select('role')
            .eq('id', session.user.id)
            .single();

          // Gunakan fallback metadata jika profile tidak ada
          const role = (profile?.role || session.user.user_metadata?.role || 'user').toLowerCase();
          router.replace(getDashboardPath(role));
        } else {
          // Jika belum login, redirect ke login page
          router.replace('/login');
        }
      } catch (error) {
        console.error('Auth check error:', error);
        router.replace('/login');
      }
    };

    checkAuth();
  }, [router]);

  // Loading state sementara mengecek auth
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 flex items-center justify-center">
      <div className="text-center">
        <div className="w-16 h-16 border-4 border-green-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-green-700 font-medium">Memuat RecycleYuk...</p>
      </div>
    </div>
  );
}