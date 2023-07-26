import React from 'react'
import Chat from '../components/Chat'
import VideoFeed from '../components/VideoFeed'
import ContactFeed from '../components/ContactFeed'

const MainPage = () => {
  return (
    <div className='grid grid-cols-3'>
        <ContactFeed className='grid-col-span' />
        <VideoFeed className='grid-col-span' />
        <Chat className='grid-col-span' />
    </div>
  )
}

export default MainPage