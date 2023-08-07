import React from 'react';
// 
const OutgoingCallDialog = ({ callTypeInfo, handleRejectCallOutGoing }) => {

  const handleCancelCall = () => {
    // Perform the necessary actions when the user cancels the outgoing call
    console.log('Call cancelled');
    // setShowOutgoingCall(false); // Set the showOutgoingCall state to false
  };

  return (
    <div className="incoming-call-dialog">
      Your dialog content goes here
      <h2>Outgoing Call</h2>
      {/* <p>Call Type: {callTypeInfo} </p> */}
      <button onClick={handleRejectCallOutGoing}>Reject</button>
      {/* <button >Reject</button> */}
    </div>
  );
};

export default OutgoingCallDialog;
