import React from 'react'
import { GoCopy } from 'react-icons/go';

const ContactFeed = ({socketId}) => {


  const handleOnClick = () => {
    navigator.clipboard.writeText(socketId)
    console.log('Socket ID copied:', socketId);
  };
  const handleButtonChat = () => {
    
    console.log('chat button clicked');
  };
  const handleButtonVideo = () => {
    
    console.log('video button clicked');
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
              <input className='p-2 rounded-lg' placeholder='Input Other Persons Code'/>
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