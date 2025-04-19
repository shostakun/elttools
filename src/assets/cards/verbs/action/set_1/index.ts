// [[[cog from gen_cards import *; files = get_card_files(); gen_card_imports(files)]]]
import countCard from "./count.png";
import danceCard from "./dance.png";
import jumpCard from "./jump.png";
import listen2Card from "./listen2.png";
import playCard from "./play.png";
import play2Card from "./play2.png";
import readCard from "./read.png";
import runCard from "./run.png";
import singCard from "./sing.png";
import walkCard from "./walk.png";
import walk2Card from "./walk2.png";
import writeCard from "./write.png";
// [[[end]]]
import { type CardSet } from "@/types/cards";
import { makeCards, makeSet } from "@/utils/cards";

const imageMap = {
  // [[[cog gen_card_specs(files, ["action", "anime", "set 1", "verb"])]]]
  count: {
    images: [countCard],
    tags: ["action", "anime", "count", "set 1", "verb"],
  },
  dance: {
    images: [danceCard],
    tags: ["action", "anime", "dance", "set 1", "verb"],
  },
  jump: {
    images: [jumpCard],
    tags: ["action", "anime", "jump", "set 1", "verb"],
  },
  listen: {
    images: [listen2Card],
    tags: ["action", "anime", "listen", "set 1", "verb"],
  },
  play: {
    images: [playCard, play2Card],
    tags: ["action", "anime", "play", "set 1", "verb"],
  },
  read: {
    images: [readCard],
    tags: ["action", "anime", "read", "set 1", "verb"],
  },
  run: {
    images: [runCard],
    tags: ["action", "anime", "run", "set 1", "verb"],
  },
  sing: {
    images: [singCard],
    tags: ["action", "anime", "set 1", "sing", "verb"],
  },
  walk: {
    images: [walkCard, walk2Card],
    tags: ["action", "anime", "set 1", "verb", "walk"],
  },
  write: {
    images: [writeCard],
    tags: ["action", "anime", "set 1", "verb", "write"],
  },
  // [[[end]]]
} as const;

export const images = makeCards(imageMap);

export const imageList = Object.values(images);

export const sets: Record<string, CardSet> = {
  ...makeSet(imageList, "action verbs 1", ["action", "set 1", "verb"]),
};
