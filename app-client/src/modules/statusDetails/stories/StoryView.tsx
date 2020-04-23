import React, { useEffect, useState, CSSProperties } from "react";
import { StoryViewProps } from "../utils/interfaceHelper";
import { View, Image, StyleSheet, Text, SafeAreaView, Dimensions } from "react-native";
import ProgressiveImage from "./ProgressiveImage";
import { TINT_DARK_GRAY } from "../../../utils/colors";
import { BLACK, GRAY } from "../utils/colors";

function StoryView(props: StoryViewProps) {
  const [refresh, setRefresh] = useState(true);

  const image = props.images[props.progressIndex]
  // console.log(image);

  return (
    <SafeAreaView style={styles.divStory}>
      <View style={styles.divStory}>
        <ProgressiveImage
          style={[styles.imgStyle, props.imageStyle]}
          imgSource={{ uri: image }}
          thumbnailSource={{ uri: image }}
        />
        <View style={styles.overlayStyle} />
      </View>
    </SafeAreaView>
  );
}

export default StoryView;


const styles = StyleSheet.create({
  divStory: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
    alignContent: 'center',
    alignItems: 'center'
  },
  imgStyle: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
    alignSelf: 'center',
    resizeMode: 'contain'
  },
  overlayStyle: {
    backgroundColor: TINT_DARK_GRAY,
    position: 'absolute',
    width: '100%',
    height: '100%'
  }
});