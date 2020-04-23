import React from 'react';
import {StyleSheet} from 'react-native';
import {Text, View} from 'native-base';
import {LIGHT_GRAY, TEXT_SUBTITLE, TEXT_DESCRIPTION, TEXT_TITLE} from '../utils/colors';

const _Text = ({
  style: propStyle,
  title,
  description,
  children,
  onLayout,
  onPress, 
  numberOfLines,
}) => {
  const {titleStyle, subtitleStyle, descriptionStyle} = styles;
  let defaultStyle = subtitleStyle;
  if (title) defaultStyle = titleStyle;
  else if (description) defaultStyle = descriptionStyle;

  return (
    <Text
      onPress={onPress}
      onLayout={onLayout}
      numberOfLines={numberOfLines}
      ellipsizeMode="tail"
      style={[defaultStyle, propStyle ? propStyle : null]}>
      {children}
    </Text>
  );
};
export default _Text;

const styles = StyleSheet.create({
  titleStyle: {
    fontSize: 16,
    fontWeight: '600', 
    letterSpacing: -0.408,
    color: TEXT_TITLE,
    fontFamily:'Poppins-Regular'
  },
  subtitleStyle: {
    fontSize: 14,
    fontWeight: '400', 
    letterSpacing: -0.24,
    color: TEXT_SUBTITLE,
    fontFamily:'Poppins-Regular'
  },
  descriptionStyle: {
    fontSize: 12,
    fontWeight: '400', 
    letterSpacing: -0.078,
    color: TEXT_DESCRIPTION,
    fontFamily:'Poppins-Regular'
  },
});
