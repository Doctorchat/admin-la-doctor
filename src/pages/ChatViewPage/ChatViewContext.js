import { createContext, useContext } from "react";

export const ChatViewContext = createContext();

export const useChatViewContext = () => {
  const context = useContext(ChatViewContext);

  return context;
};
