import type { CardSet } from "@/types/cards";
// [[[cog from gen_cards import *; dirs = get_subdirs(); gen_set_imports(dirs)]]]
import { images as actionImages, sets as actionSets } from "./action";
// [[[end]]]

export const images = {
  // [[[cog gen_set_image_map(dirs)]]]
  ...actionImages,
  // [[[end]]]
};

export const imageList = Object.values(images);

export const sets: Record<string, CardSet> = {
  // [[[cog gen_set_map(dirs)]]]
  ...actionSets,
  // [[[end]]]
};
