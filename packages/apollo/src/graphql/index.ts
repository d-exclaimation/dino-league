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
export const enum Arena {
  Desert = 'DESERT',
  Grassland = 'GRASSLAND',
  Hills = 'HILLS',
  Ocean = 'OCEAN',
  Urban = 'URBAN'
};

/** Indicated reply that require authentication */
export type AuthIndicatorReply = Indicator | InputConstraint | Unauthorized;

/** Battle result and plan */
export type Battle = {
  __typename: 'Battle';
  /** Battle plan information */
  plan: Array<BattleInfo>;
};

/** Battle ending */
export type BattleEnd = {
  __typename: 'BattleEnd';
  /** Whether you win or not */
  win: Scalars['Boolean'];
};

/** Battle information */
export type BattleInfo = BattleEnd | BattleInit | BattleTurn;

/** Initial battle information */
export type BattleInit = {
  __typename: 'BattleInit';
  /** The current details of opponent's battling dino */
  opponents: Dino;
  /** The number of opponent's dino */
  opponentsRemaining: Scalars['Float'];
  /** The current details of your battling dino */
  yours: Dino;
  /** The number of yours dino */
  yoursRemaining: Scalars['Float'];
};

/** Turn information */
export type BattleTurn = {
  __typename: 'BattleTurn';
  /** True if your dino is attacking, false otherwise */
  attacking: Scalars['Boolean'];
  /** The damage being dealt */
  damage: Scalars['Float'];
  /** The current details of opponent's battling dino */
  opponents: Dino;
  /** The current details of your battling dino */
  yours: Dino;
};

/** Types of consumable items */
export const enum Consumable {
  /** Heal by 40% of the max HP */
  Berry = 'berry',
  /** Increase Healing by 5% */
  Burger = 'burger',
  /** Increase Attack by 5% */
  Chocolate = 'chocolate',
  /** Increase Healing and Attack by 1% */
  Cupcake = 'cupcake',
  /** Increase level by 1 */
  Icecream = 'icecream',
  /** Heal to full health */
  Meal = 'meal',
  /** Reset stats and Heal 20% of max HP */
  Milk = 'milk',
  /** Heal 200 HP */
  Potion = 'potion',
  /** Adds 150 HP (No limit) */
  Powder = 'powder',
  /** Increase Speed by 5% */
  Soda = 'soda'
};

/** Create Dino mutation result */
export type CreateDino = InputConstraint | NewDino | Unauthorized | Underfunded;

/** User credentials */
export type Credentials = {
  __typename: 'Credentials';
  /** Token for this user */
  token: Scalars['String'];
  /** User information */
  user: User;
};

/** A dinosaur */
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


/** A dinosaur */
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

