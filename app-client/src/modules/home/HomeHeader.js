import React, {useRef, useEffect, useState} from 'react';
import {Text, View, StyleSheet, Image} from 'react-native'; 
import _Text from '../../components/_Text';
import {DEFAULT_STYLES} from '../../utils/styles';
import {Icon} from 'native-base';
import {
  GREEN,
  WHITE,
  TEXT_TITLE,
  BLACK,
  INPUT_ORANGE,
  RED,
  LIGHT_GREEN,
  TEXT_DESCRIPTION,
} from '../../utils/colors';
import Menu, {MenuItem, MenuDivider} from 'react-native-material-menu';
import {
  getLocalData,
  clearLocalData,
  logoutUser,
  navigateStack,
} from '../../utils/helperFunctions';
import constants from '../../utils/constants';
import {StackActions} from '@react-navigation/native';
import {NAV_TYPES} from '../../utils/navTypes';
import {loginUser} from '../../api/apiController';

var {
  poppinsLight,
  poppinsMedium,
  poppinsRegular,
  poppinsSemiBold,
} = DEFAULT_STYLES;

const HomeHeader = ({navigation}) => {
  const menuRef = useRef('');
  const [user, setUser] = useState('');

  useEffect(() => {
    setUserName();
  }, []);

  async function setUserName() {
    const user = await getLocalData(constants.USER_NAME);
    setUser(user);
  }

  const hideMenu = () => {
    menuRef.current.hide();
  };

  const showMenu = () => {
    menuRef.current.show();
  };

  function navigateQrScannerScreen() {
    hideMenu();
    navigateStack({navigation: navigation, screen: NAV_TYPES.QR_CODE_SCREEN});
  }

  return (
    <View style={styles.mainView}>
      {/* <View style={styles.parentView}> */}
      {/* <Image source={prodileImage} style={styles.imageRounded} /> */}
      <_Text title style={styles.userName}>
        WhatsApp Clone
      </_Text>
      {/* </View> */}
      <View style={styles.parentView}>
        <Icon name="search" type="Octicons" style={styles.iconStyle1} />
        {/* <Icon
          name="dots-vertical"
          type="MaterialCommunityIcons"
          style={styles.iconStyle2}
        /> */}
        <Menu
          ref={menuRef}
          button={
            <Icon
              name="dots-vertical"
              type="MaterialCommunityIcons"
              style={styles.iconStyle2}
              onPress={showMenu}
            />
          }>
          <MenuItem textStyle={styles.menuTextStyle} onPress={hideMenu}>
            {user && user}
          </MenuItem>
          <MenuItem
            textStyle={styles.menuTextStyle}
            onPress={navigateQrScannerScreen}>
            {'Whatsapp Web'}
          </MenuItem>
          <MenuDivider />
          <MenuItem
            textStyle={styles.menuTextStyle}
            onPress={() => {
              hideMenu();
              logoutUser(navigation);
            }}>
            Logout
          </MenuItem>
        </Menu>
      </View>
    </View>
  );
};

export default HomeHeader;

var styles = StyleSheet.create({
  mainView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignContent: 'center',
    alignItems: 'flex-start',
    width: '100%',
    backgroundColor: GREEN,
    paddingBottom: 30,
    paddingTop: 15,
    height: 80,
  },
  parentView: {
    flexDirection: 'row',
  },
  userName: {
    marginLeft: '3%',
    // marginVertical: 14,
    fontSize: 20,
    color: WHITE,
    fontWeight: '800',
  },
  iconStyle1: {
    fontSize: 21,
    marginRight: 20,
    marginVertical: 4,
    color: WHITE,
  },
  iconStyle2: {
    fontSize: 28,
    marginRight: 10,
    alignItems: 'baseline',
    // marginVertical: 15,
    color: WHITE,
  },
  menuTextStyle: {
    fontSize: 16,
    color: TEXT_DESCRIPTION, 
  },
});
