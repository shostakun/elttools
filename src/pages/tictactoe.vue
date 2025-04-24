<script lang="ts" setup>
import { getGlobalFont } from "@/types/font";
import tools from "@/types/tools";
import { ANY_KEY, useKeys } from "@/utils/keys";
import { calcTextWidth } from "@/utils/text";
import { mdiRefresh } from "@mdi/js";
import classNames from "classnames";
import { chunk, shuffle } from "lodash";
import { computed, onMounted, ref, useTemplateRef, watch } from "vue";

const size = 3;

enum Player {
  maru = "⭕️",
  batsu = "❌",
}
const players = Object.values(Player);
const isPlayer = (word: string) => players.includes(word as Player);

interface Move {
  cell: number;
  player: Player;
}

interface WordSet {
  title: string;
  words: string[];
}

// prettier-ignore
const wordSetOptions: WordSet[] = [
  {title: "Short a", words: ["bat", "tab", "cab", "dab", "bad", "dad", "tad", "cat", "cad"]},
  {title: "Short o", words: ["not", "nod", "non", "dot", "don", "tot", "cot", "cod", "doc"]},
  {title: "Short i", words: ["pin", "dig", "tip", "gig", "pip", "big", "bin", "dip", "pig"]},
  {title: "Short e", words: ["eggs", "stem", "get", "pet", "set", "mess", "met", "step", "pest"]},
  {title: "Short u", words: ["stuff", "rust", "mug", "fun", "rug", "run", "hug", "huff", "hum"]},
  {title: "Short o and u", words: ["mod", "mud", "jog", "jug", "pop", "pup", "rob", "rub", "cot", "cut"]},
  {title: "j, k and l", words: ["jam", "jet", "jump", "kick", "long", "lamp", "lip", "let's", "lock"]},
  {title: "q, v and w", words: ["quick", "quit", "vest", "van", "win", "when", "wet", "quack", "vet"]},
  {title: "x, y and z", words: ["next", "fox", "yes", "yuck", "fix", "yep", "buzz", "zip", "zap"]},
  {title: "Short vowel review", words: ["bat", "bet", "bit", "bot", "but", "mad", "mud", "mid", "mod"]},
  {title: "Long vowels", words: ["Kate", "kite", "coat", "cute", "raid", "read", "ride", "rode", "rude"]},
  {title: "Hard and soft th", words: ["sink", "think", "fink", "mouse", "mouth", "then", "Zen", "clothes", "close"]},
  {title: "c, s and th", words: ["this", "these", "those", "chop", "shop", "chin", "shin", "wish", "witch"]},
  {title: "m and n", words: ["mutt", "nut", "tin", "Tim", "nice", "mice", "sun", "sum", "man"]},
  {title: "l and r", words: ["fly", "fry", "lace", "race", "lock", "rock", "play", "pray", "glass", "grass"]},
].map((set, i) => ({ ...set, title: `${i + 1}. ${set.title}`}));

const selectedWords = ref(wordSetOptions[0]);
const letters = computed(() =>
  Array.from(
    new Set(
      selectedWords.value.words
        .join("")
        .toLowerCase()
        .replace(/[^a-z]/g, "")
        .split(""),
    ),
  ).sort(),
);

const chooseWords = (set: WordSet) => shuffle(set.words).slice(0, size ** 2);
const wordCells = ref(chooseWords(selectedWords.value));
const table = useTemplateRef<HTMLTableElement, string>("table");
const wordWidth = computed(() =>
  Math.max(
    ...wordCells.value.map((word) => calcTextWidth(word, table.value ?? `64px ${getGlobalFont()}`)),
  ),
);

const showNumbers = ref(true);

const limitMoves = ref(false);
const moves = ref<Move[]>([]);
const board = computed(() => {
  const moveCells = [...wordCells.value];
  for (const { cell, player } of moves.value) {
    if (!isPlayer(moveCells[cell])) {
      moveCells[cell] = player;
    }
  }
  return chunk(moveCells, size);
});

function get2D<T>(arr: T[][], index1D: number) {
  const row = Math.floor(index1D / size);
  const col = index1D % size;
  return arr[row][col];
}

function set2D<T>(arr: T[][], index1D: number, value: T) {
  const row = Math.floor(index1D / size);
  const col = index1D % size;
  arr[row][col] = value;
}

const maruStarts = ref(true);
const firstPlayer = () => players[maruStarts.value ? 0 : 1];
const player = ref(firstPlayer());
const winner = ref<Player | null>(null);

