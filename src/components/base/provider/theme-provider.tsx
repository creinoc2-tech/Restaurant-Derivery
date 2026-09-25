import { useEffect, useState } from "react";
import {
  ThemeProviderContext,
  type Theme,
  type ThemeProviderProps,
  type ThemeProviderState,
} from "./theme-provider-context";

const isTheme = (value: string | null): value is Theme =>
  value === "dark" || value === "light" || value === "system";

export function ThemeProvider({
  children,
  defaultTheme = "system",
  storageKey = "vite-ui-theme",
  ...props
}: ThemeProviderProps) {
  const [theme, setTheme] = useState<Theme>(() => {
    if (typeof window === "undefined") return defaultTheme;

    try {
      const stored = window.localStorage.getItem(storageKey);
      return isTheme(stored) ? stored : defaultTheme;
    } catch {
      return defaultTheme;
    }
  });

  useEffect(() => {
    const root =
      typeof document !== "undefined" ? document.documentElement : null;
    if (!root) return;

    root.classList.remove("light", "dark");

    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const applyTheme = () => {
      const resolvedTheme =
        theme === "system" ? (mediaQuery.matches ? "dark" : "light") : theme;

      root.classList.remove("light", "dark");
      root.classList.add(resolvedTheme);
    };

    applyTheme();
    if (theme === "system") {
      mediaQuery.addEventListener("change", applyTheme);
      return () => mediaQuery.removeEventListener("change", applyTheme);
    }
  }, [theme]);

  const value: ThemeProviderState = {
    theme,
    setTheme: (theme: Theme) => {
      try {
        window.localStorage.setItem(storageKey, theme);
      } catch (error) {
        console.error("Failed to save theme to localStorage", error);
      }

      setTheme(theme);
    },
  };

  return (
    <ThemeProviderContext.Provider {...props} value={value}>
      {children}
    </ThemeProviderContext.Provider>
  );
}
