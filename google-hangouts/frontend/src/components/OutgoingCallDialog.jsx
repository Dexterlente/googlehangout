import React from 'react';
import { MdCallEnd } from 'react-icons/md';
// 
const OutgoingCallDialog = ({ callTypeInfo, handleRejectCallOutGoing }) => {

  const handleCancelCall = () => {
    // Perform the necessary actions when the user cancels the outgoing call
    console.log('Call cancelled');
    // setShowOutgoingCall(false); // Set the showOutgoingCall state to false
  };

  return (
    <div className="flex items-center justify-center h-screen">
    <div className="incoming-call-dialog bg-gray-200 p-4 rounded shadow-md">
      <h2 className='text-5xl font-bold m-5'>Outgoing Call</h2>
      {/* <p>Call Type: {callTypeInfo} </p> */}
      {/* <button onClick={handleRejectCallOutGoing}>Reject</button> */}
      {/* <button >Reject</button> */}
      <div className='flex row items-center justify-center'>
      <MdCallEnd onClick={handleRejectCallOutGoing} className='text-6xl cursor-pointer ml-4 bg-red-500 rounded-full p-1' />
      </div>
      </div>
    </div>
  );
};

export default OutgoingCallDialog;
