import mongoose from "mongoose";
import { ConversationModel } from "../model/ConversationModel";
import { LoginUserModel } from "../model/LoginUserModel";
import { MessageModel } from "../model/MessageModel";

export const listConversations = async (req: any, res: any) => {
  try {
    const conversations = await ConversationModel.find({
      participants: req.user.id,
    })
      .sort({ updatedAt: -1 })
      .lean();
    const otherUserIds = conversations
      .map((conversation: any) =>
        conversation.participants.find((id: string) => id !== req.user.id)
      )
      .filter(Boolean);
    const users = await LoginUserModel.find({
      userId: { $in: otherUserIds },
    })
      .select("userId userName phoneNumber")
      .lean();
    const usersById = users.reduce((result: any, user: any) => {
      result[user.userId] = user;
      return result;
    }, {});

    return res.status(200).json({
      success: true,
      data: conversations.map((conversation: any) => {
        const otherUserId = conversation.participants.find(
          (id: string) => id !== req.user.id
        );
        return {
          ...conversation,
          contact: usersById[otherUserId] || null,
        };
      }),
    });
  } catch (error) {
    console.error("Failed to load conversations:", error.message);
    return res.status(500).json({
      success: false,
      message: "Could not load your conversations.",
    });
  }
};

export const createConversation = async (req: any, res: any) => {
  const otherUserId =
    typeof req.body.userId === "string" ? req.body.userId.trim() : "";

  if (!otherUserId || otherUserId === req.user.id) {
    return res.status(400).json({
      success: false,
      message: "Choose another FRWhatsapp user to start a conversation.",
    });
  }

  try {
    const contact = await LoginUserModel.findOne({ userId: otherUserId }).select(
      "userId userName phoneNumber"
    );
    if (!contact) {
      return res.status(404).json({
        success: false,
        message: "That FRWhatsapp account could not be found.",
      });
    }

    const participants = [req.user.id, otherUserId].sort();
    const participantKey = participants.join(":");
    const conversation = await ConversationModel.findOneAndUpdate(
      { participantKey },
      { $setOnInsert: { participantKey, participants } },
      { new: true, upsert: true, setDefaultsOnInsert: true }
    );

    return res.status(200).json({
      success: true,
      data: { ...conversation.toObject(), contact },
    });
  } catch (error) {
    console.error("Failed to create conversation:", error.message);
    return res.status(500).json({
      success: false,
      message: "Could not start that conversation.",
    });
  }
};

export const getConversationMessages = async (req: any, res: any) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.conversationId)) {
    return res.status(400).json({
      success: false,
      message: "Invalid conversation ID.",
    });
  }

  try {
    const conversation = await ConversationModel.findOne({
      _id: req.params.conversationId,
      participants: req.user.id,
    });
    if (!conversation) {
      return res.status(404).json({
        success: false,
        message: "Conversation not found.",
      });
    }

    const messages = await MessageModel.find({
      conversationId: conversation._id,
    })
      .sort({ createdAt: -1 })
      .limit(100)
      .lean();

    return res.status(200).json({
      success: true,
      data: messages.reverse(),
    });
  } catch (error) {
    console.error("Failed to load conversation messages:", error.message);
    return res.status(500).json({
      success: false,
      message: "Could not load messages.",
    });
  }
};

export const sendConversationMessage = async (req: any, res: any) => {
  const text = typeof req.body.text === "string" ? req.body.text.trim() : "";
  if (!text || text.length > 4000) {
    return res.status(400).json({
      success: false,
      message: "Messages must contain between 1 and 4000 characters.",
    });
  }
  if (!mongoose.Types.ObjectId.isValid(req.params.conversationId)) {
    return res.status(400).json({
      success: false,
      message: "Invalid conversation ID.",
    });
  }

  try {
    const conversation = await ConversationModel.findOne({
      _id: req.params.conversationId,
      participants: req.user.id,
    });
    if (!conversation) {
      return res.status(404).json({
        success: false,
        message: "Conversation not found.",
      });
    }

    const recipientId = conversation.participants.find(
      (id: string) => id !== req.user.id
    );
    if (!recipientId) {
      return res.status(400).json({
        success: false,
        message: "Conversation does not have a recipient.",
      });
    }

    const message = await MessageModel.create({
      conversationId: conversation._id,
      senderId: req.user.id,
      recipientId,
      text,
    });
    const messageData = message.toObject();

    await ConversationModel.updateOne(
      { _id: conversation._id },
      {
        $set: {
          lastMessage: {
            text,
            senderId: req.user.id,
            createdAt: message.createdAt,
          },
        },
      }
    );

    const io = req.app.get("io");
    io.to(`user:${recipientId}`).emit("message:new", messageData);

    return res.status(201).json({ success: true, data: messageData });
  } catch (error) {
    console.error("Failed to send conversation message:", error.message);
    return res.status(500).json({
      success: false,
      message: "Could not send message.",
    });
  }
};
