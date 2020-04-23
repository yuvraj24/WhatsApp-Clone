import React from 'react';
import { View, StyleSheet, Text, Image, TouchableOpacity, Dimensions } from 'react-native';
import { WHITE, GREEN, TINT_GRAY } from '../utils/colors';
import { UserProps } from '../utils/interfaceHelper';

const UserHeaderView = ({ userImage, userName, userMessage, imageArrow, onImageClick }: UserProps) => {
  return (
    <View style={styles.parentStyle}>
      {
        imageArrow && (
          <TouchableOpacity
            onPress={() => {
              onImageClick && onImageClick()
            }}
            style={styles.imgLeftArrow}>
            <Image
              style={styles.imgLeftArrow} source={imageArrow} />
          </TouchableOpacity>
        )
      }
      {
        userImage && (
          <Image source={userImage} style={styles.circleDiv} />
        )
      }
      <View style={styles.verticalStyle}>
        <Text style={styles.titleStyle}>{userName}</Text>
        <Text style={styles.descStyle}>{userMessage}</Text>
      </View>
    </View>
  );
};

export default UserHeaderView;

const styles = StyleSheet.create({
  parentStyle: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    marginTop: '10.8%',
    justifyContent: 'flex-start',
    flexDirection: 'row',
    alignContent: 'center',
    flex: 1,
    // backgroundColor: TINT_GRAY,
    paddingBottom: '3%',
    paddingTop: '3%'
  },

  titleStyle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: WHITE,
    marginTop: 2
  },
  descStyle: {
    fontSize: 14,
    fontWeight: '400',
    color: WHITE,
    marginTop: 5,
  },
  circleDiv: {
    width: 50,
    height: 50,
    borderRadius: 50 / 2,
    marginLeft: '2%',
  },
  verticalStyle: {
    flexDirection: 'column',
    marginLeft: '3%',
    width: '70%'
  },
  imgLeftArrow: {
    width: 24,
    height: 24,
    marginLeft: '3%',
    marginTop: 6,
    tintColor: WHITE
  },
});
