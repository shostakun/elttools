import type { CardSet } from "@/types/cards";
// [[[cog from gen_cards import *; dirs = get_subdirs(); gen_set_imports(dirs)]]]
import { images as dishesImages, sets as dishesSets } from "./dishes";
import { images as fruitImages, sets as fruitSets } from "./fruit";
import { images as fruit2Images, sets as fruit2Sets } from "./fruit2";
import { images as sweetsImages, sets as sweetsSets } from "./sweets";
// [[[end]]]

export const images = {
  // [[[cog gen_set_image_map(dirs)]]]
  ...dishesImages,
  ...fruitImages,
  ...fruit2Images,
  ...sweetsImages,
  // [[[end]]]
};

export const imageList = Object.values(images);

export const sets: Record<string, CardSet> = {
  // [[[cog gen_set_map(dirs)]]]
  ...dishesSets,
  ...fruitSets,
  ...fruit2Sets,
  ...sweetsSets,
  // [[[end]]]
};
