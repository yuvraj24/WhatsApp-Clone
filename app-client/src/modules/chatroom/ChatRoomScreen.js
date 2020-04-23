import React, {useEffect} from 'react';
import {
  Text,
  View,
  StyleSheet,
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import {GRAY, WHITE, LIGHT_GRAY_0} from '../../utils/colors';
import ChatRoomHeaderView from './ChatRoomHeaderView';
import ChatRoomView from './ChatRoomView';
import ChatTextInput from './ChatTextInput';
import {DEFAULT_STYLES} from '../../utils/styles';

import WALLPAPER1 from '../../../assets/images/wallpaper7.jpg';
import {getSocket, getLocalData} from '../../utils/helperFunctions.js';
import constants from '../../utils/constants';
import {getChatListModel} from '../../utils/helperModels';

let socket = getSocket();

const ChatRoomScreen = ({navigation, route}) => {
  console.log('ChatRoomScreen => ', route);

  useEffect(() => {
    getUserIdnChatItem();
  });

  async function getUserIdnChatItem() {
    // Clear User chat uneread count across all platforms
    let chatItem = getChatListModel(
      route.params.item,
      route.params.isNewChat,
      0,
    );
    let userId = await getLocalData(constants.USER_ID);
    chatItem.chatUnreadCount = {
      userId: userId,
      type: 'reset',
      count: 0,
    };

    socket.emit(constants.CHAT_LIST, chatItem);
    console.log('ChatRoomScreen NEW => ', chatItem);
  }

  return (
    // <SafeAreaView style={DEFAULT_STYLES.container}>
    <View style={DEFAULT_STYLES.container}>
      {Platform.OS === 'ios' && (
        <KeyboardAvoidingView
          style={DEFAULT_STYLES.container}
          behavior="padding"
          enabled>
          <ImageBackground
            source={WALLPAPER1}
            resizeMode="stretch"
            style={{width: '100%', height: '100%'}}>
            <ChatRoomHeaderView
              item={route.params.item}
              navigation={navigation}
              isNewChat={route.params.isNewChat}
            />
            <ChatRoomView
              chatItem={route.params.item}
              navigation={navigation}
              isNewChat={route.params.isNewChat}
            />
          </ImageBackground>
        </KeyboardAvoidingView>
      )}
      {Platform.OS === 'android' && (
        <ImageBackground
          source={WALLPAPER1}
          resizeMode="stretch"
          style={{width: '100%', height: '100%'}}>
          <ChatRoomHeaderView
            item={route.params.item}
            navigation={navigation}
            isNewChat={route.params.isNewChat}
          />
          <ChatRoomView
            chatItem={route.params.item}
            navigation={navigation}
            isNewChat={route.params.isNewChat}
          />
        </ImageBackground>
      )}
    </View>
    // </SafeAreaView>
  );
};

export default ChatRoomScreen;

const styles = StyleSheet.create({});
