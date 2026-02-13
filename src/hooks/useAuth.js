'use client';

import { useAuthContext } from '@/components/providers/AuthProvider';

/**
 * Shared auth/profile hook for dashboards and other client components.
 * Provides { user, loading, error } from a single global source.
 */
export function useAuth() {
  return useAuthContext();
}

export default useAuth;

