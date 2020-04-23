import React, { useState, StyleHTMLAttributes, HtmlHTMLAttributes, CSSProperties, useEffect } from "react";
import "../css/storyContainer.css";
import ProgressView from "../progress/ProgressView";
import StoryView from "../story/StoryView";
import { StoryContainerProps } from "../../utils/interfaceHelper";
import { ReplyFooterView } from "../../views/ReplyFooterView";
import ArrowNavigator from "../../views/ArrowNavigator";
import UserHeaderView from "../../views/UserHeaderView";
import { TINT_GRAY } from '../../utils/colors'

const StoryContainer = (props: StoryContainerProps) => {
  const [progressIndex, setProgressIndex] = useState(0)
  const [stopProgress, setStopProgress] = useState(false);

  useEffect(() => {
    setProgressIndex(progressIndex)
  }, [props.enableProgress])

  // useEffect(() => {
  //   // alert("Called") 
  //    setProgressIndex(progressIndex)
  // }, [stopProgress])

  // useEffect(() => {
  //   switch (props.onArrowClick?.arrow) {
  //     case 'left':
  //       onChange(progressIndex === 0 ? progressIndex : progressIndex - 1)
  //       break;

  //     case 'right':
  //       const size = props.imageStyle ? props.images.length - 1 : 0
  //       onChange(progressIndex === size ? progressIndex : progressIndex + 1)
  //       break;
  //   }
  // }, [props.onArrowClick?.refresh])

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
    // console.log(`Enable Progress ${props.enableProgress} , Stop Progress ${!stopProgress}`)
    if (props.enableProgress && !stopProgress) {
      if (position < props.images.length) {
        props && props.onChange(position)
        setProgressIndex(position)
      }
    }
  }

  return (
    <div>
      {props.visible ? getView() : undefined}
    </div>
  );

  function getView() {
    return <div className="parentView" style={Object.assign({}, props.style)}>
      <img src={props.images[progressIndex]} style={Object.assign(styles.imagebg)} />

      <div className='customView'>

        <div style={Object.assign(styles.centerView)}>
          <StoryView
            images={props.images}
            duration={props.duration}
            progressIndex={progressIndex}
            imageStyle={props.imageStyle} />
        </div>

        <div style={Object.assign(styles.topView)}>
          {
            props.userProfile && (
              <UserHeaderView
                userImage={props.userProfile?.userImage}
                userName={props.userProfile?.userName}
                userMessage={props.userProfile?.userMessage}
                imageArrow={props.userProfile?.imageArrow}
                onImageClick={(type: string) => props.userProfile?.onImageClick && props.userProfile?.onImageClick(type)} />
            )
          }
          {
            !props.userProfile && (
              props.headerComponent
            )
          }
        </div>

        <ArrowNavigator
          onArrorClick={(type: string) => onArrorClick(type)}
        />

        <div className="bottomView">
          {
            props.replyView?.isShowReply && !props.footerComponent && (
              <ReplyFooterView
                messageList={props.replyView?.messageList}
                progressIndex={progressIndex}
                onReplyTextChange={props.replyView?.onReplyTextChange}
                onReplyButtonClick={props.replyView?.onReplyButtonClick}
                onInputFocus={(focusType: boolean) => {
                  setStopProgress(focusType)
                }} />
            )
          }
          {
            !props.replyView?.isShowReply && props.footerComponent && (
              <div className="bottomView">
                {props.footerComponent}
              </div>
            )
          }
          {
            props.replyView?.isShowReply && props.footerComponent && (
              <div className="bottomView">
                {props.footerComponent}
                <ReplyFooterView
                  messageList={props.replyView?.messageList}
                  progressIndex={progressIndex}
                  onReplyTextChange={props.replyView?.onReplyTextChange}
                  onReplyButtonClick={props.replyView?.onReplyButtonClick}
                  onInputFocus={(focusType: boolean) => {
                    setStopProgress(focusType)
                  }} />
              </div>
            )
          }
        </div>
      </div>

      <div style={Object.assign(styles.progressView)}>
        <ProgressView
          enableProgress={props.enableProgress && !stopProgress}
          images={props.images}
          duration={props.duration}
          barStyle={props.barStyle}
          progressIndex={progressIndex}
          onChange={(position: number) => onChange(position)} />
      </div>
    </div >
  }
}

export default StoryContainer;

const styles = ({
  parentView: {
    width: '100%',
    height: '100%',
    flexDirection: 'column',
    // backgroundColor: TINT_GRAY,
    // marginTop: Platform.OS === 'ios' ? -40 : 0
  },
  imagebg: {
    filter: "blur(30px) brightness(1.0)",
    position: 'fixed',
    flexDirection: 'column',
    transform: 'scale(1.4)',
    objectType: 'cover',
    width: '100%',
    height: '100%',
  },
  topView: {
    position: 'absolute',
    flexDirection: 'column',
    width: window.innerWidth, // Important
    paddingTop: '5%',
  },
  centerView: {
    flexDirection: 'column',
    width: window.innerWidth, // Important
    height: window.innerHeight,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
    // paddingTop: '5%',
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
    paddingBottom: '2%',
    // backgroundColor: TINT_GRAY,
  },
  progressView: {
    flex: 1,
    width: window.innerWidth, // Important
    position: 'absolute',
    flexDirection: 'row',
    // backgroundColor: TINT_GRAY,
  },
});
