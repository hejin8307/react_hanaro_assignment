import { useEffect, useState } from "react";

type FetchParam<T> = {
  url: string | URL | globalThis.Request;
  options?: RequestInit;
  dependencies?: unknown[];
  defaultData?: T;
};

const useFetch = <T>({
  url,
  options = {},
  dependencies = [],
  defaultData,
}: FetchParam<T>) => {
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [data, setData] = useState<T | undefined>(defaultData);

  useEffect(() => {
    const controller = new AbortController();
    options.signal = controller.signal;

    (async function () {
      setLoading(true);
      setError("");
      try {
        const response = await fetch(url, options);
        const data = await response.json();
        setData(data);
      } catch (err) {
        if (err instanceof Error) {
          if (err.name !== "AbortError") setError(err.message);
        }
      } finally {
        setLoading(false);
      }
    })();

    return () => controller.abort();
  }, dependencies);

  return { isLoading, data, error };
};

export default useFetch;
