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

/** Indicated reply that require authentication */
export type AuthIndicatorReply = Indicator | InputConstraint | Unauthorized;

/** Create Dino mutation result */
export type CreateDino = InputConstraint | NewDino | Unauthorized;

export type Dino = Identifiable & {
  __typename: 'Dino';
  /** The arena environment this Dinosaur most effective in */
  arena: Arena;
  /** The attack for this class of Dinosaur */
  attack: Scalars['Float'];
  /** The damage dealt by this Dinosaur */
  damage: Scalars['Float'];
  /** The amount of healing this class Dinosaur gain when resting */
  healing: Scalars['Float'];
  /** The current health of this Dinosaur */
  hp: Scalars['Float'];
  /** A unique ID for this entity */
  id: Scalars['ID'];
  /** The current level of this Dinosaur, which affects its attack and HP */
  level: Scalars['Int'];
  /** The max hp of this Dinosaur */
  maxHp: Scalars['Float'];
  /** The name of this Dinosaur */
  name: Scalars['String'];
  /** The hp percentage of this Dinosaur */
  percentage: Scalars['Float'];
  /** The price of this dinosaur */
  price: Scalars['Float'];
  /** The speed for this class of Dinosaur */
  speed: Scalars['Float'];
  /** The variance for this Dinosaur */
  variant: Variant;
};


export type DinoDamageArgs = {
  arena: Arena;
};

