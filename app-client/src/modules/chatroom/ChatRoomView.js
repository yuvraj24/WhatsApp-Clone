import React, {useMemo, useState, useRef, useEffect} from 'react';
import {Text, View, FlatList, SafeAreaView} from 'react-native';
import _Divider from '../../components/_Divider';
 
import ChatRoomLeftItem from './ChatRoomLeftItem';
import ChatRoomRightItem from './ChatRoomRightItem';
import constants from '../../utils/constants';
import ChatTextInput from './ChatTextInput';
import {
  getChatRoom,
  createChatRoom,
  updateChatRoom,
} from '../../api/apiController';
import moment from 'moment';
import {
  getLocalData,
  getUserType,
  getUserTypeChatRoom,
  getSocket,
} from '../../utils/helperFunctions';
import {getChatRoomChatModel} from '../../utils/helperModels';

var socket = getSocket();

const ChatRoomView = ({chatItem, navigation, isNewChat}) => {
  const [chatRoomList, setChatRoomList] = useState([]);
  const [userId, setUserId] = useState('');
  const [refresh, setRefresh] = useState(false);
  const [roomId, setRoomId] = useState('');
  const flatList = useRef();

  useEffect(() => {
    getUser();
    listenSocket([]);
  }, []);

  useEffect(() => {
    let req = {
      roomId: chatItem.roomId,
      userId: userId,
    };
    getChatRoom(req)
      .then(res => {
        // console.log('RESPONSE => ' + JSON.stringify(res.data));
        if (res.status === 200 && res.data && res.data.data.length > 0) {
          var chatArray = res.data.data[0].chat;
          chatArray.reverse();
          setChatRoomList(chatArray);
          listenSocket(chatArray);
        }
      })
      .catch(error => {
        console.log('ERROR ', error);
      });
  }, [userId]);

  async function getUser() {
    const userId = await getLocalData(constants.USER_ID);
    setUserId(userId);
  }

  function listenSocket(chatArray) {
    socket.removeAllListeners();
    socket.on(constants.CHAT_ROOM, message => {
      console.log('Message Received => ', JSON.stringify(message));

      // If message received invloves user then only add to list else ignore
      if (message.userId === userId || message.chatId === userId) {
        setRefresh(true);
        if (!chatArray) {
          chatArray = [];
        }
        chatArray.reverse();
        chatArray.push(message.chat);
        chatArray.reverse();
        // console.log('USER ID => ', userId);
        setChatRoomList(chatArray);
        setTimeout(() => {
          setRefresh(false);
        }, 1000);
      }
    });
  }

  const onSendMessage = text => {
    if (text != '') {
      // const userType = getUserTypeChatRoom(chatItem, userId);
      // const mChatId =
      //   userType === constants.OWNER ? chatItem.chatId : chatItem.userId;
      // const mUserId =
      //   userType === constants.OWNER ? chatItem.userId : chatItem.chatId;

      isNewChat = chatRoomList.length === 0 ? true : false;
      let chatRequest = getChatRoomChatModel(chatItem, isNewChat, userId, text);

      socket.emit(constants.CHAT_ROOM, chatRequest);

      chatRequest.chatUnreadCount = {
        userId: userId,
        type: 'add',
        count: 1,
      };

      if (chatRequest.roomId === '') {
        chatRequest.roomId = roomId;
      }

      const res = isNewChat
        ? createChatRoom(chatRequest)
        : updateChatRoom(chatRequest);
      res
        .then(res => {
          console.log('CHAT ROOM RESPONSE=> ', JSON.stringify(res.data));
          chatRequest.roomId = res.data.id;
          setRoomId(chatRequest.roomId);

          // chatRequest.chat.chatUnreadCount = chatRequest.chat.chatUnreadCount + 1
          // chatRequest.chatUnreadCount = {
          //   userId: userId,
          //   type: 'add',
          //   count: 1,
          // };
          socket.emit(constants.CHAT_LIST, chatRequest);
        })
        .catch(err => {
          console.log('CHAT ROOM ERROR => ', JSON.stringify(err));
        });
    }
  };

  return (
    <SafeAreaView  style={{flex: 1}}>
      <View style={{flex: 1, paddingTop: 4}}>
        <FlatList
          ref={flatList}
          extraData={refresh}
          inverted={true}
          style={{paddingTop: 0, paddingBottom: 0}}
          // disableVirtualization={true}
          // onContentSizeChange={() =>
          //   flatList.current.scrollToEnd({animated: false})
          // }
          // onLayout={() => flatList.current.scrollToEnd({animated: false})}
          data={chatRoomList}
          keyExtractor={(item, index) => index.toString()}
          // ItemSeparatorComponent={() => {
          //   return <_Divider />;
          // }}
          renderItem={({item}) => {
            let userType = getUserTypeChatRoom(item, userId);
            if (userType === constants.OWNER) {
              return <ChatRoomRightItem item={item} navigation={navigation} />;
            } else {
              return <ChatRoomLeftItem item={item} navigation={navigation} />;
            }
          }}
        />
        <ChatTextInput onSendMessage={text => onSendMessage(text)} />
      </View>
    </SafeAreaView>
  );
};

export default ChatRoomView;
