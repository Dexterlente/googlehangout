// VideoComponent.jsx
import React, { useEffect, useRef } from 'react';

const VideoComponent = ({ track }) => {
    const videoRef = useRef(null);

    useEffect(() => {
        if (videoRef.current) {
            track.play(videoRef.current);
        }
        return () => {
            track.stop();
        };
    }, [track]);

    return <video ref={videoRef} autoPlay muted />;
};

export default VideoComponent;
