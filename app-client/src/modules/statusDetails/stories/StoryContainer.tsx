import React, { useState, StyleHTMLAttributes, HtmlHTMLAttributes, CSSProperties, useEffect } from "react"
import ProgressView from "./ProgressView"
import StoryView from "./StoryView"
import { StoryContainerProps } from "../utils/interfaceHelper"
import { StyleSheet, View, SafeAreaView, Platform, Keyboard, Alert, KeyboardAvoidingView, Dimensions } from "react-native"
import { GREEN, LIGHT_GRAY_0, RED, TINT_GRAY, GRAY } from "../utils/colors"
import ArrowNavigator from "./ArrowNavigator"
import ReplyFooterView from "./ReplyFooterView"
import UserHeaderView from "./UserHeaderView"
import { DEFAULT_DURATION } from '../utils/constant'

const StoryContainer = (props: StoryContainerProps) => {
  const [progressIndex, setProgressIndex] = useState(0)
  const [stopProgress, setStopProgress] = useState(false);

  useEffect(() => {
    // Alert.prompt("Called")
    setProgressIndex(progressIndex)
  }, [props.enableProgress])

  useEffect(() => {
    let listener1 = Keyboard.addListener('keyboardDidShow', onShowKeyboard);
    let listener2 = Keyboard.addListener('keyboardDidHide', onHideKeyboard);

    return () => {
      listener1.remove();
      listener2.remove();
    };
  }, [])

  function onShowKeyboard(e: any) {
    console.log(stopProgress);
    setStopProgress(true);
  }

  function onHideKeyboard(e: any) {
    console.log(stopProgress);
    setStopProgress(false);
  }

  function onArrorClick(type: string) {
    switch (type) {
      case 'left':
        onChange(progressIndex === 0 ? progressIndex : progressIndex - 1)
        break

      case 'right':
        const size = props.imageStyle ? props.images.length - 1 : 0
        onChange(progressIndex === size ? progressIndex : progressIndex + 1)
        break
    }
  }

  function onChange(position: number) {
    if (props.enableProgress ? props.enableProgress : true && !stopProgress) {
      if (position < props.images.length) {
        props.onChange(position)
        setProgressIndex(position)
      }
    }
  }

  return (
    <SafeAreaView>
      {
        Platform.OS === 'ios' && (
          <KeyboardAvoidingView behavior='padding' >
            <View>
              {props.visible ? getView() : <View></View>}
            </View>
          </KeyboardAvoidingView>
        )
      }

      {
        Platform.OS === 'android' && (
          <View>
            {props.visible ? getView() : <View></View>}
          </View>
        )
      }
    </SafeAreaView>
  )

  function getView() {
    return <View style={props.containerStyle ? props.containerStyle : styles.parentView}>
      <StoryView
        images={props.images}
        duration={props.duration ? props.duration : DEFAULT_DURATION}
        progressIndex={progressIndex}
        imageStyle={props.imageStyle} />

      <View style={styles.customView}>
        <View style={styles.topView}>

          {
            props.userProfile && (
              <UserHeaderView
                userImage={props.userProfile?.userImage}
                userName={props.userProfile?.userName}
                userMessage={props.userProfile?.userMessage}
                imageArrow={props.userProfile?.imageArrow}
                onImageClick={() => props.userProfile?.onImageClick && props.userProfile?.onImageClick()} />
            )
          }
          {
            !props.userProfile && (
              props.headerComponent
            )
          }

        </View>
        <ArrowNavigator onArrowClick={(type: string) => onArrorClick(type)} />

        <View style={styles.bottomView}>
          {
            props.replyView?.isShowReply && !props.footerComponent && (
              <ReplyFooterView
                messageList={props.replyView?.messageList}
                progressIndex={progressIndex}
                onReplyTextChange={props.replyView?.onReplyTextChange}
                onReplyButtonClick={props.replyView?.onReplyButtonClick} />
            )
          }
          {
            !props.replyView?.isShowReply && props.footerComponent && (
              <View style={styles.bottomView}>
                {props.footerComponent}
              </View>
            )
          }
          {
            props.replyView?.isShowReply && props.footerComponent && (
              <View style={styles.bottomView}>
                {props.footerComponent}
                <ReplyFooterView
                  messageList={props.replyView?.messageList}
                  progressIndex={progressIndex}
                  onReplyTextChange={props.replyView?.onReplyTextChange}
                  onReplyButtonClick={props.replyView?.onReplyButtonClick} />
              </View>
            )
          }
        </View>
      </View>

      <View style={styles.progressView}>
        <ProgressView
          enableProgress={props.enableProgress ? props.enableProgress : true && !stopProgress}
          images={props.images}
          duration={props.duration ? props.duration : DEFAULT_DURATION}
          barStyle={props.barStyle}
          progressIndex={progressIndex}
          onChange={(position: number) => onChange(position)} />
      </View>
    </View>
  }
}

export default StoryContainer;

const styles = StyleSheet.create({
  parentView: {
    width: '100%',
    height: '100%',
    flexDirection: 'column',
    backgroundColor: TINT_GRAY,
    // marginTop: Platform.OS === 'ios' ? -40 : 0
  },
  customView: {
    position: 'absolute',
    flexDirection: 'column',
    width: Dimensions.get('window').width, // Important
    height: '100%',
  },
  topView: {
    position: 'absolute',
    flexDirection: 'column',
    width: Dimensions.get('window').width, // Important 
  },
  bottomView: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    width: '100%',
    flexDirection: 'column',
    justifyContent: 'center',
    alignSelf: 'baseline',
    textAlignVertical: 'bottom',
    paddingTop: '3%',
    // paddingBottom: '2%',
    // backgroundColor: TINT_GRAY,
  },
  progressView: {
    flex: 1,
    width: Dimensions.get('window').width, // Important
    position: 'absolute',
    flexDirection: 'row',
    // backgroundColor: TINT_GRAY,
  },
});