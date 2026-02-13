'use client';

import { useCallback, useEffect, useState } from 'react';
import { fetchUserTransactions } from '@/utils/services';

/**
 * Standardized data fetching hook for user transactions.
 * Wraps `fetchUserTransactions` and exposes { data, loading, error, refetch }.
 */
export function useUserTransactions(userId) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const refetch = useCallback(async () => {
    if (!userId) return;
    setLoading(true);
    try {
      const result = await fetchUserTransactions(userId);
      setData(result || []);
      setError(null);
    } catch (err) {
      console.error('[useUserTransactions] Failed to fetch transactions:', JSON.stringify(err, null, 2));
      setError(err);
    } finally {
      setLoading(false);
    }
  }, [userId]);

  useEffect(() => {
    if (!userId) return;
    refetch();
  }, [userId, refetch]);

  return { data, loading, error, refetch };
}

export default useUserTransactions;

