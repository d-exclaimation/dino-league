//
//  VirtualDom.ts
//  dino-league
//
//  Created by d-exclaimation on 01 Jan 2023
//

import { useCallback, useEffect, useRef } from "react";

type TimeoutArgs = {
  timeout?: number;
  action: TimerHandler;
};

/**
 * Hook for setTimeout with managed timeout reference
 */
export function useManagedTimeout() {
  const ref = useRef<number | null>(null);

  const clear = useCallback(() => {
    if (ref.current) {
      clearTimeout(ref.current);
    }
  }, []);

  const timeout = useCallback(
    ({ action, timeout }: TimeoutArgs) => {
      clear();
      ref.current = setTimeout(action, timeout ?? 0);
    },
    [clear]
  );

  useEffect(() => {
    return () => {
      if (ref?.current) {
        clearTimeout(ref.current);
      }
    };
  }, []);

  return {
    ref,
    clear,
    timeout,
  };
}
