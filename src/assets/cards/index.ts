import type { CardSet } from "@/types/cards";
import { images as fruitImages, sets as fruitSets } from "./fruit";
import { images as kenneyImages, sets as kenneySets } from "./Kenney";

export const images = {
  ...fruitImages,
  ...kenneyImages,
};

export const imageList = Object.values(images);

export const sets: Record<string, CardSet> = {
  ...fruitSets,
  ...kenneySets,
};

export const defaultSet = kenneySets.kenneyZooAnimals;
