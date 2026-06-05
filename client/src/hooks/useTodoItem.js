import { useState, useCallback } from "react";

export const useTodoItem = (url, method) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const execute = useCallback(async (body) => {
    try {
      setIsLoading(true);
      setError(null);

      const res = await fetch(url, {
        method,
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Ошибка запроса");
      }

      return data;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, [url, method]);

  return {
    execute,
    isLoading,
    error,
  };
};