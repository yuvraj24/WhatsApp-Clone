import React, { useState } from "react";
import {
  WHITE,
  GREEN,
  GRAY,
  TEXT_TITLE,
  LIGHT_GRAY,
  TEXT_DESCRIPTION,
  MENU_GRAY,
  RED,
  HEADER_COLOR
} from "../../utils/webColors";
import {
  Avatar,
  Input,
  Button,
  Paper,
  Card,
  InputBase,
  TextField,
  TextareaAutosize
} from "@material-ui/core";
import { Mood, Mic } from "@material-ui/icons";
import { makeStyles } from "@material-ui/styles";
import { webConstants } from "../../utils/webConstants";

const ChatTextInput = ({ onSendMessage, onTyping }) => {
  const [message, setMessage] = useState("");

  function handleKeyDown(event) {
    if (event.key === "Enter") {
      event.preventDefault();
      onSendMessage(message);
      setMessage("");
    }
  } 

  return (
    // <Paper elevation={webConstants.PAPER_ELEVATION}>
    <div style={styles.parentView}>
      <div style={styles.smileView}>
        <Mood style={styles.menuIcons} />
      </div>
      {/* <div style={{ width: "90%", justifyContent: "center", maxHeight: 120 }}>  */}
      <TextareaAutosize
        style={styles.userMessage}
        placeholder="Type a message ..."
        value={message}
        onKeyPress={e => handleKeyDown(e)}
        onChange={event => {
          onTyping(event);
          setMessage(event.target.value);
        }}
      />
      {/* <TextareaAutosize  aria-label="empty textarea" placeholder="Empty" /> */}
      {/* </div> */}
      <div style={styles.sendIconView}>
        <Avatar
          style={{
            backgroundColor: HEADER_COLOR
          }}
        >
          <Mic style={styles.sendIcon} />
        </Avatar>
      </div>
    </div>
    // </Paper>
  );
};

export default ChatTextInput;

const styles = {
  parentView: {
    backgroundColor: HEADER_COLOR,
    display: "flex",
    flex: 1,
    width: "100%",
    flexDirection: "row"
  },
  sendIcon: {
    color: MENU_GRAY,
    width: 30,
    height: 30,
    alignSelf: "center"
  },
  sendIconView: {
    flex: 0.05,
    paddingLeft: 10,
    backgroundColor: HEADER_COLOR,
    justifyContent: "center",
    alignSelf: "center"
  },
  userName: {
    fontSize: 16,
    color: WHITE,
    fontWeight: "bold"
  },
  userMessage: {
    fontSize: 16,
    flex: 0.9,
    color: TEXT_TITLE,
    justifyContent: "center",
    alignSelf: "center",
    textAlignVertical: "center",
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 20,
    paddingRight: 20,
    marginTop: 10,
    marginBottom: 10,
    maxHeight: 120,
    resize: "vertical",
    backgroundColor: WHITE,
    borderRadius: 20,
    borderColor: HEADER_COLOR,
    outline: "none"
  },
  menuIcons: {
    width: 30,
    height: 30,
    color: MENU_GRAY,
    alignSelf: "center"
  },
  smileView: {
    flex: 0.05,
    paddingLeft: 15,
    alignSelf: "center",
    backgroundColor: HEADER_COLOR,
    justifyContent: "center"
  }
};
