import React, { useEffect, useState } from "react";
import '../css/progressView.css'
import ProgressItem from './ProgressItem'
import { GRAY, TINT_GRAY, GREEN } from "../../utils/colors";
import { ProgressViewProps } from "../../utils/interfaceHelper";

function ProgressView(props: ProgressViewProps) {

  const [progressIndex, setProgressIndex] = useState(0)

  useEffect(() => {
    setProgressIndex(props.progressIndex)
    // alert(props.progressIndex)
  }, [props.progressIndex])

  useEffect(() => {
    setProgressIndex(progressIndex)
  }, [props.enableProgress])

  function changePosition() {
    if (props.enableProgress) {
      if (progressIndex < props.images.length) {
        const mProgress = progressIndex + 1
        // console.log("Position Changed " + mProgress)
        setProgressIndex(mProgress)
        props.onChange(mProgress)

        setTimeout(() => {
          setProgressIndex(mProgress)
        }, 0)
      }
    }else {
      // TODO (compare with web version)
      setProgressIndex(progressIndex)
    }
  }

  return (
    <div className='parentStyle' style={Object.assign(styles.parent)} >
      {
        props.images.map((value, index) => (
          <ProgressItem
            enableProgress={props.enableProgress}
            size={props.images.length}
            duration={props.duration}
            barStyle={props.barStyle}
            progressIndex={progressIndex}
            currentIndex={index}
            onChangePosition={() => changePosition()} />
        ))
      }
    </div>
  );
}

export default ProgressView;

const styles = {
  parent: {
    display: 'inline-block',
    position: 'absolute',
    alignContent: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    alignItems: 'center',
    top: -10,
    left: '20%',
    right: '20%',
    width: '60%'
  }
}