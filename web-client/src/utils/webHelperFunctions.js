import { webConstants } from "./webConstants";
import moment from "moment"; 
import io from "socket.io-client"; 

export const getTimeInFormat = time => {
  if (time === "") {
    return "";
  }
  const newTime = moment(time).format(webConstants.TIME_FORMAT);
  return newTime;
};

export const getDateTimeInFormat = time => {
  if (time === "") {
    return "";
  }
  const newTime = moment(time).format(webConstants.DATE_TIME_FORMAT);
  return newTime;
};

// export const showToast = ({ text, type }) => {
//   Toast.show({
//     text: text,
//     buttonText: "Done",
//     type: type
//   });
// };

export const getUniqueId = () => {
  const id = JSON.stringify(Date.now());
  console.log("UNIQUE ID => ", id);
  return id;
};

export const storeLocalData = async (key, value) => {
  try {
    await localStorage.setItem(key, value);
  } catch (e) {
    console.log("AsyncStorage Error", e);
  }
};

export async function clearLocalData() {
  try {
    await localStorage.clear();
  } catch (e) {
    console.log("AsyncStorage Error", e);
  }
}

export const getLocalData = key => {
  let value = "";
  try {
    value = localStorage.getItem(key);
    // console.log(`AsyncStorage ${key} => `, value);
  } catch (e) {
    console.log("AsyncStorage Error", e);
  }
  return value;
};

export const getUserType = item => {
  let userId = getLocalData(webConstants.USER_ID);
  if (item.userId === userId) {
    // console.log(
    //   'UserType => ',
    //   webConstants.OWNER + ' User => ' + item.chat[0].chatName,
    // );
    return webConstants.OWNER;
  } else if (item.chatId === userId) {
    // console.log(
    //   'UserType => ',
    //   webConstants.FRIEND + ' User => ' + item.chat[0].userName,
    // );
    return webConstants.FRIEND;
  }
};

export const getUserTypeChatRoom = (item, userId) => {
  if (item.userId === userId) {
    // console.log(
    //   'UserType => ',
    //   webConstants.OWNER + ' User => ' + JSON.stringify(item),
    // );
    return webConstants.OWNER;
  } else if (item.chatId === userId) {
    // console.log(
    //   'UserType => ',
    //   webConstants.FRIEND + ' User => ' + JSON.stringify(item),
    // );
    return webConstants.FRIEND;
  }
}; 

export function getSocket() {
  return io.connect(webConstants.API.SOCKET_URL);
}

export const getDateTimeStatusFormat = time => {
  if (time === '') {
    return '';
  }
  return `Last update ${getDateTimeInFormat(time)}`;
};
