export const getSystemTheme = () => {
  return window.matchMedia &&
    window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
};

export const getTheme = () => {
  const storedTheme = localStorage.getItem("squell-theme");
  return storedTheme || "system";
};

export const getComputedTheme = () => {
  const theme = getTheme();
  return theme === "system" ? getSystemTheme() : theme;
};
