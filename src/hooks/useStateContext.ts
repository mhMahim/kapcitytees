import { StateContext } from "@/providers/StateContextProvider";
import { useContext } from "react";

export const useStateContext = () => {
  const context = useContext(StateContext);
  if (!context) {
    throw new Error(
      "useStateContext must be used within a StateContextProvider",
    );
  }
  return context;
};
