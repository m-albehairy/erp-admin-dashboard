import React, { createContext, useContext, useState, useEffect } from "react";

export type ThemeMode = "light" | "dark";
export type ThemeName = "emerald" | "ocean" | "violet" | "crimson" | "amber" | "arctic" | "zinc" | "linkguard" | "default";

export interface ThemeColors {
  background: string;
  surface: string;
  border: string;
  accent: string;
  textPrimary: string;
  textSecondary: string;
  sidebar: string;
}

export interface Theme {
  id: ThemeName;
  name: string;
  light: ThemeColors;
  dark: ThemeColors;
}

const THEMES: Record<ThemeName, Theme> = {
  emerald: {
    id: "emerald",
    name: "Emerald Night",
    light: {
      background: "#F0FFF4",
      surface: "#FFFFFF",
      border: "#D1FAE5",
      accent: "#059652",
      textPrimary: "#0F1010",
      textSecondary: "#6B7280",
      sidebar: "#ECFDF5",
    },
    dark: {
      background: "#0F1010",
      surface: "#1A1C1C",
      border: "#2A2D2D",
      accent: "#00E57A",
      textPrimary: "#FFFFFF",
      textSecondary: "#9A9A9A",
      sidebar: "#161818",
    },
  },
  ocean: {
    id: "ocean",
    name: "Ocean Depth",
    light: {
      background: "#EFF6FF",
      surface: "#FFFFFF",
      border: "#BFDBFE",
      accent: "#1D4ED8",
      textPrimary: "#0A0F1E",
      textSecondary: "#64748B",
      sidebar: "#DBEAFE",
    },
    dark: {
      background: "#0A0F1E",
      surface: "#111827",
      border: "#1E3A5F",
      accent: "#3B82F6",
      textPrimary: "#F9FAFB",
      textSecondary: "#94A3B8",
      sidebar: "#0D1526",
    },
  },
  violet: {
    id: "violet",
    name: "Violet Dusk",
    light: {
      background: "#F5F3FF",
      surface: "#FFFFFF",
      border: "#DDD6FE",
      accent: "#6D28D9",
      textPrimary: "#0D0B1E",
      textSecondary: "#7C3AED",
      sidebar: "#EDE9FE",
    },
    dark: {
      background: "#0D0B1E",
      surface: "#13112A",
      border: "#2D2660",
      accent: "#7C3AED",
      textPrimary: "#F9FAFB",
      textSecondary: "#A78BFA",
      sidebar: "#100E24",
    },
  },
  crimson: {
    id: "crimson",
    name: "Crimson Pro",
    light: {
      background: "#FFF5F5",
      surface: "#FFFFFF",
      border: "#FECACA",
      accent: "#DC2626",
      textPrimary: "#0F0A0A",
      textSecondary: "#6B7280",
      sidebar: "#FEE2E2",
    },
    dark: {
      background: "#0F0A0A",
      surface: "#1C1010",
      border: "#3D1515",
      accent: "#EF4444",
      textPrimary: "#FAFAFA",
      textSecondary: "#A1A1AA",
      sidebar: "#160D0D",
    },
  },
  amber: {
    id: "amber",
    name: "Amber Forge",
    light: {
      background: "#FFFBEB",
      surface: "#FFFFFF",
      border: "#FDE68A",
      accent: "#D97706",
      textPrimary: "#0F0D09",
      textSecondary: "#78716C",
      sidebar: "#FEF3C7",
    },
    dark: {
      background: "#0F0D09",
      surface: "#1C1A10",
      border: "#3D3210",
      accent: "#F59E0B",
      textPrimary: "#FAFAFA",
      textSecondary: "#A1A1AA",
      sidebar: "#16140C",
    },
  },
  arctic: {
    id: "arctic",
    name: "Arctic Slate",
    light: {
      background: "#F0F9FF",
      surface: "#FFFFFF",
      border: "#BAE6FD",
      accent: "#0284C7",
      textPrimary: "#090E14",
      textSecondary: "#64748B",
      sidebar: "#E0F2FE",
    },
    dark: {
      background: "#090E14",
      surface: "#0F1923",
      border: "#1E3040",
      accent: "#06B6D4",
      textPrimary: "#F1F5F9",
      textSecondary: "#94A3B8",
      sidebar: "#0B1520",
    },
  },
  zinc: {
    id: "zinc",
    name: "Zinc Executive",
    light: {
      background: "#FAFAFA",
      surface: "#FFFFFF",
      border: "#E4E4E7",
      accent: "#3F3F46",
      textPrimary: "#09090B",
      textSecondary: "#71717A",
      sidebar: "#F4F4F5",
    },
    dark: {
      background: "#09090B",
      surface: "#18181B",
      border: "#27272A",
      accent: "#71717A",
      textPrimary: "#FAFAFA",
      textSecondary: "#A1A1AA",
      sidebar: "#141417",
    },
  },
  linkguard: {
    id: "linkguard",
    name: "LinkGuard Exact",
    light: {
      background: "#F4FAF6",
      surface: "#FFFFFF",
      border: "#C8EDD9",
      accent: "#00944E",
      textPrimary: "#111313",
      textSecondary: "#5C6665",
      sidebar: "#E8F5EE",
    },
    dark: {
      background: "#111313",
      surface: "#1A1C1C",
      border: "#2A2E2E",
      accent: "#00D46E",
      textPrimary: "#FFFFFF",
      textSecondary: "#8A8F8F",
      sidebar: "#161919",
    },
  },
  default: {
    id: "default",
    name: "Default (Original)",
    light: {
      background: "#F8FAFC",
      surface: "#FFFFFF",
      border: "#E9EDF4",
      accent: "#10B981",
      textPrimary: "#202C4B",
      textSecondary: "#6B7280",
      sidebar: "#FFFFFF",
    },
    dark: {
      background: "#0F172A",
      surface: "#1E293B",
      border: "#334155",
      accent: "#3B82F6",
      textPrimary: "#F1F5F9",
      textSecondary: "#CBD5E1",
      sidebar: "#0F172A",
    },
  },
};

