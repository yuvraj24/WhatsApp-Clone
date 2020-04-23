import constants from './constants';
import moment from 'moment';
import {Toast} from 'native-base';
import AsyncStorage from '@react-native-community/async-storage';
import {StackActions} from '@react-navigation/native';
import {NAV_TYPES} from './navTypes';
import io from 'socket.io-client';

export const getTimeInFormat = time => {
  if (time === '') {
    return '';
  }
  const newTime = moment(time).format(constants.TIME_FORMAT);
  return newTime;
};

export const getDateTimeInFormat = time => {
  if (time === '') {
    return '';
  }
  const newTime = moment(time).format(constants.DATE_TIME_FORMAT);
  return newTime;
};

export const getDateTimeStatusFormat = time => {
  if (time === '') {
    return '';
  }
  return `Last update ${getDateTimeInFormat(time)}`;
};

export const showToast = ({text, type}) => {
  Toast.show({
    text: text,
    buttonText: 'Done',
    type: type,
  });
};

export const getUniqueId = () => {
  const id = JSON.stringify(Date.now());
  console.log('UNIQUE ID => ', id);
  return id;
};

export const storeLocalData = async (key, value) => {
  try {
    await AsyncStorage.setItem(key, value);
  } catch (e) {
    console.log('AsyncStorage Error', e);
  }
};

export async function clearLocalData() {
  try {
    await AsyncStorage.clear();
  } catch (e) {
    console.log('AsyncStorage Error', e);
  }
}

export const getLocalData = async key => {
  let value = '';
  try {
    value = await AsyncStorage.getItem(key);
    console.log(`AsyncStorage ${key} => `, value);
  } catch (e) {
    console.log('AsyncStorage Error', e);
  }
  return value;
};

export const getUserType = async item => {
  let userId = await getLocalData(constants.USER_ID);
  if (item.userId === userId) {
    // console.log(
    //   'UserType => ',
    //   constants.OWNER + ' User => ' + item.chat[0].chatName,
    // );
    return constants.OWNER;
  } else if (item.chatId === userId) {
    // console.log(
    //   'UserType => ',
    //   constants.FRIEND + ' User => ' + item.chat[0].userName,
    // );
    return constants.FRIEND;
  }
};

export const getUserTypeChatRoom = (item, userId) => {
  if (item.userId === userId) {
    // console.log(
    //   'UserType => ',
    //   constants.OWNER + ' User => ' + JSON.stringify(item),
    // );
    return constants.OWNER;
  } else if (item.chatId === userId) {
    // console.log(
    //   'UserType => ',
    //   constants.FRIEND + ' User => ' + JSON.stringify(item),
    // );
    return constants.FRIEND;
  }
};

export async function logoutUser(navigation) {
  await clearLocalData();
  navigation.dispatch(StackActions.replace(NAV_TYPES.LOGIN));
  // navigation.navigate(NAV_TYPES.LOGIN);
}

export function getSocket() {
  return io.connect(constants.API.SOCKET_URL);
}

export function navigateStack({navigation, screen, props}) {
  navigation && navigation.navigate(screen, {props});
}
