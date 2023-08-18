// VideoPlayer.jsx
import React, { useEffect, useRef } from 'react';

const VideoPlayer = ({ localTracks }) => {
    const videoRef = useRef(null);

    useEffect(() => {
        const videoElement = videoRef.current;
        const cameraTrack = localTracks.find(track => track.type === 'camera');

        if (videoElement && cameraTrack) {
            videoElement.srcObject = new MediaStream([cameraTrack.mediaStreamTrack]);
            videoElement.onloadedmetadata = () => {
                videoElement.play().catch(error => {
                    console.error('Error playing video:', error);
                });
            };
        }
    }, [localTracks]);

    return <video className="w-full h-full object-contain" ref={videoRef} autoPlay muted />;
};

export default VideoPlayer;