/** Filter argument(s) for Dino(s) */
export type DinoCreate = {
  /** The current level of this Dinosaur, which affects its attack and HP */
  level?: Scalars['Int'];
  /** The name of this Dinosaur */
  name?: InputMaybe<Scalars['String']>;
  /** The variant of one or many Dino(s) */
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

/** Input to switch 2 dinosaur */
export type DinoSwitch = {
  /** One of the dino's id to be switched */
  lhs: Scalars['ID'];
  /** One of the dino's id to be switched */
  rhs: Scalars['ID'];
};

export type Identifiable = {
  /** A unique ID for this entity */
  id: Scalars['ID'];
};

/** Indicator that an operation has done successfully something or not */
export type Indicator = {
  __typename: 'Indicator';
  /** A indicator flag, true for something did happen, false otherwise */
  flag: Scalars['Boolean'];
};

/** One of the input violates a constraint */
export type InputConstraint = {
  __typename: 'InputConstraint';
  /** The field name that is violating constraint */
  name: Scalars['String'];
  /** The reason of violation */
  reason: Scalars['String'];
};

export type Mutation = {
  __typename: 'Mutation';
  /** Put a dino from box to the party */
  addDinoToParty: AuthIndicatorReply;
  /** Create a Dino */
  createDino: CreateDino;
  /** Create a randomly generated Dino */
  createRandomDino: CreateDino;
  /** Put a dino from party to the box */
  putDinoToBox: AuthIndicatorReply;
  /** Switch 2 dino around */
  switchDino: AuthIndicatorReply;
};


export type MutationAddDinoToPartyArgs = {
  input: Scalars['ID'];
};


export type MutationCreateDinoArgs = {
  input: DinoCreate;
};


export type MutationPutDinoToBoxArgs = {
  input: Scalars['ID'];
};


export type MutationSwitchDinoArgs = {
  input: DinoSwitch;
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
  /** Get the current authenticated user */
  me?: Maybe<User>;
};


export type QueryDinosaurArgs = {
  input: SearchById;
};


export type QueryDinosaursArgs = {
  input: DinoFilter;
};

export type SearchById = {
  /** A unique ID for this entity */
  id: Scalars['ID'];
};

/** An operation is made by an unauthorized user */
export type Unauthorized = {
  __typename: 'Unauthorized';
  /** What operation is done that caused an unauthorized error */
  operation: Scalars['String'];
};

export type User = Identifiable & {
  __typename: 'User';
  /** Get all Dinosaur in this user's party */
  box: Array<Dino>;
  /** True if the user has a full party */
  hasFullParty: Scalars['Boolean'];
  /** A unique ID for this entity */
  id: Scalars['ID'];
  /** Get all Dinosaur in this user's party */
  party: Array<Dino>;
};

/** The variant of dinosaur */
export enum Variant {
  /** Bold comes in black */
  Black = 'black',
  /** Jumping expert */
  Blue = 'blue',
  /** Runs swiftly */
  Green = 'green',
  /** Ouch.. */
  Pink = 'pink',
  /** A good offense in the best defense */
  Red = 'red',
  /** Boom */
  Slate = 'slate',
  /** Jack of all trades */
  White = 'white',
  /** Can't lose if you don't get hit */
  Yellow = 'yellow'
}

export type FullDinoInfoFragment = { __typename: 'Dino', level: number, attack: number, speed: number, healing: number, arena: Arena, id: string, name: string, hp: number, percentage: number, variant: Variant };

export type QuickDinoInfoFragment = { __typename: 'Dino', id: string, name: string, hp: number, percentage: number, variant: Variant };

type Reply_Indicator_Fragment = { __typename: 'Indicator', flag: boolean };

type Reply_InputConstraint_Fragment = { __typename: 'InputConstraint', name: string, reason: string };

type Reply_Unauthorized_Fragment = { __typename: 'Unauthorized', operation: string };

export type ReplyFragment = Reply_Indicator_Fragment | Reply_InputConstraint_Fragment | Reply_Unauthorized_Fragment;

export type AddToPartyMutationVariables = Exact<{
  dino: Scalars['ID'];
}>;


export type AddToPartyMutation = { __typename: 'Mutation', addDinoToParty: { __typename: 'Indicator', flag: boolean } | { __typename: 'InputConstraint', name: string, reason: string } | { __typename: 'Unauthorized', operation: string } };

export type PutToBoxMutationVariables = Exact<{
  dino: Scalars['ID'];
}>;


export type PutToBoxMutation = { __typename: 'Mutation', putDinoToBox: { __typename: 'Indicator', flag: boolean } | { __typename: 'InputConstraint', name: string, reason: string } | { __typename: 'Unauthorized', operation: string } };

export type SwitchDinoMutationVariables = Exact<{
  input: DinoSwitch;
}>;


export type SwitchDinoMutation = { __typename: 'Mutation', switchDino: { __typename: 'Indicator', flag: boolean } | { __typename: 'InputConstraint', name: string, reason: string } | { __typename: 'Unauthorized', operation: string } };

export type DinosaurQueryVariables = Exact<{
  input: SearchById;
}>;


export type DinosaurQuery = { __typename: 'Query', dinosaur?: { __typename: 'Dino', id: string, level: number, hp: number, attack: number, speed: number, healing: number, arena: Arena, variant: Variant, name: string, percentage: number } | null };

export type PartyViewQueryVariables = Exact<{
  dino: SearchById;
}>;


export type PartyViewQuery = { __typename: 'Query', dinosaur?: { __typename: 'Dino', level: number, attack: number, speed: number, healing: number, arena: Arena, id: string, name: string, hp: number, percentage: number, variant: Variant } | null, me?: { __typename: 'User', id: string, hasFullParty: boolean, party: Array<{ __typename: 'Dino', id: string, name: string, hp: number, percentage: number, variant: Variant }>, box: Array<{ __typename: 'Dino', id: string, name: string, hp: number, percentage: number, variant: Variant }> } | null };

export type PlaceholderPartyQueryVariables = Exact<{ [key: string]: never; }>;


export type PlaceholderPartyQuery = { __typename: 'Query', dinosaurs: Array<{ __typename: 'Dino', id: string, name: string, hp: number, percentage: number, variant: Variant }> };

export const QuickDinoInfoFragmentDoc = gql`
    fragment QuickDinoInfo on Dino {
  id
  name
  hp
  percentage
  variant
}
    `;
export const FullDinoInfoFragmentDoc = gql`
    fragment FullDinoInfo on Dino {
  ...QuickDinoInfo
  level
  attack
  speed
  healing
  arena
}
    ${QuickDinoInfoFragmentDoc}`;
export const ReplyFragmentDoc = gql`
    fragment Reply on AuthIndicatorReply {
  __typename
  ... on Unauthorized {
    operation
  }
  ... on Indicator {
    flag
  }
  ... on InputConstraint {
    name
    reason
  }
}
    `;
export const AddToPartyDocument = gql`
    mutation AddToParty($dino: ID!) {
  addDinoToParty(input: $dino) {
    ...Reply
  }
}
    ${ReplyFragmentDoc}`;
export type AddToPartyMutationFn = Apollo.MutationFunction<AddToPartyMutation, AddToPartyMutationVariables>;

/**
 * __useAddToPartyMutation__
 *
 * To run a mutation, you first call `useAddToPartyMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddToPartyMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addToPartyMutation, { data, loading, error }] = useAddToPartyMutation({
 *   variables: {
 *      dino: // value for 'dino'
 *   },
 * });
 */
export function useAddToPartyMutation(baseOptions?: Apollo.MutationHookOptions<AddToPartyMutation, AddToPartyMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AddToPartyMutation, AddToPartyMutationVariables>(AddToPartyDocument, options);
      }
export type AddToPartyMutationHookResult = ReturnType<typeof useAddToPartyMutation>;
export type AddToPartyMutationResult = Apollo.MutationResult<AddToPartyMutation>;
export type AddToPartyMutationOptions = Apollo.BaseMutationOptions<AddToPartyMutation, AddToPartyMutationVariables>;
export const PutToBoxDocument = gql`
    mutation PutToBox($dino: ID!) {
  putDinoToBox(input: $dino) {
    ...Reply
  }
}
    ${ReplyFragmentDoc}`;
export type PutToBoxMutationFn = Apollo.MutationFunction<PutToBoxMutation, PutToBoxMutationVariables>;

/**
 * __usePutToBoxMutation__
 *
 * To run a mutation, you first call `usePutToBoxMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `usePutToBoxMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [putToBoxMutation, { data, loading, error }] = usePutToBoxMutation({
 *   variables: {
 *      dino: // value for 'dino'
 *   },
 * });
 */
export function usePutToBoxMutation(baseOptions?: Apollo.MutationHookOptions<PutToBoxMutation, PutToBoxMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<PutToBoxMutation, PutToBoxMutationVariables>(PutToBoxDocument, options);
      }
export type PutToBoxMutationHookResult = ReturnType<typeof usePutToBoxMutation>;
export type PutToBoxMutationResult = Apollo.MutationResult<PutToBoxMutation>;
export type PutToBoxMutationOptions = Apollo.BaseMutationOptions<PutToBoxMutation, PutToBoxMutationVariables>;
export const SwitchDinoDocument = gql`
    mutation SwitchDino($input: DinoSwitch!) {
  switchDino(input: $input) {
    ...Reply
  }
}
    ${ReplyFragmentDoc}`;
export type SwitchDinoMutationFn = Apollo.MutationFunction<SwitchDinoMutation, SwitchDinoMutationVariables>;

/**
 * __useSwitchDinoMutation__
 *
 * To run a mutation, you first call `useSwitchDinoMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSwitchDinoMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [switchDinoMutation, { data, loading, error }] = useSwitchDinoMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useSwitchDinoMutation(baseOptions?: Apollo.MutationHookOptions<SwitchDinoMutation, SwitchDinoMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SwitchDinoMutation, SwitchDinoMutationVariables>(SwitchDinoDocument, options);
      }
export type SwitchDinoMutationHookResult = ReturnType<typeof useSwitchDinoMutation>;
export type SwitchDinoMutationResult = Apollo.MutationResult<SwitchDinoMutation>;
export type SwitchDinoMutationOptions = Apollo.BaseMutationOptions<SwitchDinoMutation, SwitchDinoMutationVariables>;
export const DinosaurDocument = gql`
    query Dinosaur($input: SearchByID!) {
  dinosaur(input: $input) {
    id
    level
    hp
    attack
    speed
    healing
    arena
    variant
    name
    percentage
  }
}
    `;

/**
 * __useDinosaurQuery__
 *
 * To run a query within a React component, call `useDinosaurQuery` and pass it any options that fit your needs.
 * When your component renders, `useDinosaurQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useDinosaurQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useDinosaurQuery(baseOptions: Apollo.QueryHookOptions<DinosaurQuery, DinosaurQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<DinosaurQuery, DinosaurQueryVariables>(DinosaurDocument, options);
      }
export function useDinosaurLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<DinosaurQuery, DinosaurQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<DinosaurQuery, DinosaurQueryVariables>(DinosaurDocument, options);
        }
export type DinosaurQueryHookResult = ReturnType<typeof useDinosaurQuery>;
export type DinosaurLazyQueryHookResult = ReturnType<typeof useDinosaurLazyQuery>;
export type DinosaurQueryResult = Apollo.QueryResult<DinosaurQuery, DinosaurQueryVariables>;
export function refetchDinosaurQuery(variables: DinosaurQueryVariables) {
      return { query: DinosaurDocument, variables: variables }
    }
export const PartyViewDocument = gql`
    query PartyView($dino: SearchByID!) {
  dinosaur(input: $dino) {
    ...FullDinoInfo
  }
  me {
    id
    hasFullParty
    party {
      ...QuickDinoInfo
    }
    box {
      ...QuickDinoInfo
    }
  }
}
    ${FullDinoInfoFragmentDoc}
${QuickDinoInfoFragmentDoc}`;

/**
 * __usePartyViewQuery__
 *
 * To run a query within a React component, call `usePartyViewQuery` and pass it any options that fit your needs.
 * When your component renders, `usePartyViewQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePartyViewQuery({
 *   variables: {
 *      dino: // value for 'dino'
 *   },
 * });
 */
export function usePartyViewQuery(baseOptions: Apollo.QueryHookOptions<PartyViewQuery, PartyViewQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<PartyViewQuery, PartyViewQueryVariables>(PartyViewDocument, options);
      }
export function usePartyViewLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<PartyViewQuery, PartyViewQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<PartyViewQuery, PartyViewQueryVariables>(PartyViewDocument, options);
        }
