import type { CardSet } from "@/types/cards";
import { images as foodImages, sets as foodSets } from "./food";
import { images as fruitImages, sets as fruitSets } from "./fruit";
import { images as kenneyImages, sets as kenneySets } from "./Kenney";

export const images = {
  ...foodImages,
  ...fruitImages,
  ...kenneyImages,
};

export const imageList = Object.values(images);

export const sets: Record<string, CardSet> = {
  ...foodSets,
  ...fruitSets,
  ...kenneySets,
};

export const defaultSet = kenneySets.kenneyZooAnimals;
