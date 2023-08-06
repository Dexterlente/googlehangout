import React, {useEffect, useRef, useState } from 'react'
import useCallStateStore from './callStateStore';
import store from './store'
import { useSelector, useDispatch } from 'react-redux';
import { MdCallEnd } from 'react-icons/md';
import { BsFillMicMuteFill , BsFillMicFill, BsCameraVideoFill, BsCameraVideoOffFill } from 'react-icons/bs';
import * as webRTC from './webRTC'
import RemoteVideo from './RemoteVideo';
import useSocket from './useSocket';

const VideoFeed = () => {
 
  const videoRef = useRef(null);
  // const videoRefRemote = useRef(null);
  const localStream = useSelector(state => state.localStream);
  const remoteStream = useSelector(state => state.remoteStream);
  // const dispatch = useDispatch();
  // const [micEnabled, setMicEnabled] = useState(true);
  // const [cameraEnabled, setCameraEnabled] = useState(true);
  const [callActive, setCallActive] = useState(true);

  const [cameraRequested, setCameraRequested] = useState(false); // change to false to work
  useSocket(setCallActive);
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
    }
  }, [localStream]);

  handleGetLocalPreview();

  return (
    <div>
          <div>
            <div>video</div>
            <video className='border-2' ref={videoRef} autoPlay playsInline muted/>
        {/* Any other content you want to display */}
        </div>
        {/* render only if remoteStream exists and its video track is enabled */}
        {callActive && remoteStream && <RemoteVideo stream={remoteStream} />}
  </div>
  )
}

export default VideoFeed
