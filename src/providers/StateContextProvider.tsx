"use client";

import { createContext, ReactNode, useState } from "react";

interface StateContextType {
  isLoggedIn: boolean;
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
  tempMail: string;
  setTempMail: React.Dispatch<React.SetStateAction<string>>;
}

export const StateContext = createContext<StateContextType | null>(null);

const StateContextProvider = ({ children }: { children: ReactNode }) => {
  const [tempMail, setTempMail] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("token"));

  return (
    <StateContext.Provider
      value={{ isLoggedIn, setIsLoggedIn, tempMail, setTempMail }}
    >
      {children}
    </StateContext.Provider>
  );
};

export default StateContextProvider;
