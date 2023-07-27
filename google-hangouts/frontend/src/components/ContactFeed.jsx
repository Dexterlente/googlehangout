import React, { useState } from 'react'
import { GoCopy } from 'react-icons/go';
import * as webRTC from './webRTC';
import * as constants from './constants';

const ContactFeed = ({ socketId }) => {
  const [calleePersonalCode, setCalleePersonalCode] = useState('');

  const handleOnClick = () => {
    navigator.clipboard.writeText(socketId)
    console.log('Socket ID copied:', socketId);
  };

    // Function to handle the input change
    const handleInputChange = (event) => {
      // Access the input value and set it in the state variable (calleePersonalCode)
      setCalleePersonalCode(event.target.value);
    };


  const handleButtonChat = () => {
    console.log('chat button clicked');

    const callType = constants.callType.CHAT_PERSONAL_CODE;
   
    webRTC.sendPreOffer(callType, calleePersonalCode);
  };


  const handleButtonVideo = () => {
    
    console.log('video button clicked');
    webRTC();
  };


  return (
    <div className=' bg-[#FFD700] rounded-lg' >
        <div className='h-screen'>
            <div className='mt-8 mb-24'>
                Contact Me App
            </div>
            <div>
                Talk With other user by passing this code 
            </div>
            <div className='mb-4 border-2 mx-12 py-3 rounded-xl bg-yellow-500'>
              <div>
                Your personal contact code
              </div>
              <div>
                <button className='rounded-2xl bg-[#E0FFFF] px-4 py-2 mr-1'>
                {socketId}
                </button>
                <button onClick={handleOnClick} className='py-2 px-4 pb-3 rounded-lg bg-[#E0FFFF] hover:bg-yellow-500'>
                  <GoCopy size={16}/> 
                </button>
              </div>
            </div>
            <div className='mt-24'>
              <input className='p-2 rounded-lg' placeholder='Input Other Persons Code' type='text' value={calleePersonalCode} onChange={handleInputChange}/>
            </div>
            <div className='mt-2'>
              <button className='rounded-xl bg-[#E0FFFF] px-4 py-2 mr-1' onClick={handleButtonChat}>Chat</button>
              <button className='rounded-xl bg-[#E0FFFF] px-4 py-2 mr-1' onClick={handleButtonVideo}>Video Call</button>
            </div>
        </div>
    </div>
  )
}

export default ContactFeed