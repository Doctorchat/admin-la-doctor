import { useContext, createContext } from "react";

export const GlobalSettingsContext = createContext();

export const useGlobalSettingsContext = () => {
  const context = useContext(GlobalSettingsContext);

  return context;
};
