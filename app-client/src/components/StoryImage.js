import React from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {Thumbnail} from 'native-base';
import {GREEN, WHITE, GRAY, LIGHT_GRAY, LIGHT_GRAY_0, TEXT_DESCRIPTION, TEXT_SUBTITLE, SHIMMER_GRAY} from '../utils/colors';

const StoryImage = ({source, hideBorder}) => {
  return (
    <View style={hideBorder ? styles.viewedImageStyle : styles.imageStyle}>
      <Thumbnail source={source} />
    </View>
  );
};

export default StoryImage;

const styles = StyleSheet.create({
  imageStyle: {
    borderRadius: 40,
    borderColor: GREEN,
    borderWidth: 3,
    padding: 1,
    borderStyle: 'dotted',
  },
  viewedImageStyle: {
    borderRadius: 40,
    borderColor: SHIMMER_GRAY,
    borderWidth: 3,
    padding: 1,
  },
});
