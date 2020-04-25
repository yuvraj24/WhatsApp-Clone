import React, { useMemo, useState, useRef, useEffect } from "react";

import ChatRoomLeftItem from "./WebChatRoomLeftItem";
import ChatRoomRightItem from "./WebChatRoomRightItem";
import { webConstants } from "../../utils/webConstants";
import ChatTextInput from "./WebChatTextInput";
import {
  getChatRoom,
  createChatRoom,
  updateChatRoom,
} from "../../api/webApiController";
import moment from "moment";
import {
  getLocalData,
  getUserType,
  getUserTypeChatRoom,
  getSocket,
} from "../../utils/webHelperFunctions";
import { List, CellMeasurer, CellMeasurerCache } from "react-virtualized";
import WhatsapBG from "../../assets/images/WhatsappBG.png";
import { Paper } from "@material-ui/core";
import { getChatRoomChatModel } from "../../utils/webHelperModels";

var socket = getSocket();

const ChatRoomView = ({ chatItem, isNewChat }) => {
  const [chatRoomList, setChatRoomList] = useState([]);
  const [userId, setUserId] = useState("");
  const [refresh, setRefresh] = useState(false);
  const [roomId, setRoomId] = useState("");
  const [height, setHeight] = useState(80);
  const [message, setMessage] = useState("");
  const flatList = useRef();
  const inputRef = useRef();

  const cache = new CellMeasurerCache({
    fixedWidth: true,
    defaultHeight: 80,
  });

  // This side effect is for refreshing socket data
  useEffect(() => {
    if (message != "") {
      renderChats();
    }
  }, [message]);

  // This side effect is for refreshing various chat users
  useEffect(() => {
    if (chatItem != "") {
      fetchChatRoomMessages();
      // setRefresh(!refresh);
    }
  }, [chatItem]);

  // This side effect is for geting userid first
  useEffect(() => {
    getUser();
    listenSocket([]);
  }, [refresh]);

  // When user id is retrived this side effect is invoked
  useEffect(() => {
    fetchChatRoomMessages();
  }, [userId]);

  function fetchChatRoomMessages() {
    let req = {
      roomId: chatItem.roomId,
      userId: userId,
    };
    getChatRoom(req)
      .then((res) => {
        // console.log('RESPONSE => ' + JSON.stringify(res.data));
        if (res.status === 200 && res.data && res.data.data.length > 0) {
          var chatArray = res.data.data[0].chat;
          // chatArray.reverse(); // In case of web reverse is not required
          setChatRoomList(chatArray);
        } else {
          setChatRoomList([]);
        }
      })
      .catch((error) => {
        console.log("ERROR ", error);
        setChatRoomList([]);
      });
  }

  function getUser() {
    const userId = getLocalData(webConstants.USER_ID);
    setUserId(userId);
  }

  function listenSocket() {
    socket.removeListener(webConstants.CHAT_ROOM);
    socket.on(webConstants.CHAT_ROOM, (message) => {
      console.log("Message ROOM Received => ", JSON.stringify(message));
      setMessage(message);
    });
  }

  function renderChats() {
    // If message received invloves user then only add to list else ignore
    if (message.userId === userId || message.chatId === userId) {
      setRefresh(true);
      if (!chatRoomList) {
        chatRoomList = [];
      }
      setVirtualData(chatRoomList, message);
      setTimeout(() => {
        setRefresh(false);
      }, 1000);
    }
  }

  function setVirtualData(chatArray, message) {
    // chatArray.reverse();
    message != "" && chatArray.push(message.chat);
    // message != "" && chatArray.reverse();
    setChatRoomList(chatArray);
    flatList.current.forceUpdate();

    // flatList.current.scrollToRow(chatArray.length);
    // flatList.current.measureAllRows()
    setTimeout(() => {
      flatList.current.measureAllRows();
      flatList.current.scrollToRow(chatArray.length);
    }, 1500);
  }

  const onSendMessage = (text) => {
    if (text != "") {
      // var chatId = chatItem.chatId;
      // if (isNewChat) {
      //   chatId = chatItem.chatId;
      // } else {

      // const userType = getUserTypeChatRoom(chatItem, userId);
      // const mChatId =
      //   userType === webConstants.OWNER ? chatItem.chatId : chatItem.userId;
      // const mUserId =
      //   userType === webConstants.OWNER ? chatItem.userId : chatItem.chatId;

      // isNewChat = chatRoomList.length === 0 ? true : false;

      // const chatRequest = {
      //   isNewChat: isNewChat,
      //   roomId: chatItem.roomId,
      //   userId: chatItem.userId,
      //   chatId: chatItem.chatId,
      //   chat: {
      //     userId: mUserId,
      //     userName: chatItem.chat[0].userName,
      //     chatId: mChatId,
      //     chatName: chatItem.chat[0].chatName,
      //     chatMessage: text,
      //     chatNumber: chatItem.chat[0].chatNumber,
      //     chatImage: chatItem.chat[0].chatImage,
      //     chatTime: moment().format(),
      //     chatDelivery: 0,
      //     chatUnreadCount: 0
      //   }
      // };

      // console.log('CHAT chatItem => ', JSON.stringify(chatItem));
      // console.log('CHAT MESSAGE => ', JSON.stringify(chatRequest));

      isNewChat = chatRoomList.length === 0 ? true : false;
      let chatRequest = getChatRoomChatModel(chatItem, isNewChat, userId, text);

      socket.emit(webConstants.CHAT_ROOM, chatRequest);

      chatRequest.chatUnreadCount = {
        userId: userId,
        type: "add",
        count: 1,
      };

      if (chatRequest.roomId === "") {
        chatRequest.roomId = roomId;
      }

      const res = isNewChat
        ? createChatRoom(chatRequest)
        : updateChatRoom(chatRequest);
      res
        .then((res) => {
          console.log("CHAT ROOM RESPONSE=> ", JSON.stringify(res));
          chatRequest.roomId = res.data.id;
          setRoomId(chatRequest.roomId);

          // chatRequest.chat.chatUnreadCount = chatRequest.chat.chatUnreadCount + 1;
          // chatRequest.chatUnreadCount = {
          //   userId : userId,
          //   type: "add",
          //   count: 1
          // };
          socket.emit(webConstants.CHAT_LIST, chatRequest);
        })
        .catch((err) => {
          console.log("CHAT ROOM ERROR => ", JSON.stringify(err));
        });
    }
  };

  function modifyRowHeight(event) {
    if (event.target.value != "") {
      setHeight(inputRef.current.clientHeight);
      if (chatRoomList.length > 0) {
        setTimeout(() => {
          flatList.current.measureAllRows();
        }, 1500);
        flatList.current.scrollToRow(chatRoomList.length);
      }
    } else {
      setTimeout(() => {
        setHeight(inputRef.current.clientHeight);
        flatList.current.measureAllRows();
        flatList.current.scrollToRow(chatRoomList.length);
      }, 200);
    }
  }

  const rowRenderer = ({ index, parent, key, style, isScrolling }) => {
    var item = chatRoomList[index];
    let userType = getUserTypeChatRoom(item, userId);
    if (userType === webConstants.OWNER) {
      // if (isScrolling) {
      //   return null;
      // }

      return (
        <CellMeasurer
          key={key}
          cache={cache}
          parent={parent}
          columnIndex={0}
          rowIndex={index}
        >
          <ChatRoomRightItem item={item} styleList={style} />
        </CellMeasurer>
      );
    } else {
      return (
        <CellMeasurer
          key={key}
          cache={cache}
          parent={parent}
          columnIndex={0}
          rowIndex={index}
        >
          <ChatRoomLeftItem item={item} styleList={style} />
        </CellMeasurer>
      );
    }
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        background: "url(" + WhatsapBG + ")",
        height: "92%",
      }}
    >
      <div
        style={{
          backgroundColor: "#E4DDD6",
          height: "100%",
          zIndex: "100",
          opacity: "0.95",
        }}
      />

      {/* <div
        style={{
          background: "url(" + WhatsapBG + ")",
          width: "100%",
          height: "90%"
        }}
      > */}
      <div
        style={{
          position: "absolute",
          zIndex: "1000",
          height: "92%",
          width: "70%",
        }}
      >
        <List
          ref={flatList}
          style={{
            height: "100%",
            width: "100%",
            outline: "none",
            paddingBottom: height === "" ? 80 : height,
            paddingTop: 10,
          }}
          rowCount={chatRoomList.length}
          height={window.innerHeight - 120}
          width={window.innerWidth - window.innerWidth / 3.2}
          rowHeight={cache.rowHeight}
          deferredMeasurementCache={cache}
          rowRenderer={rowRenderer}
          scrollToAlignment={"end"}
          data={refresh}
        />
      </div>

      <div
        ref={inputRef}
        style={{
          position: "fixed",
          zIndex: "2000",
          width: "70%",
          marginBottom: 0,
          resize: "vertical",
          bottom: 0,
          maxHeight: 160,
          minHeight: 60,
          overflow: "hidden",
        }}
      >
        <ChatTextInput
          onSendMessage={(text) => onSendMessage(text)}
          onTyping={(event) => {
            modifyRowHeight(event);
          }}
        />
      </div>
    </div>
  );

  function renderRow(item) {
    let userType = getUserTypeChatRoom(item, userId);
    if (userType === webConstants.OWNER) {
      return <ChatRoomRightItem item={item} />;
    } else {
      return <ChatRoomLeftItem item={item} />;
    }
  }
};

export default ChatRoomView;
