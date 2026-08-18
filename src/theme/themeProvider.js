import React, {
  createContext,
  useContext,
  useMemo,
} from "react";

import { theme as defaultTheme } from "./theme";
import { mergeTheme } from "./themeMerger";
import { validateRemoteTheme } from "./themeValidator";

const ThemeContext = createContext(null);

export const ThemeProvider = ({
  children,
  remoteTheme = null,
}) => {
  const activeTheme = useMemo(() => {
    if (!remoteTheme) {
      return defaultTheme;
    }

    const safeRemoteTheme = validateRemoteTheme(
      remoteTheme,
      defaultTheme
    );

    return mergeTheme(
      defaultTheme,
      safeRemoteTheme
    );
  }, [remoteTheme]);

  return (
    <ThemeContext.Provider value={activeTheme}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error(
      "useTheme must be used inside ThemeProvider."
    );
  }

  return context;
};