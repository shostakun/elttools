// [[[cog from gen_cards import *; files = get_card_files(); gen_card_imports(files)]]]
import appleCard from "./apple.png";
import bananaCard from "./banana.png";
import kiwiCard from "./kiwi.png";
import orangeCard from "./orange.png";
import watermelonCard from "./watermelon.png";
// [[[end]]]
import { type CardSet } from "@/types/cards";
import { makeCards, makeSet } from "@/utils/cards";

const imageMap = {
  // [[[cog gen_card_specs(files, ["anime", "fruit", "one"])]]]
  apple: {
    images: [appleCard],
    tags: ["anime", "apple", "fruit", "one"],
  },
  banana: {
    images: [bananaCard],
    tags: ["anime", "banana", "fruit", "one"],
  },
  kiwi: {
    images: [kiwiCard],
    tags: ["anime", "fruit", "kiwi", "one"],
  },
  orange: {
    images: [orangeCard],
    tags: ["anime", "fruit", "one", "orange"],
  },
  watermelon: {
    images: [watermelonCard],
    tags: ["anime", "fruit", "one", "watermelon"],
  },
  // [[[end]]]
} as const;

export const images = makeCards(imageMap);

export const imageList = Object.values(images);

export const sets: Record<string, CardSet> = {
  ...makeSet(imageList, "fruit", ["fruit", "one"]),
};
