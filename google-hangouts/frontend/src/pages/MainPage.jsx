import React, { useEffect, useState } from 'react'
import Chat from '../components/Chat'
import VideoFeed from '../components/VideoFeed'
import ContactFeed from '../components/ContactFeed'
import useCallStateStore from '../components/callStateStore';
import useSocket from '../components/useSocket'
import IncomingCallDialog from '../components/IncomingCallDialog';
import * as ui from '../components/ui';


export const getIncomingCallDialog = (
  callTypeInfo,
  acceptCallHandler,
  rejectCallHandler,
) => {

  console.log('get incomming call dialog')
  setShowIncomingCall(true);
};

 
const MainPage = () => {
  const { state, dispatch } = useCallStateStore();
  const { socketId } = state;
  const [showIncomingCall, setShowIncomingCall] = useState(false);
  // const [incomingCallType, setIncomingCallType] = useState("");

  useSocket(dispatch, setShowIncomingCall); 

  const handleIncomingCall = () => {
    getIncomingCallDialog(
      // "VIDEO", // Replace "VIDEO" with the actual call type, or pass it as a prop from the parent component
      () => {}, // Replace empty functions with your actual accept and reject call handlers
      () => {} // Replace empty functions with your actual accept and reject call handlers
    );
    setShowIncomingCall(true); // Update the state to true when the incoming call arrives
  };

  return (
    <div>
      {/* Conditionally render the IncomingCallDialog */}
      {showIncomingCall ? (
        <IncomingCallDialog
          callTypeInfo={"VIDEO"} // Replace "VIDEO" with the actual call type, or pass it as a prop from the parent component
          acceptCallHandler={() => {}} // Replace empty function with your actual accept call handler
          rejectCallHandler={() => {}} // Replace empty function with your actual reject call handler
        />
      ) : (
      <div className='grid grid-cols-3'>
                <ContactFeed className='grid-col-span' state={state} dispatch={dispatch} socketId={socketId} />
                <VideoFeed className='grid-col-span'state={state} dispatch={dispatch} />
                <Chat className='grid-col-span' state={state} dispatch={dispatch}/>
      </div>  
      )}            
    </div>

  ) 
}

export default MainPage