import React, {useEffect, useState} from 'react';
import {
  Text,
  Image,
  StyleSheet,
  View,
  TouchableNativeFeedback,
  TouchableOpacity,
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
import moment from 'moment';
import PROFILE from '../../../assets/images/user.png';
import constants from '../../utils/constants';
import {getTimeInFormat, getUserType} from '../../utils/helperFunctions';

const ChatListItem = ({item, navigation, userId}) => {
  const [userType, setUserType] = useState('');

  let data = item.chat[0];

  useEffect(() => {
    setUserName();
  }, []);

  async function setUserName() {
    let userType = await getUserType(item);
    setUserType(userType);
  }

  return (
    <TouchableOpacity
      onPress={() => {
        navigation &&
          navigation.navigate(NAV_TYPES.CHAT_MESSAGE_SCREEN, {
            item: item,
            isNewChat: false,
          });
      }}>
      <Card transparent style={{elevation: 0, marginRight: -5}}>
        <CardItem>
          <View style={{marginLeft: -5}}>
            <Thumbnail
              source={
                data.chatImage === ''
                  ? PROFILE
                  : {isStatic: true, uri: data.chatImage}
              }
            />
          </View>
          <Body
            style={{
              flexDirection: 'column',
              marginLeft: 15,
            }}>
            <Text
              numberOfLines={1}
              style={[DEFAULT_STYLES.poppinsSemiBold, styles.userName]}>
              {userType == constants.FRIEND ? data.userName : data.chatName}
            </Text>

            <Text
              numberOfLines={2}
              style={[DEFAULT_STYLES.poppinsLight, styles.userMessage]}>
              {data.chatMessage}
            </Text>
          </Body>
          <View>
            <Text style={[DEFAULT_STYLES.poppinsSemiBold, styles.userTime]}>
              {getTimeInFormat(data.chatTime)}
            </Text>
            {item.chatUnreadCount != 0 && (
              <View style={styles.textMsgCountView}>
                <Text
                  style={styles.textMsgCount}>
                  {item.chatUnreadCount}
                </Text>
              </View>
            )}
            {item.chatUnreadCount === 0 && (
              <Icon
                style={styles.msgIcon}
                name={data.chatUnreadCount}
                type={data.chatUnreadCount}
              />
            )}
          </View>
        </CardItem>
      </Card>
    </TouchableOpacity>
  );
};

export default ChatListItem;

const styles = StyleSheet.create({
  profileImage: {
    width: 60,
    height: 60,
    borderRadius: 60 / 2,
  },
  userName: {
    fontSize: 18,
    marginTop: 3,
  },
  userMessage: {
    fontSize: 16,
    color: GRAY,
    marginTop: 3,
    alignSelf: 'flex-start',
  },
  userTime: {
    fontSize: 14,
    color: TEXT_TITLE,
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
    marginTop: 6, 
  },
  textMsgCount: {
    fontSize: 14,
    color: WHITE,
    justifyContent: 'center',
    alignSelf: 'center',
    fontWeight: '600'
  },
});
