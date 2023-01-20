//
//  variant.ts
//  dino-league
//
//  Created by d-exclaimation on 22 Nov 2022
//

import { Lib, Values } from "@dino/common";

export function adjusted(
  { hp, attack, speed, healing, ...rest }: Values<typeof Lib.variants>,
  level: number
) {
  const scale = Lib.scaling(level);
  const price = Math.round(
    3 * (hp / 100 + attack / 50 + speed / 100 + healing / 40) * 40
  );
  return {
    hp: scale * hp,
    attack: scale * attack,
    speed: scale * speed,
    healing: scale * healing,
    price: scale * price,
    ...rest,
  };
}
