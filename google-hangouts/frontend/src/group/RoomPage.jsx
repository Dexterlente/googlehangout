import React, { useState } from 'react';

const RoomPage = () => {
  const [activeMemberContainer, setActiveMemberContainer] = useState(false);
  const [activeChatContainer, setActiveChatContainer] = useState(false);
  const [userIdInDisplayFrame, setUserIdInDisplayFrame] = useState(null);
  const [videoFrames, setVideoFrames] = useState([]);

  const messagesContainerRef = React.createRef();
  const membersContainerRef = React.createRef();
  const chatContainerRef = React.createRef();
  const displayFrameRef = React.createRef();

  const expandVideoFrame = (e) => {
    const displayFrame = displayFrameRef.current;
    const streamsContainer = document.getElementById('streams__container');

    const child = displayFrame.children[0];
    if (child) {
      streamsContainer.appendChild(child);
    }

    displayFrame.style.display = 'block';
    displayFrame.appendChild(e.currentTarget);
    setUserIdInDisplayFrame(e.currentTarget.id);

    videoFrames.forEach((frame) => {
      if (frame.id !== userIdInDisplayFrame) {
        frame.style.height = '100px';
        frame.style.width = '100px';
      }
    });
  };

  const hideDisplayFrame = () => {
    setUserIdInDisplayFrame(null);
    const displayFrame = displayFrameRef.current;
    const streamsContainer = document.getElementById('streams__container');

    const child = displayFrame.children[0];
    streamsContainer.appendChild(child);

    videoFrames.forEach((frame) => {
      frame.style.height = '300px';
      frame.style.width = '300px';
    });
  };

  return (
    <div>
      <div id="messages" ref={messagesContainerRef} style={{ maxHeight: '500px', overflow: 'auto' }}>
        {/* Render chat messages */}
      </div>
      <div id="members__container" style={{ display: activeMemberContainer ? 'block' : 'none' }} ref={membersContainerRef}>
        {/* Render member list */}
      </div>
      <button id="members__button" onClick={() => setActiveMemberContainer(!activeMemberContainer)}>Toggle Members</button>
      <div id="messages__container" style={{ display: activeChatContainer ? 'block' : 'none' }} ref={chatContainerRef}>
        {/* Render chat container */}
      </div>
      <button id="chat__button" onClick={() => setActiveChatContainer(!activeChatContainer)}>Toggle Chat</button>
      <div id="stream__box" style={{ display: 'none' }} ref={displayFrameRef}>
        {/* Display frame content */}
      </div>
      <div id="streams__container">
        {/* Render video frames */}
      </div>
    </div>
  );
}

export default RoomPage;
