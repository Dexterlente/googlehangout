import React, { useEffect, useState } from 'react'
import Chat from '../components/Chat'
import VideoFeed from '../components/VideoFeed'
import ContactFeed from '../components/ContactFeed'
import useCallStateStore from '../components/callStateStore';
import useSocket from '../components/useSocket'
import IncomingCallDialog from '../components/IncomingCallDialog';
import OutgoingCallDialog from '../components/OutgoingCallDialog'
import * as webRTC from '../components/webRTC'
import * as constants from '../components/constants'
import AcceptedCallComponent from '../components/AcceptedCallComponent'
// import PeerConnectionManager from '../components/PeerConnectionManager';
import store from '../components/store'
import { useDispatch, useSelector } from 'react-redux';


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
  const socketId = useSelector(state => state.socketId);
  const dispatch = useDispatch();
  // const { state, dispatch } = useCallStateStore();
  // const { socketId } = state;
  const [showIncomingCall, setShowIncomingCall] = useState(false);
  const [showOutgoingCall, setShowOutgoingCall] = useState(false);
  const [callAccepted, setCallAccepted] = useState(false);
  const [callType, onCallTypeReceived] = useState(null); 

  useSocket(dispatch, setShowIncomingCall, setShowOutgoingCall, setCallAccepted, onCallTypeReceived); 

  const handleIncomingCall = () => {
    getIncomingCallDialog();
    setShowIncomingCall(true); // Update the state to true when the incoming call arrives
  };

  const toggleOutgoingCallDialog = () => {
    setShowOutgoingCall((prevShowOutgoingCall) => !prevShowOutgoingCall);
    // setShowIncomingCall(false);
  };
  const handleIncomingCallType = (callType) => {
    onCallTypeReceived(callType);
    console.log(callType)
  };

  // Function to handle accepting the call
const handleAcceptCall = () => {
  // Perform the necessary actions when the call is accepted
  console.log('Call accepted');
  webRTC.acceptCallHandler();
  setShowIncomingCall(false);
  setCallAccepted(true);
  webRTC.acceptCallHandler(onCallAccepted);
};
// Function to handle rejecting the call
const handleRejectCall = () => {
  // Perform the necessary actions when the call is rejected
  console.log('Call rejected');
  webRTC.rejectCallHandler();
  setShowIncomingCall(false);
};


const onCallAccepted = (callType) => {
  // Perform any necessary actions when the call is accepted, based on the callType
  console.log('Call accepted with callType:', callType);
};

  return (
    <div>
      {/* Conditionally render the IncomingCallDialog */}
      {showIncomingCall ? (
        <IncomingCallDialog
          callTypeInfo={callType} // Replace "VIDEO" with the actual call type, or pass it as a prop from the parent component
          acceptCallHandler={handleAcceptCall} // Replace empty function with your actual accept call handler
          rejectCallHandler={handleRejectCall} // Replace empty function with your actual reject call handler
        />
      ) : 
       showOutgoingCall ? ( // Conditionally render the OutgoingCallDialog
        <OutgoingCallDialog setShowOutgoingCall={toggleOutgoingCallDialog}
          callTypeInfo={callType}
          // rejectCallHandler={() => {
          //   setShowOutgoingCall(false); // Function to handle canceling the outgoing call
          // }}
        />
      // ) : callAccepted ? ( <AcceptedCallComponent /> 
      ) 
      :
      (
      <div className='grid grid-cols-3'>
                <ContactFeed className='grid-col-span' dispatch={dispatch} socketId={socketId} toggleOutgoingCallDialog={toggleOutgoingCallDialog}/>
                <VideoFeed className='grid-col-span' dispatch={dispatch} />
                <Chat className='grid-col-span' dispatch={dispatch}/>
      </div>  
      )}          
    </div>
  ) 
}

export default MainPage