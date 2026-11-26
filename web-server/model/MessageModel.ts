import mongoose from "mongoose";

const Schema = mongoose.Schema;

interface MessageDocument extends mongoose.Document {
  conversationId: mongoose.Types.ObjectId;
  senderId: string;
  recipientId: string;
  text: string;
  createdAt: Date;
}

const messageSchema = new Schema<MessageDocument>(
  {
    conversationId: {
      type: Schema.Types.ObjectId,
      required: true,
      index: true,
    },
    senderId: { type: String, required: true },
    recipientId: { type: String, required: true },
    text: { type: String, required: true, maxlength: 4000 },
  },
  { timestamps: true }
);

messageSchema.index({ conversationId: 1, createdAt: -1 });

export const MessageModel = mongoose.model<MessageDocument>(
  "message",
  messageSchema
);
