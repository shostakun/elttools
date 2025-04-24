// [[[cog from gen_cards import *; files = get_card_files(); gen_card_imports(files)]]]
import bigSmallCard from "./bigSmall.png";
import darkLightCard from "./darkLight.png";
import fastSlowCard from "./fastSlow.png";
import hardSoftCard from "./hardSoft.png";
import longShortCard from "./longShort.png";
import newOldCard from "./newOld.png";
import oldYoungCard from "./oldYoung.png";
import shortTallCard from "./shortTall.png";
// [[[end]]]
import { type CardSet } from "@/types/cards";
import { makeCards, makeSet } from "@/utils/cards";

const imageMap = {
  // [[[cog gen_card_specs(files, ["adjective", "comparative", "opposite", "set 1"])]]]
  bigSmall: {
    images: [bigSmallCard],
    tags: ["adjective", "bigSmall", "comparative", "opposite", "set 1"],
  },
  darkLight: {
    images: [darkLightCard],
    tags: ["adjective", "comparative", "darkLight", "opposite", "set 1"],
  },
  fastSlow: {
    images: [fastSlowCard],
    tags: ["adjective", "comparative", "fastSlow", "opposite", "set 1"],
  },
  hardSoft: {
    images: [hardSoftCard],
    tags: ["adjective", "comparative", "hardSoft", "opposite", "set 1"],
  },
  longShort: {
    images: [longShortCard],
    tags: ["adjective", "comparative", "longShort", "opposite", "set 1"],
  },
  newOld: {
    images: [newOldCard],
    tags: ["adjective", "comparative", "newOld", "opposite", "set 1"],
  },
  oldYoung: {
    images: [oldYoungCard],
    tags: ["adjective", "comparative", "oldYoung", "opposite", "set 1"],
  },
  shortTall: {
    images: [shortTallCard],
    tags: ["adjective", "comparative", "opposite", "set 1", "shortTall"],
  },
  // [[[end]]]
} as const;

export const images = makeCards(imageMap);

export const imageList = Object.values(images);

export const sets: Record<string, CardSet> = {
  ...makeSet(imageList, "adjectiveOpposites", ["adjective", "comparative", "opposite", "set 1"]),
};
