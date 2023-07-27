import { useEffect } from 'react';
import io from 'socket.io-client';
import API_ENDPOINT from '../config.jsx';
import Cookies from 'js-cookie';

const useSocket = (dispatch) => {
  useEffect(() => {
    // Get the token on the cookies
    const authToken = Cookies.get('token');
    if (!authToken) {
      // Handle the case when there is no authToken (not logged in)
      console.log('No authentication token found. Unable to connect to Socket.IO server.');
      return;
    }

    // Connect to the Socket.IO server
    const socket = io(`${API_ENDPOINT}`, {
      // OMG I LOOK INTO THIS PROBLEM FOR OUR MY GOD
      transports: ['websocket'],
      auth: {
        token: authToken,
      },
    });

    // Handle socket events
    socket.on('connect', () => {
      console.log('Connected to Socket.IO server');
      console.log('connect', socket.id);
      dispatch({ type: 'SET_SOCKET_ID', payload: socket.id });
    });

    socket.on('message', (data) => {
      // Handle incoming messages from the server
      console.log('Received message:', data);
    });

    // Clean up the socket connection when the component unmounts
    return () => {
      socket.disconnect();
      console.log('Disconnected from Socket.IO server');
    };
  }, [dispatch]);
};

export default useSocket;
