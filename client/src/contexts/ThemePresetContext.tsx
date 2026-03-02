import React, { createContext, useContext, useState, useEffect } from "react";

export interface ThemePreset {
  id: string;
  name: string;
  label: string;
  light: {
    // Primary colors
    primary: string;
    primaryForeground: string;
    primaryLight: string;
    primaryDark: string;
    
    // Secondary colors
    secondary: string;
    secondaryForeground: string;
    secondaryLight: string;
    
    // Backgrounds
    background: string;
    foreground: string;
    card: string;
    cardForeground: string;
    muted: string;
    mutedForeground: string;
    
    // Accents
    accent: string;
    accentForeground: string;
    
    // Borders
    border: string;
    input: string;
    
    // Status colors
    success: string;
    warning: string;
    error: string;
    info: string;
    
    // Chart colors
    chart1: string;
    chart2: string;
    chart3: string;
    chart4: string;
    chart5: string;
  };
  dark: {
    // Primary colors
    primary: string;
    primaryForeground: string;
    primaryLight: string;
    primaryDark: string;
    
    // Secondary colors
    secondary: string;
    secondaryForeground: string;
    secondaryLight: string;
    
    // Backgrounds
    background: string;
    foreground: string;
    card: string;
    cardForeground: string;
    muted: string;
    mutedForeground: string;
    
    // Accents
    accent: string;
    accentForeground: string;
    
    // Borders
    border: string;
    input: string;
    
    // Status colors
    success: string;
    warning: string;
    error: string;
    info: string;
    
    // Chart colors
    chart1: string;
    chart2: string;
    chart3: string;
    chart4: string;
    chart5: string;
  };
}

