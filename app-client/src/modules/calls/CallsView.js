import React from 'react';
import {
  Text,
  Image,
  StyleSheet,
  View,
  ScrollView,
  FlatList,
} from 'react-native';
import {
  Card,
  CardItem,
  Body,
  Left,
  Thumbnail,
  Icon,
  Right,
  Container,
  Fab,
  Button,
} from 'native-base';
import {DEFAULT_STYLES} from '../../utils/styles';
import {
  GRAY,
  TEXT_DESCRIPTION,
  APP_BG_COLOR,
  GREEN,
  LIGHT_GREEN,
  LIGHT_GRAY_0,
  LIGHT_GRAY,
  TEXT_SUBTITLE,
} from '../../utils/colors';

import ADD_STATUS from '../../../assets/images/add_status.png';
import CallsViewItem from '../calls/CallsViewItem';

// import THOR from '../../../assets/images/thor.jpg';
// import JACKMAN from '../../../assets/images/jackman.jpg';
// import FEDERER from '../../../assets/images/federer.jpg';
// import PROFILE1 from '../../../assets/images/profile1.jpg';
// import PROFILE2 from '../../../assets/images/profile2.jpg';
import _Divider from '../../components/_Divider';

const CallsView = ({item}) => {
//   const messageArray = [
//     {
//       name: 'Yuvraj Pandey',
//       profile: PROFILE2,
//       message:
//         'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
//       time: '10 minutes ago, 7:39 PM',
//       msgIcon: 'arrow-bottom-left',
//       callTypeIcon: 'call',
//       isMissed: true,
//     },
//     {
//       name: 'Marina Smith',
//       profile: PROFILE1,
//       message:
//         'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
//       time: 'Today, 11:02 PM',
//       msgIcon: 'arrow-top-right',
//       callTypeIcon: 'videocam',
//     },
//     {
//       name: 'Huge Jackman',
//       profile: JACKMAN,
//       message:
//         'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.',
//       time: '40 seconds ago, 7:39 PM',
//       msgIcon: 'arrow-bottom-left',
//       callTypeIcon: 'call',
//       isMissed: true,
//     },
//     {
//       name: 'Rojer Federer',
//       profile: FEDERER,
//       message:
//         'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
//       time: 'Yesterday, 1:20 PM',
//       msgIcon: 'arrow-top-right',
//       callTypeIcon: 'videocam',
//     },
//     {
//       name: 'Chris Hemsworth',
//       profile: THOR,
//       message:
//         'Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.',
//       time: '45 minutes ago, 12:12 PM',
//       msgIcon: 'arrow-top-right',
//       callTypeIcon: 'call',
//     },
//     {
//       name: 'John Cena',
//       profile: PROFILE2,
//       message:
//         'Lorem Ipsum has been the industrys     standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.',
//       time: 'Yesterday, 3:59 PM',
//       msgIcon: 'arrow-top-right',
//       callTypeIcon: 'videocam',
//       isMissed: true,
//     },
//     {
//       name: 'Robert Downey Jr',
//       profile: PROFILE2,
//       message:
//         'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
//       time: 'Today, 11:02 PM',
//       msgIcon: 'arrow-bottom-left',
//       callTypeIcon: 'call',
//     },
//     {
//       name: 'Huge Jackman',
//       profile: JACKMAN,
//       message:
//         'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.',
//       time: 'Today, 7:39 PM',
//       msgIcon: 'arrow-bottom-left',
//       callTypeIcon: 'videocam',
//     },
//     {
//       name: 'Chris Hemsworth',
//       profile: THOR,
//       message:
//         'Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.',
//       time: '2 seconds ago, 7:39 PM',
//       msgIcon: 'arrow-bottom-left',
//       callTypeIcon: 'videocam',
//     },
//     {
//       name: 'John Cena',
//       profile: PROFILE2,
//       message:
//         'Lorem Ipsum has been the industrys     standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.',
//       time: 'Yesterday, 3:59 PM',
//       msgIcon: 'arrow-top-right',
//       callTypeIcon: 'videocam',
//       isMissed: true,
//     },
//     {
//       name: 'Robert Downey Jr',
//       profile: PROFILE2,
//       message:
//         'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
//       time: 'Today, 11:02 PM',
//       msgIcon: 'arrow-bottom-left',
//       callTypeIcon: 'call',
//     },
//     {
//       name: 'Huge Jackman',
//       profile: JACKMAN,
//       message:
//         'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.',
//       time: 'Today, 7:39 PM',
//       msgIcon: 'arrow-bottom-left',
//       callTypeIcon: 'videocam',
//     },
//     {
//       name: 'Chris Hemsworth',
//       profile: THOR,
//       message:
//         'Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.',
//       time: '2 seconds ago, 7:39 PM',
//       msgIcon: 'arrow-bottom-left',
//       callTypeIcon: 'videocam',
//     },
//     {
//       name: 'John Cena',
//       profile: PROFILE2,
//       message:
//         'Lorem Ipsum has been the industrys     standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.',
//       time: 'Yesterday, 3:59 PM',
//       msgIcon: 'arrow-top-right',
//       callTypeIcon: 'videocam',
//       isMissed: true,
//     },
//     {
//       name: 'Robert Downey Jr',
//       profile: PROFILE2,
//       message:
//         'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
//       time: 'Today, 11:02 PM',
//       msgIcon: 'arrow-bottom-left',
//       callTypeIcon: 'call',
//     },
//     {
//       name: 'Huge Jackman',
//       profile: JACKMAN,
//       message:
//         'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.',
//       time: 'Today, 7:39 PM',
//       msgIcon: 'arrow-bottom-left',
//       callTypeIcon: 'videocam',
//     },
//     {
//       name: 'Chris Hemsworth',
//       profile: THOR,
//       message:
//         'Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.',
//       time: '2 seconds ago, 7:39 PM',
//       msgIcon: 'arrow-bottom-left',
//       callTypeIcon: 'videocam',
//     },
//   ];

  return (
    <View>
      <FlatList
        data={[]}
        keyExtractor={(item, index) => index.toString()}
        ItemSeparatorComponent={() => {
          return <_Divider />;
        }}
        renderItem={({item}) => {
          return <CallsViewItem item={item} />;
        }}
      />
    </View>
  );
};

export default CallsView;

const styles = StyleSheet.create({
  profileImage: {
    width: 60,
    height: 60,
    borderRadius: 60 / 2,
  },
  userName: {
    fontSize: 16,
    marginTop: 3,
  },
  userMessage: {
    fontSize: 14,
    color: GRAY,
    marginTop: 3,
    alignSelf: 'flex-start',
  },
  userTime: {
    fontSize: 14,
    color: GREEN,
    marginLeft: 15,
    marginVertical: 8,
    fontWeight: 'bold',
  },
  msgIcon: {
    fontSize: 26,
    color: GREEN,
    alignSelf: 'flex-end',
  },
});
