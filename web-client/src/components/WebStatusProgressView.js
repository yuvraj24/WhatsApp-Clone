import React, { useState, useReducer, useEffect } from "react";
import StoryContainer from "../modules/statusDetails/components/container/StoryContainer";
import {
  BAR_INACTIVE_COLOR,
  BAR_ACTIVE_COLOR,
  SLATE_GRAY,
  GRAY,
  WHITE,
} from "../modules/statusDetails/utils/colors";
import {
  statusReducer,
  statusState,
  SELECTED_STATUS,
} from "../modules/status/WebStatusReducer";
import { getDateTimeStatusFormat } from "../utils/webHelperFunctions";
import chatImage from "../assets/svg/chatImage.svg";
import {
  setUserStatusViewed,
  getStatus,
} from "../modules/status/WebStatusViewAction";

export const WebStatusProgressView = ({ statusData, isUser, dispatch, toggleStatusView }) => {
  var [state, dispatch] = useReducer(statusReducer, statusState);
  var { imageList, messageList } = state;

  useEffect(() => {
    getStatus(statusData, dispatch);
    if (!isUser) {
      setUserStatusViewed(statusData, 0);
    }
  }, []);

  return (
    <StoryContainer
      images={imageList}
      visible={true}
      duration={20}
      enableProgress={true}
      // Inbuilt User Information in header
      userProfile={{
        userName: statusData.userName,
        userMessage: getDateTimeStatusFormat(statusData.lastStatusTime),
        imageArrow: process.env.PUBLIC_URL + "images/back.svg",
        userImage: chatImage,
        onImageClick: (buttonType) => { 
          switch (buttonType) {
            case "back":
              console.log(`Back button tapped`);
              break;

            case "cancel":
              console.log(`Cancel button tapped`);
              break;
          }
          toggleStatusView()
        },
      }}
      // Custom Header component option
      // headerComponent={<View />}

      onChange={position => {
        if (!isUser) {
          setUserStatusViewed(statusData, position);
        }
      }}

      // Inbuilt Reply option  in Footer
      replyView={{
        messageList: messageList,
        isShowReply: true,
        onReplyTextChange: (textReply, progressIndex) => {
          console.log(`Text : ${textReply} , position : ${progressIndex}`);
        },
        onReplyButtonClick: (buttonType, progressIndex) => {
          switch (buttonType) {
            case "send":
              console.log(`Send button tapped for position : ${progressIndex}`);
              break;

            case "smiley":
              console.log(
                `Smiley button tapped for position : ${progressIndex}`
              );
              break;
          }
        },
      }}
      // Custom Footer component option
      // footerComponent={<View />}

      // ProgressBar style options
      barStyle={{
        barActiveColor: BAR_ACTIVE_COLOR,
        barInActiveColor: BAR_INACTIVE_COLOR,
        barWidth: 60, // always in number
        barHeight: 4, // always in number
      }}
      style={{
        height: "100%",
        width: "100%",
        fontFamily:'Roboto'
      }}
      imageStyle={{
        height: window.innerHeight,
        // width: x,
        // transform: `rotate(${90}deg)`
      }}
    />
  );
};
