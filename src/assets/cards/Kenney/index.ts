import type { CardSet } from "@/types/cards";
import { images as animalImages, sets as animalSets } from "./animals";

export const images = {
  ...animalImages,
};

export const imageList = Object.values(images);

export const sets: Record<string, CardSet> = {
  ...animalSets,
};
