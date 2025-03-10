// [[[cog from gen_cards import *; files = get_card_files(); gen_card_imports(files)]]]
import curryCard from "./curry.png";
import pizzaCard from "./pizza.png";
import sandwichCard from "./sandwich.png";
// [[[end]]]
import { type CardSet } from "@/types/cards";
import { makeCards, makeSet } from "@/utils/cards";

const imageMap = {
  // [[[cog gen_card_specs(files, ["anime", "dish", "food", "one"])]]]
  curry: {
    images: [curryCard],
    tags: ["anime", "curry", "dish", "food", "one"],
  },
  pizza: {
    images: [pizzaCard],
    tags: ["anime", "dish", "food", "one", "pizza"],
  },
  sandwich: {
    images: [sandwichCard],
    tags: ["anime", "dish", "food", "one", "sandwich"],
  },
  // [[[end]]]
} as const;

export const images = makeCards(imageMap);

export const imageList = Object.values(images);

export const sets: Record<string, CardSet> = {
  ...makeSet(imageList, "food", ["food", "one"]),
};
