// [[[cog from gen_cards import *; files = get_card_files(); gen_card_imports(files)]]]
import bushCard from "./bush.png";
import flowerCard from "./flower.png";
import hillCard from "./hill.png";
import lakeCard from "./lake.png";
import mountainCard from "./mountain.png";
import riverCard from "./river.png";
import rockCard from "./rock.png";
import treeCard from "./tree.png";
import valleyCard from "./valley.png";
import waterfallCard from "./waterfall.png";
// [[[end]]]
import { type CardSet } from "@/types/cards";
import { makeCards, makeSet } from "@/utils/cards";

const imageMap = {
  // [[[cog gen_card_specs(files, ["background", "nature", "noun"])]]]
  bush: {
    images: [bushCard],
    tags: ["background", "bush", "nature", "noun"],
  },
  flower: {
    images: [flowerCard],
    tags: ["background", "flower", "nature", "noun"],
  },
  hill: {
    images: [hillCard],
    tags: ["background", "hill", "nature", "noun"],
  },
  lake: {
    images: [lakeCard],
    tags: ["background", "lake", "nature", "noun"],
  },
  mountain: {
    images: [mountainCard],
    tags: ["background", "mountain", "nature", "noun"],
  },
  river: {
    images: [riverCard],
    tags: ["background", "nature", "noun", "river"],
  },
  rock: {
    images: [rockCard],
    tags: ["background", "nature", "noun", "rock"],
  },
  tree: {
    images: [treeCard],
    tags: ["background", "nature", "noun", "tree"],
  },
  valley: {
    images: [valleyCard],
    tags: ["background", "nature", "noun", "valley"],
  },
  waterfall: {
    images: [waterfallCard],
    tags: ["background", "nature", "noun", "waterfall"],
  },
  // [[[end]]]
} as const;

export const images = makeCards(imageMap);

export const imageList = Object.values(images);

export const sets: Record<string, CardSet> = {
  ...makeSet(imageList, "nature", ["background", "nature"]),
};