export type PartyViewQueryHookResult = ReturnType<typeof usePartyViewQuery>;
export type PartyViewLazyQueryHookResult = ReturnType<typeof usePartyViewLazyQuery>;
export type PartyViewQueryResult = Apollo.QueryResult<PartyViewQuery, PartyViewQueryVariables>;
export function refetchPartyViewQuery(variables: PartyViewQueryVariables) {
      return { query: PartyViewDocument, variables: variables }
    }
export const PlaceholderPartyDocument = gql`
    query PlaceholderParty {
  dinosaurs(input: {take: 5}) {
    id
    name
    hp
    percentage
    variant
  }
}
    `;

/**
 * __usePlaceholderPartyQuery__
 *
 * To run a query within a React component, call `usePlaceholderPartyQuery` and pass it any options that fit your needs.
 * When your component renders, `usePlaceholderPartyQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePlaceholderPartyQuery({
 *   variables: {
 *   },
 * });
 */
export function usePlaceholderPartyQuery(baseOptions?: Apollo.QueryHookOptions<PlaceholderPartyQuery, PlaceholderPartyQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<PlaceholderPartyQuery, PlaceholderPartyQueryVariables>(PlaceholderPartyDocument, options);
      }
export function usePlaceholderPartyLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<PlaceholderPartyQuery, PlaceholderPartyQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<PlaceholderPartyQuery, PlaceholderPartyQueryVariables>(PlaceholderPartyDocument, options);
        }
export type PlaceholderPartyQueryHookResult = ReturnType<typeof usePlaceholderPartyQuery>;
export type PlaceholderPartyLazyQueryHookResult = ReturnType<typeof usePlaceholderPartyLazyQuery>;
export type PlaceholderPartyQueryResult = Apollo.QueryResult<PlaceholderPartyQuery, PlaceholderPartyQueryVariables>;
export function refetchPlaceholderPartyQuery(variables?: PlaceholderPartyQueryVariables) {
      return { query: PlaceholderPartyDocument, variables: variables }
    }