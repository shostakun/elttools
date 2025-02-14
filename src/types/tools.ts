import RandomColorThumb from "@/assets/thumbnails/random-color.png";

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
    controls: [{ action: ["Click", "Enter"], result: "Choose a random color" }],
    description:
      "Generate a random color. Useful to practice color vocab, for example, by having students guess which color will appear next.",
    id: "random-color",
    title: "Random Color",
    thumbnail: RandomColorThumb,
    url: `${import.meta.env.VITE_BASE_URL}/color`,
  },
];
