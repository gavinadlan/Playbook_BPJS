import { useEffect, useRef } from "react";
import { io, Socket } from "socket.io-client";

export function useSocket(
  userId: string | number | null,
  onStatusUpdate: (data: any) => void,
  onNotification: (data: any) => void
) {
  const socketRef = useRef<Socket | null>(null);

  useEffect(() => {
    if (!userId) return;

    const socket = io("http://localhost:3001", {
      withCredentials: true,
      transports: ["websocket"],
      reconnection: true,
    });

    socket.on("connect", () => {
      socket.emit("join", userId);
    });

    socket.on("status_pks_update", onStatusUpdate);
    socket.on("notification", onNotification);

    socketRef.current = socket;

    return () => {
      socket.disconnect();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId]);

  return socketRef.current;
} 