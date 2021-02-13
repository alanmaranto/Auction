import React, { createContext } from "react";
import { useSocket } from "../hooks/useSocket";
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

export default SocketProvider;
