import { useState } from "react";

import { ThemeContext } from "@/contexts";
import { getTheme } from "@/utils/helpers";

const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [theme, setTheme] = useState(getTheme);

  return <ThemeContext value={{ theme, setTheme }}>{children}</ThemeContext>;
};

export default ThemeProvider;
