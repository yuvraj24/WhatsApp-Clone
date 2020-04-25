import {Platform} from 'react-native';

export default (constants = {
  API: {
    // SERVER_URL:
    //   Platform.OS === 'android'
    //     ? 'http://10.0.2.2:3000/api'
    //     // : 'http://192.168.0.100:3000/api',
    // : 'http://localhost:3000/api',
    // SOCKET_URL:
    //   Platform.OS === 'android'
    //     ? 'http://10.0.2.2:3000/' 
    //     // : 'http://192.168.0.100:3000/', 
    // : 'http://localhost:3000/',

    SERVER_URL: "https://watsappclone.herokuapp.com/api",
    SOCKET_URL: "https://watsappclone.herokuapp.com/", 

    LOGIN_USER: '/user/loginUser',
    USER_LIST: '/user/userList',
    CHAT_LIST: '/chat/chatList',
    CHAT_ROOM: '/room/chatRoom',
    CREATE_CHAT_ROOM: '/room/createRoom',
    UPDATE_CHAT_ROOM: '/room/updateRoom',
    LAST_SEEN: '/room/lastSeen',
    CREATE_USER_STATUS: '/status/createStatus',
    GET_ALL_STATUS: '/status/getAllStatus',
    SET_STATUS_VIEWED: '/status/statusViewed',
  },
  APP_NAME: 'WhatsApp Clone',
  USER_ID: 'UserId',
  ACCESS_TOKEN: 'AccessToken',
  USER_NAME: 'UserName',
  TIME_FORMAT: 'hh:mm A',
  DATE_TIME_FORMAT: 'DD MMM YYYY hh:mm A',
  FRIEND: 'FRIEND',
  OWNER: 'OWNER',
  CHAT_ROOM: 'CHAT_ROOM',
  CHAT_LIST: 'CHAT_LIST',
  LAST_SEEN: 'LAST_SEEN',
  SCAN_QR_CODE: 'SCAN_QR_CODE',
  USER_STATUS: 'USER_STATUS',
});
