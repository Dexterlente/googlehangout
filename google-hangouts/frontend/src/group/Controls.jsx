import { useState } from "react";
import { useClient } from "./settings";
import { MdMic, MdMicOff } from "react-icons/md";
import { IoVideocam, IoVideocamOff } from "react-icons/io5";
import { FiLogOut } from "react-icons/fi";


export default function Controls(props) {
  const client = useClient();
  const { tracks, setStart, setInCall } = props;
  const [trackState, setTrackState] = useState({ video: true, audio: true });

  const mute = async (type) => {
    if (type === "audio") {
      await tracks[0].setEnabled(!trackState.audio);
      setTrackState((ps) => {
        return { ...ps, audio: !ps.audio };
      });
    } else if (type === "video") {
      await tracks[1].setEnabled(!trackState.video);
      setTrackState((ps) => {
        return { ...ps, video: !ps.video };
      });
    }
  };

  const leaveChannel = async () => {
    await client.leave();
    client.removeAllListeners();
    tracks[0].close();
    tracks[1].close();
    setStart(false);
    setInCall(false);
  };

  return (
    <div className="flex items-center space-x-2">
      <button
        className={`${
          trackState.audio ? "bg-blue-500" : "bg-red-500"
        } hover:bg-blue-600 text-white font-bold py-2 px-4 rounded`}
        onClick={() => mute("audio")}
      >
        {trackState.audio ? <MdMic /> : <MdMicOff />}
      </button>
      <button
        className={`${
          trackState.video ? "bg-blue-500" : "bg-red-500"
        } hover:bg-blue-600 text-white font-bold py-2 px-4 rounded`}
        onClick={() => mute("video")}
      >
        {trackState.video ? <IoVideocam /> : <IoVideocamOff />}
      </button>
      <button
        className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded"
        onClick={() => leaveChannel()}
      >
        Leave
        <FiLogOut />
      </button>
    </div>
  );
}
