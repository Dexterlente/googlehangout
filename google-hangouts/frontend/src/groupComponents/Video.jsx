import { AgoraVideoPlayer } from "agora-rtc-react";
import { useState, useEffect } from "react";
import VideoPlayer from "./VideoPlayer";

export default function Video(props) {
  const { users, tracks } = props;
  const [gridSpacing, setGridSpacing] = useState(12);

  useEffect(() => {
    setGridSpacing(Math.max(Math.floor(12 / (users.length + 1)), 4));
  }, [users, tracks]);

  return (
    <div className="flex h-full">
      <div className={`w-${gridSpacing}`}>
        <VideoPlayer
          videoTrack={tracks[1]}
          className="h-full w-full"
        />
      </div>
      {users.length > 0 &&
        users.map((user) => {
          if (user.videoTrack) {
            return (
              <div className={`w-${gridSpacing}`} key={user.uid}>
                <VideoPlayer
                  videoTrack={user.videoTrack}
                  className="h-full w-full"
                />
              </div>
            );
          } else return null;
        })}
    </div>
  );
}
