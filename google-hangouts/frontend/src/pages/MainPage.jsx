import React, { useEffect } from 'react'
import Chat from '../components/Chat'
import VideoFeed from '../components/VideoFeed'
import ContactFeed from '../components/ContactFeed'
import useCallStateStore from '../components/callStateStore';
import useSocket from '../components/useSocket'

 
export const getIncomingCallDialog = (
  callTypeInfo,
  acceptCallHandler,
  rejectCallHandler
) => {
  console.log('get incomming call dialog')
};

const MainPage = () => {
  const { state, dispatch } = useCallStateStore();
  const { socketId } = state;

  useSocket(dispatch); 


  return (
    <div className='grid grid-cols-3'>
            <ContactFeed className='grid-col-span' state={state} dispatch={dispatch} socketId={socketId} />
            <VideoFeed className='grid-col-span'state={state} dispatch={dispatch} />
            <Chat className='grid-col-span' state={state} dispatch={dispatch}/>
    </div>
  )
}

export default MainPage