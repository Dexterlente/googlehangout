import React, { useEffect, useState } from 'react'
import Chat from '../components/Chat'
import VideoFeed from '../components/VideoFeed'
import ContactFeed from '../components/ContactFeed'
import useCallStateStore from '../components/callStateStore';
import useSocket from '../components/useSocket'
import IncomingCallDialog from '../components/IncomingCallDialog';
import * as ui from '../components/ui';
import OutgoingCallDialog from '../components/OutgoingCallDialog'
import * as webRTC from '../components/webRTC'
import * as constants from '../components/constants'


export const getIncomingCallDialog = (
  callTypeInfo,
  acceptCallHandler,
  rejectCallHandler,
) => {

  console.log('get incomming call dialog')
  setShowIncomingCall(true);
};

export const getCallingDialog = (rejectCallHandler
  ) => {
  console.log('calling other person')
  setShowOutgoingCall(true);
};



const MainPage = () => {
  const { state, dispatch } = useCallStateStore();
  const { socketId } = state;
  const [showIncomingCall, setShowIncomingCall] = useState(false);
  const [showOutgoingCall, setShowOutgoingCall] = useState(false);
  // const [showIncomingCallDialog, setShowIncomingCallDialog] = useState(false);

  useSocket(dispatch, setShowIncomingCall, setShowOutgoingCall); 

  const handleIncomingCall = () => {
    getIncomingCallDialog(
      // "VIDEO", // Replace "VIDEO" with the actual call type, or pass it as a prop from the parent component
      () => {}, // Replace empty functions with your actual accept and reject call handlers
      () => {} // Replace empty functions with your actual accept and reject call handlers
    );
    setShowIncomingCall(true); // Update the state to true when the incoming call arrives
  };

  const toggleOutgoingCallDialog = () => {
    setShowOutgoingCall((prevShowOutgoingCall) => !prevShowOutgoingCall);
  };

  // Function to handle accepting the call
const handleAcceptCall = () => {
  // Perform the necessary actions when the call is accepted
  console.log('Call accepted');
  webRTC.acceptCallHandler();
  setShowIncomingCall(false);
};
// Function to handle rejecting the call
const handleRejectCall = () => {
  // Perform the necessary actions when the call is rejected
  console.log('Call rejected');
  webRTC.rejectCallHandler();
  setShowIncomingCall(false);
};
 

  return (
    <div>
      {/* Conditionally render the IncomingCallDialog */}
      {showIncomingCall ? (
        <IncomingCallDialog
          callTypeInfo={"VIDEO"} // Replace "VIDEO" with the actual call type, or pass it as a prop from the parent component
          acceptCallHandler={handleAcceptCall} // Replace empty function with your actual accept call handler
          rejectCallHandler={handleRejectCall} // Replace empty function with your actual reject call handler
        />
      ) : 
       showOutgoingCall ? ( // Conditionally render the OutgoingCallDialog
        <OutgoingCallDialog setShowOutgoingCall={toggleOutgoingCallDialog}
          // callTypeInfo={"VIDEO"}
          // rejectCallHandler={() => {
          //   setShowOutgoingCall(false); // Function to handle canceling the outgoing call
          // }}
        />
      ) : 
      (
      <div className='grid grid-cols-3'>
                <ContactFeed className='grid-col-span' state={state} dispatch={dispatch} socketId={socketId} toggleOutgoingCallDialog={toggleOutgoingCallDialog}/>
                <VideoFeed className='grid-col-span'state={state} dispatch={dispatch} />
                <Chat className='grid-col-span' state={state} dispatch={dispatch}/>
      </div>  
      )}            
    </div>
  ) 
}

export default MainPage