import mongoose, { Mongoose } from "mongoose";
import { ChatBody } from "./ChatRoomModel";
const Schema = mongoose.Schema;

export const ChatUnreadCount = {
  userId: { type: String, required: true },
  count: { type: Number, required: true }
};

const chatListSchema = new Schema(
  {
    roomId: { type: String, required: false },
    userId: { type: String, required: true },
    chatId: { type: String, required: true },
    chatUnreadCount: { type: Number, required: false },
    chat: { type: [ChatBody], required: true }
  },
  { timestamps: true }
);

export const ChatListModel = mongoose.model("chatList", chatListSchema);
