import React, {Component, useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  TextInput,
} from 'react-native';
import {DEFAULT_STYLES} from '../../utils/styles';
import {
  GREEN,
  WHITE,
  TEXT_SUBTITLE,
  PRIMARY,
  LIGHT_GRAY,
  GRAY,
} from '../../utils/colors';
import {ThemeManager} from '../../utils/themeManager';
import {
  Container,
  Header,
  Content,
  Icon,
  Item,
  Button,
  Input,
} from 'native-base';
import _Text from '../../components/_Text';
import _TextInput from '../../components/_TextInput';
import CountryPicker, {FlagButton} from 'react-native-country-picker-modal';
import {NAV_TYPES} from '../../utils/navTypes';
import {showToast, storeLocalData} from '../../utils/helperFunctions';
import constants from '../../utils/constants';
import {syncUserSession} from '../../api/apiController';
import {StackActions} from '@react-navigation/native';
import auth from '@react-native-firebase/auth';

var {
  container,
  poppinsSemiBold,
  poppinsRegular,
  poppinsMedium,
} = DEFAULT_STYLES;

const OTPValidation = ({navigation, route}) => {
  const [countryCode, setCountryCode] = useState('');
  const [country, setCountry] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);

  const [confirmResult, setConfirmResult] = useState(
    route && route.params ? route.params.confirmResult : null,
  );
  const displayName = route && route.params ? route.params.displayName : '';
  const phoneNumber = route && route.params ? route.params.phoneNumber : '';

  const verifyCode = async () => {
    if (!confirmResult) {
      showToast({text: 'Request a new verification code', type: 'danger'});
      return;
    }
    if (!/^\d{6}$/.test(verificationCode)) {
      showToast({text: 'Enter the six-digit code', type: 'danger'});
      return;
    }

    setIsVerifying(true);
    try {
      const userCredential = await confirmResult.confirm(verificationCode);
      const idToken = await userCredential.user.getIdToken();
      await storeLocalData(constants.ACCESS_TOKEN, idToken);
      await storeLocalData(constants.USER_ID, userCredential.user.uid);
      await storeLocalData(constants.USER_NAME, displayName || phoneNumber);
      await syncUserSession(displayName || phoneNumber);
      navigation.dispatch(StackActions.replace(NAV_TYPES.HOME_SCREEN));
    } catch (error) {
      showToast({
        text: 'That verification code could not be confirmed',
        type: 'danger',
      });
    } finally {
      setIsVerifying(false);
    }
  };

  const resendCode = async () => {
    if (!phoneNumber) {
      showToast({text: 'Phone number is unavailable', type: 'danger'});
      return;
    }
    try {
      const result = await auth().signInWithPhoneNumber(phoneNumber);
      setConfirmResult(result);
      showToast({text: 'A new verification code was sent', type: 'success'});
    } catch (error) {
      showToast({text: 'Could not resend the verification code', type: 'danger'});
    }
  };

  const onSelect = country => {
    console.log(country);
    setCountryCode(country.cca2);
    setCountry(country);
  };

  return (
    // <SafeAreaView>
    <View style={[container, {flexDirection: 'column'}]}>
      <View
        style={{
          backgroundColor: GREEN,
          height: '30%',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Icon
          type="FontAwesome"
          name="comments"
          style={{
            fontSize: 50,
            color: WHITE,
            justifyContent: 'center',
            alignSelf: 'center',
          }}
        />
        <_Text style={{marginTop: '2%', color: WHITE, fontSize: 26}}>
          FRWhatsapp
        </_Text>
      </View>
      <ScrollView
        keyboardShouldPersistTaps="always"
        style={{flexGrow: 1, height: '100%'}}
        // contentContainerStyle={{
        //   // flex: 1,
        //   justifyContent: 'center',
        //   flexGrow:1
        // }}
      >
        <View
          style={{
            margin: '6%',
            flex: 1,
            flexDirection: 'column',
            height: '100%',
            justifyContent: 'flex-start',
          }}>
          <_Text
            title
            style={[
              poppinsMedium,
              {marginTop: '10%', fontSize: 16, alignSelf: 'center'},
            ]}>
            Enter the SMS code sent to {phoneNumber || 'your phone'}
          </_Text>

          <View style={{marginTop: '10%', marginBottom: '5%'}}>
            <_TextInput
              value={verificationCode}
              editable={true}
              maxLength={6}
              keyboardType={'numeric'}
              textAlign={'center'}
              containerStyle={{width: '100%', alignSelf: 'center'}}
              inputStyle={[styles.otpLabelView, {letterSpacing: 12}]}
              onChangeText={data => setVerificationCode(data.value.replace(/\D/g, '').slice(0, 6))}
            />
          </View>

          <View style={{flexDirection: 'row'}}>
            <_Text description style={(poppinsRegular, styles.resendOtpStyle)}>
              Didn't receive the code ?
            </_Text>
            <_Text
              description
              style={[
                poppinsRegular,
                styles.resendOtpStyle,
                {marginLeft: 10, color: GREEN, fontWeight: 'bold'},
              ]}
              onPress={resendCode}>
              RESEND CODE
            </_Text>
          </View>
        </View>
      </ScrollView>

      <View
        style={{
          alignSelf: 'flex-end',
          right: '3%',
          bottom: '3%',
        }}>
        <Button
          style={{
            width: 60,
            height: 60,
            backgroundColor: GREEN,
          }}
          onPress={verifyCode}
          disabled={isVerifying}
          rounded>
          <Icon type="MaterialCommunityIcons" name="arrow-right" />
        </Button>
      </View>
    </View>
    // </SafeAreaView>
  );
};

export default OTPValidation;

var styles = StyleSheet.create({
  otpView1: {
    width: '22%',
    alignItems: 'center',
  },
  otpView: {
    width: '22%',
    marginLeft: '3%',
    alignItems: 'center',
  },
  otpLabelView: {
    alignItems: 'center',
    fontSize: 32,
    paddingLeft: 15,
    paddingBottom: -60,
    fontWeight: 'bold',
  },
  resendOtpStyle: {
    marginTop: '10%',
    fontSize: 16,
    color: GRAY,
  },
});
