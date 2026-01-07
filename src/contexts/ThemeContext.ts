import { createContext } from "react";

import type { Theme } from "@/utils/types";

export interface ThemeContextValue {
  theme: Theme;
  setTheme: React.Dispatch<React.SetStateAction<Theme>>;
}

export const ThemeContext = createContext<ThemeContextValue | undefined>(
  undefined,
);
