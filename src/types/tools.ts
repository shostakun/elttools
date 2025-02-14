import RandomColorThumb from "@/assets/thumbnails/random-color.png";
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
    url: `${import.meta.env.VITE_BASE_URL}/color`,
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
