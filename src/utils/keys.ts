import { onMounted, onUnmounted } from "vue";
import { useEmitter } from "./emitter";

export type KeyCallback = (event: KeyboardEvent) => void;

export const ANY_KEY = "any";

export const useKeys = () => {
  const { emit, on, off } = useEmitter<KeyCallback>();

  const handleKeydown = (event: KeyboardEvent) => {
    emit(event.key, event);
    emit(ANY_KEY, event);
  };

  onMounted(() => {
    addEventListener("keydown", handleKeydown);
  });

  onUnmounted(() => {
    removeEventListener("keydown", handleKeydown);
  });

  return {
    offKey: (key: typeof ANY_KEY | string, cb?: KeyCallback) => off(key, cb),
    onKey: (key: typeof ANY_KEY | string, cb: KeyCallback) => on(key, cb),
  };
};

// Utilities used for typing tool.
export const fingerMap: Record<string, string> = {
  a: "!1qaz",
  s: '"2wsx',
  d: "#3edc",
  f: "$4rfv%5tgb",
  j: "&6yhn'7ujm",
  k: "(8ik<,",
  l: ")9ol>.",
  ";": "0p+;/?=-`@*:~^{[}]|\\¥_",
  " ": " ",
};

export enum Hand {
  left,
  right,
}

export const getHand = function (levels: string[], hand: Hand) {
  const home = hand === Hand.right ? "jkl;" : "asdf";
  const use = home
    .split("")
    .map((l) => fingerMap[l])
    .join("");
  return levels.filter((l) => use.includes(l));
};

export interface KeyRelation {
  home: string;
  others: string[];
}

export const keyRelations: Record<string, KeyRelation> = {};
Object.keys(fingerMap).forEach(function (k: string) {
  fingerMap[k].split("").forEach(function (v: string) {
    keyRelations[v] = {
      home: k,
      others: fingerMap[k].split("").filter(function (o: string) {
        return o !== v;
      }),
    };
  });
});
