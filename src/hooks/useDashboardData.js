import { useEffect, useState } from 'react';

import { api } from 'api/cliente';

export const useDashboardData = () => {
  const [data, setData] = useState({ students: [], teachers: [] });
  const [status, setStatus] = useState('loading');
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    const controller = new AbortController();

    const load = async () => {
      setStatus('loading');
      try {
        const [students, teachers] = await Promise.all([
          api.list('students', controller.signal),
          api.list('teachers', controller.signal)
        ]);
        setData({ students, teachers });
        setStatus('ready');
      } catch (error) {
        if (error.name === 'AbortError') return;
        console.error(error);
        setStatus('error');
      }
    };

    load();
    return () => controller.abort();
  }, [attempt]);

  return { status, ...data, retry: () => setAttempt((current) => current + 1) };
};
