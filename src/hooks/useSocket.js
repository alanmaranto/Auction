import React, { useState, useEffect, useMemo } from "react";
import io from "socket.io-client";

export const useSocket = (host) => {
  const socket = useMemo(
    () =>
      io.connect(host, {
        transports: ["websocket"],
      }),
    [host]
  );

  useEffect(() => {
    socket.on("connect", () => {
      console.log("conecto");
      //   setOnline(true);
    });
  }, [socket]);

  useEffect(() => {
    socket.on("disconnect", () => {
      console.log("desconectó");
      //   setOnline(false);
    });
  }, [socket]);

  return { socket };
};
