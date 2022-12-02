import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

/** The battlefield environment */
export enum Arena {
  Desert = 'DESERT',
  Grassland = 'GRASSLAND',
  Hills = 'HILLS',
  Ocean = 'OCEAN',
  Urban = 'URBAN'
}

/** Create Dino mutation result */
export type CreateDino = NewDino | Unauthorized;

export type Dino = Identifiable & {
  __typename: 'Dino';
  /** The arena environment this Dinosaur most effective in */
  arena: Arena;
  /** The base attack for this class of Dinosaur */
  attack: Scalars['Float'];
  /** The damage dealt by this Dinosaur */
  damage: Scalars['Float'];
  /** The current health of this Dinosaur */
  hp: Scalars['Float'];
  /** A unique ID for this entity */
  id: Scalars['ID'];
  /** The current level of this Dinosaur, which affects its attack and HP */
  level: Scalars['Int'];
  /** The name of this Dinosaur */
  name: Scalars['String'];
  /** The variance for this Dinosaur */
  variant: Variant;
};


export type DinoDamageArgs = {
  arena: Arena;
};

/** Creation argument(s) for Dino(s) */
export type DinoCreate = {
  /** The level of the Dino */
  level?: Scalars['Int'];
  /** The optional nickname of the Dino */
  name?: InputMaybe<Scalars['String']>;
  /** The variant of the Dino */
  variant: Variant;
};

/** Filter argument(s) for Dino(s) */
export type DinoFilter = {
  /** The arena of choice of one or many Dino(s) */
  arena?: InputMaybe<Arena>;
  /** The limit of result to take */
  take?: Scalars['Int'];
  /** The variant of one or many Dino(s) */
  variant?: InputMaybe<Variant>;
};

export type Identifiable = {
  /** A unique ID for this entity */
  id: Scalars['ID'];
};

export type Mutation = {
  __typename: 'Mutation';
  /** Create a Dino */
  createDino: CreateDino;
  /** Create a randomly generated Dino */
  createRandomDino: CreateDino;
};


export type MutationCreateDinoArgs = {
  input: DinoCreate;
};

/** New Dino has been created */
export type NewDino = {
  __typename: 'NewDino';
  /** The new Dino created */
  dino: Dino;
};

export type Query = {
  __typename: 'Query';
  /** Find a Dino by their ID */
  dinosaur?: Maybe<Dino>;
  /** Get all dinosaurs */
  dinosaurs: Array<Dino>;
};


export type QueryDinosaurArgs = {
  input: SearchById;
};


export type QueryDinosaursArgs = {
  input: DinoFilter;
};

/** Search an Identifiable by the ID */
export type SearchById = {
  /** The ID to be search against */
  id: Scalars['ID'];
};

/** An operation is made by an unauthorized user */
export type Unauthorized = {
  __typename: 'Unauthorized';
  /** What operation is done that caused an unauthorized error */
  operation: Scalars['String'];
};

/** The variant of dinosaur */
export enum Variant {
  /** An early stage in the evolution of sauropods */
  Aardonyx = 'AARDONYX',
  /** "Abel's lizard" has been reconstructed from a single skull */
  Abelisaurus = 'ABELISAURUS',
  /** A versatile dinosaur */
  Alosaur = 'ALOSAUR'
}

export type DinosaursQueryVariables = Exact<{ [key: string]: never; }>;


export type DinosaursQuery = { __typename: 'Query', dinosaurs: Array<{ __typename: 'Dino', id: string, name: string, level: number, hp: number, variant: Variant, attack: number, arena: Arena }> };


export const DinosaursDocument = gql`
    query Dinosaurs {
  dinosaurs(input: {}) {
    id
    name
    level
    hp
    variant
    attack
    arena
  }
}
    `;

/**
 * __useDinosaursQuery__
 *
 * To run a query within a React component, call `useDinosaursQuery` and pass it any options that fit your needs.
 * When your component renders, `useDinosaursQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useDinosaursQuery({
 *   variables: {
 *   },
 * });
 */
export function useDinosaursQuery(baseOptions?: Apollo.QueryHookOptions<DinosaursQuery, DinosaursQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<DinosaursQuery, DinosaursQueryVariables>(DinosaursDocument, options);
      }
export function useDinosaursLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<DinosaursQuery, DinosaursQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<DinosaursQuery, DinosaursQueryVariables>(DinosaursDocument, options);
        }
export type DinosaursQueryHookResult = ReturnType<typeof useDinosaursQuery>;
export type DinosaursLazyQueryHookResult = ReturnType<typeof useDinosaursLazyQuery>;
export type DinosaursQueryResult = Apollo.QueryResult<DinosaursQuery, DinosaursQueryVariables>;
export function refetchDinosaursQuery(variables?: DinosaursQueryVariables) {
      return { query: DinosaursDocument, variables: variables }
    }