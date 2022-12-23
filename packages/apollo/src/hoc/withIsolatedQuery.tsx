//
//  withIsolatedQuery.tsx
//  dino-league
//
//  Created by d-exclaimation on 23 Dec 2022
//

import type { ApolloError, QueryResult } from "@apollo/client";
import type { FC } from "react";

/**
 * Configuration for an data isolated component
 *
 * @param loader Hook to load the data using ApolloClient
 * @param fallbacks Fallback components (loading and error)
 */
type Config<
  TData,
  TVariables,
  OtherProps extends Record<string | number | symbol, any>
> = {
  loader: (props: OtherProps) => QueryResult<TData, TVariables>;
  fallbacks?: {
    loading?: FC<OtherProps>;
    error?: FC<OtherProps & { error?: ApolloError }>;
  };
};

/**
 * Create a component that can fetch its own data and not reliance of props
 * @param Component Component that is not data / query isolated
 * @param param1.loader Hook to load the data using ApolloClient
 * @param param1.fallbacks Fallback components (loading and error)
 * @returns A data / query isolated of the same component component
 */
export function withIsolatedQuery<
  TData,
  TVariables,
  OtherProps extends Record<string | number | symbol, any>
>(
  Component: FC<OtherProps & { data: TData | undefined }>,
  { loader: useLoader, fallbacks }: Config<TData, TVariables, OtherProps>
): FC<OtherProps> {
  const { loading: Loading, error: Error } = fallbacks ?? {};
  return (props: OtherProps) => {
    const { data, loading, error } = useLoader(props);

    if (loading && Loading) {
      return <Loading {...props} />;
    }

    if (error && Error) {
      return <Error error={error} {...props} />;
    }

    return <Component data={data} {...props} />;
  };
}
