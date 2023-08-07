import React from 'react';
import { LuPhoneCall } from 'react-icons/lu';
import { MdCallEnd } from 'react-icons/md';

const IncomingCallDialog = ({ callTypeInfo, acceptCallHandler, rejectCallHandler }) => {

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="incoming-call-dialog bg-gray-200 p-4 rounded shadow-md">
      {/* Your dialog content goes here */}
  
      <h2 className='text-5xl font-bold m-5'>Incoming Call</h2>
      <p className='text-xl font-bold m-5'>Call Type: {callTypeInfo}</p>
      {/* <button onClick={acceptCallHandler}>Accept</button> */}
      <div className='flex row items-center justify-center'>
      <LuPhoneCall onClick={acceptCallHandler} className='text-6xl cursor-pointer mr-4 bg-green-500 rounded-full p-1' />
      {/* <button onClick={rejectCallHandler}>Reject</button> */}
      <MdCallEnd onClick={rejectCallHandler} className='text-6xl cursor-pointer ml-4 bg-red-500 rounded-full p-1' />
      </div>
      </div>
    </div>
  );
};

export default IncomingCallDialog;
