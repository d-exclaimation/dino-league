//
//  index.ts
//  dino-league
//
//  Created by d-exclaimation on 12 Feb 2023
//

export const capitalized = <T extends string>(str: T) =>
  str
    .split("")
    .map((char, i) => (i === 0 ? char.toUpperCase() : char.toLowerCase()))
    .join("");
