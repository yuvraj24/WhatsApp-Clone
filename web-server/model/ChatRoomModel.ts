import mongoose, { Mongoose } from "mongoose";
const Schema = mongoose.Schema;

enum CHAT_DELIVERY_STATUS {
  SENT = 0,
  DELIVERED = 1,
  SEEN = 2
}

export const ChatBody = {
  userId: { type: String, required: true },
  userName: { type: String, required: false },
  chatId: { type: String, required: true },
  chatName: { type: String, required: true },
  chatMessage: { type: String, required: true },
  chatNumber: { type: String, required: false },
  chatImage: { type: String, required: false },
  chatTime: { type: String, required: true },
  chatDelivery: { type: Number, required: false }, 
};

const LastSeen = { 
  userLastSeen: { type: String, required: false }, 
  chatLastSeen: { type: String, required: false }
};

const chatRoomSchema = new Schema(
  {
    roomId: { type: String, required: false },
    userId: { type: String, required: true },
    chatId: { type: String, required: true }, 
    chat: { type: [ChatBody], required: false }
  },
  { timestamps: true }
);

export const ChatRoomModel = mongoose.model("chatRoom", chatRoomSchema);
