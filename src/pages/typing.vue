<script lang="ts" setup>
import muteCuica from "@/assets/sounds/mute_cuica.mp3";
import FontSelector from "@/components/FontSelector.vue";
import Timer from "@/components/Timer.vue";
import tools from "@/types/tools";
import { ANY_KEY, keyRelations, useKeys } from "@/utils/keys";
import { randomStrings } from "@/utils/random";
import { useSounds } from "@/utils/sound";
import { randomWords } from "@/utils/words";
import { mdiRefresh } from "@mdi/js";
import classNames from "classnames";
// @ts-expect-error No type declaration.
import convertKeyEvent from "keysight";
import { shuffle } from "lodash";
import "shim-keyboard-event-key"; // Probably not necessary, but might as well.
import { computed, onMounted, ref, watch } from "vue";

const sounds = useSounds({ muteCuica });
const timer = ref<InstanceType<typeof Timer> | null>(null);

const includeCapitals = ref(true);
const overrideFont = ref(true);
const selectedFont = ref('"Atkinson Hyperlegible Mono"');

interface Level {
  home?: string[];
  new: string[];
  old: string[];
  review?: boolean;
  title?: string;
}

let previous: string[] = [];
const levels: Level[] = [
  { new: [" ", "f", "j"], home: [] },
  { new: ["d", "k"], home: [] },
  { new: ["s", "l"], home: [] },
  { new: ["a", ";"], home: [] },
  { new: ["g", "h"], home: ["f", "j"] },
  { review: true, new: " asdfghjkl;".split(""), old: [] },
  { new: ["r", "u"], home: ["f", "j"] },
  { new: ["e", "i"], home: ["d", "k"] },
  { new: ["w", "o"], home: ["s", "l"] },
  { new: ["q", "p"], home: ["a", ";"] },
  { new: ["t", "y"], home: ["f", "j"] },
  { review: true, new: "qwertyuiop".split(""), old: " asdfghjkl;".split("") },
  { new: ["v", "m"], home: ["f", "j"] },
  { new: ["c", ","], home: ["d", "k"] },
  { new: ["x", "."], home: ["s", "l"] },
  { new: ["z", "/"], home: ["a", ";"] },
  { new: ["b", "n"], home: ["f", "j"] },
  {
    review: true,
    new: "zxcvbnm,./".split(""),
    old: " asdfghjkl;qwertyuiop".split(""),
  },
  { new: ["4", "7"], home: ["f", "j"] },
  { new: ["3", "8"], home: ["d", "k"] },
  { new: ["2", "9"], home: ["s", "l"] },
  { new: ["1", "0"], home: ["a", ";"] },
  { new: ["5", "6"], home: ["f", "j"] },
  {
    review: true,
    new: " asdfghjkl;qwertyuiopzxcvbnm,./1234567890".split(""),
    old: [],
    title: "Review letters and numbers",
  },
  { new: ["$", "'"], home: ["f", "j"] },
  { new: ["#", "("], home: ["d", "k"] },
  { new: ['"', ")"], home: ["s", "l"] },
  { new: ["%", "&"], home: ["f", "j"] },
  { new: ["!", "+"], home: ["a", ";"] },
  {
    review: true,
    new: "$'#()\"%&!+".split(""),
    old: " asdfghjkl;qwertyuiopzxcvbnm,./1234567890".split(""),
  },
  { new: [":", "*"], home: [";"] },
  { new: ["<", ">"], home: ["k", "l"] },
  { new: ["?", "/"], home: [";"] },
  { new: ["[", "]"], home: [";"] },
  { new: ["{", "}"], home: [";"] },
  {
    review: true,
    new: ":<>?[]{}/*".split(""),
    old: " asdfghjkl;qwertyuiopzxcvbnm,./1234567890$'#()\"%&!+".split(""),
  },
  { new: ["-", "="], home: [";"] },
  { new: ["^", "~"], home: [";"] },
  { new: ["@", "`"], home: [";"] },
  // On Windows, we get a backslash character even though ¥ appears.
  { new: ["¥", "|"], home: [";"] },
  { new: ["\\", "_"], home: [";"] },
  {
    review: true,
    new: "-=^~@`\\¥|_".split(""),
    old: " asdfghjkl;qwertyuiopzxcvbnm,./1234567890$'#()\"%&!+:*<>?/[]{}".split(
      "",
    ),
  },
].map((level: Partial<Level>) => {
  // Insert previously-studied levels if needed.
  if (!level.old) {
    level.old = previous
      .filter((key) => !level.home?.includes(key))
      .concat(level.home ?? []);
    previous = previous.concat(level.new!);
  }
  return level as Level;
});

const selectedLevel = ref(levels[0]);
const levelOptions = levels.map((level, i) => ({
  title:
    `${i}: ` +
    (level.title ??
      `${level.review ? "Review" : "Learn"} ${level.new.join(", ")}`),
  value: level,
}));

const makePractice = (level: Level) => {
  let target = randomStrings(level.new, 2, includeCapitals.value);
  target +=
    " " +
    randomStrings(
      (level.home ?? []).concat(level.new),
      4,
      includeCapitals.value,
    );
  target +=
    " " +
    randomStrings(
      level.new
        .map(function (nl) {
          return keyRelations[nl].others.filter(function (ol) {
            return level.old.includes(ol);
          });
        })
        .reduce(function (accum, elem) {
          return accum.concat(elem);
        }, level.new),
      6,
      includeCapitals.value,
    );
  if (level.old.length > 0) {
    target +=
      " " +
      randomStrings(level.old.concat(level.new), 4, includeCapitals.value);
  }
  const practiceLength = 8;
  const words = randomWords(
    level.old,
    level.new,
    practiceLength,
    includeCapitals.value,
  );
  if (words.length > 0) {
    target += " " + words.join(" ");
  }
  return target;
};

