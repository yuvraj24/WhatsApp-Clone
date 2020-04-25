import React from 'react';
import {View, StyleSheet} from 'react-native';
import {
  Container,
  Header,
  Tab,
  Tabs,
  TabHeading,
  Icon,
  Text,
} from 'native-base';
import {
  WHITE,
  TEXT_SUBTITLE,
  BLACK,
  GREEN,
  TEXT_TITLE,
} from '../../utils/colors';
import LoginScreen from '../login/LoginScreen';
import OTPValidation from '../login/OTPValidation';
import ChatListView from '../chat/ChatListView';
import StatusView from '../status/StatusView';
import CallsView from '../calls/CallsView'; 
import CameraComponent from '../../components/CameraView'

const TabView = ({navigation}) => (
  <Container>
    <Tabs
      initialPage={0}
      style={{elevation: 0, marginTop: -25}}
      tabContainerStyle={{
        elevation: 0,
        height: '8%',
      }}
      tabBarUnderlineStyle={{
        height: 2,
        backgroundColor: WHITE,
      }}>
      {/* <Tab
        heading={
          <TabHeading style={styles.tabStyle}>
            <Icon style={styles.tabTextStyle} name="camera" />
          </TabHeading>
        }> 
        <CameraComponent />
      </Tab> */}
      <Tab
        heading={
          <TabHeading style={styles.tabStyle}>
            <Text uppercase style={styles.tabTextStyle}>
              Chats
            </Text>
          </TabHeading>
        }>
        <ChatListView navigation={navigation} />
      </Tab>
      <Tab
        heading={
          <TabHeading style={styles.tabStyle}>
            <Text uppercase style={styles.tabTextStyle}>
              Status
            </Text>
          </TabHeading>
        }>
        <StatusView navigation={navigation} />
      </Tab>

      {/* <Tab
        heading={
          <TabHeading style={styles.tabStyle}>
            <Text uppercase style={styles.tabTextStyle}>
              Calls
            </Text>
          </TabHeading>
        }>
        <CallsView />
      </Tab> */}
    </Tabs>
  </Container>
);

export default TabView;

var styles = StyleSheet.create({
  headerStyle: {
    width: '100%',
    height: '11%',
    backgroundColor: WHITE,
  },
  tabStyle: {
    flexDirection: 'row',
    backgroundColor: WHITE,
    elevation: -100,
    shadowOpacity: 0,
    backgroundColor: GREEN,
  },
  tabTextStyle: {
    color: WHITE,
    fontWeight: 'bold',
  },
});
