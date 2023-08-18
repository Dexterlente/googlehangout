import React, { useEffect, useState } from 'react';
import AgoraRTC from 'agora-rtc-sdk-ng';
import VideoComponent from './VideoComponent';

const APP_ID = "60106f3622514127adc5ef4f5999d81e";  // Replace with your actual Agora App ID
const token = null;  // Set your token if required

const Simple = () => {
    const [uid, setUid] = useState('');
    const [localTracks, setLocalTracks] = useState([]);

    useEffect(() => {
        const storedUid = sessionStorage.getItem('uid');
        if (!storedUid) {
            const newUid = String(Math.floor(Math.random() * 10000));
            sessionStorage.setItem('uid', newUid);
            setUid(newUid);
        } else {
            setUid(storedUid);
        }
    }, []);

    useEffect(() => {
        const joinRoomInit = async () => {
            const client = AgoraRTC.createClient({ mode: 'rtc', codec: 'vp8' });
            await client.join(APP_ID, 'YOUR_ROOM_ID', token, uid);

            const newLocalTracks = await AgoraRTC.createMicrophoneAndCameraTracks();
            setLocalTracks(newLocalTracks);

            await client.publish(newLocalTracks);
        };

        joinRoomInit();
    }, [uid]);

    return (
        <div>
            <div>RoomRTC</div>
            <h1>Room: YOUR_ROOM_ID</h1>

                <div className="flex justify-center items-center mt-8">
                    {localTracks.length > 0 && (
                       <div className="w-64 h-64 overflow-hidden">
                            <VideoComponent track={localTracks[1]} />
                        </div>
                    )}
                </div>
        </div>
    );
}

export default Simple;
