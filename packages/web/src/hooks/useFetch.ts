//
//  useFetch.ts
//  dino-league
//
//  Created by d-exclaimation on 26 Nov 2022
//

import { useCallback, useState } from "react";
import { useMount } from "./useMount";

export type FetchResult<T extends object> =
  | { type: "loading" }
  | { type: "data"; data: T }
  | { type: "error"; error: unknown };

export function useLazyFetch<T extends object>(
  url: string,
  config?: RequestInit
) {
  const [res, setRes] = useState<FetchResult<T>>({ type: "loading" });

  const execute = useCallback(async () => {
    console.log(`Fetching from ${url}....`);
    try {
      const response = await fetch("http://localhost:4000", config);
      const data: T = await response.json();
      setRes({ data, type: "data" });
    } catch (error: unknown) {
      setRes({ error, type: "error" });
    } finally {
      console.log("Done fetching");
    }
  }, [setRes, url, config]);

  const invalidate = useCallback(() => setTimeout(execute, 0), [execute]);

  return [res, invalidate] as const;
}

export function useFetch<T extends object>(url: string, config?: RequestInit) {
  const [res, invalidate] = useLazyFetch<T>(url, config);

  useMount(() => {
    invalidate();
  });

  return [res, invalidate] as const;
}
