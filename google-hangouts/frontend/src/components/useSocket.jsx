import { useEffect } from 'react';
import io from 'socket.io-client';
import API_ENDPOINT from '../config.jsx';
import Cookies from 'js-cookie';
import * as webRTC from './webRTC.jsx'
import * as constants from './constants.jsx'
import store from './store';

let socketIO = null;

const useSocket = (dispatch, setShowIncomingCall, setShowOutgoingCall, setCallAccepted, onCallTypeReceived) => {
   
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
    // webRTC.getLocalPreview(getLocalPreview);
    // Handle socket events
    socket.on('connect', () => {
    socketIO = socket;
      console.log('a', socketIO);
      console.log('Connected to Socket.IO server');
      console.log('connect', socket.id);
      store.dispatch({ type: 'SET_SOCKET_ID', payload: socket.id });
    });

    
    socket.on('pre-offer', (data) => {
        socketIO = socket;
        // webRTC.sendPreOffer(data, setShowOutgoingCall);
        // console.log(data);
        webRTC.handlePreOffer(data, setShowIncomingCall, onCallTypeReceived);
        console.log(data);
      });

    socket.on("pre-offer-answer", (data) => {
      webRTC.handlePreOfferAnswer(data, setShowOutgoingCall, setCallAccepted);
      console.log(data);
    });

    socket.on("webRTC-signaling", (data) => {
      switch (data.type) {
        case constants.webRTCSignaling.OFFER:
          webRTC.handleWebRTCOffer(data);
          break;
          case constants.webRTCSignaling.ANSWER:
            webRTC.handleWebRTCAnswer(data);
          break;
          case constants.webRTCSignaling.ICE_CANDIDATE:
            webRTC.handleWebRTCCandidate(data);
          break;
        default:
          return;        
      }
    })

    // Clean up the socket connection when the component unmounts
    return () => {
      socket.disconnect();
      console.log('Disconnected from Socket.IO server');
    };
  }, [dispatch, setShowIncomingCall, setShowOutgoingCall, setCallAccepted, onCallTypeReceived]);
};

    export const sendPreOffer = (data) => {
        socketIO.emit('pre-offer', data);
    };
// passing to server
    export const sendPreOfferAnswer = (data) => {
      socketIO.emit('pre-offer-answer', data);
    }

    export const sendDataUsingWebRTCSignaling= (data) => {
      socketIO.emit('webRTC-signaling', data);
    }

export default useSocket;
