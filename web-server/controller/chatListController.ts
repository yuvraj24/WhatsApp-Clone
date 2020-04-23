import { saveUserUnreadCount } from "./unreadCountController";
import { ChatListModel } from "../model/ChatListModel";
import { ChatUnreadCountModel } from "../model/ChatUnreadCountModel";

// Fetch Main User Chat List
export const getUserChatList = async (req: any, res: any) => { 
  const id = req.user.id;
  console.log("USER ID => ", id);
  try {
    const chats = await ChatListModel.find({
      $or: [{ userId: id }, { chatId: id }],
    });
    // console.log("getUserChatList => ", JSON.stringify(chats));
    if (!chats) {
      return res.status(200).json({ success: false, message: "Api Failed" });
    }

    for (let index = 0; index < chats.length; index++) {
      const element = chats[index] as any;

      let chatUnreadItem = (await ChatUnreadCountModel.findOne({
        roomId: element.roomId,
      })) as any;

      // console.log("ChatUnreadCountModel => ", chatUnreadItem);

      if (id === chatUnreadItem.chatId1) {
        element.chatUnreadCount = chatUnreadItem.chatId1Count;
      } else if (id === chatUnreadItem.chatId2) {
        element.chatUnreadCount = chatUnreadItem.chatId2Count;
      } else {
        element.chatUnreadCount = 0;
      }
      chats[index] = element;
    }

    // console.log("ChatUnreadCount RESPONSE => ", chats);

    return res.status(200).json({ success: true, data: chats });
  } catch (err) {
    return res.status(200).json({ success: false, message: err });
  }
};

// Update User Chat List=
export const updateChatList = async (
  body: any,
  res: any,
  chatRoom: any,
  isNewChat: Boolean
) => {
  console.log("Initial Chat =>", body);
  if (body.isNewChat) {
    try {
      body.roomId = chatRoom._id;

      // let count = await getUserUnreadCount(body);
      // body.chatUnreadCount = count;

      await saveUserUnreadCount(body, isNewChat);
      body.chatUnreadCount = 0;

      console.log("Final Chat Save =>", body);

      let result = await ChatListModel.updateOne(
        { roomId: body.roomId },
        body,
        { upsert: true }
      );
      console.log("Final Chat Save RESULT =>", result);

      // const chatList = new ChatListModel(body);
      // await chatList.save();
      res.status(200).json({
        success: true,
        id: chatRoom._id,
        message: "ChatRoom created successfully",
      });
    } catch (error) {
      return res.status(200).json({
        success: false,
        message: error.message,
      });
    }
  } else {
    try {
      // let count = await getUserUnreadCount(body);
      // body.chatUnreadCount = count;

      await saveUserUnreadCount(body, isNewChat);
      body.chatUnreadCount = 0;

      console.log("Final Chat Save =>", body);
      let result = await ChatListModel.updateOne({ roomId: body.roomId }, body);
      console.log("Final Chat Save RESULT =>", result);
      return res.status(200).json({
        success: true,
        id: chatRoom._id,
        message: "ChatRoom updated successfully",
      });
    } catch (error) {
      return res.status(200).json({
        success: false,
        message: error.message,
      });
    }
  }
};
