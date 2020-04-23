import React from "react";
import {
  STATUS_DESC,
  STATUS_TITLE,
  APP_BG_COLOR,
  GREEN,
  LIGHT_GREEN,
  WHITE,
  BLACK,
} from "../../utils/webColors";
import { webConstants } from "../../utils/webConstants";
import { Avatar, Typography } from "@material-ui/core";
import { Add } from "@material-ui/icons";
import PROFILE2 from "../../assets/images/profile2.jpg";

const WebStatusViewItem = ({ style, position }) => {
  return (
    <div style={Object.assign({}, styles.parent, style)}>
      <Avatar src={PROFILE2} style={styles.profileImage} />
      <div
        style={{
          flexDirection: "column",
          marginLeft: '3%',
        }}
      >
        <Typography numberOfLines={1} style={styles.userName}>
          My Status
        </Typography>
        <Typography numberOfLines={2} style={styles.userMessage}>
          today at 8:26 PM
        </Typography>
      </div>
    </div>
  );
};

export default WebStatusViewItem;

const styles = {
  parent: {
    display: "flex",
    flexDirection: "row",
    flex: 1,
    alignItems: "center",
    marginTop: '-10%'
  },
  profileImage: {
    width: webConstants.STATUS_IMAGE_SIZE,
    height: webConstants.STATUS_IMAGE_SIZE,
    borderRadius: webConstants.STATUS_IMAGE_SIZE / 2,
  },
  userName: {
    fontSize: 16,
    fontWeight: 500,
    color: STATUS_TITLE,
  },
  userMessage: {
    fontSize: 14,
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
};
