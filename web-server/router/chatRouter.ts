export {};
import express from "express";
import {
  createConversation,
  getConversationMessages,
  listConversations,
  sendConversationMessage,
} from "../controller/conversationController";
import authUser from "../middleware/auth";

const router = express.Router();

router.get("/conversations", authUser, listConversations);
router.post("/conversations", authUser, createConversation);
router.get(
  "/conversations/:conversationId/messages",
  authUser,
  getConversationMessages
);
router.post(
  "/conversations/:conversationId/messages",
  authUser,
  sendConversationMessage
);

export default router;
