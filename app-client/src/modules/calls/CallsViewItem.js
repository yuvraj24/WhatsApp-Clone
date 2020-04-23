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
  MID_GREEN,
  RED,
} from '../../utils/colors';

import PROFILE2 from '../../../assets/images/profile2.jpg';
import StoryImage from '../../components/StoryImage';

const CallsViewItem = ({item, hideBorder = true}) => {
  return (
    <View transparent style={{elevation: 0, marginRight: -5}}>
      <CardItem>
        <View style={{marginLeft: -5}}>
          <Thumbnail source={item.profile} />
          {/* <StoryImage hideBorder={hideBorder} source={item.profile} /> */}
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
            {item.name}
          </Text>
          <View style={{flexDirection: 'row'}}>
            <Icon
              style={{
                fontSize: 20,
                marginTop: 3,
                color: item.isMissed ? RED : LIGHT_GREEN,
                marginRight: 5,
              }}
              type="MaterialCommunityIcons"
              name={item.msgIcon}
            />
            <Text
              numberOfLines={2}
              style={[DEFAULT_STYLES.poppinsLight, styles.userMessage]}>
              {item.time}
            </Text>
          </View>
        </Body>
        <View>
          {/* <Text style={(DEFAULT_STYLES.poppinsSemiBold, styles.userTime)}>
            {item.time}
          </Text> */}
          <Icon
            style={styles.msgIcon}
            name={item.callTypeIcon}
            type="MaterialIcons"
          />
        </View>
      </CardItem>
    </View>
  );
};

export default CallsViewItem;

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
    color: MID_GREEN,
    alignSelf: 'flex-end',
  },
});
