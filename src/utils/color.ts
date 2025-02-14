import { shuffle } from "lodash";

export interface ColorChoice {
  key: string;
  label: string;
  value: string;
}

export const colors = (
  [
    {
      key: "w",
      label: "White",
      value: "#ffffff",
    },
    {
      key: "k",
      label: "Black",
      value: "#000000",
    },
    {
      key: "r",
      label: "Red",
      value: "#ef1d20",
    },
    {
      key: "g",
      label: "Green",
      value: "#1def40",
    },
    {
      key: "b",
      label: "Blue",
      value: "#321def",
    },
    {
      key: "o",
      label: "Orange",
      value: "#ef771d",
    },
    {
      key: "y",
      label: "Yellow",
      value: "#deef1d",
    },
    {
      key: "p",
      label: "Pink",
      value: "#ef87c2",
    },
    {
      key: "l",
      label: "Light Blue",
      value: "#1defed",
    },
    {
      key: "v",
      label: "Purple",
      value: "#af1def",
    },
  ] as const
).reduce(
  (acc, color) => {
    acc[color.key] = color;
    return acc;
  },
  {} as Record<string, ColorChoice>,
) as Record<string, ColorChoice>;

export const getColorList = (length: number, keys?: string[]) => {
  const vals = shuffle(
    Object.values(colors).filter((c) => !keys?.length || keys.includes(c.key)),
  );
  const reps = Math.ceil(length / vals.length);
  return Array(reps).fill(vals).flat();
};
