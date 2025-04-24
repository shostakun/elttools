import {
  flattenSetList,
  type Card,
  type CardMap,
  type CardSet,
  type CardSetMap,
} from "@/types/cards";
import { intersection, sample, shuffle, startCase } from "lodash";
import { computed, inject, onMounted, ref, watch, type Ref } from "vue";

export function makeCards<T extends CardMap>(cardMap: T) {
  return Object.fromEntries(
    Object.entries(cardMap).map(([k, v]) => [k, { ...v, id: k, label: v.label ?? k }]),
  ) as unknown as Record<keyof typeof cardMap, Card>;
}

export const makeSet = (
  allCards: Card[],
  id: string,
  tags: string[],
  label?: string,
  description?: string,
  transform = (card: Card) => card,
): CardSetMap => ({
  [id]: {
    cards: allCards.filter((c) => intersection(tags, c.tags).length === tags.length).map(transform),
    description,
    id,
    label: label ?? startCase(id),
    tags,
  },
});

export const useCardSetCommon = () => {
  // These will ultimately come from the DB, hence using a provider.
  const allSets = inject<Ref<CardSetMap>>("allSets") ?? ref<CardSetMap>({});
  const defaultSet = inject<CardSet>("defaultSet") ?? {
    cards: [],
    id: "dummy",
    label: "dummy",
    tags: [],
  };

  return { allSets, defaultSet };
};

export const useCardSet = (defaultNumCards?: number) => {
  const { allSets, defaultSet } = useCardSetCommon();

  const cards = ref<Card[]>([]);
  const cardSet = ref<CardSet>(defaultSet);
  const numCards = ref<number>(defaultNumCards ?? 0);

  const chooseCards = () => {
    let list = shuffle(cardSet.value.cards);
    if (numCards.value) list = list.slice(0, numCards.value);
    // For cards with multiple images, choose one here so it doesn't change.
    list = list.map((c) => ({ ...c, images: [sample(c.images)!] }));
    cards.value = list;
    return list;
  };

  watch([cardSet, numCards], chooseCards);
  onMounted(chooseCards);

  return {
    allSets,
    cards,
    cardSet,
    chooseCards,
    numCards,
  };
};

export const useCardSets = (defaultNumCards?: number) => {
  const { allSets, defaultSet } = useCardSetCommon();

  const cards = ref<Card[]>([]);
  const cardSets = ref<CardSet[]>([defaultSet]);
  const cardsInSets = computed(() => flattenSetList(cardSets.value));
  const numCards = ref<number>(defaultNumCards ?? 0);

  const chooseCards = () => {
    let list = shuffle(cardsInSets.value);
    if (numCards.value) list = list.slice(0, numCards.value);
    // For cards with multiple images, choose one here so it doesn't change.
    list = list.map((c) => ({ ...c, images: [sample(c.images)!] }));
    cards.value = list;
    return list;
  };

  watch([cardSets, numCards], chooseCards);
  onMounted(chooseCards);

  return {
    allSets,
    cards,
    cardSets,
    cardsInSets,
    chooseCards,
    numCards,
  };
};
