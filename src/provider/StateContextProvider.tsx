"use client";

import useFetchData from "@/hooks/useFetchData";
import { createContext, ReactNode, useState } from "react";

interface StateContextType {
  isLoggedIn: boolean;
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
  tempMail: string;
  setTempMail: React.Dispatch<React.SetStateAction<string>>;
  siteInfoData: any;
  socialLinksData: any;
  userData: any;
}

export const StateContext = createContext<StateContextType | null>(null);

const StateContextProvider = ({ children }: { children: ReactNode }) => {
  const [tempMail, setTempMail] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("token"));
  const { data: siteInfoData } = useFetchData("/site-info");
  const { data: socialLinksData } = useFetchData("/social-links");
  const { data: userData } = useFetchData("/profile", true);

  console.log("userData", userData);

  return (
    <StateContext.Provider
      value={{
        isLoggedIn,
        setIsLoggedIn,
        tempMail,
        setTempMail,
        siteInfoData,
        socialLinksData,
        userData,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export default StateContextProvider;
