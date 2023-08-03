import React, {useEffect, useRef, useState } from 'react'
import useCallStateStore from './callStateStore';
import store from './store'
import { useSelector, useDispatch } from 'react-redux';

const VideoFeed = () => {
  const videoRef = useRef(null);
  const localStream = useSelector(state => state.localStream);
  const dispatch = useDispatch();
  // const { state, dispatch } = useCallStateStore();
  // const { localStream } = state;
  const [cameraRequested, setCameraRequested] = useState(false); // change to false to work

  const defaultConstrains = {
    audio: true,
    video: true
}

  const handleGetLocalPreview = () => {
    if (!cameraRequested) {
      setCameraRequested(true);
      navigator.mediaDevices.getUserMedia(defaultConstrains)
        .then((stream) => {
          store.dispatch({ type: 'SET_LOCAL_STREAM', payload: stream });
        })
        .catch((err) => {
          console.log('Something went wrong on camera');
          console.log(err);
        });
    }
  };

  

  useEffect(() => {
    if (localStream && videoRef.current) {
      videoRef.current.srcObject = localStream;

      // Play the video only if it's not already playing
      if (videoRef.current.paused) {
        videoRef.current.play().catch((error) => {
          console.log('Error playing video:', error);
        });
      }
    }
  }, [localStream]);
  handleGetLocalPreview();

  return (
    <div>
          <div>
            <div>video</div>
            <video className='border-2' ref={videoRef} autoPlay playsInline/>
        {/* Any other content you want to display */}
        </div>
  </div>
  )
}

export default VideoFeed