'use client';

import type { ReactNode } from 'react';
import React, { createContext, useContext, useState } from 'react';

// Define the type for the context value
interface NavigationLayoutContextType {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  scrolled: boolean;
  setScrolled: React.Dispatch<React.SetStateAction<boolean>>;
}

// Create a context with the defined type
const NavigationLayoutContext = createContext<
  NavigationLayoutContextType | undefined
>(undefined);

// Define the type for the provider's props
interface NavigationLayoutProviderProps {
  children: ReactNode;
}

// Create a provider component
export const NavigationLayoutProvider: React.FC<
  NavigationLayoutProviderProps
> = ({ children }) => {
  const [open, setOpen] = useState<boolean>(false);
  const [scrolled, setScrolled] = useState<boolean>(false);
  return (
    // eslint-disable-next-line react/jsx-no-constructed-context-values
    <NavigationLayoutContext.Provider
      // eslint-disable-next-line react/jsx-no-constructed-context-values
      value={{ open, setOpen, scrolled, setScrolled }}
    >
      {children}
    </NavigationLayoutContext.Provider>
  );
};

// Custom hook to use the NavigationLayoutContext
export const useNavigationLayout = (): NavigationLayoutContextType => {
  const context = useContext(NavigationLayoutContext);

  if (context === undefined) {
    throw new Error(
      'useNavigationLayout must be used within a NavigationLayoutProvider',
    );
  }

  return context;
};
