export const DEFAULT_FONT = "Alata";

export const fontOptions = [
  { title: "Atkinson", value: '"Atkinson Hyperlegible Mono"' },
  { title: "Alata" },
  { title: "OpenDyslexic" },
].map((obj) => ({ value: `"${obj.title}"`, ...obj }));

export const getGlobalFont = () => {
  const rootStyles = getComputedStyle(document.documentElement);
  const font = rootStyles.getPropertyValue("--elt-font-family").trim();
  return fontOptions.find(({ value }) => value === font) ? font : DEFAULT_FONT;
};

export const setGlobalFont = (font: string) =>
  document.documentElement.style.setProperty("--elt-font-family", font);
