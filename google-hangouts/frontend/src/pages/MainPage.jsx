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
};

 
const MainPage = () => {
  const { state, dispatch } = useCallStateStore();
  const { socketId } = state;
  const [showIncomingCall, setShowIncomingCall] = useState(false);

  useSocket(dispatch); 

  // const handleIncomingCall = () => {
  //   setShowIncomingCall(true); // Update the state to true when the incoming call arrives
  // };

  // useEffect(() => {
  //   // Check for incoming calls and trigger the dialog
  //   if (showIncomingCall) {
  //     // Use the getIncomingCallDialog function directly here:
  //     const incomingCallDialog = getIncomingCallDialog(
  //       callTypeInfo,
  //       acceptCallHandler,
  //       rejectCallHandler
  //     );

  //     // Add your logic to display the incomingCallDialog as needed
  //   }
  // }, [showIncomingCall]);


  return (
    <div>
        {/* {showIncomingCall && (
        <IncomingCallDialog
          callTypeInfo={callTypeInfo}
          acceptCallHandler={acceptCallHandler}
          rejectCallHandler={rejectCallHandler}
        />
      )} */}
      <div className='grid grid-cols-3'>
                <ContactFeed className='grid-col-span' state={state} dispatch={dispatch} socketId={socketId} />
                <VideoFeed className='grid-col-span'state={state} dispatch={dispatch} />
                <Chat className='grid-col-span' state={state} dispatch={dispatch}/>
      </div>              
    </div>

  ) 
}

export default MainPage