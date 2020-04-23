import mongoose, { Mongoose } from "mongoose";
const Schema = mongoose.Schema;

const chatUnreadCountSchema = new Schema(
  {
    roomId: { type: String, required: true },
    chatId1: { type: String, required: true },
    chatId1Count: { type: Number, required: true },
    chatId2: { type: String, required: true },
    chatId2Count: { type: Number, required: true }
  },
  { timestamps: true }
);

export const ChatUnreadCountModel = mongoose.model(
  "chatUnreadCount",
  chatUnreadCountSchema
);