/** Input to rename a dinosaur */
export type DinoRename = {
  /** The id of a dinosaur */
  id: Scalars['ID'];
  /** The name value */
  name: Scalars['String'];
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
  /** An indicator flag, true for something did happen, false otherwise */
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

/** A usable item in a player's inventory */
export type Item = Identifiable & {
  __typename: 'Item';
  /** A unique ID for this entity */
  id: Scalars['ID'];
  /** The type of item */
  variant: Consumable;
};

/** Input for buying items */
export type ItemBuy = {
  /** The array of items to buy */
  orders: Array<ItemOrder>;
};

/** Input for buying a type of item */
export type ItemOrder = {
  /** The amount of item to buy */
  amount: Scalars['Int'];
  /** The item to buy */
  variant: Consumable;
};

/** Input for using an item */
export type ItemUse = {
  /** The id of the dino */
  dino: Scalars['ID'];
  /** The id of the item */
  item: Scalars['ID'];
};

/** Login result */
export type Login = Credentials | Unauthorized;

/** Information required for login */
export type LoginInfo = {
  /** A unique email for the user */
  email: Scalars['String'];
  /** Password to log in */
  password: Scalars['String'];
};

export type Mutation = {
  __typename: 'Mutation';
  /** Put a dino from box to the party */
  addDinoToParty: AuthIndicatorReply;
  /** Buy an item */
  buyItem: AuthIndicatorReply;
  /** Create a randomly generated Dino */
  crackAnEgg: CreateDino;
  /** Create a Dino */
  createDino: CreateDino;
  /** Log into a user with the given credentials */
  login: Login;
  /** Put a dino from party to the box */
  putDinoToBox: AuthIndicatorReply;
  /** Start a random quest */
  quest: Quest;
  /** Rename a dinosaur */
  renameDino: AuthIndicatorReply;
  /** Sell a dino and earn money back */
  sellDino: AuthIndicatorReply;
  /** Switch 2 dino around */
  switchDino: AuthIndicatorReply;
  /** Use an item on a dino */
  useItem: AuthIndicatorReply;
};


export type MutationAddDinoToPartyArgs = {
  input: Scalars['ID'];
};


export type MutationBuyItemArgs = {
  input: ItemBuy;
};


export type MutationCreateDinoArgs = {
  input: DinoCreate;
};


export type MutationLoginArgs = {
  input: LoginInfo;
};


export type MutationPutDinoToBoxArgs = {
  input: Scalars['ID'];
};


export type MutationRenameDinoArgs = {
  input: DinoRename;
};


export type MutationSellDinoArgs = {
  input: Scalars['ID'];
};


export type MutationSwitchDinoArgs = {
  input: DinoSwitch;
};


export type MutationUseItemArgs = {
  input: ItemUse;
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
  /** Get the current authenticated user */
  me?: Maybe<User>;
};


export type QueryDinosaurArgs = {
  input: SearchById;
};

/** Quest results */
export type Quest = Battle | Unauthorized;

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

/** An operation is blocked to lack of funds */
export type Underfunded = {
  __typename: 'Underfunded';
  /** Money owned */
  owned: Scalars['Float'];
  /** Money require */
  required: Scalars['Float'];
};

/** A valid user of the game */
export type User = Identifiable & {
  __typename: 'User';
  /** Get all Dinosaur in this user's box */
  box: Array<Dino>;
  /** The amount of money owned by the user */
  cash: Scalars['Int'];
  /** True if the user has a full party */
  hasFullParty: Scalars['Boolean'];
  /** A unique ID for this entity */
  id: Scalars['ID'];
  /** Get all Items in this user's inventory */
  inventory: Array<Item>;
  /** The current arena the user is in */
  location: Arena;
  /** Get all Dinosaur in this user's party */
  party: Array<Dino>;
};

/** The variant of dinosaur */
export const enum Variant {
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
};

export type BattlingDinoInfoFragment = { __typename: 'Dino', id: string, name: string, variant: Variant, level: number, hp: number, percentage: number };

export type DinoUseItemInfoFragment = { __typename: 'Dino', id: string, name: string, variant: Variant, hp: number, level: number, attack: number, speed: number, healing: number, percentage: number };

export type FullDinoInfoFragment = { __typename: 'Dino', level: number, attack: number, speed: number, healing: number, arena: Arena, id: string, name: string, hp: number, percentage: number, variant: Variant };

export type JoiningDinoInfoFragment = { __typename: 'Dino', id: string, name: string, variant: Variant, level: number, price: number };

export type QuickDinoInfoFragment = { __typename: 'Dino', id: string, name: string, hp: number, percentage: number, variant: Variant };

type Reply_Indicator_Fragment = { __typename: 'Indicator', flag: boolean };

type Reply_InputConstraint_Fragment = { __typename: 'InputConstraint', name: string, reason: string };

type Reply_Unauthorized_Fragment = { __typename: 'Unauthorized', operation: string };

export type ReplyFragment = Reply_Indicator_Fragment | Reply_InputConstraint_Fragment | Reply_Unauthorized_Fragment;

export type AddToPartyMutationVariables = Exact<{
  dino: Scalars['ID'];
}>;


export type AddToPartyMutation = { __typename: 'Mutation', addDinoToParty: { __typename: 'Indicator', flag: boolean } | { __typename: 'InputConstraint', name: string, reason: string } | { __typename: 'Unauthorized', operation: string } };

export type BuyItemMutationVariables = Exact<{
  input: ItemBuy;
}>;


export type BuyItemMutation = { __typename: 'Mutation', buyItem: { __typename: 'Indicator', flag: boolean } | { __typename: 'InputConstraint', name: string, reason: string } | { __typename: 'Unauthorized', operation: string } };

export type CrackAnEggMutationVariables = Exact<{ [key: string]: never; }>;


export type CrackAnEggMutation = { __typename: 'Mutation', crackAnEgg: { __typename: 'InputConstraint', name: string, reason: string } | { __typename: 'NewDino', dino: { __typename: 'Dino', id: string, name: string, variant: Variant, level: number, price: number } } | { __typename: 'Unauthorized', operation: string } | { __typename: 'Underfunded' } };

export type CreateDinoMutationVariables = Exact<{
  input: DinoCreate;
}>;


export type CreateDinoMutation = { __typename: 'Mutation', createDino: { __typename: 'InputConstraint', name: string, reason: string } | { __typename: 'NewDino', dino: { __typename: 'Dino', id: string, name: string, variant: Variant, level: number, price: number } } | { __typename: 'Unauthorized', operation: string } | { __typename: 'Underfunded' } };

export type LoginMutationVariables = Exact<{
  input: LoginInfo;
}>;


export type LoginMutation = { __typename: 'Mutation', login: { __typename: 'Credentials', token: string } | { __typename: 'Unauthorized', operation: string } };

export type PutToBoxMutationVariables = Exact<{
  dino: Scalars['ID'];
}>;


export type PutToBoxMutation = { __typename: 'Mutation', putDinoToBox: { __typename: 'Indicator', flag: boolean } | { __typename: 'InputConstraint', name: string, reason: string } | { __typename: 'Unauthorized', operation: string } };

export type QuestMutationVariables = Exact<{ [key: string]: never; }>;


export type QuestMutation = { __typename: 'Mutation', quest: { __typename: 'Battle', plan: Array<{ __typename: 'BattleEnd', win: boolean } | { __typename: 'BattleInit', yoursRemaining: number, opponentsRemaining: number, yours: { __typename: 'Dino', id: string, name: string, variant: Variant, level: number, hp: number, percentage: number }, opponents: { __typename: 'Dino', id: string, name: string, variant: Variant, level: number, hp: number, percentage: number } } | { __typename: 'BattleTurn', attacking: boolean, damage: number, yours: { __typename: 'Dino', id: string, name: string, variant: Variant, level: number, hp: number, percentage: number }, opponents: { __typename: 'Dino', id: string, name: string, variant: Variant, level: number, hp: number, percentage: number } }> } | { __typename: 'Unauthorized', operation: string } };

export type RenameDinoMutationVariables = Exact<{
  input: DinoRename;
}>;


export type RenameDinoMutation = { __typename: 'Mutation', renameDino: { __typename: 'Indicator', flag: boolean } | { __typename: 'InputConstraint', name: string, reason: string } | { __typename: 'Unauthorized', operation: string } };

export type SellDinoMutationVariables = Exact<{
  input: Scalars['ID'];
}>;


export type SellDinoMutation = { __typename: 'Mutation', sellDino: { __typename: 'Indicator', flag: boolean } | { __typename: 'InputConstraint', name: string, reason: string } | { __typename: 'Unauthorized', operation: string } };

export type SwitchDinoMutationVariables = Exact<{
  input: DinoSwitch;
}>;


export type SwitchDinoMutation = { __typename: 'Mutation', switchDino: { __typename: 'Indicator', flag: boolean } | { __typename: 'InputConstraint', name: string, reason: string } | { __typename: 'Unauthorized', operation: string } };

export type UseItemMutationVariables = Exact<{
  input: ItemUse;
}>;


export type UseItemMutation = { __typename: 'Mutation', useItem: { __typename: 'Indicator', flag: boolean } | { __typename: 'InputConstraint', name: string, reason: string } | { __typename: 'Unauthorized', operation: string } };

export type DinosaurQueryVariables = Exact<{
  input: SearchById;
}>;


export type DinosaurQuery = { __typename: 'Query', dinosaur?: { __typename: 'Dino', id: string, level: number, hp: number, attack: number, speed: number, healing: number, arena: Arena, variant: Variant, name: string, percentage: number } | null };

export type InventoryPageQueryVariables = Exact<{ [key: string]: never; }>;


export type InventoryPageQuery = { __typename: 'Query', me?: { __typename: 'User', id: string, inventory: Array<{ __typename: 'Item', id: string, variant: Consumable }>, party: Array<{ __typename: 'Dino', id: string, name: string, variant: Variant, hp: number, level: number, attack: number, speed: number, healing: number, percentage: number }> } | null };

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = { __typename: 'Query', me?: { __typename: 'User', id: string, location: Arena, cash: number } | null };

export type PartyViewQueryVariables = Exact<{
  dino: SearchById;
}>;


export type PartyViewQuery = { __typename: 'Query', dinosaur?: { __typename: 'Dino', level: number, attack: number, speed: number, healing: number, arena: Arena, id: string, name: string, hp: number, percentage: number, variant: Variant } | null, me?: { __typename: 'User', id: string, hasFullParty: boolean, party: Array<{ __typename: 'Dino', id: string, name: string, hp: number, percentage: number, variant: Variant }>, box: Array<{ __typename: 'Dino', id: string, name: string, hp: number, percentage: number, variant: Variant }> } | null };

export const BattlingDinoInfoFragmentDoc = gql`
    fragment BattlingDinoInfo on Dino {
  id
  name
  variant
  level
  hp
  percentage
}
    `;
export const DinoUseItemInfoFragmentDoc = gql`
    fragment DinoUseItemInfo on Dino {
  id
  name
  variant
  hp
  level
  attack
  speed
  healing
  percentage
}
    `;
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
export const JoiningDinoInfoFragmentDoc = gql`
    fragment JoiningDinoInfo on Dino {
  id
  name
  variant
  level
  price
}
    `;
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
export const BuyItemDocument = gql`
    mutation BuyItem($input: ItemBuy!) {
  buyItem(input: $input) {
    ...Reply
  }
}
    ${ReplyFragmentDoc}`;
export type BuyItemMutationFn = Apollo.MutationFunction<BuyItemMutation, BuyItemMutationVariables>;

/**
 * __useBuyItemMutation__
 *
 * To run a mutation, you first call `useBuyItemMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useBuyItemMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [buyItemMutation, { data, loading, error }] = useBuyItemMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useBuyItemMutation(baseOptions?: Apollo.MutationHookOptions<BuyItemMutation, BuyItemMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<BuyItemMutation, BuyItemMutationVariables>(BuyItemDocument, options);
      }
export type BuyItemMutationHookResult = ReturnType<typeof useBuyItemMutation>;
export type BuyItemMutationResult = Apollo.MutationResult<BuyItemMutation>;
export type BuyItemMutationOptions = Apollo.BaseMutationOptions<BuyItemMutation, BuyItemMutationVariables>;
export const CrackAnEggDocument = gql`
    mutation CrackAnEgg {
  crackAnEgg {
    __typename
    ... on Unauthorized {
      operation
    }
    ... on NewDino {
      dino {
        ...JoiningDinoInfo
      }
    }
    ... on InputConstraint {
      name
      reason
    }
  }
}
    ${JoiningDinoInfoFragmentDoc}`;
export type CrackAnEggMutationFn = Apollo.MutationFunction<CrackAnEggMutation, CrackAnEggMutationVariables>;

/**
 * __useCrackAnEggMutation__
 *
 * To run a mutation, you first call `useCrackAnEggMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCrackAnEggMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [crackAnEggMutation, { data, loading, error }] = useCrackAnEggMutation({
 *   variables: {
 *   },
 * });
 */
export function useCrackAnEggMutation(baseOptions?: Apollo.MutationHookOptions<CrackAnEggMutation, CrackAnEggMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CrackAnEggMutation, CrackAnEggMutationVariables>(CrackAnEggDocument, options);
      }
export type CrackAnEggMutationHookResult = ReturnType<typeof useCrackAnEggMutation>;
export type CrackAnEggMutationResult = Apollo.MutationResult<CrackAnEggMutation>;
export type CrackAnEggMutationOptions = Apollo.BaseMutationOptions<CrackAnEggMutation, CrackAnEggMutationVariables>;
export const CreateDinoDocument = gql`
    mutation CreateDino($input: DinoCreate!) {
  createDino(input: $input) {
    ... on Unauthorized {
      operation
    }
    ... on NewDino {
      dino {
        ...JoiningDinoInfo
      }
    }
    ... on InputConstraint {
      name
      reason
    }
  }
}
    ${JoiningDinoInfoFragmentDoc}`;
export type CreateDinoMutationFn = Apollo.MutationFunction<CreateDinoMutation, CreateDinoMutationVariables>;

/**
 * __useCreateDinoMutation__
 *
 * To run a mutation, you first call `useCreateDinoMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateDinoMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createDinoMutation, { data, loading, error }] = useCreateDinoMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateDinoMutation(baseOptions?: Apollo.MutationHookOptions<CreateDinoMutation, CreateDinoMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateDinoMutation, CreateDinoMutationVariables>(CreateDinoDocument, options);
      }
export type CreateDinoMutationHookResult = ReturnType<typeof useCreateDinoMutation>;
export type CreateDinoMutationResult = Apollo.MutationResult<CreateDinoMutation>;
export type CreateDinoMutationOptions = Apollo.BaseMutationOptions<CreateDinoMutation, CreateDinoMutationVariables>;
export const LoginDocument = gql`
    mutation Login($input: LoginInfo!) {
  login(input: $input) {
    __typename
    ... on Credentials {
      token
    }
    ... on Unauthorized {
      operation
    }
  }
}
    `;
export type LoginMutationFn = Apollo.MutationFunction<LoginMutation, LoginMutationVariables>;

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useLoginMutation(baseOptions?: Apollo.MutationHookOptions<LoginMutation, LoginMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, options);
      }
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = Apollo.MutationResult<LoginMutation>;
export type LoginMutationOptions = Apollo.BaseMutationOptions<LoginMutation, LoginMutationVariables>;
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
export const QuestDocument = gql`
    mutation Quest {
  quest {
    __typename
    ... on Unauthorized {
      operation
    }
    ... on Battle {
      plan {
        __typename
        ... on BattleInit {
          yours {
            ...BattlingDinoInfo
          }
          opponents {
            ...BattlingDinoInfo
          }
          yoursRemaining
          opponentsRemaining
        }
        ... on BattleTurn {
          attacking
          damage
          yours {
            ...BattlingDinoInfo
          }
          opponents {
            ...BattlingDinoInfo
          }
        }
        ... on BattleEnd {
          win
        }
      }
    }
  }
}
    ${BattlingDinoInfoFragmentDoc}`;
export type QuestMutationFn = Apollo.MutationFunction<QuestMutation, QuestMutationVariables>;

/**
 * __useQuestMutation__
 *
 * To run a mutation, you first call `useQuestMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useQuestMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [questMutation, { data, loading, error }] = useQuestMutation({
 *   variables: {
 *   },
 * });
 */
export function useQuestMutation(baseOptions?: Apollo.MutationHookOptions<QuestMutation, QuestMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<QuestMutation, QuestMutationVariables>(QuestDocument, options);
      }
export type QuestMutationHookResult = ReturnType<typeof useQuestMutation>;
export type QuestMutationResult = Apollo.MutationResult<QuestMutation>;
export type QuestMutationOptions = Apollo.BaseMutationOptions<QuestMutation, QuestMutationVariables>;
export const RenameDinoDocument = gql`
    mutation RenameDino($input: DinoRename!) {
  renameDino(input: $input) {
    ...Reply
  }
}
    ${ReplyFragmentDoc}`;
export type RenameDinoMutationFn = Apollo.MutationFunction<RenameDinoMutation, RenameDinoMutationVariables>;

/**
 * __useRenameDinoMutation__
 *
 * To run a mutation, you first call `useRenameDinoMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRenameDinoMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [renameDinoMutation, { data, loading, error }] = useRenameDinoMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useRenameDinoMutation(baseOptions?: Apollo.MutationHookOptions<RenameDinoMutation, RenameDinoMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RenameDinoMutation, RenameDinoMutationVariables>(RenameDinoDocument, options);
      }
export type RenameDinoMutationHookResult = ReturnType<typeof useRenameDinoMutation>;
export type RenameDinoMutationResult = Apollo.MutationResult<RenameDinoMutation>;
export type RenameDinoMutationOptions = Apollo.BaseMutationOptions<RenameDinoMutation, RenameDinoMutationVariables>;
export const SellDinoDocument = gql`
    mutation SellDino($input: ID!) {
  sellDino(input: $input) {
    ...Reply
  }
}
    ${ReplyFragmentDoc}`;
export type SellDinoMutationFn = Apollo.MutationFunction<SellDinoMutation, SellDinoMutationVariables>;

/**
 * __useSellDinoMutation__
 *
 * To run a mutation, you first call `useSellDinoMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSellDinoMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [sellDinoMutation, { data, loading, error }] = useSellDinoMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useSellDinoMutation(baseOptions?: Apollo.MutationHookOptions<SellDinoMutation, SellDinoMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SellDinoMutation, SellDinoMutationVariables>(SellDinoDocument, options);
      }
export type SellDinoMutationHookResult = ReturnType<typeof useSellDinoMutation>;
export type SellDinoMutationResult = Apollo.MutationResult<SellDinoMutation>;
export type SellDinoMutationOptions = Apollo.BaseMutationOptions<SellDinoMutation, SellDinoMutationVariables>;
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
export const UseItemDocument = gql`
    mutation UseItem($input: ItemUse!) {
  useItem(input: $input) {
    ...Reply
  }
}
    ${ReplyFragmentDoc}`;
export type UseItemMutationFn = Apollo.MutationFunction<UseItemMutation, UseItemMutationVariables>;

/**
 * __useUseItemMutation__
 *
 * To run a mutation, you first call `useUseItemMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUseItemMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [useItemMutation, { data, loading, error }] = useUseItemMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUseItemMutation(baseOptions?: Apollo.MutationHookOptions<UseItemMutation, UseItemMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UseItemMutation, UseItemMutationVariables>(UseItemDocument, options);
      }
export type UseItemMutationHookResult = ReturnType<typeof useUseItemMutation>;
export type UseItemMutationResult = Apollo.MutationResult<UseItemMutation>;
export type UseItemMutationOptions = Apollo.BaseMutationOptions<UseItemMutation, UseItemMutationVariables>;
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
export const InventoryPageDocument = gql`
    query InventoryPage {
  me {
    id
    inventory {
      id
      variant
    }
    party {
      ...DinoUseItemInfo
    }
  }
}
    ${DinoUseItemInfoFragmentDoc}`;

/**
 * __useInventoryPageQuery__
 *
 * To run a query within a React component, call `useInventoryPageQuery` and pass it any options that fit your needs.
 * When your component renders, `useInventoryPageQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useInventoryPageQuery({
 *   variables: {
 *   },
 * });
 */
export function useInventoryPageQuery(baseOptions?: Apollo.QueryHookOptions<InventoryPageQuery, InventoryPageQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<InventoryPageQuery, InventoryPageQueryVariables>(InventoryPageDocument, options);
      }
export function useInventoryPageLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<InventoryPageQuery, InventoryPageQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<InventoryPageQuery, InventoryPageQueryVariables>(InventoryPageDocument, options);
        }
