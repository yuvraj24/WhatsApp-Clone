import React, {PureComponent, useState, useReducer, useRef} from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ActivityIndicator,
  SafeAreaView,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Dimensions,
} from 'react-native';
import {RNCamera} from 'react-native-camera';
import ChatTextInput from '../modules/chatroom/ChatTextInput';
import {getStatusModel} from '../utils/helperModels';
import {createUserStatus} from '../api/apiController';
import {showToast} from '../utils/helperFunctions';
import {Root, Button, Icon} from 'native-base';
import {GREEN, WHITE, TINT_LOAD_GRAY, TINT_DARK_GRAY} from '../utils/colors';
import {uploadStatus} from '../modules/status/StatusActions';
import {BorderlessButton} from 'react-native-gesture-handler';
import LoadingComponent from './LoadingComponent';
import {
  statusReducer,
  statusState,
  LOADING,
  TOGGLE_CAMERA,
  TOGGLE_FLASH,
} from '../modules/status/StatusReducer';
import {TINT_GRAY} from '../modules/statusDetails/utils/colors';

const CameraView = ({navigation, onScanQrCode, isScanCode}) => {
  var [state, dispatch] = useReducer(statusReducer, statusState);
  var {loading, isFlashEnabled, isFrontCam} = state;

  const [imageClicked, setImageClicked] = useState('');
  var cameraRef = useRef('');

  const LoadingView = () => <LoadingComponent />;

  function performAction(camera) {
    if (isScanCode) {
      onScanQrCode();
    } else {
      takePicture(camera);
    }
  }

  const takePicture = async function(camera) {
    const options = {
      //   quality: 0.5,
      base64: true,
      quality: 0.6,
      orientation: RNCamera.Constants.Orientation.auto,
      pauseAfterCapture: true,
      fixOrientation: true,
    };
    const data = await cameraRef.current.takePictureAsync(options);
    // cameraRef.current.pausePreview();
    // console.log(data.uri);
    setImageClicked(data.uri);
  };

  function toggleViews(type) {
    switch (type) {
      case TOGGLE_CAMERA:
        dispatch({type: TOGGLE_CAMERA, payload: !isFrontCam});
        break;

      case TOGGLE_FLASH:
        dispatch({type: TOGGLE_FLASH, payload: !isFlashEnabled});
        break;
    }
  }

  return (
    <Root>
      <SafeAreaView style={styles.container}>
        <View style={styles.container}>
          <RNCamera
            autoFocus='on'
            // autoFocusPointOfInterest
            ref={cameraRef}
            useCamera2Api
            onTouchStart={Keyboard.dismiss}
            style={styles.preview}
            type={
              isFrontCam
                ? RNCamera.Constants.Type.front
                : RNCamera.Constants.Type.back
            }
            flashMode={
              isFlashEnabled
                ? RNCamera.Constants.FlashMode.on
                : RNCamera.Constants.FlashMode.off
            }
            barCodeTypes={[RNCamera.Constants.BarCodeType.qr]}
            onBarCodeRead={result => {
              if (isScanCode) {
                // console.log(result.data);
                onScanQrCode(result.data)
              }
            }}
            androidCameraPermissionOptions={{
              title: 'Permission to use camera',
              message: 'We need your permission to use your camera',
              buttonPositive: 'Ok',
              buttonNegative: 'Cancel',
            }}
            androidRecordAudioPermissionOptions={{
              title: 'Permission to use audio recording',
              message: 'We need your permission to use your audio',
              buttonPositive: 'Ok',
              buttonNegative: 'Cancel',
            }}>
            {({camera, status, recordAudioPermissionStatus}) => {
              if (status !== 'READY') return <LoadingView />;
              if (Platform.OS === 'ios') {
                return (
                  <KeyboardAvoidingView
                    behavior={'padding'}
                    onTouchStart={Keyboard.dismiss}
                    style={{width: '100%', height: '100%'}}>
                    {getMainView(camera)}
                  </KeyboardAvoidingView>
                );
              } else {
                return getMainView(camera);
              }
            }}
          </RNCamera>
        </View>
      </SafeAreaView>
    </Root>
  );

  function getMainView(camera) {
    return (
      <View style={{width: '100%', height: '100%'}}>
        <View style={styles.headerView}>
          <BorderlessButton
            style={styles.buttonStyle}
            onPress={() => navigation.goBack()}>
            <Icon
              name={Platform.OS === 'ios' ? 'ios-arrow-back' : 'md-arrow-back'}
              type="Ionicons"
              style={styles.leftIcon}
            />
          </BorderlessButton>

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'flex-end',
            }}>
            <BorderlessButton
              style={styles.buttonStyle}
              onPress={() => toggleViews(TOGGLE_CAMERA)}>
              <Icon
                name={
                  Platform.OS === 'ios'
                    ? isFrontCam
                      ? 'md-reverse-camera'
                      : 'md-reverse-camera'
                    : isFrontCam
                    ? 'md-reverse-camera'
                    : 'md-reverse-camera'
                }
                type="Ionicons"
                style={styles.leftIcon}
              />
            </BorderlessButton>

            <BorderlessButton
              style={styles.buttonStyle}
              onPress={() => toggleViews(TOGGLE_FLASH)}>
              <Icon
                name={
                  Platform.OS === 'ios'
                    ? isFlashEnabled
                      ? 'ios-flash'
                      : 'ios-flash-off'
                    : isFlashEnabled
                    ? 'md-flash'
                    : 'md-flash-off'
                }
                type="Ionicons"
                style={styles.leftIcon}
              />
            </BorderlessButton>
          </View>
        </View>
        {imageClicked === '' && !isScanCode && (
          <Button
            rounded
            onPress={() => performAction(camera)}
            style={styles.capture}>
            <Icon
              name="camera"
              type="MaterialCommunityIcons"
              style={styles.sendIcon}
            />
            {/* <Text style={{fontSize: 14}}> SNAP </Text> */}
          </Button>
        )}

        {imageClicked != '' && (
          <View style={styles.bottomView}>
            <ChatTextInput
              isStatus
              onSendMessage={status => {
                dispatch({type: LOADING, payload: true});
                uploadStatus(imageClicked, status, navigation, dispatch);
              }}
              onResetClick={() => {
                // cameraRef.current.resumePreview();
                setImageClicked('');
              }}
            />
          </View>
        )}

        {loading && <LoadingView />}
      </View>
    );
  }
};

export default CameraView;

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

AppRegistry.registerComponent('App', () => ExampleApp);
