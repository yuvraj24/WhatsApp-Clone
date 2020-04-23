import { ChatUnreadCountModel } from "../model/ChatUnreadCountModel";

export async function saveUserUnreadCount(body: any, isNewChat: Boolean) {
  // Update unread count details against Room Id
  try {
    let listItem = (await ChatUnreadCountModel.findOne({
      roomId: body.roomId,
    })) as any;
    console.log("saveUserUnreadCount => ", listItem);
    if (listItem && listItem != null) {
      if (body.chatUnreadCount.userId == listItem.chatId1) {
        // IF ID MATCHES THEN MAKE SELF CUNT 0 AND INCREMENT OTHER USER COUNT
        listItem.chatId1Count = 0;
        listItem.chatId2Count = listItem.chatId2Count + 1;
        console.log(
          `User = ${body.chat.userName}, Room Id = ${body.roomId}, Unread Count = ${listItem}`
        );
      } else if (body.chatUnreadCount.userId == listItem.chatId2) {
        // IF ID MATCHES THEN MAKE SELF CUNT 0 AND INCREMENT OTHER USER COUNT
        listItem.chatId1Count = listItem.chatId1Count + 1;
        listItem.chatId2Count = 0;
        console.log(
          `User = ${body.chat.userName}, Room Id = ${body.roomId}, Unread Count = ${listItem}`
        );
      } else {
        // Either of the chatd id is empty
        let othetChatId =
          body.chatUnreadCount.userId === body.userId
            ? body.chatId
            : body.userId;
        listItem = {
          roomId: body.roomId,
          chatId1:
            listItem.chatId1 === ""
              ? body.chatUnreadCount.userId
              : listItem.chatId1,
          chatId1Count: 0,
          chatId2: listItem.chatId2 === "" ? othetChatId : listItem.chatId2,
          chatId2Count: 1,
        };
      }

      console.log("Final Chat Unread Item => ", listItem);

      await ChatUnreadCountModel.updateOne({ roomId: body.roomId }, listItem, {
        upsert: true,
      });
    } else {
      let othetChatId =
        body.chatUnreadCount.userId === body.userId ? body.chatId : body.userId;
      let chatUnreadCount = {
        roomId: body.roomId,
        chatId1: body.chatUnreadCount.userId,
        chatId1Count: 0,
        chatId2: othetChatId,
        chatId2Count: 1,
      };

      console.log("Final Chat Unread Item => ", chatUnreadCount);

      await ChatUnreadCountModel.updateOne(
        { roomId: body.roomId },
        chatUnreadCount,
        {
          upsert: true,
        }
      );
    }
  } catch (error) {
    console.log("saveUserUnreadCount ==> ", JSON.stringify(error));
    return 0;
  }
}

// export async function saveUserUnreadCount(data: any, isNewChat: Boolean) {
//   // Update unread count details against Room Id
//   try {
//     let listItem = (await ChatListModel.findOne({
//       roomId: data.roomId
//     })) as any;
//     console.log("getUserUnreadCount => ", listItem);
//     if (listItem && listItem != null) {
//       let count = listItem.chatUnreadCount ? listItem.chatUnreadCount + 1 : 1;
//       console.log(
//         `User = ${data.chat.userName}, Room Id = ${data.roomId}, Unread Count = ${count}`
//       );
//       return count;
//     } else {
//       return 1;
//     }
//   } catch (error) {
//     console.log("saveUserUnreadCount ==> ", JSON.stringify(error));
//     return 0;
//   }
// }

export async function clearUserUnreadCount(roomId: any, userId: any) {
  // Update unread count details against Room Id
  try {
    console.log("clearUserUnreadCount ID => ", roomId, " UserID => ", userId);
    let listItem = (await ChatUnreadCountModel.findOne({
      roomId: roomId,
    })) as any;
    console.log("clearUserUnreadCount => ", listItem);
    if (listItem && listItem != null) {
      if (userId == listItem.chatId1) {
        // IF ID MATCHES THEN MAKE SELF CoUNT 0 AND INCRMENT OTHER USER COUNT
        await ChatUnreadCountModel.updateOne(
          { roomId: roomId },
          { $set: { chatId1Count: 0 } }
        );
      } else if (userId == listItem.chatId2) {
        await ChatUnreadCountModel.updateOne(
          { roomId: roomId },
          { $set: { chatId2Count: 0 } }
        );
      }
    }
  } catch (error) {
    console.log("clearUserUnreadCount ==> ", JSON.stringify(error));
  }
}
