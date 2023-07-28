import React from 'react';

const outgoingCallDialog = ({ callTypeInfo, rejectCallHandler }) => {
  return (
    <div className="incoming-call-dialog">
      {/* Your dialog content goes here */}
      <h2>Outgoing Call</h2>
      <p>Call Type: {callTypeInfo}</p>
      <button onClick={rejectCallHandler}>Reject</button>
    </div>
  );
};

export default outgoingCallDialog;
