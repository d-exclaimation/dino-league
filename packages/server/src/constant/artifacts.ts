//
//  artifacts.ts
//  nexus-prisma
//
//  Created by d-exclaimation on 19 Nov 2022
//

export const __port__ = process.env["PORT"] ?? 4000;
export const __prod__ = process.env["NODE_ENV"] === "production";
