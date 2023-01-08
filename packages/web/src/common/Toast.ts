//
//  Toast.ts
//  dino-league
//
//  Created by d-exclaimation on 02 Jan 2023
//

import { DependencyList, useCallback } from "react";
import { toast } from "react-toastify";

type MutationToastArgs = {
  mutation: () => Promise<string>;
  pending?: string;
  error?: string;
};

export function mutationToast({ mutation, error, pending }: MutationToastArgs) {
  return toast.promise(mutation, {
    pending: pending ?? "Loading...",
    error: {
      render: ({ data }) => (typeof data === "string" ? data : error),
    },
    success: {
      render: ({ data }) => data ?? "Success",
    },
  });
}

export function useToastableMutation<T extends (args: any) => Promise<string>>(
  { mutation, ...rest }: Omit<MutationToastArgs, "mutation"> & { mutation: T },
  deps: DependencyList
) {
  return useCallback(async (args: Parameters<T>[0]) => {
    await mutationToast({
      async mutation() {
        return mutation(args);
      },
      ...rest,
    });
  }, deps);
}
