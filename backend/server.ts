import express, { Application } from "express";
import dotenv from "dotenv";
import userRouter from "./routes/userRoutes";
import cors from "cors";
import http from "http";
import { Server, Socket } from "socket.io";
import path from "path";

dotenv.config();

const app: Application = express();

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

io.on("connection", (socket: Socket) => {
  console.log("user connected");
  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});

app.use(express.json());
app.use(cors());

app.use("/users", userRouter);

const PORT: string = process.env.PORT || "3004";

app.listen(PORT, () => {
  console.log("Server express is running on port: " + PORT);
});
server.listen(3005, () => {
  console.log("Server socket.io is running on port: " + 3005);
});
