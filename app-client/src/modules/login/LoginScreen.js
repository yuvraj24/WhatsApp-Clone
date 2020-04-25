import React, {Component, useState, useEffect, useRef} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  AsyncStorage,
  TextInput,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import {DEFAULT_STYLES} from '../../utils/styles';
import {
  GREEN,
  WHITE,
  TEXT_SUBTITLE,
  PRIMARY,
  LIGHT_GRAY,
  GRAY,
  LIGHT_GREEN,
  MID_GREEN,
} from '../../utils/colors';
import {ThemeManager} from '../../utils/themeManager';
import {
  Container,
  Header,
  Content,
  Icon,
  Item,
  Button,
  Toast,
  Root,
  Text,
} from 'native-base';
import _Text from '../../components/_Text';
import _TextInput from '../../components/_TextInput';
import OTPValidation from './OTPValidation';
import {NAV_TYPES} from '../../utils/navTypes';
import {
  showToast,
  getUniqueId,
  getLocalData,
  storeLocalData,
} from '../../utils/helperFunctions';
import constants from '../../utils/constants';
import {getLoginModel} from '../../utils/helperModels';

import {StackActions} from '@react-navigation/native';
import {loginUser} from '../../api/apiController';
import {BorderlessButton} from 'react-native-gesture-handler';
import LoadingComponent from '../../components/LoadingComponent';

var {
  container,
  poppinsSemiBold,
  poppinsRegular,
  poppinsMedium,
} = DEFAULT_STYLES;

const LoginScreen = ({navigation}) => {
  const [userName, setUserName] = useState('');
  const [mobile, setMobile] = useState('');
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    getLocalData(constants.USER_ID)
      .then(userID => {
        console.log('Login userID => ', userID);
        if (userID && userID != null && userID != '') {
          navigation.dispatch(StackActions.replace(NAV_TYPES.HOME_SCREEN));
        }
      })
      .catch(err => {
        console.log('Login Error => ', err);
      });
  }, []);

  const onLoginClick = () => {
    if (userName === '') {
      showToast({text: 'Enter your Name', type: 'danger'});
    } else if (mobile === '') {
      showToast({text: 'Enter your Mobile Number', type: 'danger'});
    } else {
      setLoading(!isLoading);
      loginUser(getLoginModel(userName, mobile))
        .then(res => {
          console.log('LOGIN RESPONSE => ' + JSON.stringify(res));
          if (res.data.success) {
            setLoading(isLoading);
            console.log('TOKEN : ', res.headers.token);
            setUserName('');
            setMobile('');
            console.log('LOGIN RESPONSE => ' + JSON.stringify(res));

            storeLocalData(constants.ACCESS_TOKEN, res.headers.token);
            storeLocalData(constants.USER_ID, res.data.id);
            storeLocalData(constants.USER_NAME, userName);

            navigation.navigate(NAV_TYPES.HOME_SCREEN, {});
          }
        })
        .catch(error => {
          console.log('LOGIN ERROR ', error);
        });
    }
  };

  const onSignUpClick = () => {
    navigation.navigate(NAV_TYPES.REGISTER, {});
  };

  return (
    <SafeAreaView style={container}>
      {isLoading && <LoadingComponent />}
      {/* {!isLoading && ( */}
      <Root style={[container, {flexDirection: 'column'}]}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.keyboardView}>
          <View style={styles.headerView}>
            <Icon type="FontAwesome" name="whatsapp" style={styles.logoStyle} />
            <_Text style={styles.logoTextStyle}>{constants.APP_NAME}</_Text>
          </View>
          <ScrollView
            keyboardShouldPersistTaps="handled"
            contentContainerStyle={{
              flex: 1,
              justifyContent: 'center',
            }}>
            <View style={styles.contentView}>
              <View style={{flexDirection: 'column'}}>
                <_Text description style={[poppinsRegular, styles.labelStyle]}>
                  Enter Name
                </_Text>

                <_TextInput
                  value={userName}
                  inputStyle={[poppinsMedium, styles.inputStyle]}
                  floatingLabel={false}
                  keyboardType={'default'}
                  containerStyle={{width: '100%', marginLeft: 0}}
                  onChangeText={data => {
                    setUserName(data.value);
                  }}
                />

                <_Text description style={[poppinsRegular, styles.labelStyle]}>
                  Mobile Number
                </_Text>

                <_TextInput
                  value={mobile}
                  inputStyle={[poppinsMedium, styles.inputStyle]}
                  floatingLabel={false}
                  keyboardType={'numeric'}
                  containerStyle={{width: '100%', marginLeft: 0}}
                  onChangeText={data => {
                    setMobile(data.value);
                  }}
                />
              </View>

              <View style={styles.buttonLoginView}>
                <Button onPress={() => onLoginClick()} style={styles.login}>
                  <Text style={{fontSize: 18, fontWeight: 'bold'}}>Login</Text>
                </Button>
                <BorderlessButton
                  onPress={() => onSignUpClick()}
                  style={styles.buttonSignupView}>
                  <Text style={styles.signup}>Sign Up</Text>
                </BorderlessButton>
              </View>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </Root>
      {/* )} */}
    </SafeAreaView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  headerView: {
    backgroundColor: GREEN,
    height: '30%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  keyboardView: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
  },
  logoStyle: {
    fontSize: 50,
    color: WHITE,
    justifyContent: 'center',
    alignSelf: 'center',
  },
  logoTextStyle: {
    marginTop: '2%',
    color: WHITE,
    fontSize: 26,
  },
  contentView: {
    margin: '3%',
    flex: 1,
    flexDirection: 'column',
    height: '55%',
    paddingTop: 20,
  },
  inputStyle: {
    justifyContent: 'center',
    paddingBottom: '-1%',
    color: TEXT_SUBTITLE,
    marginTop: -10,
  },
  labelStyle: {
    marginTop: '8%',
    fontSize: 16,
    color: GRAY,
  },
  buttonLoginView: {
    alignSelf: 'flex-end',
    bottom: 0,
    position: 'absolute',
    alignSelf: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  buttonSignupView: {
    width: '100%',
    height: 60,
    alignSelf: 'center',
    justifyContent: 'center',
  },
  login: {
    width: '100%',
    height: 60,
    backgroundColor: MID_GREEN,
    alignSelf: 'center',
    justifyContent: 'center',
  },
  signup: {
    fontSize: 16,
    fontWeight: 'bold',
    alignSelf: 'center',
    justifyContent: 'center',
    color: MID_GREEN,
  },
});
