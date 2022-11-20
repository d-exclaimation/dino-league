//
//  basic.ts
//  nexus-prisma
//
//  Created by d-exclaimation on 19 Nov 2022
//

import { fill, InMemoryStorage, randomElement, randomInt } from "@dino/common";
import { NexusGenEnums, NexusGenObjects } from "../../nexus";
import { Dino } from "../core";

export class BasicDinoStorage extends InMemoryStorage<
  string,
  NexusGenObjects["Dino"]
> {
  public get length() {
    return this.all.length;
  }

  public get isEmpty() {
    return this.length == 0;
  }

  public generate(amount: number = 1000) {
    const options: NexusGenEnums["Variant"][] = [
      "alosaur",
      "abelisaurus",
      "aardonyx",
    ];
    this.insertAll(
      fill(amount, () => {
        const option = randomElement(options);
        return Dino.create(option, { level: randomInt({ start: 1, end: 10 }) });
      })
    );
  }

  public static shared = new BasicDinoStorage();
}
