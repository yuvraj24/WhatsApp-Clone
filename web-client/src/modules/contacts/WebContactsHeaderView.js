import React from "react";
import { GREEN, WHITE, LIGHT_GREEN } from "../../utils/webColors";
import { Icon, Typography } from "@material-ui/core";
import { ArrowBack } from "@material-ui/icons";

const WebContactsHeaderView = ({ item, onChatCloseClick }) => {
  return (
    <div style={styles.parentView}>
      <div
        onClick={() => { 
          onChatCloseClick();
        }}
        style={{ alignSelf: "center", justifyContent: "center",cursor:'pointer' }}
      >
        <ArrowBack style={styles.backIcon} />
      </div>
      <div
        style={{
          flexDirection: "column",
          marginLeft: 7,
          justifyContent: "center",
          fontSize: 24,
          alignSelf: "center"
        }}
      >
        <Typography numberOfLines={1} style={styles.userName}>
          Select contact
        </Typography>
        <Typography numberOfLines={2} style={styles.userMessage}>
          {item} contacts
        </Typography>
      </div>
      <div style={{ flexDirection: "row", justifyContent: "space-evenly" }}>
        <Icon
          name="dots-vertical"
          type="MaterialCommunityIcons"
          style={styles.menuIcons}
        />
      </div>
    </div>
  );
};

export default WebContactsHeaderView;

const styles = {
  parentView: {
    backgroundColor: "#00bfa5",
    elevation: 0,
    paddingLeft: 5,
    paddingRight: 0,
    display: "flex",
    height:120
  },
  backIcon: {
    justifyContent: "center",
    fontSize: 24,
    paddingLeft: 10,
    alignSelf: "center",
    color: WHITE
  },
  profileIcon: {
    marginLeft: 0,
    width: 45,
    height: 45,
    alignSelf: "center"
  },
  userName: {
    fontSize: 20,
    color: WHITE,
    fontWeight: "bold",
    paddingLeft: 15
  },
  userMessage: {
    fontSize: 16,
    color: WHITE,
    marginTop: 3,
    alignSelf: "flex-start",
    paddingLeft: 15
  },
  menuIcons: {
    fontSize: 24,
    color: WHITE,
    marginLeft: 8,
    alignSelf: "center"
  }
};
