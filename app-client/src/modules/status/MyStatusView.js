import React from 'react';
import {Text, Image, StyleSheet, View} from 'react-native';
import {Card, CardItem, Body, Left, Thumbnail, Icon, Right} from 'native-base';
import {DEFAULT_STYLES} from '../../utils/styles';
import {
  GRAY,
  TEXT_DESCRIPTION,
  APP_BG_COLOR,
  GREEN,
  LIGHT_GREEN,
} from '../../utils/colors';

import PROFILE2 from '../../../assets/images/user.png';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {
  navigateStack,
  getDateTimeInFormat,
  getDateTimeStatusFormat,
} from '../../utils/helperFunctions';
import {NAV_TYPES} from '../../utils/navTypes';
import TimeElapsed from '../../components/TimeElapsed';

const MyStatusView = ({navigation, statusData, isUser, isBorder}) => {
  const statusImage =
    statusData && statusData.status && statusData.status.length > 0
      ? statusData.status[statusData.status.length - 1].image + ''
      : '';
  // console.log('Status Item : ', statusData);

  return (
    <TouchableOpacity
      onPress={() => {
        statusImage && statusImage != ''
          ? navigation.navigate(NAV_TYPES.STATUS_VIEW, {
              statusData: JSON.stringify(statusData),
              isUser: isUser,
            })
          : navigation.navigate(NAV_TYPES.CAMERA_VIEW, {});
      }}>
      <Card transparent style={{elevation: 0, marginRight: -5}}>
        <CardItem>
          <View style={{marginLeft: -5}}>
            <View
              style={
                isBorder
                  ? styles.circleView
                  : isUser
                  ? styles.circleNoView
                  : styles.circleSeenView
              }>
              <Thumbnail
                style={
                  isBorder
                    ? {width: 50, height: 50}
                    : isUser
                    ? {width: 60, height: 60, borderRadius: 100}
                    : {width: 50, height: 50}
                }
                source={statusImage ? {uri: statusImage} : PROFILE2}
              />
            </View>
            {isUser && (!statusImage || statusImage === '') && (
              <Icon
                type="MaterialCommunityIcons"
                name="plus-circle"
                color={GREEN}
                style={{
                  color: LIGHT_GREEN,
                  position: 'absolute',
                  bottom: -5,
                  right: -18,
                }}
              />
            )}
          </View>
          <Body
            style={{
              flexDirection: 'column',
              width: 800,
              marginLeft: 15,
            }}>
            <Text
              numberOfLines={1}
              style={[DEFAULT_STYLES.poppinsSemiBold, styles.userName]}>
              {isUser ? 'My Status' : statusData.userName}
            </Text>
            <TimeElapsed
              style={[DEFAULT_STYLES.poppinsLight, styles.userMessage]}
              time={
                statusData.lastStatusTime
                  ? statusData.lastStatusTime
                  : 'Tap to add status update'
              }
              // interval={1000}
              isValid={statusData != ''}
            />
            {/* <Text
              numberOfLines={2}
              style={[DEFAULT_STYLES.poppinsLight, styles.userMessage]}>
              {statusData.lastStatusTime
                ? getDateTimeStatusFormat(statusData.lastStatusTime)
                : 'Tap to add status update'}
            </Text> */}
          </Body>
          <View>
            {isUser && (
              <Icon
                style={styles.msgIcon}
                name="dots-horizontal"
                type="MaterialCommunityIcons"
              />
            )}
          </View>
        </CardItem>
      </Card>
    </TouchableOpacity>
  );
};

export default MyStatusView;

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
    fontSize: 12,
    color: GRAY,
    alignSelf: 'flex-end',
  },
  msgIcon: {
    fontSize: 26,
    color: GREEN,
    alignSelf: 'flex-end',
  },
  circleView: {
    borderRadius: 100,
    width: 60,
    height: 60,
    borderWidth: 3,
    padding: 14,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: LIGHT_GREEN,
  },
  circleNoView: {
    borderRadius: 100,
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
  circleSeenView: {
    borderRadius: 100,
    width: 60,
    height: 60,
    borderWidth: 3,
    padding: 14,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: GRAY,
  },
});
