// @ts-nocheck
import { useState, useEffect } from 'react';

export function CleanComponent() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        const response = await fetch('/api/data');
        if (response.ok) {
          const result = await response.json();
          setData(result);
        }
      } catch (error) {
        console.error('Fetch error:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchData().catch(console.error);
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      {data ? <pre>{JSON.stringify(data)}</pre> : 'No data'}
    </div>
  );
}
