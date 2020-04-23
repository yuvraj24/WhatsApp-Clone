import { ChatRoomModel } from "../model/ChatRoomModel";
import { updateChatList } from "./chatListController";
import { clearUserUnreadCount } from "./unreadCountController"; 

// Fetch User Chat Room Details
export const getUserChatRoom = async (req: any, res: any) => {
  const roomId = req.body.roomId;
  const userId = req.body.userId;
  try {
    // clear the unread count from chat list table
    await clearUserUnreadCount(roomId, userId);

    const chats = await ChatRoomModel.find({ _id: roomId });
    if (!chats) {
      return res.status(200).json({ success: false, message: "Api Failed" });
    }
    return res.status(200).json({ success: true, data: chats });
  } catch (err) {
    return res.status(200).json({ success: false, message: err });
  }
};

// Create User Chat Room Details
export const createChatRoom = async (req: any, res: any) => {
  const body = req.body;
  if (!body) {
    return res.status(200).json({
      success: false,
      message: "Invalid Data",
    });
  }

  const chatRoom = new ChatRoomModel(body);

  // Save Chat Room messages
  saveRoomAndUpdateChatList(body, res, chatRoom, true);
};

// Update User Chat Room Details
export const updateChatRoom = async (req: any, res: any) => {
  try {
    const body = req.body;
    if (!body) {
      return res.status(200).json({
        success: false,
        message: "Invalid Data",
      });
    }

    console.log("updateChatRoom  => ", body);
    ChatRoomModel.findOne({ _id: body.roomId }, async (err, chatRoom: any) => {
      // console.log("CHAT ROOM => ", chatRoom);

      if (err) {
        return res.status(200).json({
          success: false,
          message: err.message,
        });
      }

      // Add new message received to Array
      chatRoom.chat.push(body.chat);

      // Save Chat Room messages
      saveRoomAndUpdateChatList(body, res, chatRoom, false);
    });
  } catch (error) {
    return res.status(200).json({
      success: false,
      message: error.message,
    });
  }
};

const saveRoomAndUpdateChatList = async (
  body: any,
  res: any,
  chatRoom: any,
  isNewChat: Boolean
) => {
  try {
    await chatRoom.save();

    // Update Room ID as mongodb row ID
    await ChatRoomModel.updateOne(
      { _id: chatRoom._id },
      { $set: { roomId: chatRoom._id } }
    );

    updateChatList(body, res, chatRoom, isNewChat);
  } catch (error) {
    return res.status(200).json({
      success: false,
      message: error.message,
    });
  }
};
