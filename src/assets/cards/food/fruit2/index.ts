// [[[cog from gen_cards import *; files = get_card_files(); gen_card_imports(files)]]]
import blackberriesCard from "./blackberries.png";
import blueberriesCard from "./blueberries.png";
import cherriesCard from "./cherries.png";
import grapefruitsCard from "./grapefruits.png";
import grapesCard from "./grapes.png";
import lemonsCard from "./lemons.png";
import limesCard from "./limes.png";
import raspberriesCard from "./raspberries.png";
// [[[end]]]
import { type CardSet } from "@/types/cards";
import { makeCards, makeSet } from "@/utils/cards";

const imageMap = {
  // [[[cog gen_card_specs(files, ["fruit", "noun", "plural"])]]]
  blackberries: {
    images: [blackberriesCard],
    tags: ["blackberries", "fruit", "noun", "plural"],
  },
  blueberries: {
    images: [blueberriesCard],
    tags: ["blueberries", "fruit", "noun", "plural"],
  },
  cherries: {
    images: [cherriesCard],
    tags: ["cherries", "fruit", "noun", "plural"],
  },
  grapefruits: {
    images: [grapefruitsCard],
    tags: ["fruit", "grapefruits", "noun", "plural"],
  },
  grapes: {
    images: [grapesCard],
    tags: ["fruit", "grapes", "noun", "plural"],
  },
  lemons: {
    images: [lemonsCard],
    tags: ["fruit", "lemons", "noun", "plural"],
  },
  limes: {
    images: [limesCard],
    tags: ["fruit", "limes", "noun", "plural"],
  },
  raspberries: {
    images: [raspberriesCard],
    tags: ["fruit", "noun", "plural", "raspberries"],
  },
  // [[[end]]]
} as const;

export const images = makeCards(imageMap);

export const imageList = Object.values(images);

export const sets: Record<string, CardSet> = {
  ...makeSet(imageList, "fruit2", ["fruit", "noun", "plural"], "Fruit 2 (Plural)"),
};
