import React from 'react';
import {View, StyleSheet} from 'react-native';
import { LIGHT_GRAY, APP_BG_COLOR } from '../utils/colors';

const _Divider = ({
    style,
}) => (
    <View style={[styles.divider, style]}/>
);

export default _Divider;

const styles = StyleSheet.create({
    divider:{
        alignSelf:'center',
        borderBottomColor: APP_BG_COLOR,
        borderBottomWidth: 0.5,
        width:"100%"
    }
});
  
