export {};
import express from "express";
import { getUserChatList } from "../controller/chatListController";
import authUser from "../middleware/auth";

const router = express.Router();

router.get("/chatList", authUser, getUserChatList);

export default router;
