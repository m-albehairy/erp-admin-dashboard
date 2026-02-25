import { createContext, useContext, useState, ReactNode } from "react";

type ThemeColor = "blue" | "purple" | "green" | "orange" | "red" | "pink";

interface ThemeColorContextType {
  themeColor: ThemeColor;
  setThemeColor: (color: ThemeColor) => void;
}

const ThemeColorContext = createContext<ThemeColorContextType | undefined>(undefined);

const colorMap: Record<ThemeColor, { primary: string; sidebar: string; chart: string[] }> = {
  blue: {
    primary: "#0066CC",
    sidebar: "#0052A3",
    chart: ["#3B82F6", "#0066CC", "#0052A3", "#003D7A", "#002E5C"],
  },
  purple: {
    primary: "#7C3AED",
    sidebar: "#6D28D9",
    chart: ["#A78BFA", "#7C3AED", "#6D28D9", "#5B21B6", "#4C1D95"],
  },
  green: {
    primary: "#10B981",
    sidebar: "#059669",
    chart: ["#6EE7B7", "#10B981", "#059669", "#047857", "#065F46"],
  },
  orange: {
    primary: "#F97316",
    sidebar: "#EA580C",
    chart: ["#FDBA74", "#F97316", "#EA580C", "#C2410C", "#92220C"],
  },
  red: {
    primary: "#EF4444",
    sidebar: "#DC2626",
    chart: ["#FCA5A5", "#EF4444", "#DC2626", "#B91C1C", "#7F1D1D"],
  },
  pink: {
    primary: "#EC4899",
    sidebar: "#DB2777",
    chart: ["#F472B6", "#EC4899", "#DB2777", "#BE185D", "#831843"],
  },
};

export function ThemeColorProvider({ children }: { children: ReactNode }) {
  const [themeColor, setThemeColor] = useState<ThemeColor>("blue");

  const applyThemeColor = (color: ThemeColor) => {
    const colors = colorMap[color];
    document.documentElement.style.setProperty("--primary", colors.primary);
    document.documentElement.style.setProperty("--sidebar-primary", colors.sidebar);
    document.documentElement.style.setProperty("--chart-1", colors.chart[0]);
    document.documentElement.style.setProperty("--chart-2", colors.chart[1]);
    document.documentElement.style.setProperty("--chart-3", colors.chart[2]);
    document.documentElement.style.setProperty("--chart-4", colors.chart[3]);
    document.documentElement.style.setProperty("--chart-5", colors.chart[4]);
    setThemeColor(color);
  };

  return (
    <ThemeColorContext.Provider value={{ themeColor, setThemeColor: applyThemeColor }}>
      {children}
    </ThemeColorContext.Provider>
  );
}

export function useThemeColor() {
  const context = useContext(ThemeColorContext);
  if (!context) {
    throw new Error("useThemeColor must be used within ThemeColorProvider");
  }
  return context;
}
