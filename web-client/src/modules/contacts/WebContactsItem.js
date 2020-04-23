import React from "react";
import {
  GRAY,
  WHITE,
  LIGHT_GREEN,
  INPUT_ORANGE,
  RED
} from "../../utils/webColors";
import USER from "../../assets/images/user.png";
import { getContactsChatModel } from "../../utils/webHelperModels";
import { Typography, Avatar } from "@material-ui/core";

const WebContactsItem = ({ item, onItemClick }) => {
  return (
    <div
      onClick={() => onItemClick(item)}
      style={{
        display: "flex",
        padding: "1%",
        width: "28%",
        cursor:'pointer'
      }}
    >
      <Typography
        style={{
          display: "flex",
          flex: 0.2,
          marginTop: 5,
          justifyContent: "center"
        }}
      >
        {!item.thumbnailPath && <Avatar source={USER} />}
      </Typography>
      <div
        style={{
          flexDirection: "column",
          alignSelf: "flex-start",
          justifyContent: "flex-start",
          flex: 0.8,
          marginLeft: 10
        }}
      >
        <Typography numberOfLines={1} style={styles.userName}>
          {item.userName}
        </Typography>
        <Typography numberOfLines={2} style={styles.userMessage}>
          {item.phoneNumber}
        </Typography>
      </div>
      <div style={{ display: "flex", flex: 0.2, justifyContent: "center" }}>
        <Typography style={styles.userTime}>{item.time}</Typography>
        <Typography style={styles.textMsgCount}>
          {item.numberType.toUpperCase()}
        </Typography>
        {item.msgIcon != "" && (
          <Typography
            style={styles.msgIcon}
            name={item.msgIcon}
            type={item.msgIconType}
          />
        )}
      </div>
    </div>
  );
};

export default WebContactsItem;

const styles = {
  profileImage: {
    width: 60,
    height: 60,
    borderRadius: 60 / 2
  },
  userName: {
    marginTop: 1,
    fontSize: 16
  },
  userMessage: {
    fontSize: 14,
    color: GRAY,
    marginTop: 3,
    alignSelf: "flex-start"
  },
  userTime: {
    fontSize: 12,
    color: GRAY,
    alignSelf: "flex-end"
  },
  msgIcon: {
    fontSize: 26,
    color: GRAY,
    marginTop: 3,
    alignSelf: "flex-end",
    marginRight: -10
  },
  textMsgCountView: {
    fontSize: 12,
    color: WHITE,
    backgroundColor: LIGHT_GREEN,
    justifyContent: "center",
    alignSelf: "flex-end",
    width: 24,
    height: 24,
    borderRadius: 24 / 2,
    marginTop: 10
  },
  textMsgCount: {
    fontSize: 12,
    color: GRAY,
    justifyContent: "center",
    alignSelf: "center"
  }
};