const wins = computed(() => {
  const cells: boolean[][] = chunk(Array(size ** 2).fill(false), size);
  const lines = [
    ...chunk(
      Array(size ** 2)
        .fill(0)
        .map((_, i) => i),
      size,
    ),
    ...chunk(
      Array(size ** 2)
        .fill(0)
        .map((_, i) => (i % size) * size + Math.floor(i / size)),
      size,
    ),
    [0, 4, 8],
    [6, 4, 2],
  ];
  lines.forEach((line) => {
    const word = get2D(board.value, line[0]);
    if (isPlayer(word) && line.every((i) => get2D(board.value, i) === word)) {
      line.forEach((i) => {
        set2D(cells, i, true);
      });
      if (!winner.value) winner.value = word as Player;
    }
  });
  return cells;
});

watch(maruStarts, () => {
  if (!board.value.some((row) => row.some((word) => isPlayer(word)))) {
    player.value = firstPlayer();
  }
});

const handleRefresh = () => {
  player.value = firstPlayer();
  winner.value = null;
  wordCells.value = chooseWords(selectedWords.value);
  moves.value = [];
};

watch(selectedWords, handleRefresh);

const handleMove = (index: number) => {
  if (moves.value.some(({ cell }) => cell === index)) return;

  moves.value.push({ cell: index, player: player.value });
  while (limitMoves.value && moves.value.length > 6) {
    moves.value.shift();
  }
  player.value = players[(players.indexOf(player.value) + 1) % players.length];
};

const { onKey } = useKeys();
onKey("Enter", handleRefresh);
onKey(ANY_KEY, (evt) => {
  const k = parseInt(evt.key);
  if (k >= 1 && k <= size ** 2) {
    handleMove(k - 1);
  }
});

onMounted(() => {
  handleRefresh();
});
</script>

<template>
  <Tool container-class="tic-tac-toe-container" :tool="tools.ticTacToe">
    <template #toolbar>
      <v-btn :icon="mdiRefresh" @click="handleRefresh" />
    </template>

    <template #tool-menu>
      <v-select
        v-model="selectedWords"
        :items="wordSetOptions"
        item-value="title"
        label="Word set"
        return-object
      />
      <v-switch v-model="maruStarts" :label="`${Player.maru} starts`" />
      <v-switch v-model="limitMoves" label="Limit moves" />
      <v-switch v-model="showNumbers" label="Show numbers" />
    </template>

    <div>{{ letters.join(", ") }}</div>
    <div class="tic-tac-toe-table-wrapper">
      <table ref="table">
        <tr v-for="(row, rn) in board" :key="row[0]">
          <td
            v-for="(word, cn) in row"
            :key="word"
            :class="classNames({ 'tic-tac-toe-win': wins[rn][cn] })"
            @click.prevent="handleMove(rn * size + cn)"
          >
            <div v-if="showNumbers" class="tic-tac-toe-number">
              {{ rn * size + cn + 1 }}
            </div>
            <div class="tic-tac-toe-word" :style="{ minWidth: `${wordWidth}px` }">
              {{ word }}
            </div>
          </td>
        </tr>
      </table>
    </div>
    <div class="tic-tac-toe-actions">
      <div v-if="winner">{{ winner }} wins!</div>
      <div v-else>It's {{ player }}'s turn.</div>
    </div>
  </Tool>
</template>

<style lang="scss">
.tic-tac-toe-actions {
  align-items: center;
  display: flex;
  gap: 1rem;
}

.tic-tac-toe-container {
  align-items: center;
  display: flex;
  flex-direction: column;
  font-size: 4rem;
  gap: 1rem;
  justify-content: center;
  padding: 1rem 0;

  & > * {
    flex: 0 0 auto;
  }

  & table {
    border-collapse: collapse;
  }

  & td {
    padding: 2rem;
    position: relative;
    text-align: center;
    vertical-align: middle;
  }

  & tr:not(:last-child) td {
    border-bottom: 4px solid;
  }

  & td:not(:last-child) {
    border-right: 4px solid;
  }
}

.tic-tac-toe-table-wrapper {
  align-items: stretch;
  display: flex;
  flex: 1 1 auto;
  justify-content: center;
  position: relative;
  width: 100%;
}

.tic-tac-toe-number {
  color: #888888;
  font-size: 3rem;
  left: 0;
  padding-left: 1rem;
  position: absolute;
  top: 0;
}

.tic-tac-toe-win {
  background-color: lightgreen;
}

.tic-tac-toe-word {
  text-align: center;
}
</style>
