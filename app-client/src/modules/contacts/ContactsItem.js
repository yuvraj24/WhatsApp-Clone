import React from 'react';
import {
  Text,
  Image,
  StyleSheet,
  View,
  TouchableNativeFeedback,
  TouchableOpacity,
  Platform,
} from 'react-native';
import {Card, CardItem, Body, Left, Thumbnail, Icon, Right} from 'native-base';
import {DEFAULT_STYLES} from '../../utils/styles';
import {
  GRAY,
  TEXT_DESCRIPTION,
  APP_BG_COLOR,
  GREEN,
  WHITE,
  LIGHT_GREEN,
  TEXT_TITLE,
} from '../../utils/colors';
import {NAV_TYPES} from '../../utils/navTypes';
import USER from '../../../assets/images/user.png';
import {getContactsChatModel} from '../../utils/helperModels';

const ContactsItem = ({item, navigation, userChatList}) => {
  async function checkExistingRoom() {
    let isMatch = false;
    if (userChatList && userChatList.length > 0) {
      for (let index = 0; index < userChatList.length; index++) {
        const element = userChatList[index];
        if (
          element.userId === item.userId ||
          element.userId === item.chatId ||
          element.chatId === item.userId ||
          element.chatId === item.chatId
        ) {
          navigateChatRoom(element);
          isMatch = true;
          break;
        }
      }

      if (!isMatch) {
        let chatModel = await getContactsChatModel(item);
        navigateChatRoom(chatModel);
      }
      isMatch = false;
    } else {
      let chatModel = await getContactsChatModel(item);
      navigateChatRoom(chatModel);
    }
  }

  function navigateChatRoom(chatModel) {
    navigation &&
      navigation.navigate(NAV_TYPES.CHAT_MESSAGE_SCREEN, {
        item: chatModel,
        isNewChat: true,
      });
  }

  return (
    <TouchableOpacity
      onPress={async () => {
        checkExistingRoom();
      }}>
      <Card transparent style={{elevation: 0, marginRight: -5, height: 80}}>
        <CardItem>
          <View style={styles.cardStyle}>
            {!item.thumbnailPath && <Thumbnail source={USER} />}
            {/* {item.thumbnailPath != '' && (
              <Thumbnail source={{isStatic: true, uri: item.thumbnailPath}} />
            )} */}
          </View>
          <Body
            style={{
              flexDirection: 'column',
              marginLeft: 15,
            }}>
            <Text
              numberOfLines={1}
              style={[DEFAULT_STYLES.poppinsSemiBold, styles.userName]}>
              {item.userName}
            </Text>
            <Text
              numberOfLines={2}
              style={[DEFAULT_STYLES.poppinsLight, styles.userMessage]}>
              {item.phoneNumber}
            </Text>
          </Body>
          <View>
            <Text style={[DEFAULT_STYLES.poppinsSemiBold, styles.userTime]}>
              {item.time}
            </Text>
            <Text style={[DEFAULT_STYLES.poppinsSemiBold, styles.textMsgCount]}>
              {item.numberType.toUpperCase()}
            </Text>
            {item.msgIcon != '' && (
              <Text
                style={styles.msgIcon}
                name={item.msgIcon}
                type={item.msgIconType}
              />
            )}
          </View>
        </CardItem>
      </Card>
    </TouchableOpacity>
  );
};

export default ContactsItem;

const styles = StyleSheet.create({
  profileImage: {
    width: 60,
    height: 60,
    borderRadius: 60 / 2,
  },
  userName: {
    fontSize: 16,
    marginTop: 5,
  },
  userMessage: {
    fontSize: 14,
    color: GRAY,
    marginTop: 3,
    alignSelf: 'flex-start',
  },
  userTime: {
    fontSize: 12,
    color: GRAY,
    alignSelf: 'flex-end',
  },
  msgIcon: {
    fontSize: 26,
    color: GRAY,
    marginTop: 3,
    alignSelf: 'flex-end',
    marginRight: -10,
  },
  textMsgCountView: {
    fontSize: 12,
    color: WHITE,
    backgroundColor: LIGHT_GREEN,
    justifyContent: 'center',
    alignSelf: 'flex-end',
    width: 24,
    height: 24,
    borderRadius: 24 / 2,
    marginTop: 10,
  },
  textMsgCount: {
    fontSize: 14,
    color: GRAY,
    justifyContent: 'center',
    alignSelf: 'center',
  },
  cardStyle: {
    marginLeft: -5,
    marginTop: Platform.OS === 'android' ? -15 : 0,
  },
});
