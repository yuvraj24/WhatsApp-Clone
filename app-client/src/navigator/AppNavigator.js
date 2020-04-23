import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Platform,
} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import LoginScreen from '../modules/login/LoginScreen';
import RegisterScreen from '../modules/login/RegisterScreen';
import {ThemeManager} from '../utils/themeManager';
import {GREEN} from '../utils/colors';
import OTPValidation from '../modules/login/OTPValidation';
import {NAV_TYPES} from '../utils/navTypes';
import HomeScreen from '../modules/home/HomeScreen';
import ChatRoomScreen from '../modules/chatroom/ChatRoomScreen';
import {DEFAULT_STYLES} from '../utils/styles';
import ContactsView from '../modules/contacts/ContactsView';
import QrCodeAppScanner from '../modules/codescan/QrCodeAppScanner';
import CameraComponent from '../components/CameraView';
import CameraView from '../components/CameraView';
import StatusProgressView from '../components/StatusProgressView';

const Stack = createStackNavigator();

export default function AppNavigator() {
  return (
    <View style={DEFAULT_STYLES.container}>
      <NavigationContainer theme={ThemeManager}>
        {/* <StatusBar barStyle="light-content" backgroundColor={GREEN} /> */}
        <Stack.Navigator
          initialRouteName={NAV_TYPES.LOGIN}
          screenOptions={{
            headerShown: false,
          }}>
          <Stack.Screen
            options={{headerShown: false}}
            name={NAV_TYPES.LOGIN}
            component={LoginScreen}
          />
          <Stack.Screen
            options={{headerShown: false}}
            name={NAV_TYPES.REGISTER}
            component={RegisterScreen}
          />
          <Stack.Screen
            options={{headerShown: false}}
            name={NAV_TYPES.OTP}
            component={OTPValidation}
          />
          <Stack.Screen
            options={{headerShown: false}}
            name={NAV_TYPES.HOME_SCREEN}
            component={HomeScreen}
          />
          <Stack.Screen
            options={{headerShown: false}}
            name={NAV_TYPES.CHAT_MESSAGE_SCREEN}
            component={ChatRoomScreen}
          />
          <Stack.Screen
            options={{headerShown: false}}
            name={NAV_TYPES.CONTACTS_SCREEN}
            component={ContactsView}
          />
          <Stack.Screen
            options={{headerShown: false}}
            name={NAV_TYPES.QR_CODE_SCREEN}
            component={QrCodeAppScanner}
          />
          <Stack.Screen
            options={{headerShown: false}}
            name={NAV_TYPES.CAMERA_VIEW}
            component={CameraView}
          />
          <Stack.Screen
            options={{headerShown: false}}
            name={NAV_TYPES.STATUS_VIEW}
            component={StatusProgressView}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </View>
  );
}
