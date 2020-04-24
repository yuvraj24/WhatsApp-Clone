import express from "express";
import chatRouter from "./router/chatRouter";
import roomRouter from "./router/roomRouter";
import userRouter from "./router/userRouter";
import statusRouter from "./router/statusRouter";
import db from "./db/index";
import { saveUserLastSeen } from "./controller/lastSeenController";
import config from "config";
import cors from "cors";
import path from "path";

// Express setup -----
const app = express();

app.use(cors());
app.use(express.json()); 

app.use("/api/user", userRouter);
app.use("/api/chat", chatRouter);
app.use("/api/room", roomRouter);
app.use("/api/status", statusRouter);

const port = process.env.PORT || 3000;

//use config module to get the privatekey, if no private key set, end the application
if (!config.get("privateKey")) {
  console.error("FATAL ERROR: privateKey is not defined.");
  process.exit(1);
}

app.get("/ping", (_req: any, res: { send: (arg0: string) => void }) => {
  res.send("pong");
});

// MongoDb setup -----
db.on("error", (error: any) => {
  console.log("Mongoose Connection Error : " + JSON.stringify(error));
});

// Socket.io setup -----
const server = require("http").createServer(app);
server.listen(port, () => {
  console.log(`Socket is listening on port ${port}`);
});

const socket = require("socket.io").listen(server);
socket.on("connection", (socketConnection: any) => {
  console.log("Socket.io connected");

  socketConnection.on("CHAT_LIST", (msg: any) => {
    // console.log("CHAT_LIST == ", msg);

    // Save User unread count to Chat List table
    // saveUserUnreadCount(msg);

    socket.emit("CHAT_LIST", msg);
  });

  socketConnection.on("CHAT_ROOM", (msg: any) => {
    // console.log("CHAT_ROOM == ", msg);
    socket.emit("CHAT_ROOM", msg);
    // socket.emit("CHAT_LIST", msg);
  });

  socketConnection.on("SCAN_QR_CODE", (msg: any) => {
    console.log("SCAN_QR_CODE == ", msg);
    socket.emit("SCAN_QR_CODE", msg);
  });

  socketConnection.on("LAST_SEEN", (msg: any) => {
    // console.log("LAST_SEEN == ", msg);

    // Save User Last seen to Chat Room table
    saveUserLastSeen(msg);

    socket.emit("LAST_SEEN", msg);
  });

  socketConnection.on("USER_STATUS", (msg: any) => {
    console.log("USER_STATUS == ", msg);
    socket.emit("USER_STATUS", msg);
  });
});
