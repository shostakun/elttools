// [[[cog from gen_cards import *; files = get_card_files(); gen_card_imports(files)]]]
import appleCard from "./apple.png";
import bananaCard from "./banana.png";
import canteloupeCard from "./canteloupe.png";
import kiwiCard from "./kiwi.png";
import orangeCard from "./orange.png";
import peachCard from "./peach.png";
import pearCard from "./pear.png";
import pineappleCard from "./pineapple.png";
import strawberryCard from "./strawberry.png";
import watermelonCard from "./watermelon.png";
// [[[end]]]
import { type CardSet } from "@/types/cards";
import { makeCards, makeSet } from "@/utils/cards";

const imageMap = {
  // [[[cog gen_card_specs(files, ["fruit", "noun", "singular"])]]]
  apple: {
    images: [appleCard],
    tags: ["apple", "fruit", "noun", "singular"],
  },
  banana: {
    images: [bananaCard],
    tags: ["banana", "fruit", "noun", "singular"],
  },
  canteloupe: {
    images: [canteloupeCard],
    tags: ["canteloupe", "fruit", "noun", "singular"],
  },
  kiwi: {
    images: [kiwiCard],
    tags: ["fruit", "kiwi", "noun", "singular"],
  },
  orange: {
    images: [orangeCard],
    tags: ["fruit", "noun", "orange", "singular"],
  },
  peach: {
    images: [peachCard],
    tags: ["fruit", "noun", "peach", "singular"],
  },
  pear: {
    images: [pearCard],
    tags: ["fruit", "noun", "pear", "singular"],
  },
  pineapple: {
    images: [pineappleCard],
    tags: ["fruit", "noun", "pineapple", "singular"],
  },
  strawberry: {
    images: [strawberryCard],
    tags: ["fruit", "noun", "singular", "strawberry"],
  },
  watermelon: {
    images: [watermelonCard],
    tags: ["fruit", "noun", "singular", "watermelon"],
  },
  // [[[end]]]
} as const;

export const images = makeCards(imageMap);

export const imageList = Object.values(images);

export const sets: Record<string, CardSet> = {
  ...makeSet(imageList, "fruit", ["fruit", "noun", "singular"]),
};
