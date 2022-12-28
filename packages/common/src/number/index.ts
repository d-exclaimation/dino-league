//
//  index.ts
//  dino-league
//
//  Created by d-exclaimation on 28 Dec 2022
//

export const clamp = (num: number, args: { min: number; max: number }) =>
  Math.max(Math.min(num, args.max), args.min);
