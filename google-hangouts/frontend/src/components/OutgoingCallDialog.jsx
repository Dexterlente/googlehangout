import React from 'react';
// 
const OutgoingCallDialog = ({ setShowOutgoingCall }) => {

  const handleCancelCall = () => {
    // Perform the necessary actions when the user cancels the outgoing call
    console.log('Call cancelled');
    // setShowOutgoingCall(false); // Set the showOutgoingCall state to false
  };

  return (
    <div className="incoming-call-dialog">
      Your dialog content goes here
      <h2>Outgoing Call</h2>
      <p>Call Type: </p>
      <button onClick={handleCancelCall}>Reject</button>
      {/* <button >Reject</button> */}
    </div>
  );
};

export default OutgoingCallDialog;
