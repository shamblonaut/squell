import { useState } from "react";

import { ThemeContext } from "@/contexts";
import { getTheme } from "@/utils/helpers";

const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(getTheme);

  return <ThemeContext value={{ theme, setTheme }}>{children}</ThemeContext>;
};

export default ThemeProvider;
