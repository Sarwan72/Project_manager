import express from "express";
import http from "http";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";

import connectDB from "./config/db";
import authRoutes from "./routes/auth.routes";
import taskRoutes from "./routes/task.routes";
import { initSocket } from "./socket";

dotenv.config();
connectDB();

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);

app.get("/", (_, res) => {
  res.send("Backend API running");
});

const server = http.createServer(app);
initSocket(server);


server.listen(5000, () => {
  console.log("Server running on port 5000");
});
