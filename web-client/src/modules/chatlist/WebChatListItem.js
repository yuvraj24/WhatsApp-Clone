import React, { useEffect, useState } from "react";
import {
  GRAY,
  WHITE,
  LIGHT_GREEN,
  TEXT_TITLE,
  LIGHT_GRAY,
  APP_BG_COLOR,
  LIGHT_GRAY_0
} from "../../utils/webColors";
import moment from "moment";
import PROFILE from "../../assets/images/user.png";
import { webConstants } from "../../utils/webConstants";
import { getTimeInFormat, getUserType } from "../../utils/webHelperFunctions";
import { makeStyles } from "@material-ui/core/styles";
import {
  List,
  ListItem,
  Divider,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Typography
} from "@material-ui/core";
import chatImage from "../../assets/svg/chatImage.svg";
import { styles } from "../status/WebStatusView";

const WebChatListItem = ({ item, position, onItemClick }) => {
  const [userType, setUserType] = useState("");
  const classes = useStyles();

  let data = item.chat[0];

  useEffect(() => {
    setUserName();
  }, []);

  function setUserName() {
    let userType = getUserType(item);
    setUserType(userType);
  }

  return (
    <div style={{cursor:'pointer'}} onClick={() => onItemClick(item)}>
      {position > 0 && (
        <div
          light={true}
          className={classes.parentDiv}
        />
      )}
      <ListItem
        alignItems="flex-start"
        style={{
          display: "flex",
          flexDirection: "row",
          flex: 1,
          marginTop: "-1%"
        }}
      >
        <ListItemAvatar style={{ flex: 0.15, marginLeft: "-1%" }}>
          {/* <chatImage /> */}
          <Avatar alt="User" src={chatImage} className={classes.profileImage} />
        </ListItemAvatar>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            flex: 0.7
          }}
        >
          <ListItemText
            primary={
              <Typography className={classes.userName}>
                {userType == webConstants.FRIEND
                  ? data.userName
                  : data.chatName}
              </Typography>
            }
          />
          <ListItemText
            secondary={
              <Typography className={classes.userMessage}>
                {data.chatMessage}
              </Typography>
            }
          />
        </div>
        <ListItemText
          style={{
            display: "flex",
            flex: 0.15,
            justifyContent: "flex-end",
            alignItems: "flex-end",
            flexDirection: "column"
          }}
          primary={
            <Typography className={classes.userTime}>
              {getTimeInFormat(data.chatTime)}
            </Typography>
          }
          secondary={
            <Avatar className={item.chatUnreadCount != 0 ? classes.avatarStyle : classes.emptyAvatarStyle}>
              <Typography className={classes.textMsgCount}>
                {item.chatUnreadCount}
              </Typography>
            </Avatar>
          }
        />
      </ListItem>

      {/* <Card transparent style={{ elevation: 0, marginRight: -5 }}>
        <CardItem>
          <View style={{ marginLeft: -5 }}>
            <Thumbnail
              source={
                data.chatImage === ""
                  ? PROFILE
                  : { isStatic: true, uri: data.chatImage }
              }
            />
          </View>
          <Body
            style={{
              flexDirection: "column",
              marginLeft: 15
            }}
          >
            <Text
              numberOfLines={1}
              style={[DEFAULT_STYLES.poppinsSemiBold, styles.userName]}
            >
              {userType == webConstants.FRIEND ? data.userName : data.chatName}
            </Text>

            <Text
              numberOfLines={2}
              style={[DEFAULT_STYLES.poppinsLight, styles.userMessage]}
            >
              {data.chatMessage}
            </Text>
          </Body>
          <View>
            <Text style={[DEFAULT_STYLES.poppinsSemiBold, styles.userTime]}>
              {getTimeInFormat(item.chatTime)}
            </Text>
            {data.chatUnreadCount === "" && (
              <View style={styles.textMsgCountView}>
                <Text
                  style={[DEFAULT_STYLES.poppinsSemiBold, styles.textMsgCount]}
                >
                  {data.chatUnreadCount}
                </Text>
              </View>
            )}
            {data.chatUnreadCount != "" && (
              <Icon
                style={styles.msgIcon}
                name={data.chatUnreadCount}
                type={data.chatUnreadCount}
              />
            )}
          </View>
        </CardItem>
      </Card> */}
    </div>
  );
};

export default WebChatListItem;

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
    fontFamily:'Roboto'
  },
  parentDiv: {
    height: 0.3,
    backgroundColor: LIGHT_GRAY_0,
    maxWidth: "83%",
    width: "100%",
    right: 0,
    justifyContent: "flex-end",
    alignSelf: "flex-end",
    flexDirection: "row",
    display: "flex",
    marginLeft: "auto",
    marginRight: 0, 
    fontFamily:'Roboto'
  },
  inline: {
    display: "inline"
  },
  profileImage: {
    width: 50,
    height: 50,
    alignSelf: "center",
    marginLeft: "-5%"
  },
  userName: {
    fontSize: 16,
    marginTop: 6
  },
  userMessage: {
    fontSize: 14,
    color: GRAY,
    marginTop: -8,
    width: 280,
    // flex: 0.3,
    alignSelf: "flex-start",
    textOverflow: "ellipsis",
    overflow: "hidden",
    whiteSpace: "nowrap", 
    fontFamily:'Roboto'
  },
  userTime: {
    fontSize: 12,
    marginTop: 6,
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
  avatarStyle: {
    fontSize: 8,
    width: 10,
    height: 10,
    marginTop: 6,
    display: "flex",
    padding: 6,
    justifyContent: "center",
    alignSelf: "center",
    backgroundColor: LIGHT_GREEN
  },
  emptyAvatarStyle: {
    fontSize: 8,
    width: 10,
    height: 10,
    marginTop: 6,
    display: "flex",
    padding: 6,
    justifyContent: "center",
    alignSelf: "center",
    backgroundColor: WHITE
  },
  textMsgCount: {
    fontSize: 10,
    color: WHITE,
    fontWeight: "bold",
    justifyContent: "center",
    alignSelf: "center", 
  }
}));
