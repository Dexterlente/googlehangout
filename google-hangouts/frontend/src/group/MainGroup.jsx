import { useState } from "react";
import VideoCall from "./Video";

function MainGroup() {
  const [inCall, setInCall] = useState(false);

  return (
    <div className="flex items-center justify-center h-screen">
      {inCall ? (
        <VideoCall setInCall={setInCall} />
      ) : (
        <button
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
          onClick={() => setInCall(true)}
        >
          Join Call
        </button>
      )}
    </div>
  );
}

export default MainGroup;
