import bear from "./bear.svg";
import buffalo from "./buffalo.svg";
import chick from "./chick.svg";
import chicken from "./chicken.svg";
import cow from "./cow.svg";
import crocodile from "./crocodile.svg";
import dog from "./dog.svg";
import duck from "./duck.svg";
import elephant from "./elephant.svg";
import frog from "./frog.svg";
import giraffe from "./giraffe.svg";
import goat from "./goat.svg";
import gorilla from "./gorilla.svg";
import hippo from "./hippo.svg";
import horse from "./horse.svg";
import monkey from "./monkey.svg";
import moose from "./moose.svg";
import narwhal from "./narwhal.svg";
import orca from "./orca.svg";
import owl from "./owl.svg";
import panda from "./panda.svg";
import parrot from "./parrot.svg";
import penguin from "./penguin.svg";
import pig from "./pig.svg";
import rabbit from "./rabbit.svg";
import rhino from "./rhino.svg";
import sloth from "./sloth.svg";
import snake from "./walrus.svg";
import zebra from "./zebra.svg";
import { type CardSet } from "@/types/cards";
import { makeCards, makeSet } from "@/utils/cards";

const imageMap = {
  kenneyChick: {
    images: [chick],
    label: "chick",
    tags: ["animal", "chick", "farm", "Kenney", "vector"],
  },
  kenneyChicken: {
    images: [chicken],
    label: "chicken",
    tags: ["animal", "chicken", "farm", "Kenney", "vector"],
  },
  kenneyCow: {
    images: [cow],
    label: "cow",
    tags: ["animal", "cow", "farm", "Kenney", "vector"],
  },
  kenneyDog: {
    images: [dog],
    label: "dog",
    tags: ["animal", "dog", "farm", "Kenney", "vector"],
  },
  kenneyDuck: {
    images: [duck],
    label: "duck",
    tags: ["animal", "duck", "farm", "Kenney", "vector"],
  },
  kenneyGoat: {
    images: [goat],
    label: "goat",
    tags: ["animal", "farm", "goat", "Kenney", "vector"],
  },
  kenneyHorse: {
    images: [horse],
    label: "horse",
    tags: ["animal", "farm", "horse", "Kenney", "vector"],
  },
  kenneyOwl: {
    images: [owl],
    label: "owl",
    tags: ["animal", "farm", "Kenney", "owl", "vector"],
  },
  kenneyPig: {
    images: [pig],
    label: "pig",
    tags: ["animal", "farm", "Kenney", "pig", "vector"],
  },
  kenneyRabbit: {
    images: [rabbit],
    label: "rabbit",
    tags: ["animal", "farm", "Kenney", "rabbit", "vector"],
  },

  kenneyBear: {
    images: [bear],
    label: "bear",
    tags: ["animal", "bear", "Kenney", "vector", "zoo"],
  },
  kenneyElephant: {
    images: [elephant],
    label: "elephant",
    tags: ["animal", "elephant", "Kenney", "vector", "zoo"],
  },
  kenneyGiraffe: {
    images: [giraffe],
    label: "giraffe",
    tags: ["animal", "giraffe", "Kenney", "vector", "zoo"],
  },
  kenneyGorilla: {
    images: [gorilla],
    label: "gorilla",
    tags: ["animal", "gorilla", "Kenney", "vector", "zoo"],
  },
  kenneyHippo: {
    images: [hippo],
    label: "hippo",
    tags: ["animal", "hippo", "Kenney", "vector", "zoo"],
  },
  kenneyMonkey: {
    images: [monkey],
    label: "monkey",
    tags: ["animal", "Kenney", "monkey", "vector", "zoo"],
  },
  kenneyPanda: {
    images: [panda],
    label: "panda",
    tags: ["animal", "Kenney", "panda", "vector", "zoo"],
  },
  kenneyRhino: {
    images: [rhino],
    label: "rhino",
    tags: ["animal", "Kenney", "rhino", "vector", "zoo"],
  },
  kenneySnake: {
    images: [snake],
    label: "snake",
    tags: ["animal", "Kenney", "snake", "vector", "zoo"],
  },
  kenneyZebra: {
    images: [zebra],
    label: "zebra",
    tags: ["animal", "Kenney", "vector", "zebra", "zoo"],
  },

  kenneyBuffalo: {
    images: [buffalo],
    label: "buffalo",
    tags: ["animal", "buffalo", "extra", "Kenney", "vector"],
  },
  kenneyCrocodile: {
    images: [crocodile],
    label: "crocodile",
    tags: ["animal", "crocodile", "extra", "Kenney", "vector"],
  },
  kenneyFrog: {
    images: [frog],
    label: "frog",
    tags: ["animal", "extra", "frog", "Kenney", "vector"],
  },
  kenneyMoose: {
    images: [moose],
    label: "moose",
    tags: ["animal", "extra", "Kenney", "moose", "vector"],
  },
  kenneyNarwhal: {
    images: [narwhal],
    label: "narwhal",
    tags: ["animal", "extra", "Kenney", "narwhal", "vector"],
  },
  kenneyOrca: {
    images: [orca],
    label: "orca",
    tags: ["animal", "extra", "Kenney", "orca", "vector"],
  },
  kenneyParrot: {
    images: [parrot],
    label: "parrot",
    tags: ["animal", "extra", "Kenney", "parrot", "vector"],
  },
  kenneyPenguin: {
    images: [penguin],
    label: "penguin",
    tags: ["animal", "extra", "Kenney", "penguin", "vector"],
  },
  kenneySloth: {
    images: [sloth],
    label: "sloth",
    tags: ["animal", "extra", "Kenney", "sloth", "vector"],
  },
} as const;

export const images = makeCards(imageMap);

export const imageList = Object.values(images);

export const sets: Record<string, CardSet> = {
  ...makeSet(imageList, "kenneyAnimals", ["animal", "Kenney", "vector"]),
  ...makeSet(imageList, "kenneyExtraAnimals", [
    "animal",
    "Kenney",
    "extra",
    "vector",
  ]),
  ...makeSet(imageList, "kenneyFarmAnimals", [
    "animal",
    "farm",
    "Kenney",
    "vector",
  ]),
  ...makeSet(imageList, "kenneyZooAnimals", [
    "animal",
    "Kenney",
    "vector",
    "zoo",
  ]),
};
