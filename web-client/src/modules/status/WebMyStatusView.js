import React from "react";
import {
  STATUS_DESC,
  STATUS_TITLE,
  APP_BG_COLOR,
  GREEN,
  LIGHT_GREEN,
  WHITE,
  BLACK,
  GRAY,
} from "../../utils/webColors";
import { webConstants } from "../../utils/webConstants";
import { Avatar, Typography } from "@material-ui/core";
import { Add } from "@material-ui/icons";
import PROFILE2 from "../../assets/images/profile2.jpg";
import WebTimeElapsed from "../../components/WebTimeElapsed.tsx";
import { SELECTED_STATUS } from "./WebStatusReducer";

const WebMyStatusView = ({ style, statusData, isUser, isBorder, dispatch }) => {
  const statusImage =
    statusData && statusData.status && statusData.status.length > 0
      ? statusData.status[statusData.status.length - 1].image + ""
      : "";
  // console.log('Status Item : ', statusData);

  return (
    <div
      style={Object.assign({}, styles.parent, style)}
      onClick={() => {
        // showStatusView(statusData);
        dispatch({ type: SELECTED_STATUS, payload: statusData });
      }}
    >
      <div
        style={Object.assign(
          isBorder ? styles.circleView : isUser ? styles.circleNoView : styles.circleSeenView
        )}
      >
        <Avatar
          src={statusImage ? statusImage : PROFILE2}
          style={isBorder ? styles.profileImage : isUser ? styles.profileNoImage : styles.profileImage}
        />
      </div>
      <div
        style={{
          flexDirection: "column",
          marginLeft: "3%",
        }}
      >
        <Typography numberOfLines={1} style={styles.userName}>
          {isUser ? "My Status" : statusData.userName}
        </Typography>
        <WebTimeElapsed
          style={styles.userMessage}
          time={
            statusData.lastStatusTime
              ? statusData.lastStatusTime
              : "Tap to add status update"
          }
          // interval={1000}
          isValid={statusData != ""}
        />
        {/* <Typography numberOfLines={2} style={styles.userMessage}>
          No updates
        </Typography> */}
      </div>
    </div>
  );
};

export default WebMyStatusView;

const styles = {
  parent: {
    display: "flex",
    flexDirection: "row",
    flex: 1,
    alignItems: "center",
    cursor: "pointer",
  },
  profileImage: {
    width: webConstants.STATUS_IMAGE_SIZE,
    height: webConstants.STATUS_IMAGE_SIZE,
    borderRadius: webConstants.STATUS_IMAGE_SIZE / 2,
    alignSelf: "center",
  },
  profileNoImage: {
    width: webConstants.STATUS_IMAGE_SIZE + 5,
    height: webConstants.STATUS_IMAGE_SIZE + 5,
    borderRadius: webConstants.STATUS_IMAGE_SIZE + 5 / 2,
    alignSelf: "center",
  },
  userName: {
    fontSize: 16,
    fontWeight: 500,
    color: STATUS_TITLE,
  },
  userMessage: {
    fontSize: 13,
    color: STATUS_DESC,
    fontWeight: 600,
    alignSelf: "flex-start",
  },
  userTime: {
    fontSize: 12,
    color: WHITE,
    alignSelf: "flex-end",
  },
  msgIcon: {
    fontSize: 26,
    color: GREEN,
    alignSelf: "flex-end",
  },
  circleView: {
    borderRadius: 100,
    border: "2px solid red",
    width: webConstants.STATUS_IMAGE_SIZE,
    height: webConstants.STATUS_IMAGE_SIZE,
    padding: 2,
    justifyContent: "center",
    alignItems: "center",
    borderColor: LIGHT_GREEN,
  },
  circleNoView: {
    borderRadius: 100,
    border: "2px solid transparent",
    width: '55px',
    height: '55px',
    padding: 2,
    justifyContent: "center",
    alignItems: "center",
    borderColor: 'transparent',
  },
  circleSeenView: {
    borderRadius: 100,
    border: "2px solid red",
    width: webConstants.STATUS_IMAGE_SIZE,
    height: webConstants.STATUS_IMAGE_SIZE,
    padding: 2,
    justifyContent: "center",
    alignItems: "center",
    borderColor: STATUS_DESC,
  },
};
