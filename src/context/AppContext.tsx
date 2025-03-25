
import React, { createContext, useContext, useState } from 'react';
import { toast } from 'sonner';
import AuthProvider from '@/hooks/useAuth';

// Type definitions
type Theme = 'light' | 'dark' | 'system';

interface AppContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
}

// Create context
const AppContext = createContext<AppContextType | undefined>(undefined);

// Context provider
export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  // Get stored theme preference or default to system
  const initialTheme = localStorage.getItem('theme') as Theme || 'system';
  const [theme, setTheme] = useState<Theme>(initialTheme);

  // Update theme handler
  const handleThemeChange = (newTheme: Theme) => {
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    
    // Apply theme to document
    if (newTheme === 'dark' || (newTheme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      document.documentElement.classList.add('dark');
      toast.success('Dark theme activated');
    } else {
      document.documentElement.classList.remove('dark');
      toast.success('Light theme activated');
    }
  };

  // Context value
  const value = {
    theme,
    setTheme: handleThemeChange,
  };

  return (
    <AppContext.Provider value={value}>
      <AuthProvider>
        {children}
      </AuthProvider>
    </AppContext.Provider>
  );
};

// Custom hook for using the context
export const useApp = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within AppProvider');
  }
  return context;
};
