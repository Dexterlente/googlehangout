import React, { useState, useEffect } from 'react';
import API_ENDPOINT from '../config.jsx'

const IncomingMessages = () => {
  const [messages, setMessages] = useState([]);


    // Fetch incoming messages from your backend
const fetchMessages = () => {
    fetch(`${API_ENDPOINT}/incoming`)
      .then(response => response.json())
      .then(data => {
        // Update the messages state with the fetched messages
        setMessages(data.messages);
      })
      .catch(error => {
        console.error('Error fetching incoming messages:', error);
      });
  };

    useEffect(() => {

      fetchMessages();

      const intervalId = setInterval(fetchMessages, 5000);// refresh every 5 secs

          // Clean up the interval on component unmount
    return () => {
      clearInterval(intervalId);
    };
    }, []);

  return (
    <div className='mt-4'>
      <h2 className='text-xl font-semibold mb-2'>Incoming Messages</h2>
      <ul className='bg-gray-100 p-4 rounded shadow'>
        {messages.map((message, index) => (
          <li key={index} className='mb-4'>
            <strong className='block text-blue-500 font-medium'>From:</strong> 
            <span className='ml-2'>{message.from} </span><br />
            <strong className='block text-blue-500 font-medium'>Message:</strong>
             <span className='ml-2'>{message.body} </span><br />
             <span className='ml-2'>{message.timestamp}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default IncomingMessages;
