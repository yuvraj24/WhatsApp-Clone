import React, {useState, useEffect} from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {Card, CardItem, Icon, Thumbnail, Body, Right} from 'native-base';
import {
  APP_BG_COLOR,
  GREEN,
  INPUT_ORANGE,
  WHITE,
  GRAY,
  BLACK,
} from '../../utils/colors';
import PROFILE from '../../../assets/images/profile2.jpg';
import {DEFAULT_STYLES} from '../../utils/styles';
import USER from '../../../assets/images/user.png';
import {
  getDateTimeInFormat,
  getUserType,
  getSocket,
  getLocalData,
} from '../../utils/helperFunctions';
import constants from '../../utils/constants';
import {sendPageLoadStatus} from '../../utils/UserAppStateDetector';
import {getLastSeenUser} from '../../api/apiController';

let socket = getSocket();

const ChatRoomHeaderView = ({item, navigation, isNewChat}) => {
  // console.log('isNewChat =>', isNewChat);
  const [userType, setUserType] = useState('');
  const [displayLastSeen, setDisplayLastSeen] = useState('');
  const [apiLastSeen, setApiLastSeen] = useState('');

  let data = item.chat[0];

  useEffect(() => {
    populateUserType();
    getUserLastSeen();
    listenUserLastSeen();
  }, []);

  useEffect(() => {
    if (apiLastSeen != '') {
      calcLastSeen(apiLastSeen);
    }
  }, [apiLastSeen]);

  const populateUserType = async () => {
    let userType = await getUserType(item);
    setUserType(userType);
  };

  async function getUserLastSeen() {
    let userId = await getLocalData(constants.USER_ID);
    // This to get id of the other user
    let id = data.userId === userId ? data.chatId : data.userId;
    let request = {id: id};
    let res = getLastSeenUser(request);
    res
      .then(lastSeen => {
        if (lastSeen) {
          // console.log('User Last Seen ==> ', JSON.stringify(lastSeen));
          setApiLastSeen(lastSeen.data.lastSeen[0]);
        }
      })
      .catch(err => {
        console.log('User Last Seen ==> ', err);
      });
  }

  function listenUserLastSeen() {
    socket.on(constants.LAST_SEEN, async status => {
      // console.log('App Status == ', status);
      let newStatus = {
        userId: status.userId,
        userName: status.userName,
        status: status.status,
        lastSeen: status.lastSeen,
      };
      let id = await getLocalData(webConstants.USER_ID);
      if (status.userId != id) {
        calcLastSeen(newStatus);
      } else {
        // setDisplayLastSeen("");
      }
    });
    sendPageLoadStatus();
  }

  async function calcLastSeen(lastSeen) {
    if (lastSeen) {
      if (lastSeen.userId === data.userId || lastSeen.userId === data.chatId) { 
          let time =
            lastSeen.status === 'Offline'
              ? `Last seen at ${getDateTimeInFormat(lastSeen.lastSeen)}`
              : lastSeen.status;
          setDisplayLastSeen(time); 
      } else if (apiLastSeen != '') {
        let time = `Last seen at ${getDateTimeInFormat(apiLastSeen.lastSeen)}`;
        setDisplayLastSeen(time);
      }
    } else {
      // User last seen not available yet
      setApiLastSeen('');
      setDisplayLastSeen('');
    }
  }

  // function calcLastSeen(lastSeen) {
  //   if (lastSeen) {
  //     if (lastSeen.userId === data.userId || lastSeen.userId === data.chatId) {
  //       getLocalData(constants.USER_ID)
  //         .then(id => {
  //           if (lastSeen.userId != id) {
  //             let time =
  //               lastSeen.status === 'Offline'
  //                 ? `Last seen at ${getDateTimeInFormat(lastSeen.lastSeen)}`
  //                 : lastSeen.status;
  //             setDisplayLastSeen(time);
  //           } else if (apiLastSeen != '' && lastSeen != '') {
  //             let time = `Last seen at ${getDateTimeInFormat(
  //               lastSeen.lastSeen,
  //             )}`;
  //             setDisplayLastSeen(time);
  //           } else if (apiLastSeen != '') {
  //             let time = `Last seen at ${getDateTimeInFormat(
  //               apiLastSeen.lastSeen,
  //             )}`;
  //             setDisplayLastSeen(time);
  //           } else {
  //             setDisplayLastSeen('');
  //           }
  //         })
  //         .catch(() => {
  //           if (apiLastSeen != '' && lastSeen != '') {
  //             let time = `Last seen at ${getDateTimeInFormat(
  //               lastSeen.lastSeen,
  //             )}`;
  //             setDisplayLastSeen(time);
  //           } else if (apiLastSeen != '') {
  //             let time = `Last seen at ${getDateTimeInFormat(
  //               apiLastSeen.lastSeen,
  //             )}`;
  //             setDisplayLastSeen(time);
  //           } else {
  //             setDisplayLastSeen('');
  //           }
  //         });
  //     } else if (apiLastSeen != '') {
  //       let time = `Last seen at ${getDateTimeInFormat(apiLastSeen.lastSeen)}`;
  //       setDisplayLastSeen(time);
  //     }
  //   } else {
  //     // User last seen not available yet
  //     setApiLastSeen('');
  //     setDisplayLastSeen('');
  //   }
  // }

  return (
    <View style={{elevation: 0}}>
      <CardItem style={styles.parentView}>
        <View style={{flexDirection: 'row'}}>
          <Icon
            name="arrow-left"
            type="MaterialCommunityIcons"
            style={styles.backIcon}
            onPress={() => navigation.goBack()}
          />
          <Thumbnail
            source={
              !data.chatImage && data.chatImage != ''
                ? {isStatic: true, uri: data.chatImage}
                : USER
            }
            style={styles.profileIcon}
          />
          <Body
            style={{
              flexDirection: 'column',
              marginLeft: 10,
            }}>
            <Text
              numberOfLines={1}
              style={
                displayLastSeen != '' ? styles.userName : styles.centerUserName
              }>
              {userType == constants.FRIEND ? data.userName : data.chatName}
            </Text>
            {displayLastSeen != '' && (
              <Text
                numberOfLines={1}
                ellipsizeMode="tail"
                style={[DEFAULT_STYLES.poppinsLight, styles.userMessage]}>
                {/* Last seen at {getDateTimeInFormat(data.chatTime)} */}
                {displayLastSeen}
              </Text>
            )}
          </Body>
          <View style={{flexDirection: 'row', justifyContent: 'space-evenly'}}>
            <Icon
              name="video"
              type="MaterialCommunityIcons"
              style={styles.menuIcons}
            />
            <Icon
              name="phone"
              type="MaterialCommunityIcons"
              style={styles.menuIcons}
            />
            <Icon
              name="dots-vertical"
              type="MaterialCommunityIcons"
              style={styles.menuIcons}
            />
          </View>
        </View>
      </CardItem>
    </View>
  );
};

export default ChatRoomHeaderView;

const styles = StyleSheet.create({
  parentView: {
    backgroundColor: GREEN,
    elevation: 0,
    padding: -500,
    paddingLeft: 5,
    paddingRight: 0,
  },
  backIcon: {
    justifyContent: 'center',
    height: '100%',
    alignSelf: 'center',
    color: WHITE,
  },
  profileIcon: {
    marginLeft: 0,
    width: 45,
    height: 45,
    alignSelf: 'center',
  },
  userName: {
    fontSize: 18,
    color: WHITE,
    fontWeight: 'bold',
    paddingTop: 2,
    justifyContent: 'center',
  },
  centerUserName: {
    fontSize: 18,
    color: WHITE,
    fontWeight: 'bold',
    paddingTop: 12,
    justifyContent: 'center',
  },
  userMessage: {
    fontSize: 14,
    color: WHITE,
    marginTop: 3,
    alignSelf: 'flex-start',
  },
  menuIcons: {
    fontSize: 24,
    color: WHITE,
    marginLeft: 8,
    alignSelf: 'center',
  },
});
