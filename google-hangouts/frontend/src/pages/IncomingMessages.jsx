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
    <div>
      <h2>Incoming Messages</h2>
      <ul>
        {messages.map((message, index) => (
          <li key={index}>
            <strong>From:</strong> {message.from} <br />
            <strong>Message:</strong> {message.body} <br />
            <strong>Timestamp:</strong> {message.timestamp}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default IncomingMessages;
