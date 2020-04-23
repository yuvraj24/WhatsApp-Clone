import React from "react";
import { GRAY, WHITE, LIGHT_GRAY_0, GREEN } from "../../utils/webColors";
import ChatRoomHeaderView from "./WebChatRoomHeaderView";
import ChatRoomView from "./WebChatRoomView";
// import ChatTextInput from "./WebChatTextInput";

import WALLPAPER1 from "../../assets/images/wallpaper7.jpg";
import WebChatRoomHeaderView from "./WebChatRoomHeaderView";
import { useEffect } from "react";
import { webConstants } from "../../utils/webConstants";
import { getSocket, getLocalData } from "../../utils/webHelperFunctions";
import { getChatListModel } from "../../utils/webHelperModels";
import { useState } from "react";

let socket = getSocket();

const WebChatRoomScreen = ({ route }) => {
  console.log("ChatRoomScreen => ", JSON.stringify(route));
  const [refresh, setRefresh] = useState(false)

  useEffect(() => {
    setRefresh(!refresh)
    getUserIdnChatItem();
  },[route]);

  async function getUserIdnChatItem() {
    // Clear User chat uneread count across all platforms
    let chatItem = getChatListModel(route, false, 0);
    let userId = getLocalData(webConstants.USER_ID);
    chatItem.chatUnreadCount = {
      userId: userId,
      type: "reset",
      count: 0
    };
    socket.emit(webConstants.CHAT_LIST, chatItem);
    console.log("ChatRoomScreen NEW => ", chatItem);
  }

  return (
    <div style={styles.parentView}>
      <WebChatRoomHeaderView item={route} isNewChat={false} />
      {/* <img
        src={WALLPAPER1}
        style={{ position: "absolute", flex: 1, display: "flex" }}
      /> */}
      <ChatRoomView chatItem={route} isNewChat={false} />
    </div>
  );
};

export default WebChatRoomScreen;

const styles = {
  parentView: {
    width: "100%",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    backgroundColor: "#E4DDD6"
  }
};
