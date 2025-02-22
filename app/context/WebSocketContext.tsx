import { createContext, useContext } from 'react';

export const WebSocketContext = createContext<WebSocket>(
  new WebSocket(process.env.NEXT_PUBLIC_API_URL || '')
);

export function useWebSocket() {
  return useContext(WebSocketContext);
}