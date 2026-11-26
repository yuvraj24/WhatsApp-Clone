import axios from "axios";
import { auth } from "../utils/firebase";
import { webConstants } from "../utils/webConstants";

const api = axios.create({
  baseURL: webConstants.API.SERVER_URL,
});

api.interceptors.request.use(async (request) => {
  if (auth && auth.currentUser) {
    request.headers = request.headers || {};
    request.headers.Authorization = `Bearer ${await auth.currentUser.getIdToken()}`;
  }
  return request;
});

export const syncProfile = (displayName) =>
  api.post("/user/session", { displayName });

export const getProfile = () => api.get("/user/me");

export const searchUserByPhone = (phoneNumber) =>
  api.get("/user/search", { params: { phoneNumber } });

export const getConversations = () => api.get("/chat/conversations");

export const createConversation = (userId) =>
  api.post("/chat/conversations", { userId });

export const getConversationMessages = (conversationId) =>
  api.get(`/chat/conversations/${encodeURIComponent(conversationId)}/messages`);

export const sendConversationMessage = (conversationId, text) =>
  api.post(
    `/chat/conversations/${encodeURIComponent(conversationId)}/messages`,
    { text }
  );

export const getChatList = () => api.get(webConstants.API.CHAT_LIST);
export const getChatRoom = (payload) =>
  api.post(webConstants.API.CHAT_ROOM, payload);
export const createChatRoom = (payload) =>
  api.post(webConstants.API.CREATE_CHAT_ROOM, payload);
export const updateChatRoom = (payload) =>
  api.post(webConstants.API.UPDATE_CHAT_ROOM, payload);
export const loginUser = (payload) =>
  api.post(webConstants.API.LOGIN_USER, payload);
export const getLoggedInUserList = (payload) =>
  api.get(webConstants.API.USER_LIST, payload);
export const getLastSeenUser = (payload) =>
  api.post(webConstants.API.LAST_SEEN, payload);
export const createUserStatus = (payload) =>
  api.post(webConstants.API.CREATE_USER_STATUS, payload);
export const getAllUserStatus = () =>
  api.get(webConstants.API.GET_ALL_STATUS);
export const setUserStatusViewedForID = (payload) =>
  api.post(webConstants.API.SET_STATUS_VIEWED, payload);