export type InventoryPageQueryHookResult = ReturnType<typeof useInventoryPageQuery>;
export type InventoryPageLazyQueryHookResult = ReturnType<typeof useInventoryPageLazyQuery>;
export type InventoryPageQueryResult = Apollo.QueryResult<InventoryPageQuery, InventoryPageQueryVariables>;
export function refetchInventoryPageQuery(variables?: InventoryPageQueryVariables) {
      return { query: InventoryPageDocument, variables: variables }
    }
export const MeDocument = gql`
    query Me {
  me {
    id
    location
    cash
  }
}
    `;

/**
 * __useMeQuery__
 *
 * To run a query within a React component, call `useMeQuery` and pass it any options that fit your needs.
 * When your component renders, `useMeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMeQuery({
 *   variables: {
 *   },
 * });
 */
export function useMeQuery(baseOptions?: Apollo.QueryHookOptions<MeQuery, MeQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<MeQuery, MeQueryVariables>(MeDocument, options);
      }
export function useMeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MeQuery, MeQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<MeQuery, MeQueryVariables>(MeDocument, options);
        }
export type MeQueryHookResult = ReturnType<typeof useMeQuery>;
export type MeLazyQueryHookResult = ReturnType<typeof useMeLazyQuery>;
export type MeQueryResult = Apollo.QueryResult<MeQuery, MeQueryVariables>;
export function refetchMeQuery(variables?: MeQueryVariables) {
      return { query: MeDocument, variables: variables }
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