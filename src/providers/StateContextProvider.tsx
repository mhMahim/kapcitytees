"use client";

import { createContext, ReactNode, useState } from "react";

interface StateContextType {
  isLoggedIn: boolean;
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
}

export const StateContext = createContext<StateContextType | null>(null);

const StateContextProvider = ({ children }: { children: ReactNode }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <StateContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
      {children}
    </StateContext.Provider>
  );
};

export default StateContextProvider;
