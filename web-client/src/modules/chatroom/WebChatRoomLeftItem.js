import React, { useState } from "react";
import {
  GRAY,
  TEXT_DESCRIPTION,
  APP_BG_COLOR,
  GREEN,
  WHITE,
  LIGHT_GREEN,
  TEXT_TITLE
} from "../../utils/webColors";
import PROFILE from "../../assets/images/profile2.jpg";
import { getTimeInFormat } from "../../utils/webHelperFunctions";
import { Avatar, Card, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";

const ChatRoomLeftItem = ({ item, styleList }) => {
  // const styles = useState();

  return (
    <div style={Object.assign({}, styles.parentView, styleList)}>
      {/* <Avatar style={styles.profileImage} src={PROFILE} /> */}
      <Card style={styles.cardView} variant={'elevation'} elevation={0.9}>
          <Typography style={styles.userMessage}>{item.chatMessage}</Typography>
          <Typography style={styles.userTime}>
            {getTimeInFormat(item.chatTime)}
          </Typography> 
      </Card>
    </div>
  );
};

export default ChatRoomLeftItem;

const styles = {
  parentView: {
    marginLeft: "2%",
    maxWidth: "60%",
    justifyContent: "flex-start", 
    flexDirection: "row",
    display: "flex"
  },
  profileImage: {
    width: 40,
    height: 40,
    marginRight: "2%",
    marginTop: '2%',
  },
  userName: {
    fontSize: 16,
    marginTop: 3
  },
  userMessage: {
    fontSize: 14,
    color: TEXT_TITLE,
    marginTop: 3,
    alignSelf: "flex-start"
  },
  userTime: {
    fontSize: 11,
    color: GRAY,
    alignSelf: "flex-end",
    textAlign: "right"
  },
  msgIcon: {
    fontSize: 26,
    color: GRAY,
    marginTop: 3,
    alignSelf: "flex-end",
    marginRight: -10
  },
  cardView: { 
    backgroundColor: "#FFF",
    paddingTop: 5,
    paddingLeft: 8,
    paddingRight: 8,
    paddingBottom: 3,
    marginTop: 2,
    marginBottom: 2, 
  }
};
