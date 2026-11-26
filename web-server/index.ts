import "dotenv/config";
import cors from "cors";
import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import chatRouter from "./router/chatRouter";
import db from "./db/index";
import userRouter from "./router/userRouter";
import { verifyPhoneIdToken } from "./services/firebaseAdmin";

const app = express();
const webOrigin = process.env.WEB_ORIGIN || "http://localhost:3000";
const port = process.env.PORT || 3001;

app.use(cors({ origin: webOrigin }));
app.use(express.json({ limit: "16kb" }));
app.use("/api/user", userRouter);
app.use("/api/chat", chatRouter);

app.get("/ping", (_req, res) => {
  res.send("pong");
});

db.on("error", (error: any) => {
  console.error("MongoDB connection error:", error.message);
});

const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: webOrigin,
    methods: ["GET", "POST"],
  },
});

app.set("io", io);

io.use(async (socket, next) => {
  const token = socket.handshake.auth && socket.handshake.auth.token;
  if (typeof token !== "string" || token.length === 0) {
    return next(new Error("A Firebase ID token is required."));
  }

  try {
    const decodedToken = await verifyPhoneIdToken(token);
    socket.data.userId = decodedToken.uid;
    return next();
  } catch (_error) {
    return next(new Error("Firebase authentication failed."));
  }
});

io.on("connection", (socket) => {
  socket.join(`user:${socket.data.userId}`);
});

server.listen(port, () => {
  console.log(`FRWhatsapp server listening on port ${port}`);
});
