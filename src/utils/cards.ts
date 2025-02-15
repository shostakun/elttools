import type { Card, CardMap, CardSetMap } from "@/types/cards";
import { intersection, startCase } from "lodash";

export function makeCards<T extends CardMap>(cardMap: T) {
  return Object.fromEntries(
    Object.entries(cardMap).map(([k, v]) => [
      k,
      { ...v, id: k, label: v.label ?? k },
    ]),
  ) as unknown as Record<keyof typeof cardMap, Card>;
}

export const makeSet = (
  allCards: Card[],
  id: string,
  tags: string[],
  label?: string,
  description?: string,
): CardSetMap => ({
  [id]: {
    cards: allCards.filter(
      (c) => intersection(tags, c.tags).length === tags.length,
    ),
    description,
    id,
    label: label ?? startCase(id),
    tags,
  },
});
