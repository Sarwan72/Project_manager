import { io } from "socket.io-client";

export const socket = io(
  import.meta.env.PROD
    ? import.meta.env.VITE_BACKEND_URL
    : "http://localhost:5000",
  { withCredentials: true }
);
