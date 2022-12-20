//
//  graphql.ts
//  dino-league
//
//  Created by d-exclaimation on 20 Dec 2022
//

import { ObjectType } from "type-graphql";
import { Identifiable } from "../identifiable/graphql";

@ObjectType({ implements: Identifiable })
export class User extends Identifiable {}
