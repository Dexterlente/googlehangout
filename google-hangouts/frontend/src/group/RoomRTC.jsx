import React, { useEffect, useState, useRef } from 'react'
import { useParams, useNavigate } from 'react-router-dom';
import AgoraRTC from 'agora-rtc-sdk-ng';
import VideoPlayer from './VideoPlayer';
import VideoComponent from './VideoComponent';

const APP_ID = "60106f3622514127adc5ef4f5999d81e";
const token = null;


const RoomRTC = () => {
    const navigate = useNavigate();
    const { roomId } = useParams();
    const [showVideoPlayer, setShowVideoPlayer] = useState(true);
    const [uid, setUid] = useState('');
    const [localTracks, setLocalTracks] = useState([]);
    // let localTracks = []
    let remoteUsers = {}
    const [client, setClient] = useState(null);

    useEffect(() => {

      const storedUid = sessionStorage.getItem('uid');
      if (!storedUid) {
        const newUid = String(Math.floor(Math.random() * 10000));
        sessionStorage.setItem('uid', newUid);
        setUid(newUid); // Set the uid state
      } else {
        setUid(storedUid); // Set the uid state
      }
      }, []);
    


    useEffect(() => {
        const displayName = sessionStorage.getItem('display_name');
        if (!displayName) {
            navigate('/lobby');
        }

        if (!roomId) {
            navigate('/room/main'); // Redirect to a default room URL
          }

          let joinRoomInit = async () => {   
            const newClient  = AgoraRTC.createClient({ mode: 'rtc', codec: 'vp8' });
            await newClient .join(APP_ID, roomId, token, uid);
            // so can be access anywhere 
            setClient(newClient);
            const newLocalTracks  = await AgoraRTC.createMicrophoneAndCameraTracks();

          //  await joinStream();
           setShowVideoPlayer(true);
           setLocalTracks(newLocalTracks);
           await newClient.publish(newLocalTracks);
          };

          joinRoomInit();

      }, [navigate, roomId, uid]);
      //
      const handleUserPublished = async (user, mediaType) => { 
      
      };

      return (
        <>
             <div>
                    <div>RoomRTC</div>
                    <h1>Room: {roomId}</h1>
                <div className="flex justify-center items-center mt-8">
                    {showVideoPlayer && localTracks.length > 0 && (
                       <div className="w-64 h-64 overflow-hidden">
                            <VideoComponent track={localTracks[1]} />
                        </div>
                    )}
                </div>
            </div>
        </>
  )
}

export default RoomRTC