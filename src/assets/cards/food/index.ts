import CurryCard from "./curry.png";
import PizzaCard from "./pizza.png";
import SandwichCard from "./sandwich.png";
import { type CardSet } from "@/types/cards";
import { makeCards, makeSet } from "@/utils/cards";

const imageMap = {
  curry: {
    images: [CurryCard],
    tags: ["anime", "curry", "dish", "food", "one"],
  },
  pizza: {
    images: [PizzaCard],
    tags: ["anime", "dish", "food", "one", "pizza"],
  },
  sandwich: {
    images: [SandwichCard],
    tags: ["anime", "dish", "food", "one", "sandwich"],
  },
} as const;

export const images = makeCards(imageMap);

export const imageList = Object.values(images);

export const sets: Record<string, CardSet> = {
  ...makeSet(imageList, "food", ["food", "one"]),
};
