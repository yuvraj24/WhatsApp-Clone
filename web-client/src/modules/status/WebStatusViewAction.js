import React from "react";
import WebMyStatusView from "./WebMyStatusView";
import { CellMeasurer, CellMeasurerCache } from "react-virtualized";
import WebStatusViewItem from "./WebStatusViewItem";
import { Divider, Typography } from "@material-ui/core";
import { styles } from "./WebStatusView";

import {
  MASTER_STATUS_LIST,
  LOADING,
  IMAGE_LIST,
  MESSAGE_LIST,
  STATUS_LIST,
  VIEWED_STATUS_LIST,
  RECENT_STATUS_LIST,
} from "./WebStatusReducer";
import { getStatusModel } from "../../utils/webHelperModels";
import {
  createUserStatus,
  setUserStatusViewedForID,
  getAllUserStatus,
} from "../../api/webApiController";
import {
  showToast,
  getUniqueId,
  getLocalData,
  getSocket,
} from "../../utils/webHelperFunctions";
import { webConstants } from "../../utils/webConstants";

export const statusCache = new CellMeasurerCache({
  fixedWidth: true,
  fixedHeight: true,
  defaultHeight: 65,
});

export function getStatus(statusData, dispatch) {
  const mImageArray = [];
  const mMsgArray = [];
  if (statusData.status) {
    statusData.status.forEach((element) => {
      mImageArray.push(element.image);
      mMsgArray.push(element.message);
    });
    dispatch({ type: IMAGE_LIST, payload: mImageArray });
    dispatch({ type: MESSAGE_LIST, payload: mMsgArray });
  }
}

export async function getUserStatusFromAPI(dispatch) {
  const id = getLocalData(webConstants.USER_ID);
  const res = await getAllUserStatus();
  if (res.status === 200) {
    console.log(res.data);
    if (res.data.status) {
      getUserStatusTypes({
        userId: id,
        dispatch: dispatch,
        statusList: res.data.status,
      });
    }
  }
}

export function getUserStatusTypes({ userId, dispatch, statusList }) {
  // alert('Called')
  const recentStatus = [];
  const viewedStatus = [];
  const masterStatusList = [];

  statusList.forEach((item) => {
    if (item.userId === userId) {
      dispatch({ type: STATUS_LIST, payload: item });
    } else {
      var count = 0;

      item.status.forEach((element) => {
        for (let i = 0; i < element.seenUsers.length; i++) {
          const statusUserId = element.seenUsers[i];
          if (statusUserId === userId) {
            count++;
          }
        }
      });

      if (count < item.status.length) {
        recentStatus.push(item);
      } else {
        viewedStatus.push(item);
      }
    }
  });

  masterStatusList.push({ type: "RECENT" });

  recentStatus.forEach((element) => {
    element.view = RECENT_STATUS_LIST
    masterStatusList.push(element);
  });

  if (viewedStatus.length > 0) {
    masterStatusList.push({ type: "VIEWED" });

    viewedStatus.forEach((element) => {
      element.view = VIEWED_STATUS_LIST
      masterStatusList.push(element);
    });
  }

  dispatch({ type: MASTER_STATUS_LIST, payload: masterStatusList });
}

export async function setUserStatusViewed(statusItem, position) {
  const payload = {
    userId: statusItem.userId,
    loginId: getLocalData(webConstants.USER_ID),
    statusId: statusItem.status[position]._id,
  };
  const res = await setUserStatusViewedForID(payload);
  console.log("Status Viewed : ", res.data);
}

export function getStatusView({
  index,
  parent,
  key,
  style,
  masterStatusList,
  dispatch,
}) {
  try { 
    if (masterStatusList[index].type) {
      if (masterStatusList[index].type === "RECENT") {
        return (
          <div key={key} style={style}>
            <Divider style={Object.assign({}, styles.dividerStyle)} />
            <Typography style={Object.assign({}, styles.userName)}>
              RECENT
            </Typography>
          </div>
        );
      } else if (masterStatusList[index].type === "VIEWED") {
        return (
          <div key={key} style={style}>
            <Divider style={Object.assign({}, styles.dividerStyle)} />
            <Typography style={Object.assign({}, styles.userName)}>
              VIEWED
            </Typography>
          </div>
        );
      }
    } else {
      return (
        <div>
          <WebMyStatusView
            style={style}
            position={index}
            statusData={masterStatusList[index]}
            isBorder={masterStatusList[index].view === RECENT_STATUS_LIST}
            isUser={false}
            dispatch={dispatch}
          />
        </div>
      );
    }
  } catch (error) {
    return <div />;
  }
}
