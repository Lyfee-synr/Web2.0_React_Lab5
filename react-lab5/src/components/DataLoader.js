import React, { useEffect, useState } from "react";

/**
 * DataLoader (Render Props)
 * Props:
 *  - url: string (API endpoint)
 *  - render: function({ data, loading, error }) => ReactNode
 */
export default function DataLoader({ url, render }) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const controller = new AbortController();

    async function run() {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(url, { signal: controller.signal });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const json = await res.json();
        setData(json);
      } catch (err) {
        if (err.name !== "AbortError") setError(err);
      } finally {
        setLoading(false);
      }
    }

    run();
    return () => controller.abort();
  }, [url]);

  // Giao toàn quyền render cho consumer
  return render({ data, loading, error });
}
