//
//  useMount.ts
//  dino-league
//
//  Created by d-exclaimation on 25 Nov 2022
//

import { EffectCallback, useEffect, useRef } from "react";

export function useMount(callback: EffectCallback) {
  const mountedRef = useRef(false);
  useEffect(() => {
    if (mountedRef.current) return;
    mountedRef.current = true;
    return callback();
  }, []);
}
