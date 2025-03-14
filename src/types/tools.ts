import PatternThumb from "@/assets/thumbnails/patterns.png";
import RandomColorThumb from "@/assets/thumbnails/random-color.png";
import RandomNumberThumb from "@/assets/thumbnails/random-number.png";
import SameThumb from "@/assets/thumbnails/same.png";
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
  url: string;
}

export const tools: Tool[] = [
  {
    controls: [{ action: ["Enter"], result: "New board" }],
    description: `Find the same picture on the left and right side of the board. Or, reverse it and find the different picture! Great as a filler.

I recommend starting with 3x3 boards when explaining, then moving on to 4x4 boards.

You can select the card sets you want to include. Just make sure to choose enough cards for the board size you want!`,
    id: "same",
    title: "Find the Same",
    thumbnail: SameThumb,
    url: "/same",
  },
  {
    controls: [{ action: ["Enter"], result: "New pattern" }],
    description:
      "Easy hidden patterns. Students must remember the pattern and figure out what comes next. Great for practicing vocabulary.",
    id: "patterns",
    title: "Patterns",
    thumbnail: PatternThumb,
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
    url: "/rand",
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
