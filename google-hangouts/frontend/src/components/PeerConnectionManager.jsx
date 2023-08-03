// import useCallStateStore from './callStateStore'
// import * as constants from './constants'
// import React, { useEffect } from 'react'


// const PeerConnectionManager = () => {

// const { state, dispatch } = useCallStateStore()
// const createPeerConnection = () => {


//   const configuration = {
//     iceServers: [
//         {
//             urls: 'stun:stun.l.google.com:13902'
//         }
//     ]
//   }
//     const peerConnection = new RTCPeerConnection(configuration);
//     // peerConnection  = new RTCPeerConnection(configuration);
//     console.log('peerconnection log', peerConnection);

//     peerConnection.onicecandidate = (e) => {
//         console.log('getting ice candidates from stun server')
//         if (e.candidate) {
//             // set our ice candidate on other peer
//         }
//     }
//     // if sucessfully connected
//     peerConnection.onconnectionstatechange = (e) => {
//         if (peerConnection.connectionState === 'connected') {
//             console.log('sucessfully connected with other');
//         }
//     }
//     const remoteStream = new MediaStream();
//       // Dispatch action to set the remote stream in the state
//       dispatch({ type: 'SET_REMOTE_STREAM', payload: remoteStream });

//     peerConnection.ontrack = (e) => {
//       remoteStream.addTrack(e.track);
//     }
//     // add our stream to peer connection
//     const { callType } = state.connectedUserDetails;
//   if (
//     callType === constants.callType.VIDEO_PERSONAL_CODE ||
//     callType === constants.callType.VIDEO_STRANGER
//   ) {
//     const localStream = state.localStream;

//     for (const track of localStream.getTracks()) {
//       peerConnection.addTrack(track, localStream);
//         console.log('peerConnection', peerConnection)
//             }
//         }
//     }
//     useEffect(() => {
//       createPeerConnection();
//     }, []);
  
// return { createPeerConnection };
// // return null;

// };
// export default PeerConnectionManager;

// const PeerConnectionManager = () => {
    // createPeerConnection();
// console.log(peerConnection);

//     const createPeerConnection = () => {
// const configuration = {
//     iceServers: [
//         {
//             urls: 'stun:stun.l.google.com:13902'
//         }
//     ]
// }

//     peerConnection  = new RTCPeerConnection(configuration);
//     console.log('peerconnection log', peerConnection);

//     peerConnection.onicecandidate = (e) => {
//         console.log('getting ice candidates from stun server')
//         if (e.candidate) {
//             // set our ice candidate on other peer
//         }
//     }
//     // if sucessfully connected
//     peerConnection.onconnectionstatechange = (e) => {
//         if (peerConnection.connectionState === 'connected') {
//             console.log('sucessfully connected with other');
//         }
//     }
//     const remoteStream = new MediaStream();
//       // Dispatch action to set the remote stream in the state
//     useCallStateStore().dispatch({ type: 'SET_REMOTE_STREAM', payload: remoteStream });
  
//     peerConnection.ontrack = (e) => {
//       remoteStream.addTrack(e.track);
//     }
//      // add our stream to peer connection
//     //  const { callType } = useCallStateStore().state.connectedUserDetails;
//   if (
//     connectedUserDetails.callType === constants.callType.VIDEO_PERSONAL_CODE ||
//     connectedUserDetails.callType === constants.callType.VIDEO_STRANGER
//   ) {
//     const localStream = useCallStateStore().state.localStream;

//     for (const track of localStream.getTracks()) {
//         peerConnection.addTrack(track, localStream);
//             }
//         }
//     }
// return { peerConnection, createPeerConnection } 
// };

// export default PeerConnectionManager;

// let { peerConnection } = PeerConnectionManager();
