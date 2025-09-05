export const getTheme = () => {
  const storedTheme = localStorage.getItem("squell-theme");
  const systemTheme =
    window.matchMedia &&
    window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  return storedTheme ? storedTheme : systemTheme;
};