interface ThemeSystemContextType {
  theme: ThemeName;
  mode: ThemeMode;
  setTheme: (theme: ThemeName) => void;
  setMode: (mode: ThemeMode) => void;
  toggleMode: () => void;
  currentColors: ThemeColors;
  themes: Theme[];
}

const ThemeSystemContext = createContext<ThemeSystemContextType | undefined>(undefined);

export function ThemeSystemProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<ThemeName>("default");
  const [mode, setModeState] = useState<ThemeMode>("light");

  // Load from localStorage on mount
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme-name") as ThemeName | null;
    const savedMode = localStorage.getItem("theme-mode") as ThemeMode | null;

    if (savedTheme && THEMES[savedTheme]) {
      setThemeState(savedTheme);
    }
    if (savedMode && (savedMode === "light" || savedMode === "dark")) {
      setModeState(savedMode);
    }
  }, []);

  // Apply theme to DOM
  useEffect(() => {
    const colors = THEMES[theme][mode];
    const root = document.documentElement;

    root.style.setProperty("--background", colors.background);
    root.style.setProperty("--surface", colors.surface);
    root.style.setProperty("--border", colors.border);
    root.style.setProperty("--accent", colors.accent);
    root.style.setProperty("--text-primary", colors.textPrimary);
    root.style.setProperty("--text-secondary", colors.textSecondary);
    root.style.setProperty("--sidebar", colors.sidebar);

    // Store in localStorage
    localStorage.setItem("theme-name", theme);
    localStorage.setItem("theme-mode", mode);
  }, [theme, mode]);

  const setTheme = (newTheme: ThemeName) => {
    setThemeState(newTheme);
  };

  const setMode = (newMode: ThemeMode) => {
    setModeState(newMode);
  };

  const toggleMode = () => {
    setModeState((prev) => (prev === "light" ? "dark" : "light"));
  };

  const currentColors = THEMES[theme][mode];
  const themesList = Object.values(THEMES);

  return (
    <ThemeSystemContext.Provider
      value={{
        theme,
        mode,
        setTheme,
        setMode,
        toggleMode,
        currentColors,
        themes: themesList,
      }}
    >
      {children}
    </ThemeSystemContext.Provider>
  );
}

export function useThemeSystem() {
  const context = useContext(ThemeSystemContext);
  if (!context) {
    throw new Error("useThemeSystem must be used within ThemeSystemProvider");
  }
  return context;
}
