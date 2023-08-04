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
        {/* render only if remoteStream exists and its video track is enabled */}
        {remoteStream && remoteStream.getVideoTracks()[0]?.enabled &&  (
        <div>
        
         <div>Remote video</div>
        <video ref={videoRefRemote} autoPlay playsInline muted/>
        <div className='flex justify-center mt-3 align-bottom'> 
              <div className='mx-2'>
                <button id="mic_button" onClick={handleMicButtonClick}>
                  {micEnabled ? <BsFillMicFill className="text-5xl bg-black rounded-full p-2" />: <BsFillMicMuteFill className="text-5xl bg-black opacity-60 rounded-full p-2"/>}
                </button>
          </div>
          <div> <MdCallEnd className="text-6xl bg-red-500 rounded-full p-2"  /></div>
            <div className='mx-2'>     
                <button id="camera_button" onClick={handleCameraButtonClick}>
                  {cameraEnabled ? <BsCameraVideoFill className="text-5xl bg-black rounded-full p-2" /> : <BsCameraVideoOffFill className="text-5xl bg-black opacity-60 rounded-full p-2" />}
                </button>
              </div>
        </div>
        </div>
        )}
         {/* {remoteStream && remoteStream.getVideoTracks()[0]?.enabled === false && (
           <div> <MdCallEnd className="text-6xl bg-red-500 rounded-full p-2"  /></div>
         )} */}
  </div>
  )
}

export default VideoFeed