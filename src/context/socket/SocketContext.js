import React from "react";
import { createContext } from "react";
import { useSocket } from "../../hooks/socket/useSocket";

const host = process.env.REACT_APP_API_URL;

export const SocketContext = createContext();

export const SocketProvider = ({ children }) => {
  const { socket } = useSocket(host);

  return (
    <SocketContext.Provider value={{ socket }}>
      {children}
    </SocketContext.Provider>
  );
};
