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

export function useToastableMutation<
  Args,
  F extends (args: Args) => Promise<string>
>(
  { mutation, ...rest }: Omit<MutationToastArgs, "mutation"> & { mutation: F },
  deps: DependencyList
) {
  return useCallback(async (args: Args) => {
    await mutationToast({
      async mutation() {
        return mutation(args);
      },
      ...rest,
    });
  }, deps);
}
