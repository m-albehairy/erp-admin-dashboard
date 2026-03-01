import React, { createContext, useContext, useState, useEffect } from "react";

export interface ThemePreset {
  id: string;
  name: string;
  label: string;
  light: {
    primary: string;
    primaryForeground: string;
    secondary: string;
    accent: string;
    border: string;
    background: string;
    foreground: string;
    card: string;
    cardForeground: string;
    chart1: string;
    chart2: string;
    chart3: string;
    chart4: string;
    chart5: string;
  };
  dark: {
    primary: string;
    primaryForeground: string;
    secondary: string;
    accent: string;
    border: string;
    background: string;
    foreground: string;
    card: string;
    cardForeground: string;
    chart1: string;
    chart2: string;
    chart3: string;
    chart4: string;
    chart5: string;
  };
}

const THEME_PRESETS: ThemePreset[] = [
  {
    id: "coral",
    name: "Coral",
    label: "Coral Orange",
    light: {
      primary: "#E07856",
      primaryForeground: "#FFFFFF",
      secondary: "#FFF5F0",
      accent: "#D4674A",
      border: "#E9EDF4",
      background: "oklch(0.98 0.001 286.375)",
      foreground: "oklch(0.235 0.015 65)",
      card: "oklch(1 0 0)",
      cardForeground: "oklch(0.235 0.015 65)",
      chart1: "#FCA5A5",
      chart2: "#E07856",
      chart3: "#D4674A",
      chart4: "#C85A3E",
      chart5: "#BC4D32",
    },
    dark: {
      primary: "#E07856",
      primaryForeground: "#FFFFFF",
      secondary: "#2A1F1A",
      accent: "#F5A48A",
      border: "#3D2A24",
      background: "#0F172A",
      foreground: "#F1F5F9",
      card: "#1E293B",
      cardForeground: "#F1F5F9",
      chart1: "#F5A48A",
      chart2: "#E07856",
      chart3: "#D4674A",
      chart4: "#C85A3E",
      chart5: "#BC4D32",
    },
  },
  {
    id: "blue",
    name: "Blue",
    label: "Sky Blue",
    light: {
      primary: "#5B7FFF",
      primaryForeground: "#FFFFFF",
      secondary: "#EEF4FF",
      accent: "#4A6FE0",
      border: "#E9EDF4",
      background: "oklch(0.98 0.001 286.375)",
      foreground: "oklch(0.235 0.015 65)",
      card: "oklch(1 0 0)",
      cardForeground: "oklch(0.235 0.015 65)",
      chart1: "#93C5FD",
      chart2: "#5B7FFF",
      chart3: "#4A6FE0",
      chart4: "#3B5FD1",
      chart5: "#2C4FB2",
    },
    dark: {
      primary: "#5B7FFF",
      primaryForeground: "#FFFFFF",
      secondary: "#1A2A4A",
      accent: "#93C5FD",
      border: "#334155",
      background: "#0F172A",
      foreground: "#F1F5F9",
      card: "#1E293B",
      cardForeground: "#F1F5F9",
      chart1: "#93C5FD",
      chart2: "#5B7FFF",
      chart3: "#4A6FE0",
      chart4: "#3B5FD1",
      chart5: "#2C4FB2",
    },
  },
  {
    id: "purple",
    name: "Purple",
    label: "Violet Purple",
    light: {
      primary: "#8B5CF6",
      primaryForeground: "#FFFFFF",
      secondary: "#F5F3FF",
      accent: "#7C3AED",
      border: "#E9EDF4",
      background: "oklch(0.98 0.001 286.375)",
      foreground: "oklch(0.235 0.015 65)",
      card: "oklch(1 0 0)",
      cardForeground: "oklch(0.235 0.015 65)",
      chart1: "#D8B4FE",
      chart2: "#8B5CF6",
      chart3: "#7C3AED",
      chart4: "#6D28D9",
      chart5: "#5B21B6",
    },
    dark: {
      primary: "#8B5CF6",
      primaryForeground: "#FFFFFF",
      secondary: "#2A1A4A",
      accent: "#D8B4FE",
      border: "#334155",
      background: "#0F172A",
      foreground: "#F1F5F9",
      card: "#1E293B",
      cardForeground: "#F1F5F9",
      chart1: "#D8B4FE",
      chart2: "#8B5CF6",
      chart3: "#7C3AED",
      chart4: "#6D28D9",
      chart5: "#5B21B6",
    },
  },
  {
    id: "emerald",
    name: "Emerald",
    label: "Black & Green",
    light: {
      primary: "#10B981",
      primaryForeground: "#FFFFFF",
      secondary: "#D1FAE5",
      accent: "#059669",
      border: "#E9EDF4",
      background: "oklch(0.98 0.001 286.375)",
      foreground: "oklch(0.235 0.015 65)",
      card: "oklch(1 0 0)",
      cardForeground: "oklch(0.235 0.015 65)",
      chart1: "#A7F3D0",
      chart2: "#10B981",
      chart3: "#059669",
      chart4: "#047857",
      chart5: "#065F46",
    },
    dark: {
      primary: "#10B981",
      primaryForeground: "#FFFFFF",
      secondary: "#064E3B",
      accent: "#6EE7B7",
      border: "#334155",
      background: "#0F172A",
      foreground: "#F1F5F9",
      card: "#1E293B",
      cardForeground: "#F1F5F9",
      chart1: "#6EE7B7",
      chart2: "#10B981",
      chart3: "#059669",
      chart4: "#047857",
      chart5: "#065F46",
    },
  },
  {
    id: "slate",
    name: "Slate",
    label: "Slate Gray",
    light: {
      primary: "#64748B",
      primaryForeground: "#FFFFFF",
      secondary: "#F1F5F9",
      accent: "#475569",
      border: "#E9EDF4",
      background: "oklch(0.98 0.001 286.375)",
      foreground: "oklch(0.235 0.015 65)",
      card: "oklch(1 0 0)",
      cardForeground: "oklch(0.235 0.015 65)",
      chart1: "#CBD5E1",
      chart2: "#64748B",
      chart3: "#475569",
      chart4: "#334155",
      chart5: "#1E293B",
    },
    dark: {
      primary: "#64748B",
      primaryForeground: "#FFFFFF",
      secondary: "#1E293B",
      accent: "#CBD5E1",
      border: "#334155",
      background: "#0F172A",
      foreground: "#F1F5F9",
      card: "#1E293B",
      cardForeground: "#F1F5F9",
      chart1: "#CBD5E1",
      chart2: "#64748B",
      chart3: "#475569",
      chart4: "#334155",
      chart5: "#1E293B",
    },
  },
];

