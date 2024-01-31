import { createContext } from "react";
import { io } from "socket.io-client";

export const SocketContext = createContext();

// Used to provide the socket to the entire app
export const SocketProvider = ({ children }) => {
  const socket = io(`${import.meta.env.VITE_BASEURL}`);

  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
};
