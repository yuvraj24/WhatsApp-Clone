import React, { useState, useEffect, useReducer } from "react";
import WebChatListItem from "./WebChatListItem";
import { webConstants } from "../../utils/webConstants";
// import {
//   WHITE,
//   LIGHT_GREEN
// } from "../../utils/webColors";
import EmptyComponent from "../../components/WebEmptyComponent";
import { getChatList } from "../../api/webApiController";
import { getLocalData, getSocket } from "../../utils/webHelperFunctions";
import { ListItem, Card, CardContent } from "@material-ui/core";
import { WHITE } from "../../utils/webColors";
import { List, CellMeasurer, CellMeasurerCache } from "react-virtualized";
import {
  initialChatListState,
  chatListReducer,
  CHAT_LIST,
  CHAT_ITEM,
  REFRESH,
} from "./WebChatListReducer";
// import { makeStyles } from "@material-ui/core/styles";

var socket = getSocket();
const cache = new CellMeasurerCache({
  fixedWidth: true,
  defaultHeight: 60,
});

const WebChatListView = ({ onItemClick, userChatList }) => {
  var [state, dispatch] = useReducer(chatListReducer, initialChatListState);

  var { chatList, chatItem, refresh, userId } = state;

  useEffect(() => {
    listenSocket();
  }, []);

  useEffect(() => {
    if (refresh) {
      getLatestChats();
    }
  }, [refresh]);

  useEffect(() => {
    // console.log("Chat List Changed == ", JSON.stringify(chatList));
    if (chatItem != "") {
      renderChats();
    }
  }, [chatItem]);

  function getUserId() {
    const userId = getLocalData(webConstants.USER_ID);
    dispatch({ type: webConstants.USER_ID, payload: userId });
    return userId;
  }

  const getLatestChats = () => {
    getUserId();
    getChatList()
      .then((res) => {
        // console.log("LIST RESPONSE => " + JSON.stringify(res.data.data));
        if (res.status === 200) {
          userChatList(res.data.data);
          dispatch({ type: CHAT_LIST, payload: res.data.data });
        }
        dispatch({ type: REFRESH, payload: false });
      })
      .catch((error) => {
        console.log("ERROR ", error);
      });
  };

  async function renderChats() {
    let chatArray = chatList;
    console.log("Message CHAT Received => ", JSON.stringify(chatItem));

    var isMatch = false;
    if (chatArray.length > 0) {
      for (let i = 0; i < chatArray.length; i++) {
        const element = chatArray[i];
        if (chatItem && element.roomId === chatItem.roomId) {
          // Increment unread count
          chatItem = await calcUnreadCount(chatItem, element.chatUnreadCount);

          // Since chat item received is an object to convert it to array and they re initialise
          // if (chatItem.chat.length <= 0) {
          chatItem.chat = [chatItem.chat];
          // }
          console.log("Selected Chat Received => ", JSON.stringify(chatItem));
          chatArray[i] = chatItem;
          isMatch = true;
          break;
        }
      }

      if (!isMatch && chatItem.chatUnreadCount.type != 'reset') {
        // Increment unread count
        chatItem = await calcUnreadCount(chatItem, 0);

        // Since chat item received is an object to convert it to array and they re initialise
        // if (chatItem.chat.length <= 0) {
        chatItem.chat = [chatItem.chat];
        // }
        console.log("Selected Chat Received => ", JSON.stringify(chatItem));
        chatArray.push(chatItem);
      }

      console.log("Message CHAT AFTER Received => ", JSON.stringify(chatItem));

      dispatch({ type: CHAT_LIST, payload: chatArray });
      console.log(
        `FINAL CHAT ARRAY ${refresh} => `,
        "JSON.stringify(chatArray)"
      );
    } else {
      // For new chat
      if (chatItem.chatUnreadCount.type === "add") {
        dispatch({ type: REFRESH, payload: true });
      }
    }
  }

  function listenSocket() {
    // socket.removeListener(webConstants.CHAT_LIST);
    socket.on(webConstants.CHAT_LIST, (chatItem) => {
      dispatch({ type: CHAT_ITEM, payload: chatItem });
    });
  }

  function calcUnreadCount(chatItem, originalCount) {
    // const userId = getLocalData(webConstants.USER_ID);
    if (chatItem.chatUnreadCount.userId != userId) {
      if (chatItem.chatUnreadCount.type === "reset") {
        chatItem.chatUnreadCount = 0;
      } else if (chatItem.chatUnreadCount.type === "add") {
        chatItem.chatUnreadCount = originalCount ? originalCount + 1 : 1;
      } else {
        chatItem.chatUnreadCount = 0;
      }
    } else if (chatItem.chatUnreadCount.type === "reset") {
      chatItem.chatUnreadCount = 0;
    } else {
      chatItem.chatUnreadCount = originalCount;
    }
    return chatItem;
  }

  return (
    <div
      style={{
        flex: 1,
        width: "100%",
        borderRadius: 0,
        backgroundColor: WHITE,
      }}
    >
      {chatList.length === 0 && (
        <EmptyComponent message={"No chats, contacts or messages found"} />
      )}

      <List
        style={{
          height: "100%",
          width: "100%",
          outline: "none",
        }}
        rowCount={chatList.length}
        height={window.innerHeight}
        width={window.innerWidth - window.innerWidth / 3.2}
        rowHeight={cache.rowHeight}
        rowRenderer={({ index, parent, key, style }) => (
          <CellMeasurer
            key={key}
            cache={cache}
            parent={parent}
            columnIndex={0}
            rowIndex={index}
          >
            <WebChatListItem
              item={chatList[index]}
              position={index}
              onItemClick={onItemClick}
            />
          </CellMeasurer>
        )}
        overscanRowCount={0}
        data={refresh}
      />

      {/* {chatList.map(function(item, i) {
        return (
          <WebChatListItem item={item} position={i} onItemClick={onItemClick} />
        );
      })} */}
      {/* <Button className={classes.btnView}>
        <img src={CHAT} className={classes.thumbView} />
      </Button> */}
    </div>
  );
};

export default WebChatListView;

// const useStyles = makeStyles({
//   btnView: {
//     marginTop: 15,
//     marginRight: -5,
//     width: 65,
//     height: 65,
//     justifyContent: "center",
//     alignSelf: "center",
//     backgroundColor: LIGHT_GREEN,
//     position: "absolute",
//     bottom: 20,
//     right: 20
//   },
//   thumbView: {
//     width: 30,
//     height: 30,
//     justifyContent: "center",
//     tintColor: WHITE
//   }
// });
