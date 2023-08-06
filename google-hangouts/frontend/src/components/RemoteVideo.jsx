import React, { useEffect, useRef, useState } from 'react';
import { MdCallEnd } from 'react-icons/md';
import { BsFillMicMuteFill, BsFillMicFill, BsCameraVideoFill, BsCameraVideoOffFill } from 'react-icons/bs';
import * as webRTC from './webRTC';

const RemoteVideo = ({ stream }) => {
  const videoRefRemote = useRef(null);
  const [micEnabled, setMicEnabled] = useState(true);
  const [cameraEnabled, setCameraEnabled] = useState(true);
  const [callActive, setCallActive] = useState(true);

  useEffect(() => {
    if (stream && videoRefRemote.current) {
      videoRefRemote.current.srcObject = stream;
    }
  }, [stream]);

  const handleMicButtonClick = () => {
    const audioTrack = stream.getAudioTracks()[0];
    if (audioTrack) {
      audioTrack.enabled = !micEnabled;
      setMicEnabled(!micEnabled);
    }
  };

  const handleCameraButtonClick = () => {
    const videoTrack = stream.getVideoTracks()[0];
    if (videoTrack) {
      videoTrack.enabled = !cameraEnabled;
      setCameraEnabled(!cameraEnabled);
    }
  };

  const handleHangUp = () => {
    webRTC.handleHangUp();
    setCallActive(false);
  };

  return (
    <>
              {callActive && (
    <div>

      <video ref={videoRefRemote} autoPlay playsInline muted />
      <div className='flex justify-center mt-3 align-bottom'>
        <div className='mx-2'>
          <button id='mic_button' onClick={handleMicButtonClick}>
            {micEnabled ? (
              <BsFillMicFill className='text-5xl bg-black rounded-full p-2' />
            ) : (
              <BsFillMicMuteFill className='text-5xl bg-black opacity-60 rounded-full p-2' />
            )}
          </button>
        </div>
        <div>
          <MdCallEnd className='text-6xl bg-red-500 rounded-full p-2' onClick={handleHangUp} />
        </div>
        <div className='mx-2'>
          <button id='camera_button' onClick={handleCameraButtonClick}>
            {cameraEnabled ? (
              <BsCameraVideoFill className='text-5xl bg-black rounded-full p-2' />
            ) : (
              <BsCameraVideoOffFill className='text-5xl bg-black opacity-60 rounded-full p-2' />
            )}
          </button>
        </div>
      </div>
    </div>
              )}
    </>
  );
};

export default RemoteVideo;