const THEME_PRESETS: ThemePreset[] = [
  {
    id: "ocean",
    name: "Ocean",
    label: "Ocean Blue",
    light: {
      primary: "#0066CC",
      primaryForeground: "#FFFFFF",
      primaryLight: "#E6F2FF",
      primaryDark: "#004499",
      secondary: "#00B4D8",
      secondaryForeground: "#FFFFFF",
      secondaryLight: "#E0F7FF",
      background: "#FFFFFF",
      foreground: "#1A1A1A",
      card: "#F8FBFF",
      cardForeground: "#1A1A1A",
      muted: "#F0F4F8",
      mutedForeground: "#666666",
      accent: "#0099FF",
      accentForeground: "#FFFFFF",
      border: "#E0E8F0",
      input: "#FFFFFF",
      success: "#10B981",
      warning: "#F59E0B",
      error: "#EF4444",
      info: "#3B82F6",
      chart1: "#0066CC",
      chart2: "#00B4D8",
      chart3: "#0099FF",
      chart4: "#004499",
      chart5: "#003366",
    },
    dark: {
      primary: "#4DA6FF",
      primaryForeground: "#000000",
      primaryLight: "#1A3A66",
      primaryDark: "#0052A3",
      secondary: "#00D4FF",
      secondaryForeground: "#000000",
      secondaryLight: "#1A4D5C",
      background: "#0F1419",
      foreground: "#E8EAED",
      card: "#1A2332",
      cardForeground: "#E8EAED",
      muted: "#2A3340",
      mutedForeground: "#9CA3AF",
      accent: "#4DA6FF",
      accentForeground: "#000000",
      border: "#2A3F5F",
      input: "#1A2332",
      success: "#34D399",
      warning: "#FBBF24",
      error: "#F87171",
      info: "#60A5FA",
      chart1: "#4DA6FF",
      chart2: "#00D4FF",
      chart3: "#0099FF",
      chart4: "#6BB6FF",
      chart5: "#99CCFF",
    },
  },
  {
    id: "forest",
    name: "Forest",
    label: "Forest Green",
    light: {
      primary: "#059669",
      primaryForeground: "#FFFFFF",
      primaryLight: "#ECFDF5",
      primaryDark: "#047857",
      secondary: "#10B981",
      secondaryForeground: "#FFFFFF",
      secondaryLight: "#D1FAE5",
      background: "#FFFFFF",
      foreground: "#1A1A1A",
      card: "#F0FDF4",
      cardForeground: "#1A1A1A",
      muted: "#F3F4F6",
      mutedForeground: "#666666",
      accent: "#34D399",
      accentForeground: "#000000",
      border: "#D1E7DD",
      input: "#FFFFFF",
      success: "#059669",
      warning: "#F59E0B",
      error: "#EF4444",
      info: "#0EA5E9",
      chart1: "#059669",
      chart2: "#10B981",
      chart3: "#34D399",
      chart4: "#6EE7B7",
      chart5: "#A7F3D0",
    },
    dark: {
      primary: "#4ADE80",
      primaryForeground: "#000000",
      primaryLight: "#1B4D2E",
      primaryDark: "#15803D",
      secondary: "#86EFAC",
      secondaryForeground: "#000000",
      secondaryLight: "#1F4D2A",
      background: "#0F1419",
      foreground: "#E8EAED",
      card: "#1A2E1F",
      cardForeground: "#E8EAED",
      muted: "#2A3F2F",
      mutedForeground: "#9CA3AF",
      accent: "#4ADE80",
      accentForeground: "#000000",
      border: "#2D5A3D",
      input: "#1A2E1F",
      success: "#4ADE80",
      warning: "#FBBF24",
      error: "#F87171",
      info: "#38BDF8",
      chart1: "#4ADE80",
      chart2: "#86EFAC",
      chart3: "#6EE7B7",
      chart4: "#A7F3D0",
      chart5: "#BBFBAC",
    },
  },
  {
    id: "sunset",
    name: "Sunset",
    label: "Sunset Orange",
    light: {
      primary: "#EA580C",
      primaryForeground: "#FFFFFF",
      primaryLight: "#FEF3C7",
      primaryDark: "#D97706",
      secondary: "#F59E0B",
      secondaryForeground: "#FFFFFF",
      secondaryLight: "#FEF3C7",
      background: "#FFFFFF",
      foreground: "#1A1A1A",
      card: "#FFFBF0",
      cardForeground: "#1A1A1A",
      muted: "#F9F5F0",
      mutedForeground: "#666666",
      accent: "#FB923C",
      accentForeground: "#FFFFFF",
      border: "#FED7AA",
      input: "#FFFFFF",
      success: "#10B981",
      warning: "#EA580C",
      error: "#EF4444",
      info: "#0EA5E9",
      chart1: "#EA580C",
      chart2: "#F59E0B",
      chart3: "#FB923C",
      chart4: "#FBBF24",
      chart5: "#FCD34D",
    },
    dark: {
      primary: "#FB923C",
      primaryForeground: "#000000",
      primaryLight: "#4D2F1A",
      primaryDark: "#B45309",
      secondary: "#FBBF24",
      secondaryForeground: "#000000",
      secondaryLight: "#4D3A1A",
      background: "#0F1419",
      foreground: "#E8EAED",
      card: "#2A1F14",
      cardForeground: "#E8EAED",
      muted: "#3A2F24",
      mutedForeground: "#9CA3AF",
      accent: "#FB923C",
      accentForeground: "#000000",
      border: "#5A4A3A",
      input: "#2A1F14",
      success: "#34D399",
      warning: "#FB923C",
      error: "#F87171",
      info: "#38BDF8",
      chart1: "#FB923C",
      chart2: "#FBBF24",
      chart3: "#FCD34D",
      chart4: "#FDE047",
      chart5: "#FEFCE8",
    },
  },
  {
    id: "amethyst",
    name: "Amethyst",
    label: "Purple Amethyst",
    light: {
      primary: "#7C3AED",
      primaryForeground: "#FFFFFF",
      primaryLight: "#F5F3FF",
      primaryDark: "#6D28D9",
      secondary: "#A78BFA",
      secondaryForeground: "#FFFFFF",
      secondaryLight: "#EDE9FE",
      background: "#FFFFFF",
      foreground: "#1A1A1A",
      card: "#FAF5FF",
      cardForeground: "#1A1A1A",
      muted: "#F4F3F6",
      mutedForeground: "#666666",
      accent: "#C4B5FD",
      accentForeground: "#000000",
      border: "#E9D5FF",
      input: "#FFFFFF",
      success: "#10B981",
      warning: "#F59E0B",
      error: "#EF4444",
      info: "#0EA5E9",
      chart1: "#7C3AED",
      chart2: "#A78BFA",
      chart3: "#C4B5FD",
      chart4: "#D8B4FE",
      chart5: "#E9D5FF",
    },
    dark: {
      primary: "#C4B5FD",
      primaryForeground: "#000000",
      primaryLight: "#3F2A5F",
      primaryDark: "#5B21B6",
      secondary: "#D8B4FE",
      secondaryForeground: "#000000",
      secondaryLight: "#4A3A5F",
      background: "#0F1419",
      foreground: "#E8EAED",
      card: "#1F1A2E",
      cardForeground: "#E8EAED",
      muted: "#2F2A3F",
      mutedForeground: "#9CA3AF",
      accent: "#C4B5FD",
      accentForeground: "#000000",
      border: "#4A3F5F",
      input: "#1F1A2E",
      success: "#34D399",
      warning: "#FBBF24",
      error: "#F87171",
      info: "#38BDF8",
      chart1: "#C4B5FD",
      chart2: "#D8B4FE",
      chart3: "#E9D5FF",
      chart4: "#F3E8FF",
      chart5: "#FAF5FF",
    },
  },
  {
    id: "slate",
    name: "Slate",
    label: "Professional Slate",
    light: {
      primary: "#475569",
      primaryForeground: "#FFFFFF",
      primaryLight: "#F1F5F9",
      primaryDark: "#334155",
      secondary: "#64748B",
      secondaryForeground: "#FFFFFF",
      secondaryLight: "#E2E8F0",
      background: "#FFFFFF",
      foreground: "#1E293B",
      card: "#F8FAFC",
      cardForeground: "#1E293B",
      muted: "#F1F5F9",
      mutedForeground: "#64748B",
      accent: "#94A3B8",
      accentForeground: "#FFFFFF",
      border: "#CBD5E1",
      input: "#FFFFFF",
      success: "#10B981",
      warning: "#F59E0B",
      error: "#EF4444",
      info: "#0EA5E9",
      chart1: "#475569",
      chart2: "#64748B",
      chart3: "#94A3B8",
      chart4: "#CBD5E1",
      chart5: "#E2E8F0",
    },
    dark: {
      primary: "#CBD5E1",
      primaryForeground: "#000000",
      primaryLight: "#334155",
      primaryDark: "#1E293B",
      secondary: "#E2E8F0",
      secondaryForeground: "#000000",
      secondaryLight: "#475569",
      background: "#0F172A",
      foreground: "#F1F5F9",
      card: "#1E293B",
      cardForeground: "#F1F5F9",
      muted: "#334155",
      mutedForeground: "#94A3B8",
      accent: "#CBD5E1",
      accentForeground: "#000000",
      border: "#475569",
      input: "#1E293B",
      success: "#34D399",
      warning: "#FBBF24",
      error: "#F87171",
      info: "#38BDF8",
      chart1: "#CBD5E1",
      chart2: "#E2E8F0",
      chart3: "#94A3B8",
      chart4: "#64748B",
      chart5: "#475569",
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

    // Primary colors
    root.style.setProperty("--primary", colors.primary);
    root.style.setProperty("--primary-foreground", colors.primaryForeground);
    
    // Secondary colors
    root.style.setProperty("--secondary", colors.secondary);
    root.style.setProperty("--secondary-foreground", colors.secondaryForeground);
    
    // Backgrounds
    root.style.setProperty("--background", colors.background);
    root.style.setProperty("--foreground", colors.foreground);
    root.style.setProperty("--card", colors.card);
    root.style.setProperty("--card-foreground", colors.cardForeground);
    root.style.setProperty("--muted", colors.muted);
    root.style.setProperty("--muted-foreground", colors.mutedForeground);
    
    // Accents
    root.style.setProperty("--accent", colors.accent);
    root.style.setProperty("--accent-foreground", colors.accentForeground);
    
    // Borders
    root.style.setProperty("--border", colors.border);
    root.style.setProperty("--input", colors.input);
    
    // Status colors
    root.style.setProperty("--success", colors.success);
    root.style.setProperty("--warning", colors.warning);
    root.style.setProperty("--error", colors.error);
    root.style.setProperty("--info", colors.info);
    
    // Chart colors
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
