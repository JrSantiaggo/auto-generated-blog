import { useState, useEffect, useCallback } from "react";
import { apiService } from "../services/api.service";

interface UseFetchState<T> {
  data: T | null;
  isLoading: boolean;
  error: Error | null;
}

interface UseFetchReturn<T> extends UseFetchState<T> {
  refetch: () => Promise<void>;
}

export function useFetch<T>(
  route: string | null,
  immediate = true
): UseFetchReturn<T> {
  const [state, setState] = useState<UseFetchState<T>>({
    data: null,
    isLoading: immediate && route !== null,
    error: null,
  });

  const execute = useCallback(async () => {
    if (!route) {
      setState({
        data: null,
        isLoading: false,
        error: null,
      });
      return;
    }

    setState((prev: UseFetchState<T>) => ({
      ...prev,
      isLoading: true,
      error: null,
    }));

    try {
      const data = await apiService.get<T>(route);
      setState({ data, isLoading: false, error: null });
    } catch (error) {
      setState({
        data: null,
        isLoading: false,
        error: error instanceof Error ? error : new Error("Unknown error"),
      });
    }
  }, [route]);

  useEffect(() => {
    if (immediate) {
      execute();
    }
  }, [execute, immediate]);

  return {
    ...state,
    refetch: execute,
  };
}
