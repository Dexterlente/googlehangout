import React, {useEffect, useRef, useState } from 'react'
import useCallStateStore from './callStateStore';
import store from './store'
import { useSelector, useDispatch } from 'react-redux';
import { MdCallEnd } from 'react-icons/md';
import { BsFillMicMuteFill , BsFillMicFill, BsCameraVideoFill, BsCameraVideoOffFill } from 'react-icons/bs';

const VideoFeed = () => {
  const videoRef = useRef(null);
  const videoRefRemote = useRef(null);
  const localStream = useSelector(state => state.localStream);
  const remoteStream = useSelector(state => state.remoteStream);
  const dispatch = useDispatch();
  const [micEnabled, setMicEnabled] = useState(true);
  const [cameraEnabled, setCameraEnabled] = useState(true);

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
// mute or unmute
  const handleMicButtonClick = () => {
    const audioTrack = localStream.getAudioTracks()[0];
    if (audioTrack) {
      audioTrack.enabled = !micEnabled;
      setMicEnabled(!micEnabled);
    }
  };

  const handleCameraButtonClick = () => {
    const videoTrack = localStream.getVideoTracks()[0];
    if (videoTrack) {
      videoTrack.enabled = !cameraEnabled;
      setCameraEnabled(!cameraEnabled);
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
        {/* render only if available */}
        {remoteStream && (
        <div>
         <div>Remote video</div>
        <video className='border-2' ref={videoRefRemote} autoPlay playsInline muted/>
        <div className='flex justify-center'> 
          <div>
            <button id="mic_button" onClick={handleMicButtonClick}>
              {micEnabled ? <BsFillMicFill />: <BsFillMicMuteFill/>}
            </button>
       </div>
          <div> <MdCallEnd /></div>
            <div>     
                <button id="camera_button" onClick={handleCameraButtonClick}>
                  {cameraEnabled ? <BsCameraVideoFill /> : <BsCameraVideoOffFill />}
                </button>
              </div>
        </div>
        </div>
        )}
  </div>
  )
}

export default VideoFeed