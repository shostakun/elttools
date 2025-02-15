import OrangeCard from "./orange.png";
import { type CardSet } from "@/types/cards";
import { makeCards, makeSet } from "@/utils/cards";

const imageMap = {
  orange: {
    images: [OrangeCard],
    tags: ["anime", "fruit", "one", "orange"],
  },
} as const;

export const images = makeCards(imageMap);

export const imageList = Object.values(images);

export const sets: Record<string, CardSet> = {
  ...makeSet(imageList, "fruit", ["fruit", "one"]),
};
