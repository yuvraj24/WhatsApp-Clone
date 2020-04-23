import React, {useEffect} from 'react';
import {Text, View, StyleSheet, PermissionsAndroid} from 'react-native';
import {Card, CardItem, Icon, Thumbnail, Body, Right} from 'native-base';
import {
  APP_BG_COLOR,
  GREEN,
  INPUT_ORANGE,
  WHITE,
  GRAY,
  BLACK,
} from '../../utils/colors';
import PROFILE from '../../../assets/images/profile2.jpg';
import {DEFAULT_STYLES} from '../../utils/styles';

const ContactsHeaderView = ({item, navigation}) => { 

  return (
    <View style={{elevation: 0}}>
      <CardItem style={styles.parentView}>
        <View style={{flexDirection: 'row'}}>
          <Icon
            name="arrow-left"
            type="MaterialCommunityIcons"
            style={styles.backIcon}
            onPress={() => navigation.goBack()}
          />
          <Body
            style={{
              flexDirection: 'column', 
              marginLeft: 7,
            }}>
            <Text
              numberOfLines={1}
              style={[DEFAULT_STYLES.poppinsSemiBold, styles.userName]}>
              Select contact
            </Text>
            <Text
              numberOfLines={2}
              style={[DEFAULT_STYLES.poppinsLight, styles.userMessage]}>
              {item} contacts
            </Text>
          </Body>
          <View style={{flexDirection: 'row', justifyContent: 'space-evenly'}}>
            <Icon
              name="dots-vertical"
              type="MaterialCommunityIcons"
              style={styles.menuIcons}
            />
          </View>
        </View>
      </CardItem>
    </View>
  );
};

export default ContactsHeaderView;

const styles = StyleSheet.create({
  parentView: {
    backgroundColor: GREEN,
    elevation: 0,
    padding: -500,
    paddingLeft: 5,
    paddingRight: 0,
  },
  backIcon: {
    justifyContent: 'center',
    height: '100%',
    paddingLeft: 10,
    alignSelf: 'center',
    color: WHITE,
  },
  profileIcon: {
    marginLeft: 0,
    width: 45,
    height: 45,
    alignSelf: 'center',
  },
  userName: {
    fontSize: 20,
    color: WHITE,
    fontWeight: 'bold',
    paddingLeft: 15,
  },
  userMessage: {
    fontSize: 16,
    color: WHITE,
    marginTop: 3,
    alignSelf: 'flex-start',
    paddingLeft: 15,
  },
  menuIcons: {
    fontSize: 24,
    color: WHITE,
    marginLeft: 8,
    alignSelf: 'center',
  },
});
