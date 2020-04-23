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
  TextField,
  InputBase,
  TextareaAutosize
} from "@material-ui/core";
import { Mood, Mic, Search } from "@material-ui/icons";
import { makeStyles } from "@material-ui/styles";
import { webConstants } from "../../utils/webConstants";

const WebChatSearchBox = ({ onSendMessage }) => {
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
      <InputBase
        multiline
        rowsMax={5}
        style={styles.userMessage}
        placeholder="Search or start new chat"
        value={message}
        onKeyPress={e => handleKeyDown(e)}
        onChange={event => {
          // onTyping(event);
          setMessage(event.target.value);
        }}
      >
        <Search width={30} />
      </InputBase>
    </div>
    // </Paper>
  );
};

export default WebChatSearchBox;

const styles = {
  parentView: {
    backgroundColor: "#F7F7F7",
    display: "flex",
    width: "100%",
    flexDirection: "row",
    justifyContent: "center",
    maxHeight: 120,
  },
  userMessage: {
    fontSize: 14,
    color: TEXT_TITLE,
    justifyContent: "center",
    alignSelf: "center",
    textAlignVertical: "center",
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 10,
    marginTop: 8,
    marginBottom: 8,
    resize: "vertical",
    backgroundColor: WHITE,
    borderRadius: 20,
    borderColor: "#F7F7F7",
    outline: "none",
    flex: 0.95,
    maxHeight:120, 
  }
};
