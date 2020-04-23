import axios from 'axios';
import constants from '../utils/constants';
import {getLocalData} from '../utils/helperFunctions';

const api = axios.create({
  baseURL: constants.API.SERVER_URL,
});

// Add a request interceptor
api.interceptors.request.use(
  async request => {
    const token = await getLocalData(constants.ACCESS_TOKEN);
    request.headers = {Authorization: token};
    console.log('Request Interceptor = ', request);
    return request;
  },
  error => {
    // Do something with request error
    return Promise.reject(error);
  },
);

// Add a response interceptor
api.interceptors.response.use(
  async response => {
    console.log('Response Interceptor = ', JSON.stringify(response.data));
    return response;
  },
  error => {
    // Do something with response error
    return Promise.reject(error);
  },
);

export const getChatList = () => {
  return api.get(constants.API.CHAT_LIST);
};
export const getChatRoom = payload => {
  return api.post(constants.API.CHAT_ROOM, payload);
};
export const createChatRoom = payload => {
  return api.post(constants.API.CREATE_CHAT_ROOM, payload);
};
export const updateChatRoom = payload => {
  return api.post(constants.API.UPDATE_CHAT_ROOM, payload);
};

export const loginUser = payload => {
  return api.post(constants.API.LOGIN_USER, payload);
};

export const getLoggedInUserList = payload => {
  return api.get(constants.API.USER_LIST, payload);
};

export const getLastSeenUser = payload => {
  return api.post(constants.API.LAST_SEEN, payload);
};

export const createUserStatus = payload => {
  return api.post(constants.API.CREATE_USER_STATUS, payload);
};

export const getAllUserStatus = () => {
  return api.get(constants.API.GET_ALL_STATUS);
};

export const setUserStatusViewedForID = payload => {
  return api.post(constants.API.SET_STATUS_VIEWED, payload);
};
