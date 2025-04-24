import type { CardSet } from "@/types/cards";
// [[[cog from gen_cards import *; dirs = get_subdirs(); gen_set_imports(dirs)]]]
import { images as kenneyImages, sets as kenneySets } from "./Kenney";
import { images as adjectivesImages, sets as adjectivesSets } from "./adjectives";
import { images as foodImages, sets as foodSets } from "./food";
import { images as natureImages, sets as natureSets } from "./nature";
import { images as verbsImages, sets as verbsSets } from "./verbs";
// [[[end]]]

export const images = {
  // [[[cog gen_set_image_map(dirs)]]]
  ...kenneyImages,
  ...adjectivesImages,
  ...foodImages,
  ...natureImages,
  ...verbsImages,
  // [[[end]]]
};

export const imageList = Object.values(images);

export const sets: Record<string, CardSet> = {
  // [[[cog gen_set_map(dirs)]]]
  ...kenneySets,
  ...adjectivesSets,
  ...foodSets,
  ...natureSets,
  ...verbsSets,
  // [[[end]]]
};

export const defaultSet = foodSets.fruit;
