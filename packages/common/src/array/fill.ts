//
//  fill.ts
//  dino-league
//
//  Created by d-exclaimation on 19 Nov 2022
//

export const fill = <T>(amount: number, initial: () => T): T[] =>
  new Array<null>(amount).fill(null).map(() => initial());
