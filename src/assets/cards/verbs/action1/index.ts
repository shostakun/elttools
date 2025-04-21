// [[[cog from gen_cards import *; files = get_card_files(); gen_card_imports(files)]]]
import danceCard from "./dance.png";
import ennumerateCard from "./ennumerate.png";
import jumpCard from "./jump.png";
import listenCard from "./listen.png";
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
  // [[[cog gen_card_specs(files, ["action", "set 1", "verb"])]]]
  dance: {
    images: [danceCard],
    tags: ["action", "dance", "set 1", "verb"],
  },
  ennumerate: {
    images: [ennumerateCard],
    tags: ["action", "ennumerate", "set 1", "verb"],
  },
  jump: {
    images: [jumpCard],
    tags: ["action", "jump", "set 1", "verb"],
  },
  listen: {
    images: [listenCard, listen2Card],
    tags: ["action", "listen", "set 1", "verb"],
  },
  play: {
    images: [playCard, play2Card],
    tags: ["action", "play", "set 1", "verb"],
  },
  read: {
    images: [readCard],
    tags: ["action", "read", "set 1", "verb"],
  },
  run: {
    images: [runCard],
    tags: ["action", "run", "set 1", "verb"],
  },
  sing: {
    images: [singCard],
    tags: ["action", "set 1", "sing", "verb"],
  },
  walk: {
    images: [walkCard, walk2Card],
    tags: ["action", "set 1", "verb", "walk"],
  },
  write: {
    images: [writeCard],
    tags: ["action", "set 1", "verb", "write"],
  },
  // [[[end]]]
} as const;

export const images = makeCards(imageMap);

export const imageList = Object.values(images);

export const sets: Record<string, CardSet> = {
  ...makeSet(imageList, "action verbs 1", ["action", "set 1", "verb"]),
};
