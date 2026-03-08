import { useEffect, useRef } from 'react';
import { io, Socket } from 'socket.io-client';

const useSocket = (url: string, enabled = true) => {
  const socketRef = useRef<Socket | null>(null);

  useEffect(() => {
    if (!enabled) return;

    socketRef.current = io(url, { withCredentials: true });

    return () => {
      socketRef.current?.disconnect();
    };
  }, [url, enabled]);

  return socketRef.current;
};

export default useSocket;
