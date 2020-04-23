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

var {
  container,
  poppinsSemiBold,
  poppinsRegular,
  poppinsMedium,
} = DEFAULT_STYLES;

const OTPValidation = ({navigation}) => {
  const [countryCode, setCountryCode] = useState('');
  const [country, setCountry] = useState('');

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
          name="whatsapp"
          style={{
            fontSize: 50,
            color: WHITE,
            justifyContent: 'center',
            alignSelf: 'center',
          }}
        />
        <_Text style={{marginTop: '2%', color: WHITE, fontSize: 26}}>
          Whatsapp
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
            Waiting to automatically detect the sms sent to +91 8850987832
          </_Text>

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              marginTop: '10%',
              marginBottom: '5%',
            }}>
            <_TextInput
              editable={true}
              maxLength={1}
              textAlign={'center'}
              containerStyle={styles.otpView1}
              inputStyle={styles.otpLabelView}
            />
            <_TextInput
              editable={true}
              maxLength={1}
              textAlign={'center'}
              containerStyle={styles.otpView}
              inputStyle={styles.otpLabelView}
            />
            <_TextInput
              editable={true}
              maxLength={1}
              textAlign={'center'}
              containerStyle={styles.otpView}
              inputStyle={styles.otpLabelView}
            />
            <_TextInput
              editable={true}
              maxLength={1}
              textAlign={'center'}
              containerStyle={styles.otpView}
              inputStyle={styles.otpLabelView}
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
              ]}>
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
          onPress={() => navigation.navigate(NAV_TYPES.HOME_SCREEN)}
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
