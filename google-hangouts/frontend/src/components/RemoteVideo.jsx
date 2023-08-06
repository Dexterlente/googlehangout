import React, { useEffect, useRef, useState } from 'react';
import { MdCallEnd } from 'react-icons/md';
import { BsFillMicMuteFill, BsFillMicFill, BsCameraVideoFill, BsCameraVideoOffFill } from 'react-icons/bs';
import * as webRTC from './webRTC';

const RemoteVideo = ({ stream, handleHangUpLast }) => {
  const videoRefRemote = useRef(null);
  const [micEnabled, setMicEnabled] = useState(true);
  const [cameraEnabled, setCameraEnabled] = useState(true);
  const [callActive, setCallActive] = useState(true);


  useEffect(() => {
    if (stream && videoRefRemote.current) {
      videoRefRemote.current.srcObject = stream;
      videoRefRemote.current.play().catch((error) => {
        console.log('Error playing remote video:', error);
      });
      videoRefRemote.current.addEventListener('playing', handleRemoteStreamPlaying);
      videoRefRemote.current.addEventListener('pause', handleRemoteStreamPaused);
    }

    // Clean up the event listeners and remote stream when the component unmounts
    return () => {
      if (videoRefRemote.current) {
        videoRefRemote.current.removeEventListener('playing', handleRemoteStreamPlaying);
        videoRefRemote.current.removeEventListener('pause', handleRemoteStreamPaused);
        const remoteStream = videoRefRemote.current.srcObject;
        if (remoteStream) {
          const tracks = remoteStream.getTracks();
          tracks.forEach((track) => track.stop());
        }
        videoRefRemote.current.srcObject = null;
      }
    };
  }, [stream]);

  // Handle remote stream playing event
  const handleRemoteStreamPlaying = () => {
    setCallActive(true);
  };

  // Handle remote stream pause event
  const handleRemoteStreamPaused = () => {
    setCallActive(false);
  };


    // Handle the remote stream error
    const handleRemoteStreamError = () => {
      console.log('Remote stream encountered an error');
      setCallActive(false);
    };

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
     // Stop the video and clear the remote stream
     if (videoRefRemote.current) {
      const remoteStream = videoRefRemote.current.srcObject;
      if (remoteStream) {
        const tracks = remoteStream.getTracks();
        tracks.forEach((track) => track.stop());
        videoRefRemote.current.srcObject = null;
      }
    }
    setCallActive(false);
  };

  return (
    <>
              {callActive && (
    <div>

      <video ref={videoRefRemote} 
      autoPlay playsInline 
      muted 
      />
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
          <MdCallEnd className='text-6xl bg-red-500 rounded-full p-2'
          //  onClick={handleHangUp} 
          onClick={() => {
            handleHangUp();
            handleHangUpLast();
          }}
           />
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
