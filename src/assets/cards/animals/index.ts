// [[[cog from gen_cards import *; files = get_card_files(); gen_card_imports(files)]]]
import bearCard from "./bear.png";
import bear2Card from "./bear2.png";
import birdCard from "./bird.png";
import bird2Card from "./bird2.png";
import catCard from "./cat.png";
import cat2Card from "./cat2.png";
import dogCard from "./dog.png";
import dog2Card from "./dog2.png";
import fishCard from "./fish.png";
import fish2Card from "./fish2.png";
import frogCard from "./frog.png";
import frog2Card from "./frog2.png";
import gorillaCard from "./gorilla.png";
import gorilla2Card from "./gorilla2.png";
import pigCard from "./pig.png";
import pig2Card from "./pig2.png";
import rabbitCard from "./rabbit.png";
import rabbit2Card from "./rabbit2.png";
import turtleCard from "./turtle.png";
import turtle2Card from "./turtle2.png";
// [[[end]]]
import { type CardSet } from "@/types/cards";
import { makeCards, makeSet } from "@/utils/cards";

const imageMap = {
  // [[[cog gen_card_specs(files, ["animal", "noun"])]]]
  bear: {
    images: [bearCard, bear2Card],
    tags: ["animal", "bear", "noun"],
  },
  bird: {
    images: [birdCard, bird2Card],
    tags: ["animal", "bird", "noun"],
  },
  cat: {
    images: [catCard, cat2Card],
    tags: ["animal", "cat", "noun"],
  },
  dog: {
    images: [dogCard, dog2Card],
    tags: ["animal", "dog", "noun"],
  },
  fish: {
    images: [fishCard, fish2Card],
    tags: ["animal", "fish", "noun"],
  },
  frog: {
    images: [frogCard, frog2Card],
    tags: ["animal", "frog", "noun"],
  },
  gorilla: {
    images: [gorillaCard, gorilla2Card],
    tags: ["animal", "gorilla", "noun"],
  },
  pig: {
    images: [pigCard, pig2Card],
    tags: ["animal", "noun", "pig"],
  },
  rabbit: {
    images: [rabbitCard, rabbit2Card],
    tags: ["animal", "noun", "rabbit"],
  },
  turtle: {
    images: [turtleCard, turtle2Card],
    tags: ["animal", "noun", "turtle"],
  },
  // [[[end]]]
} as const;

export const images = makeCards(imageMap);

export const imageList = Object.values(images);

const pluralRegExp = /2(?:-[0-9a-zA-Z_]+)?\.png/;
export const sets: Record<string, CardSet> = {
  ...makeSet(imageList, "animals", ["animal", "noun"]),
  ...makeSet(
    imageList,
    "animalsPlural",
    ["animal", "noun"],
    "Animals (Plural)",
    undefined,
    (card) => ({
      ...card,
      images: card.images.filter((img) => img.match(pluralRegExp)),
      tags: [...card.tags, "plural"],
    }),
  ),
  ...makeSet(
    imageList,
    "animalsSingular",
    ["animal", "noun"],
    "Animals (Singular)",
    undefined,
    (card) => ({
      ...card,
      images: card.images.filter((img) => !img.match(pluralRegExp)),
      tags: [...card.tags, "singular"],
    }),
  ),
};
