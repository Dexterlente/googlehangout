import { useEffect } from 'react';
import io from 'socket.io-client';
import API_ENDPOINT from '../config.jsx';
import Cookies from 'js-cookie';
import * as webRTC from './webRTC.jsx'

let socketIO = null;

const useSocket = (dispatch, setShowIncomingCall) => {
   
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
      // OMG I LOOK INTO THIS PROBLEM FOR HOURS MY GOD
      transports: ['websocket'],
      auth: {
        token: authToken,
      },
    });

    // Handle socket events
    socket.on('connect', () => {
    socketIO = socket;
      console.log('a', socketIO);
      console.log('Connected to Socket.IO server');
      console.log('connect', socket.id);
      dispatch({ type: 'SET_SOCKET_ID', payload: socket.id });
    });

    
    socket.on('pre-offer', (data) => {
        socketIO = socket;
        // webRTC.sendPreOffer(data, setShowOutgoingCall);
        // console.log(data);
        webRTC.handlePreOffer(data, setShowIncomingCall);
        console.log(data);
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
  }, [dispatch, setShowIncomingCall]);
};

    export const sendPreOffer = (data) => {
        socketIO.emit('pre-offer', data);
    };


export default useSocket;
