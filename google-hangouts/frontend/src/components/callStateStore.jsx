import { useReducer } from 'react';
import * as constants from "./constants.jsx";

const initialState = {
  socketId: null,
  localStream: null,
  remoteStream: null,
  screenSharingActive: false,
  screenSharingStream: null,
  allowConnectionsFromStrangers: false,
  callState: constants.callState.CALL_AVAILABLE_ONLY_CHAT,
};

const callStateReducer = (state, action) => {
  console.log(state); 
  console.log('Action:', action);
  switch (action.type) {
    case 'SET_SOCKET_ID':
      console.log('SET_SOCKET_ID - Payload:', action.payload);
      return {
        ...state,
        socketId: action.payload,
      };
    case 'SET_LOCAL_STREAM':
      return {
        ...state,
        localStream: action.payload,
      };
    case 'SET_ALLOW_CONNECTIONS':
      return {
        ...state,
        allowConnectionsFromStrangers: action.payload,
      };
    case 'SET_SCREEN_SHARING_ACTIVE':
      return {
        ...state,
        screenSharingActive: action.payload,
      };
    case 'SET_SCREEN_SHARING_STREAM':
      return {
        ...state,
        screenSharingStream: action.payload,
      };
    case 'SET_REMOTE_STREAM':
      return {
        ...state,
        remoteStream: action.payload,
      };
    case 'SET_CALL_STATE':
      return {
        ...state,
        callState: action.payload,
      };
    default:
      return state;
  }
};

const useCallStateStore = () => {
  const [state, dispatch] = useReducer(callStateReducer, initialState);

  return { state, dispatch };
};

export default useCallStateStore;
