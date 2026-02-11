import { createContext, useContext, useState, useCallback, useEffect, type ReactNode } from 'react';

export type ThemeType = 
  | 'cyan' 
  | 'purple' 
  | 'green' 
  | 'red' 
  | 'blue' 
  | 'amber' 
  | 'magenta' 
  | 'emerald' 
  | 'orange' 
  | 'mono';

interface ThemeContextType {
  theme: ThemeType;
  setTheme: (theme: ThemeType) => void;
  nextTheme: () => void;
  prevTheme: () => void;
}

const themes: ThemeType[] = [
  'cyan', 'purple', 'green', 'red', 'blue', 
  'amber', 'magenta', 'emerald', 'orange', 'mono'
];

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<ThemeType>('cyan');

  useEffect(() => {
    // Apply theme to document
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const setTheme = useCallback((newTheme: ThemeType) => {
    setThemeState(newTheme);
  }, []);

  const nextTheme = useCallback(() => {
    const currentIndex = themes.indexOf(theme);
    const nextIndex = (currentIndex + 1) % themes.length;
    setThemeState(themes[nextIndex]);
  }, [theme]);

  const prevTheme = useCallback(() => {
    const currentIndex = themes.indexOf(theme);
    const prevIndex = (currentIndex - 1 + themes.length) % themes.length;
    setThemeState(themes[prevIndex]);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme, nextTheme, prevTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}

export const themeLabels: Record<ThemeType, string> = {
  cyan: 'Cyber Cyan',
  purple: 'Plasma Purple',
  green: 'Toxic Green',
  red: 'Molten Red',
  blue: 'Arctic Blue',
  amber: 'Solar Amber',
  magenta: 'Magenta Pulse',
  emerald: 'Emerald City',
  orange: 'Sunset Orange',
  mono: 'Monochrome',
};

export const themeColors: Record<ThemeType, { primary: string; secondary: string }> = {
  cyan: { primary: '#00f2ff', secondary: '#ff007f' },
  purple: { primary: '#b829dd', secondary: '#00d9ff' },
  green: { primary: '#39ff14', secondary: '#ff6600' },
  red: { primary: '#ff1a1a', secondary: '#ff6600' },
  blue: { primary: '#0088ff', secondary: '#00ffff' },
  amber: { primary: '#ffaa00', secondary: '#ff4400' },
  magenta: { primary: '#ff00ff', secondary: '#00ffff' },
  emerald: { primary: '#00ff88', secondary: '#0088ff' },
  orange: { primary: '#ff6600', secondary: '#ff0066' },
  mono: { primary: '#ffffff', secondary: '#888888' },
};
