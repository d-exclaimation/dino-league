//
//  item.ts
//  dino-league
//
//  Created by d-exclaimation on 11 Feb 2023
//

/**
 * Variants base info for all items
 */
export const items = {
  icecream: {
    name: "Ice cream",
    description: "Increase level by 1",
    price: 750,
  },
  meal: {
    name: "Breakfast",
    description: "Heal to full health",
    price: 1000,
  },
  berry: {
    name: "Berry",
    description: "Heal by 40% of the max HP",
    price: 300,
  },
  potion: {
    name: "Potion",
    description: "Heal 200 HP",
    price: 200,
  },
  milk: {
    name: "Milk",
    description: "Reset stats and Heal 20% of max HP",
    price: 200,
  },
  powder: {
    name: "Powder",
    description: "Adds 150 HP (No limit)",
    price: 200,
  },
  burger: {
    name: "Burger",
    description: "Increase Healing by 5%",
    price: 250,
  },
  chocolate: {
    name: "Cholocate",
    description: "Increase Attack by 5%",
    price: 250,
  },
  soda: {
    name: "Soda",
    description: "Increase Speed by 5%",
    price: 250,
  },
  cupcake: {
    name: "Cupcake",
    description: "Increase Healing and Attack by 1%",
    price: 150,
  },
} as const;
