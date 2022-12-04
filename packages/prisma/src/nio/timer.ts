//
//  timer.ts
//  dino-league
//
//  Created by d-exclaimation on 04 Dec 2022
//

export class Hourglass {
  private readonly ms: number;
  private readonly action: () => void;
  private task: NodeJS.Timer | null = null;

  public constructor(args: { ms?: number; action: () => void }) {
    this.ms = args.ms ?? 1000;
    this.action = args.action;
    this.task = null;
  }

  public start(type: "timeout" | "interval") {
    this.stop();

    switch (type) {
      case "interval":
        this.task = setInterval(this.action, this.ms);
        break;
      case "timeout":
        this.task = setTimeout(this.action, this.ms);
        break;
    }

    return this.task;
  }

  public stop() {
    if (!this.task) return;

    clearInterval(this.task);
    this.task = null;
  }

  public get isRunning(): boolean {
    return !!this.task;
  }
}
