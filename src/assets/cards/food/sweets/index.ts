// [[[cog from gen_cards import *; files = get_card_files(); gen_card_imports(files)]]]
import cakeCard from "./cake.png";
import iceCreamCard from "./ice_cream.png";
import pieCard from "./pie.png";
// [[[end]]]
import { type CardSet } from "@/types/cards";
import { makeCards, makeSet } from "@/utils/cards";

const imageMap = {
  // [[[cog gen_card_specs(files, ["dessert", "noun", "sweets"])]]]
  cake: {
    images: [cakeCard],
    tags: ["cake", "dessert", "noun", "sweets"],
  },
  iceCream: {
    images: [iceCreamCard],
    tags: ["dessert", "ice cream", "noun", "sweets"],
  },
  pie: {
    images: [pieCard],
    tags: ["dessert", "noun", "pie", "sweets"],
  },
  // [[[end]]]
} as const;

export const images = makeCards(imageMap);

export const imageList = Object.values(images);

export const sets: Record<string, CardSet> = {
  ...makeSet(imageList, "sweets", ["dessert", "sweets"]),
};
