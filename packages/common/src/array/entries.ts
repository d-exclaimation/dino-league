//
//  entries.ts
//  dino-league
//
//  Created by d-exclaimation on 10 Feb 2023
//

export function entries<T extends { [key: string | number | symbol]: any }>(
  obj: T
): [key: keyof T, value: T[keyof T]][] {
  return Object.entries(obj) as [key: keyof T, value: T[keyof T]][];
}
