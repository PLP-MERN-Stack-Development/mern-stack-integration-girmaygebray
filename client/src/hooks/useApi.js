import { useState, useCallback } from 'react';
import api from '../services/api';

export default function useApi() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const request = useCallback(async (config) => {
    setLoading(true); setError(null);
    try {
      const res = await api(config);
      setLoading(false);
      return res.data;
    } catch (err) {
      setLoading(false);
      setError(err.response?.data?.message || err.message);
      throw err;
    }
  }, []);

  return { request, loading, error };
}
