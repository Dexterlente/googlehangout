import React from 'react'
import { GoCopy } from 'react-icons/go';

const ContactFeed = ({socketId}) => {
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
                <button className='py-2 px-4 pb-3 rounded-lg bg-[#E0FFFF]'>
                  <GoCopy size={16}/> 
                </button>
              </div>
            </div>
            <div className='mt-24'>
              <input className='p-2 rounded-lg' placeholder='Input Other Persons Code'/>
            </div>
            <div className='mt-2'>
              <button className='rounded-xl bg-[#E0FFFF] px-4 py-2 mr-1'>Chat</button>
              <button className='rounded-xl bg-[#E0FFFF] px-4 py-2 mr-1'>Video Call</button>
            </div>
        </div>
    </div>
  )
}

export default ContactFeed