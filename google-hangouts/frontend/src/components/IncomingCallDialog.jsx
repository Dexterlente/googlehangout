import React from 'react';

const IncomingCallDialog = ({ callTypeInfo, acceptCallHandler, rejectCallHandler }) => {

  return (
    <div className="incoming-call-dialog">
      {/* Your dialog content goes here */}
      <h2>Incoming Call</h2>
      <p>Call Type: {callTypeInfo}</p>
      <button onClick={acceptCallHandler}>Accept</button>
      <button onClick={rejectCallHandler}>Reject</button>
    </div>
  );
};

export default IncomingCallDialog;
