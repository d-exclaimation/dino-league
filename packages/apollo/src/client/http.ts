//
//  http.ts
//  dino-league
//
//  Created by d-exclaimation on 27 Nov 2022
//

import { ApolloLink, createHttpLink, HttpOptions } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

/**
 * Create an auth apollo link
 * @param token Function to retreive bearer token
 * @returns An Apollo Link that puts Authorization header with the token
 */
export const createAuthLink = (token: () => string | null) =>
  setContext((_req, { headers }) => {
    const authToken = token();
    if (!token) {
      return { headers };
    }
    if (!headers) {
      return { authorization: `Bearer ${authToken}` };
    }
    return {
      ...headers,
      authorization: `Bearer ${authToken}`,
    };
  });

/**
 * Create an auth + http apollo link
 * @param linkOptions Link options
 * @returns An Apollo Link with HTTP and Auth
 */
export const createHttpWithAuthLink = (
  linkOptions?: HttpOptions | undefined
): ApolloLink => {
  const authLink = createAuthLink(
    () => window?.localStorage?.getItem("token") ?? null
  );

  return authLink.concat(createHttpLink(linkOptions));
};