interface ThemePresetContextType {
  currentPreset: ThemePreset;
  setPreset: (presetId: string) => void;
  presets: ThemePreset[];
}

const ThemePresetContext = createContext<ThemePresetContextType | undefined>(undefined);

export function ThemePresetProvider({ children }: { children: React.ReactNode }) {
  const [currentPreset, setCurrentPreset] = useState<ThemePreset>(THEME_PRESETS[0]);

  useEffect(() => {
    const savedPreset = localStorage.getItem("theme-preset");
    if (savedPreset) {
      const preset = THEME_PRESETS.find((p) => p.id === savedPreset);
      if (preset) {
        setCurrentPreset(preset);
        applyThemePreset(preset);
      }
    }
  }, []);

  const applyThemePreset = (preset: ThemePreset) => {
    const root = document.documentElement;
    const isDark = document.documentElement.classList.contains("dark");
    const colors = isDark ? preset.dark : preset.light;

    root.style.setProperty("--primary", colors.primary);
    root.style.setProperty("--primary-foreground", colors.primaryForeground);
    root.style.setProperty("--secondary", colors.secondary);
    root.style.setProperty("--accent", colors.accent);
    root.style.setProperty("--border", colors.border);
    root.style.setProperty("--background", colors.background);
    root.style.setProperty("--foreground", colors.foreground);
    root.style.setProperty("--card", colors.card);
    root.style.setProperty("--card-foreground", colors.cardForeground);
    root.style.setProperty("--chart-1", colors.chart1);
    root.style.setProperty("--chart-2", colors.chart2);
    root.style.setProperty("--chart-3", colors.chart3);
    root.style.setProperty("--chart-4", colors.chart4);
    root.style.setProperty("--chart-5", colors.chart5);
  };

  const setPreset = (presetId: string) => {
    const preset = THEME_PRESETS.find((p) => p.id === presetId);
    if (preset) {
      setCurrentPreset(preset);
      applyThemePreset(preset);
      localStorage.setItem("theme-preset", presetId);
    }
  };

  return (
    <ThemePresetContext.Provider value={{ currentPreset, setPreset, presets: THEME_PRESETS }}>
      {children}
    </ThemePresetContext.Provider>
  );
}

export function useThemePreset() {
  const context = useContext(ThemePresetContext);
  if (!context) {
    throw new Error("useThemePreset must be used within ThemePresetProvider");
  }
  return context;
}