const makeReview = function (level: Level) {
  const allLevels = level.old.concat(level.new);
  let target = randomWords(level.old, level.new, 12, includeCapitals.value);
  target = target.concat(randomWords(allLevels, [], 12, includeCapitals.value));
  return shuffle(target).join(" ");
};

const charactersEntered = ref(0);
const mistakesEntered = ref(0);
const score = computed(() =>
  Math.round(
    charactersEntered.value === 0
      ? 100
      : (100 * (charactersEntered.value - mistakesEntered.value)) /
          charactersEntered.value,
  ),
);

const target = ref("");
const buffer = ref("");
const makeTarget = () => {
  timer.value?.reset();
  buffer.value = "";
  charactersEntered.value = 0;
  mistakesEntered.value = 0;
  target.value = selectedLevel.value.review
    ? makeReview(selectedLevel.value)
    : makePractice(selectedLevel.value);
};
watch([includeCapitals, selectedLevel], makeTarget);
onMounted(makeTarget);

const running = computed(
  () =>
    !!(
      target.value.length &&
      buffer.value.length &&
      buffer.value.length < target.value.length
    ),
);

const { onKey } = useKeys();
onKey(ANY_KEY, (event) => {
  let character: string = event.key || convertKeyEvent(event).char;
  const code = event.key || event.which || event.keyCode || event.charCode;

  if (
    event.ctrlKey ||
    event.metaKey ||
    code === 16 ||
    code === 17 ||
    code === 18 ||
    code === 91 ||
    code === 93 ||
    code === "Shift" ||
    code === "Alt" ||
    code === "Meta" ||
    code === "Control"
  ) {
    // Ignore these!
  } else {
    // try to stop the browser from doing things...
    event.preventDefault();
    event.stopPropagation();
    event.stopImmediatePropagation();
    event.returnValue = false;
    // check the key press
    if (code === 8 || code === "Backspace") {
      // backspace, so remove the last character
      if (buffer.value) {
        buffer.value = buffer.value.slice(0, -1);
      } else {
        // At the beginning, make a noise!
        sounds.play("muteCuica");
      }
    } else if (buffer.value.length >= target.value.length) {
      // TODO: we already have enough characters, so ring the bell
      sounds.play("muteCuica");
    } else {
      // On Mac, shift is not necessary to type _.
      // If not shift, change to \ as on Windows.
      if (character === "_" && !event.shiftKey) {
        character = "\\";
      }
      // On Windows, we get a backslash character even though ¥ appears.
      // Change to ¥ if that's what we're looking for.
      if (target.value[buffer.value.length] === "¥" && character === "\\") {
        character = "¥";
      }
      if (character !== target.value[buffer.value.length]) {
        sounds.play("muteCuica");
        mistakesEntered.value++;
      }
      // otherwise append the character to the buffer
      buffer.value += character[0];
      charactersEntered.value++;
    }
  }
});
</script>

<template>
  <HomeFAB />
  <v-fab absolute app icon location="top center" @click="makeTarget">
    <v-icon :icon="mdiRefresh" />
  </v-fab>
  <ToolMenu :tool="tools.typing">
    <v-select v-model="selectedLevel" :items="levelOptions" label="Level" />
    <v-switch v-model="includeCapitals" label="Include capitals" />
    <v-switch v-model="overrideFont" label="Override font" />
    <FontSelector v-model="selectedFont" :disabled="!overrideFont" />
  </ToolMenu>
  <div class="typing-container">
    <div
      class="typing-area"
      :style="overrideFont ? { fontFamily: selectedFont } : {}"
    >
      <span
        v-for="(c, i) in target"
        :key="i"
        :class="
          classNames({
            'typing-cursor': i === buffer.length,
            'typing-mistake': i < buffer.length && buffer[i] !== c,
          })
        "
        ><!-- Use a non-breaking space plus a 0-width space to make wrapping work correctly. -->{{
          c === " " ? "\u00a0\u200b" : c
        }}</span
      >
    </div>
    <div :class="classNames('typing-stats', { 'typing-running': running })">
      <Timer ref="timer" :running="running" /> |
      <span>{{ score }}%</span>
    </div>
  </div>
</template>

<style scoped lang="scss">
.typing-area {
  font-size: 2.5em;
  max-width: 600px;
  position: relative;
  text-align: center;
}

.typing-container {
  align-items: center;
  display: flex;
  flex-direction: column;
  gap: 3rem;
  height: 100%;
  justify-content: center;
  padding: 1rem;
  position: relative;
  width: 100%;
}

.typing-cursor {
  background-color: cornflowerblue;
}

.typing-mistake {
  background-color: crimson;
}

.typing-stats {
  text-align: center;
  padding: 0 0 2em 0;
  font-family: sans-serif;
  font-size: 1.5em;
  color: lightgray;
  opacity: 1;
  transition: opacity 0.5s ease-in;
}

.typing-running {
  opacity: 0;
  transition: opacity 10s ease-in;
}
</style>
