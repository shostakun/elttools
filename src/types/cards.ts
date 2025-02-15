export interface Card {
  id: string;
  images: readonly string[];
  label: string;
  tags: readonly string[];
}

export type CardMap = Record<
  string,
  Omit<Card, "id" | "label"> & { label?: string }
>;

export interface CardSet {
  cards: Card[];
  description?: string;
  id: string;
  label: string;
  tags: string[];
}

export type CardSetMap = Record<string, CardSet>;
