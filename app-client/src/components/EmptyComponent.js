import React from 'react';
import {Text, View, StyleSheet, Image} from 'react-native';
import {GREEN, BLACK, TEXT_SUBTITLE, TEXT_DESCRIPTION, GRAY} from '../utils/colors';
import {Icon} from 'native-base'; 
import alertJson from '../../assets/images/chat.png'; 

const EmptyComponent = ({message}) => (
  <View
    style={{
      width: '100%',
      height: '100%',
      flexDirection: 'column',
      alignItems: 'center',
      alignSelf: 'center',
      justifyContent: 'center',
    }}>
    <Image
      style={styles.alertIcon}
      source={alertJson}
      autoPlay
      hardwareAccelerationAndroid={true}
      resizeMode={'cover'}
      loop={true}
    />
    <Text style={{fontSize: 16, color: GRAY, marginTop: 5}}>
      {message}
    </Text>
  </View>
);

const styles = StyleSheet.create({
  alertIcon: {
    height: 80,
    width: 80,
    alignSelf: 'center',
    tintColor: GRAY,
    marginBottom: 20
  },
});

export default EmptyComponent;
