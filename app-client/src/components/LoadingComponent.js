import React from 'react';
import {View} from 'native-base';
import {ActivityIndicator} from 'react-native';
import { TINT_GRAY } from '../modules/statusDetails/utils/colors';
import { TINT_DARK_GRAY, TINT_LOAD_GRAY } from '../utils/colors';

export default function LoadingComponent() {
  return (
    <View
      style={{
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignSelf: 'center',
        position:'absolute',
        backgroundColor:TINT_LOAD_GRAY
      }}>
      <ActivityIndicator
        size={'large'}
        style={{justifyContent: 'center', alignSelf: 'center'}}
      />
    </View>
  );
}
