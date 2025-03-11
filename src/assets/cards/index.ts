import type { CardSet } from "@/types/cards";
// [[[cog from gen_cards import *; dirs = get_subdirs(); gen_set_imports(dirs)]]]
import { images as kenneyImages, sets as kenneySets } from "./Kenney";
import { images as foodImages, sets as foodSets } from "./food";
// [[[end]]]

export const images = {
  // [[[cog gen_set_image_map(dirs)]]]
  ...kenneyImages,
  ...foodImages,
  // [[[end]]]
};

export const imageList = Object.values(images);

export const sets: Record<string, CardSet> = {
  // [[[cog gen_set_map(dirs)]]]
  ...kenneySets,
  ...foodSets,
  // [[[end]]]
};

export const defaultSet = kenneySets.kenneyZooAnimals;
