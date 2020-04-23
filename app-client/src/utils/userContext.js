import React from 'react';
import {getLocalData} from './helperFunctions';
import constants from './constants';

export const UserContext = React.createContext(getUserDetails());

export async function getUserDetails() {
  return {
    token: await getLocalData(constants.ACCESS_TOKEN),
    userId: await getLocalData(constants.USER_ID),
    userName: await getLocalData(constants.USER_NAME),
  };
}
