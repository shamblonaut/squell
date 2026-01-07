import type { Theme } from "./types";

export function getSystemTheme(): "light" | "dark" {
  return window.matchMedia &&
    window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

export function getTheme(): Theme {
  const storedTheme = localStorage.getItem("squell-theme");
  if (storedTheme !== "light" && storedTheme !== "dark") {
    return "system";
  }

  return storedTheme;
}

export function getComputedTheme(): "light" | "dark" {
  const theme = getTheme();
  return theme === "system" ? getSystemTheme() : theme;
}
