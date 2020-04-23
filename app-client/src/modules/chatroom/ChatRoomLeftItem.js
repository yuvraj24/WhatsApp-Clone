import React from 'react';
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
import PROFILE from '../../../assets/images/profile2.jpg';
import {getTimeInFormat} from '../../utils/helperFunctions';

const ChatRoomLeftItem = ({item, navigation}) => {
  return (
    <View style={styles.parentView}>
      {/* <Thumbnail style={styles.profileImage} source={PROFILE} /> */}
      <Card transparent style={styles.cardView}>
        <Text style={[DEFAULT_STYLES.poppinsMedium, styles.userMessage]}>
          {item.chatMessage}
        </Text>
        <Text style={styles.userTime}>{getTimeInFormat(item.chatTime)}</Text>
      </Card>
    </View>
  );
};

export default ChatRoomLeftItem;

const styles = StyleSheet.create({
  parentView: {
    marginLeft: '2%',
    maxWidth: '70%',
    alignSelf: 'flex-start',
    flexDirection: 'row',
  },
  profileImage: {
    width: 40,
    height: 40,
    marginTop: '2%',
    marginRight: '2%',
  },
  userName: {
    fontSize: 16,
    marginTop: 3,
  },
  userMessage: {
    fontSize: 18,
    color: TEXT_TITLE,
    marginTop: 3,
    alignSelf: 'flex-start',
  },
  userTime: {
    fontSize: 14,
    color: GRAY,
    alignSelf: 'flex-end',
    textAlign: 'right',
  },
  msgIcon: {
    fontSize: 26,
    color: GRAY,
    marginTop: 3,
    alignSelf: 'flex-end',
    marginRight: -10,
  },
  cardView: {
    backgroundColor: WHITE,
    borderRadius: 10,
    paddingTop: 4,
    paddingLeft: 8,
    paddingRight: 8,
    paddingBottom: 4,
    marginTop: 2,
    marginBottom: 2,
  },
});
