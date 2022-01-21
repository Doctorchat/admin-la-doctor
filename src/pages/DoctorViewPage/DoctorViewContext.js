import { createContext, useContext } from "react";

export const DoctorViewContext = createContext();

export const useDoctorViewContext = () => {
  const context = useContext(DoctorViewContext);

  return context;
};
