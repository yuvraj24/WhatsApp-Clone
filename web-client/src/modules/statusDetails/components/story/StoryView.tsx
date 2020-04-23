import React, { useEffect, useState, CSSProperties } from "react";
import Image1 from "../../assets/images/img1.jpg";
import { StoryViewProps } from "../../utils/interfaceHelper";
import '../css/storyView.css'
import ProgressiveImage from "./ProgressiveImage";
import ProgressiveImageView from "./ProgressiveImageView";

function StoryView(props: StoryViewProps) {
  const [refresh, setRefresh] = useState(true);

  const image = props.images[props.progressIndex]

  useEffect(() => {
    // if (props.progressIndex < props.images.length) {
    // console.log(props.progressIndex);
    //  setRefresh(!refresh)
    // }
  }, [props.progressIndex]);
  //process.env.PUBLIC_URL + 
  return (
    <div className='divStory' style={{ justifyContent: 'center' }}>
      <ProgressiveImage
        className='imgStory'
        alt={"Image"}
        style={props.imageStyle}
        overlaySrc={image}
        src={image} 
        // onImageLoad={() => props.onImageLoad(props.progressIndex)}
        />

      {/* <ProgressiveImageView
        preview={image}
        src={image}
        render={(src, style) => <img src={image}
          style={props.imageStyle} />}
      /> */}

      {/* <img
        className='imgStory'
        style={Object.assign({}, { width: '40%', height: '100%', alignSelf: 'center', display: 'flex' }, props.imageStyle)}
        alt={"Image"}
        src={image}
      /> */}
    </div>
  );
}

export default StoryView;
