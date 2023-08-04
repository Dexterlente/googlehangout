import React, {useEffect, useRef, useState } from 'react'
import useCallStateStore from './callStateStore';
import store from './store'
import { useSelector, useDispatch } from 'react-redux';

const VideoFeed = () => {
  const videoRef = useRef(null);
  const videoRefRemote = useRef(null);
  const localStream = useSelector(state => state.localStream);
  const remoteStream = useSelector(state => state.remoteStream);
  const dispatch = useDispatch();

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
      // if (videoRef.current.paused) {
      //   videoRef.current.play().catch((error) => {
      //     console.log('Error playing video:', error);
      //   });
      // }
    }
  }, [localStream]);


  // Dispatch the action to set the remote stream
  // const dispatch = useDispatch();
  useEffect(() => {
    if (remoteStream && videoRefRemote.current) {
      videoRefRemote.current.srcObject = remoteStream;
    }
  }, [remoteStream]);

  handleGetLocalPreview();

  return (
    <div>
          <div>
            <div>video</div>
            <video className='border-2' ref={videoRef} autoPlay playsInline muted/>
        {/* Any other content you want to display */}
        </div>
        <div>
         <div>Remote video</div>
        <video className='border-2' ref={videoRefRemote} autoPlay playsInline muted/>
        </div>
  </div>
  )
}

export default VideoFeed