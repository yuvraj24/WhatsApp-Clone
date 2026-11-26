import mongoose from "mongoose";

const Schema = mongoose.Schema;

interface ConversationDocument extends mongoose.Document {
  participantKey: string;
  participants: string[];
  lastMessage?: {
    text?: string;
    senderId?: string;
    createdAt?: Date;
  };
  createdAt: Date;
}

const conversationSchema = new Schema<ConversationDocument>(
  {
    participantKey: { type: String, required: true, unique: true },
    participants: {
      type: [{ type: String, required: true }],
      required: true,
      validate: (value: string[]) => value.length === 2,
    },
    lastMessage: {
      text: { type: String, required: false },
      senderId: { type: String, required: false },
      createdAt: { type: Date, required: false },
    },
  },
  { timestamps: true }
);

conversationSchema.index({ participants: 1, updatedAt: -1 });

export const ConversationModel = mongoose.model<ConversationDocument>(
  "conversation",
  conversationSchema
);
