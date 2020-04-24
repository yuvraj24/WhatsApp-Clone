import React from 'react';
import {View} from 'native-base';
import {
  ActivityIndicator,
  TouchableWithoutFeedback,
  TouchableHighlight,
  TouchableOpacity,
} from 'react-native';
import {TINT_GRAY} from '../modules/statusDetails/utils/colors';
import {TINT_DARK_GRAY, TINT_LOAD_GRAY, WHITE} from '../utils/colors';

export default function LoadingComponent() {
  return (
    <TouchableOpacity
      disabled={true}
      style={{
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignSelf: 'center',
        position: 'absolute',
        backgroundColor: TINT_LOAD_GRAY,
        opacity: 0.7,
        position: 'absolute',
        zIndex: 3000,
      }}>
      <ActivityIndicator
        size={'large'}
        color={WHITE}
        style={{justifyContent: 'center', alignSelf: 'center'}}
      />
    </TouchableOpacity>
  );
}
