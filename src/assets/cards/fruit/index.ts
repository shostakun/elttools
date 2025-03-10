import AppleCard from "./apple.png";
import BananaCard from "./banana.png";
import KiwiCard from "./kiwi.png";
import OrangeCard from "./orange.png";
import WatermelonCard from "./watermelon.png";
import { type CardSet } from "@/types/cards";
import { makeCards, makeSet } from "@/utils/cards";

const imageMap = {
  apple: {
    images: [AppleCard],
    tags: ["anime", "apple", "fruit", "one"],
  },
  banana: {
    images: [BananaCard],
    tags: ["anime", "banana", "fruit", "one"],
  },
  kiwi: {
    images: [KiwiCard],
    tags: ["anime", "fruit", "kiwi", "one"],
  },
  orange: {
    images: [OrangeCard],
    tags: ["anime", "fruit", "one", "orange"],
  },
  watermelon: {
    images: [WatermelonCard],
    tags: ["anime", "fruit", "one", "watermelon"],
  },
} as const;

export const images = makeCards(imageMap);

export const imageList = Object.values(images);

export const sets: Record<string, CardSet> = {
  ...makeSet(imageList, "fruit", ["fruit", "one"]),
};
