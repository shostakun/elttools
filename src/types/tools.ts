import DiceThumb from "@/assets/thumbnails/dice.png";
import DiceThumbDark from "@/assets/thumbnails/dice-dark.png";
import PatternThumb from "@/assets/thumbnails/patterns.png";
import PatternThumbDark from "@/assets/thumbnails/patterns-dark.png";
import RandomColorThumb from "@/assets/thumbnails/random-color.png";
import RandomNumberThumb from "@/assets/thumbnails/random-number.png";
import RandomNumberThumbDark from "@/assets/thumbnails/random-number-dark.png";
import SameThumb from "@/assets/thumbnails/same.png";
import SameThumbDark from "@/assets/thumbnails/same-dark.png";
import TicTacToeThumb from "@/assets/thumbnails/tictactoe.png";
import TicTacToeThumbDark from "@/assets/thumbnails/tictactoe-dark.png";
import TypingThumb from "@/assets/thumbnails/typing.png";
import TypingThumbDark from "@/assets/thumbnails/typing-dark.png";
import { colors } from "@/utils/color";

export interface ToolControl {
  action: string[];
  result: string;
}

export interface Tool {
  controls: ToolControl[];
  description: string;
  id: string;
  title: string;
  thumbnail: string;
  thumbnailDark?: string;
  url: string;
}

export const tools: Tool[] = [
  {
    controls: [
      { action: ["Enter"], result: "Roll" },
      {
        action: ["1-9"],
        result:
          "Reveal the number in corresponding square (reading left to right, top to bottom)",
      },
    ],
    description: `A replacement for rolling dice. Students choose one of the cards. Click the card to reveal a number. Good way to get a little extra vocab practice in while playing a game.`,
    id: "dice",
    title: "Dice",
    thumbnail: DiceThumb,
    thumbnailDark: DiceThumbDark,
    url: "/dice",
  },
  {
    controls: [
      { action: ["Enter"], result: "New board" },
      { action: ["r"], result: "Toggle auto refresh" },
    ],
    description: `Find the same picture on the left and right side of the board. Or, reverse it and find the different picture! Great as a filler.

I recommend starting with 3x3 boards when explaining, then moving on to 4x4 boards.

You can select the card sets you want to include. Just make sure to choose enough cards for the board size you want!`,
    id: "same",
    title: "Find the Same",
    thumbnail: SameThumb,
    thumbnailDark: SameThumbDark,
    url: "/same",
  },
  {
    controls: [
      { action: ["Enter"], result: "New game" },
      { action: ["1-9"], result: "Play in the corresponding square" },
    ],
    description: `Play Tic-Tac-Toe to practice reading. Students must read out the words to make a move.

The early sets each introduce a few new letter sounds, while later sets contrast some of the more difficult sounds.

The is also **limit move** mode for older students who might be bored by Tic-Tac-Toe; in this mode you can only make three moves; when you make the fourth, the first move disappears.`,
    id: "ticTacToe",
    title: "Phonics Tic-Tac-Toe",
    thumbnail: TicTacToeThumb,
    thumbnailDark: TicTacToeThumbDark,
    url: "/tictactoe",
  },
  {
    controls: [{ action: ["Enter"], result: "New pattern" }],
    description:
      "Easy hidden patterns. Students must remember the pattern and figure out what comes next. Great for practicing vocabulary.",
    id: "patterns",
    title: "Patterns",
    thumbnail: PatternThumb,
    thumbnailDark: PatternThumbDark,
    url: "/patterns",
  },
  {
    controls: [
      { action: ["Click", "Enter"], result: "Random color" },
      ...Object.keys(colors)
        .sort()
        .map((key) => ({
          action: [colors[key].key.toUpperCase()],
          result: colors[key].label,
        })),
    ],
    description:
      "Generate a random color. Useful to practice color vocab, for example, by having students guess which color will appear next.",
    id: "randomColor",
    title: "Random Color",
    thumbnail: RandomColorThumb,
    url: "/colors",
  },
  {
    controls: [{ action: ["Click", "Enter"], result: "Random number" }],
    description: "Generate a random number.",
    id: "randomNumber",
    title: "Random Number",
    thumbnail: RandomNumberThumb,
    thumbnailDark: RandomNumberThumbDark,
    url: "/rand",
  },
  {
    controls: [],
    description:
      "Practice typing with English and (romanized) Japanese words. Designed for use with both Mac and Windows Japanese keyboards.",
    id: "typing",
    title: "Typing",
    thumbnail: TypingThumb,
    thumbnailDark: TypingThumbDark,
    url: "/typing",
  },
] as const;

const toolMap = tools.reduce(
  (acc, tool) => {
    acc[tool.id] = tool;
    return acc;
  },
  {} as Record<string, Tool>,
);

export default toolMap;
