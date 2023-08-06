import React, {useEffect, useRef, useState } from 'react'
import useCallStateStore from './callStateStore';
import store from './store'
import { useSelector, useDispatch } from 'react-redux';
import { MdCallEnd } from 'react-icons/md';
import { BsFillMicMuteFill , BsFillMicFill, BsCameraVideoFill, BsCameraVideoOffFill } from 'react-icons/bs';
import * as webRTC from './webRTC'
import RemoteVideo from './RemoteVideo';

const VideoFeed = () => {
  const videoRef = useRef(null);
  // const videoRefRemote = useRef(null);
  const localStream = useSelector(state => state.localStream);
  const remoteStream = useSelector(state => state.remoteStream);
  // const dispatch = useDispatch();
  // const [micEnabled, setMicEnabled] = useState(true);
  // const [cameraEnabled, setCameraEnabled] = useState(true);
  // const [callActive, setCallActive] = useState(true);

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
  // handle hangup
//   const handleHangUp = () => {
//     webRTC.handleHangUp();
//     setCallActive(false);
//   };
// // mute or unmute
//   const handleMicButtonClick = () => {
//     const audioTrack = localStream.getAudioTracks()[0];
//     if (audioTrack) {
//       audioTrack.enabled = !micEnabled;
//       setMicEnabled(!micEnabled);
//     }
//   };

//   const handleCameraButtonClick = () => {
//     const videoTrack = localStream.getVideoTracks()[0];
//     if (videoTrack) {
//       videoTrack.enabled = !cameraEnabled;
//       setCameraEnabled(!cameraEnabled);
//     }
//   };

  

  useEffect(() => {
    if (localStream && videoRef.current) {
      videoRef.current.srcObject = localStream;
    }
  }, [localStream]);

  // useEffect(() => {
  //   if (remoteStream && videoRefRemote.current) {
  //     videoRefRemote.current.srcObject = remoteStream;
  //   }
  // }, [remoteStream]);

  // useEffect(() => {
  //   // Request access to camera and microphone only once when the component mounts
  //   handleGetLocalPreview();
  // }, []);
  handleGetLocalPreview();

  return (
    <div>
          <div>
            <div>video</div>
            <video className='border-2' ref={videoRef} autoPlay playsInline muted/>
        {/* Any other content you want to display */}
        </div>
        {/* render only if remoteStream exists and its video track is enabled */}
        {remoteStream && <RemoteVideo stream={remoteStream} />}
  </div>
  )
}

export default VideoFeed


// { callActive && remoteStream && 
//   // remoteStream.getVideoTracks()[0]?.enabled &&
//   (
//   <div>
  
//    {/* <div>Remote video</div> */}
//   <video ref={videoRefRemote} autoPlay playsInline muted/>
//   <div className='flex justify-center mt-3 align-bottom'> 
//         <div className='mx-2'>
//           <button id="mic_button" onClick={handleMicButtonClick}>
//             {micEnabled ? <BsFillMicFill className="text-5xl bg-black rounded-full p-2" />: <BsFillMicMuteFill className="text-5xl bg-black opacity-60 rounded-full p-2"/>}
//           </button>
//     </div>
//     <div> <MdCallEnd className="text-6xl bg-red-500 rounded-full p-2" onClick={handleHangUp} /></div>
//       <div className='mx-2'>     
//           <button id="camera_button" onClick={handleCameraButtonClick}>
//             {cameraEnabled ? <BsCameraVideoFill className="text-5xl bg-black rounded-full p-2" /> : <BsCameraVideoOffFill className="text-5xl bg-black opacity-60 rounded-full p-2" />}
//           </button>
//         </div>
//   </div>
//   </div>
//   )}