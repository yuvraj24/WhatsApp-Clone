import axios from "axios";
import { webConstants } from "../utils/webConstants";
import { getLocalData } from "../utils/webHelperFunctions";

const api = axios.create({
  baseURL: webConstants.API.SERVER_URL,
});

// Add a request interceptor
api.interceptors.request.use(
  (request) => {
    const token = getLocalData(webConstants.ACCESS_TOKEN);
    request.headers = { Authorization: token };
    console.log("Request Interceptor = ", request);
    return request;
  },
  (error) => {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
api.interceptors.response.use(
  (response) => {
    console.log("Response Interceptor = ", JSON.stringify(response.data));
    return response;
  },
  (error) => {
    // Do something with response error
    return Promise.reject(error);
  }
);

export const getChatList = () => {
  return api.get(webConstants.API.CHAT_LIST);
};
export const getChatRoom = (payload) => {
  return api.post(webConstants.API.CHAT_ROOM, payload);
};
export const createChatRoom = (payload) => {
  return api.post(webConstants.API.CREATE_CHAT_ROOM, payload);
};
export const updateChatRoom = (payload) => {
  return api.post(webConstants.API.UPDATE_CHAT_ROOM, payload);
};

export const loginUser = (payload) => {
  return api.post(webConstants.API.LOGIN_USER, payload);
};

export const getLoggedInUserList = (payload) => {
  return api.get(webConstants.API.USER_LIST, payload);
};

export const getLastSeenUser = (payload) => {
  return api.post(webConstants.API.LAST_SEEN, payload);
};

export const createUserStatus = (payload) => {
  return api.post(webConstants.API.CREATE_USER_STATUS, payload);
};

export const getAllUserStatus = () => {
  return api.get(webConstants.API.GET_ALL_STATUS);
};

export const setUserStatusViewedForID = (payload) => {
  return api.post(webConstants.API.SET_STATUS_VIEWED, payload);
};
