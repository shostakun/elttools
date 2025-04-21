// [[[cog from gen_cards import *; files = get_card_files(); gen_card_imports(files)]]]
import pointCard from "./point.png";
import point2Card from "./point2.png";
// [[[end]]]
import { type CardSet } from "@/types/cards";
import { makeCards, makeSet } from "@/utils/cards";

const imageMap = {
  // [[[cog gen_card_specs(files, ["action", "set 2", "verb"])]]]
  point: {
    images: [pointCard, point2Card],
    tags: ["action", "point", "set 2", "verb"],
  },
  // [[[end]]]
} as const;

export const images = makeCards(imageMap);

export const imageList = Object.values(images);

export const sets: Record<string, CardSet> = {
  ...makeSet(imageList, "action verbs 2", ["action", "set 2", "verb"]),
};
