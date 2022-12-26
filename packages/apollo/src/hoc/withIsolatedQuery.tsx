//
//  withIsolatedQuery.tsx
//  dino-league
//
//  Created by d-exclaimation on 23 Dec 2022
//

import type { ApolloError } from "@apollo/client";
import type { FC } from "react";

/**
 * Configuration for an data isolated component
 *
 * @param loader Hook to load the data using ApolloClient
 * @param fallbacks Fallback components (loading and error)
 */
type Config<TData, OtherProps extends object> = {
  loader: (props: OtherProps) => {
    data: TData | undefined;
    loading: boolean;
    error?: ApolloError;
  };
  fallbacks?: {
    loading?: FC<OtherProps>;
    error?: FC<
      OtherProps & {
        data: TData | undefined;
        error: ApolloError;
      }
    >;
  };
};

/**
 * Create a component that can fetch its own data from a component that rely on props for data fetching
 * @param Component Component that is not data / query isolated
 * @param param1.loader Hook to load the data using ApolloClient
 * @param param1.fallbacks Fallback components (loading and error)
 * @returns A data / query isolated of the same component component
 */
export function withIsolatedQuery<
  TData,
  Props extends { data: TData | undefined }
>(
  Component: FC<Props>,
  { loader: useLoader, fallbacks }: Config<TData, Omit<Props, "data">>
): FC<Omit<Props, "data">> {
  const { loading: LoadingComponent, error: ErrorComponent } = fallbacks ?? {};
  return (props) => {
    const { data, loading, error } = useLoader(props);

    if (loading && LoadingComponent) {
      return <LoadingComponent {...props} />;
    }

    if (error && ErrorComponent) {
      return <ErrorComponent error={error} data={data} {...props} />;
    }

    return (
      <Component
        {...({
          ...props,
          data,
        } as Props)}
      />
    );
  };
}
