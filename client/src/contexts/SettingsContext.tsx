import { createContext, useContext, useState, ReactNode } from "react";

interface SettingsContextType {
  theme: "light" | "dark";
  language: string;
  financialYear: string;
  toggleTheme: () => void;
  setLanguage: (lang: string) => void;
  setFinancialYear: (year: string) => void;
}

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

export function SettingsProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [language, setLanguage] = useState("en");
  const [financialYear, setFinancialYear] = useState("2025-2026");

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <SettingsContext.Provider
      value={{
        theme,
        language,
        financialYear,
        toggleTheme,
        setLanguage,
        setFinancialYear,
      }}
    >
      <div className={theme === "dark" ? "dark" : ""}>{children}</div>
    </SettingsContext.Provider>
  );
}

export function useSettings() {
  const context = useContext(SettingsContext);
  if (!context) {
    throw new Error("useSettings must be used within SettingsProvider");
  }
  return context;
}
