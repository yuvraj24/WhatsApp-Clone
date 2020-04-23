import React from 'react';
import {getSocket, getLocalData} from './helperFunctions';
import constants from './constants';
import moment from 'moment';

let socket = getSocket();

const handleAppStateChange = async nextAppState => {
  if (nextAppState === 'background') {
    // Do something here on app background.
    // console.log('App is in Background Mode.');
    socket.emit(constants.LAST_SEEN, await getUserData('Offline'));
  }

  if (nextAppState === 'active') {
    // Do something here on app active foreground mode.
    // console.log('App is in Active Foreground Mode.');
    socket.emit(constants.LAST_SEEN, await getUserData('Online'));
  }

  if (nextAppState === 'inactive') {
    // Do something here on app inactive mode.
    // console.log('App is in inactive Mode.');
    socket.emit(constants.LAST_SEEN, await getUserData('Offline'));
  }
};

export async function sendPageLoadStatus() {
  // On page load
  socket.emit(constants.LAST_SEEN, await getUserData('Online'));
}

async function getUserData(status) {
  const data = {
    userId: await getLocalData(constants.USER_ID),
    userName: await getLocalData(constants.USER_NAME),
    status: status,
    lastSeen: moment().format(), 
  };
  // console.log(JSON.stringify(data));
  return data;
}

export default handleAppStateChange;
