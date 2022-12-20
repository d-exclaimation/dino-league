//
//  resolver.ts
//  dino-league
//
//  Created by d-exclaimation on 18 Dec 2022
//

// export const UserFieldResolvers = extendType({
//   type: "User",
//   definition(t) {
//     t.nonNull.list.nonNull.field("party", {
//       type: "Dino",
//       description: "Get all Dinosaur in this user's party",
//       async resolve({ id }, _, { prisma }) {
//         // TODO: Error handling
//         const res = await prisma.party.findMany({
//           where: {
//             userId: id,
//           },
//           select: {
//             dino: true,
//           },
//         });
//         return res.map(({ dino }) => dino);
//       },
//     });

//     t.nonNull.list.nonNull.field("box", {
//       type: "Dino",
//       description: "Get all Dinosaur in this user's party",
//       async resolve({ id }, _, { prisma }) {
//         // TODO: Handle error
//         const res = await prisma.dino.findMany({
//           where: {
//             userId: id,
//             party: null,
//           },
//         });
//         return res;
//       },
//     });
//   },
// });
