import React, { useEffect, useMemo } from "react";
import io from "socket.io-client";

export const useSocket = (host) => {
  const socket = useMemo(
    () =>
      io.connect(host, {
        transports: ["websocket"],
        autoConnect: true,
        forceNew: true,
      }),
    [host]
  );

  useEffect(() => {
    socket.on("connect", () => {
      console.log("conecto");
    });
  }, [socket]);

  useEffect(() => {
    socket.on("disconnect", () => {
      console.log("desconectó");
    });
  }, [socket]);

  return { socket };
};
