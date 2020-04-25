import React, {useRef, useReducer} from 'react';
import {View, Platform, SafeAreaView, StyleSheet, Keyboard} from 'react-native';
import {DEFAULT_STYLES} from '../../utils/styles';
import {Button, Text, Root} from 'native-base';
import {WHITE, GREEN, TINT_DARK_GRAY} from '../../utils/colors';
import {getSocket} from '../../utils/helperFunctions';
import constants from '../../utils/constants';
import {getUserDetails} from '../../utils/userContext';
import {RNCamera} from 'react-native-camera';
import {statusReducer, statusState} from '../status/StatusReducer';
import LoadingComponent from '../../components/LoadingComponent';
import CameraView from '../../components/CameraView';
import {StackActions} from '@react-navigation/native';
import {NAV_TYPES} from '../../utils/navTypes';
import {TouchableOpacity} from 'react-native-gesture-handler';

var socket = getSocket();
var isValid = true;

const QrCodeAppScanner = ({navigation}) => {
  var [state, dispatch] = useReducer(statusReducer, statusState);
  var {loading, isFlashEnabled, isFrontCam} = state;

  var cameraRef = useRef('');

  async function onScanQrCode(data) {
    let user = await getUserDetails();
    // alert(isValid);
    socket.emit(constants.SCAN_QR_CODE, user);
    try {
      if (isValid) {
        isValid = false;
        navigation.dispatch(StackActions.replace(NAV_TYPES.HOME_SCREEN));
      }
      setTimeout(function() {
        isValid = true;
      }, 1500);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Root>
      <SafeAreaView style={styles.container}>
        {/* <TouchableOpacity onPress={() => onScanQrCode()}>
          <Text>CONNECT</Text>
        </TouchableOpacity>  */}
        <View style={styles.container}>
          <CameraView
            navigation={navigation}
            onScanQrCode={onScanQrCode}
            isScanCode
          />
        </View>
      </SafeAreaView>
    </Root>
  );
};

export default QrCodeAppScanner;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  capture: {
    alignSelf: 'center',
    justifyContent: 'center',
    margin: 20,
    width: 80,
    height: 80,
    backgroundColor: GREEN,
    position: 'absolute',
    bottom: 0,
  },
  bottomView: {
    alignSelf: 'center',
    justifyContent: 'center',
    width: '100%',
    // height: '100%',
    // backgroundColor: GREEN,
    position: 'absolute',
    bottom: 0,
  },
  sendIcon: {
    alignSelf: 'center',
    color: WHITE,
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 40,
    width: 40,
    height: 40,
  },
  leftIcon: {
    alignSelf: 'center',
    color: WHITE,
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 30,
    position: 'absolute',
    padding: 20,
  },
  buttonStyle: {
    width: 70,
    height: 70,
    marginLeft: -10,
  },
  headerView: {
    width: '100%',
    height: '10%',
    backgroundColor: TINT_DARK_GRAY,
    paddingLeft: '3%',
    paddingRight: '3%',
    position: 'absolute',
    top: 0,
    left: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
