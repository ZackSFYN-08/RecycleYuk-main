'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { getCurrentUser } from '@/utils/services';

const AuthContext = createContext({
  user: null,
  loading: true,
  error: null,
});

export function AuthProvider({ children }) {
  const [state, setState] = useState({
    user: null,
    loading: true,
    error: null,
  });

  useEffect(() => {
    let isMounted = true;

    const loadUser = async () => {
      try {
        const user = await getCurrentUser();
        if (!isMounted) return;
        setState({ user, loading: false, error: null });
      } catch (error) {
        console.error('[AuthProvider] Failed to load current user:', error);
        if (!isMounted) return;
        setState({ user: null, loading: false, error });
      }
    };

    loadUser();

    return () => {
      isMounted = false;
    };
  }, []);

  return <AuthContext.Provider value={state}>{children}</AuthContext.Provider>;
}

export function useAuthContext() {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error('useAuthContext must be used within an AuthProvider');
  }
  return ctx;
}

export default AuthContext;

