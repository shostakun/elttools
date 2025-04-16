import { random, range, sample, shuffle } from "lodash";
import { ngsl } from "./ngsl500";
import { capitalizeSome, chooseN } from "./random";
import { romaji } from "./romaji";

const exampleWordsOnly = ngsl.concat(romaji); // Need just words to generate email addresses.
const exampleWords = exampleWordsOnly.concat(
  chooseN(range(0, 1000), 550).map(function (n) {
    return n.toString();
  }),
  range(1, 21).map(function (n) {
    return n * random(0, 20) + " / " + n;
  }),
  chooseN(range(1, 101), 20).map(function (n) {
    return "#" + n;
  }),
  chooseN(range(0, 100), 20).map(function (n) {
    return "$" + random(0, 9) + "." + n.toString().padStart(2, "0");
  }),
  chooseN(range(0, 100), 20).map(function () {
    return "¥" + random(0, 999);
  }),
  chooseN(range(0, 101), 20).map(function (n) {
    return n + "%";
  }),
  range(1, 21).map(function (n) {
    return n + " + " + random(0, 20);
  }),
  range(1, 21).map(function (n) {
    return n + " * " + random(0, 20);
  }),
  range(1, 21).map(function (n) {
    return n + " - " + random(0, n - 1);
  }),
  ["&&", "||", "^"].reduce(function (accum, op) {
    const bool = ["true", "false"];
    return accum.concat(
      bool.reduce(function (accum2, b1) {
        return accum2.concat(bool.map((b2) => [b1, op, b2].join(" ")));
      }, [] as string[]),
    );
  }, [] as string[]),
  ["===", "!==", "<=", ">="].reduce(function (accum, op) {
    const results = [];
    for (let i = 0; i < 5; i++) {
      results.push([random(0, 20), op, random(0, 20)].join(" "));
    }
    return accum.concat(results);
  }, [] as string[]),
  chooseN(range(0, 100), 10).map(function (n) {
    return "~" + n;
  }),
  "nrtwsd\"\'\\".split("").map(function (c) {
    return "\\" + c;
  }),
  chooseN(exampleWordsOnly, 9).map(function (w) {
    return "_" + w;
  }),
  chooseN(exampleWordsOnly, 9).map(function (w) {
    return (
      w +
      "@" +
      sample(exampleWordsOnly) +
      sample([".com", ".org", ".net", ".co.jp", ".jp"])
    );
  }),
);

export const filterWords = (
  newLevel: string[],
  allLevels: string[],
  count: number,
) =>
  shuffle(
    exampleWords
      .filter((word) => {
        // Get only words that include characters from the new level.
        const lower = word.toLowerCase();
        return newLevel.some((c) => lower.includes(c));
      })
      .filter((word) => {
        // Get only words that only contain studied characters.
        const lower = word.toLowerCase();
        return lower.split("").every((c) => allLevels.includes(c));
      }),
  ).slice(0, count);

const finalPunctuation = ";,.!:?".split("");
const surroundingPunctuation: Record<string, string> = {
  ")": "()",
  '"': '""',
  "<": "<>",
  "[": "[]",
  "{": "{}",
  "`": "``",
};

export const randomWords = (
  oldLevels: string[],
  newLevel: string[],
  count: number,
  capitalize: boolean,
) => {
  const allLevels = oldLevels.concat(newLevel);

  // Figure out which punctuation we can use.
  // If the new level includes punctuation, only use that;
  // otherwise use any studied punctuation.
  let finalPunct = finalPunctuation.filter(function (p) {
    return newLevel.includes(p);
  });
  if (!finalPunct.length) {
    finalPunct = finalPunctuation.filter(function (p) {
      return oldLevels.includes(p);
    });
  }
  let surroundingPunct = Object.keys(surroundingPunctuation).filter(
    function (p) {
      return newLevel.includes(p);
    },
  );
  if (surroundingPunct.length < 1) {
    surroundingPunct = Object.keys(surroundingPunctuation).filter(function (p) {
      return oldLevels.includes(p);
    });
  }

  // Choose appropriate words.
  let words = filterWords(newLevel, allLevels, count);
  if (words.length - count) {
    words = shuffle(
      words.concat(filterWords(allLevels, allLevels, count - words.length)),
    );
  }

  // Modify the chosen words by adding capitalization and punctuation.
  if (capitalize) {
    words = words.map((w) => capitalizeSome(w));
  }
  let choices = [];
  if (finalPunct.length > 0) {
    choices = chooseN(range(0, words.length), Math.ceil(words.length / 4));
    choices.forEach(function (i) {
      words[i] = words[i] + sample(finalPunct);
    });
  }
  if (surroundingPunct.length > 0) {
    choices = chooseN(range(0, words.length), Math.ceil(words.length / 4));
    choices.forEach(function (i) {
      const p = sample(surroundingPunct);
      words[i] =
        surroundingPunctuation[p!][0] +
        words[i] +
        surroundingPunctuation[p!][1];
    });
  }
  return words;
};
