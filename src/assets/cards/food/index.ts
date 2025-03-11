import type { CardSet } from "@/types/cards";
// [[[cog from gen_cards import *; dirs = get_subdirs(); gen_set_imports(dirs)]]]
import { images as dishesImages, sets as dishesSets } from "./dishes";
import { images as fruitImages, sets as fruitSets } from "./fruit";
import { images as sweetsImages, sets as sweetsSets } from "./sweets";
// [[[end]]]

export const images = {
  // [[[cog gen_set_image_map(dirs)]]]
  ...dishesImages,
  ...fruitImages,
  ...sweetsImages,
  // [[[end]]]
};

export const imageList = Object.values(images);

export const sets: Record<string, CardSet> = {
  // [[[cog gen_set_map(dirs)]]]
  ...dishesSets,
  ...fruitSets,
  ...sweetsSets,
  // [[[end]]]
};
