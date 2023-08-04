import * as useSocket from './useSocket'
import * as constants from './constants'
import * as MainPage from '../pages/MainPage'
import useCallStateStore from './callStateStore'
// import PeerConnectionManager from './PeerConnectionManager';
import store from './store.js'


let connectedUserDetails;
let peerConnection;


    const configuration = {
    iceServers: [
        {
            urls: 'stun:stun.l.google.com:13902'
        }
    ]
}
const createPeerConnection = () => {
    peerConnection  = new RTCPeerConnection(configuration);
    console.log('peerconnection log', peerConnection);

    peerConnection.onicecandidate = (e) => {
        console.log('getting ice candidates from stun server')
        if (e.candidate) {
            // set our ice candidate on other peer
            useSocket.sendDataUsingWebRTCSignaling({
                connectedUserSocketId: connectedUserDetails.socketId,
                type: constants.webRTCSignaling.ICE_CANDIDATE,
                candidate: e.candidate,
            });
        }
    }
    // if sucessfully connected
    peerConnection.onconnectionstatechange = (e) => {
        if (peerConnection.connectionState === 'connected') {
            console.log('sucessfully connected with other');
        }
    }
    const remoteStream = new MediaStream();
      // Dispatch action to set the remote stream in the state
    store.dispatch({ type: 'SET_REMOTE_STREAM', payload: remoteStream });
    console.log(remoteStream);
  
    peerConnection.ontrack = (e) => {
      remoteStream.addTrack(e.track);
    }
  if (
    connectedUserDetails.callType === constants.callType.VIDEO_PERSONAL_CODE ||
    connectedUserDetails.callType === constants.callType.VIDEO_STRANGER
  ) 
  {
    const localStream = store.getState().localStream;
    console.log(localStream);
    // const localStream = useCallStateStore().store.localStream
    for (const track of localStream.getTracks()) {
        peerConnection.addTrack(track, localStream);
            }
        }
    }


export const sendPreOffer = (callType, calleePersonalCode) => {

    console.log('pre offer function executed')
    console.log(callType);
    console.log(calleePersonalCode);
    
    // for caller dialog execution
    connectedUserDetails = {
        callType,
        socketId: calleePersonalCode
    }
    // check if want call type is receiving
    if (callType === constants.callType.CHAT_PERSONAL_CODE ||
         callType === constants.callType.VIDEO_PERSONAL_CODE) {
        // reject only button if caller side
    const data = {
        callType,
        calleePersonalCode,
    };
    
    useSocket.sendPreOffer(data);

    }
};

export const handlePreOffer = (data, setShowIncomingCall) => {
    console.log('pre-offer arrived');
    console.log(data);
    const { callType, callerSocketId } = data;

    connectedUserDetails = {
        socketId: callerSocketId,
        callType,
    };
    

    if (
        callType === constants.callType.CHAT_PERSONAL_CODE ||
        callType === constants.callType.VIDEO_PERSONAL_CODE
    ) {
        setShowIncomingCall(true);
    
    }

};

export const acceptCallHandler = () => {
    console.log('call accepted')
    createPeerConnection();
    sendPreOfferAnswer(constants.preOfferAnswer.CALL_ACCEPTED);
}
export const rejectCallHandler = () => {
    console.log('call rejected')
    sendPreOfferAnswer(constants.preOfferAnswer.CALL_REJECTED);
}

const callingDialogRejectCallHandler = () => {
    console.log('Rejecting the call');
    sendPreOffer(constants.preOfferAnswer.CALL_REJECTED);
}

// anwer of accepting 
const sendPreOfferAnswer = (preOfferAnswer) =>{
    const data = {
        callerSocketId: connectedUserDetails.socketId,
        preOfferAnswer
    }
    useSocket.sendPreOfferAnswer(data);
}


    export const handlePreOfferAnswer = (data, setShowOutgoingCall, setCallAccepted) => {
    

        const { preOfferAnswer } = data;
        console.log('data back to caller');
        console.log(data);

        if (preOfferAnswer === constants.preOfferAnswer.CALLEE_NOT_FOUND){
            //callee is not found
            console.log('Callee not found');
        }
        if (preOfferAnswer === constants.preOfferAnswer.CALL_UNAVAILABLE){
            //not available cannot connect
            console.log('Call unavailable');
        }
        if (preOfferAnswer === constants.preOfferAnswer.CALL_REJECTED){
            // the call is rejected by the callee
        }
        if (preOfferAnswer === constants.preOfferAnswer.CALL_ACCEPTED){
            // send webRTC offer
            const callType = connectedUserDetails.callType
            console.log('THIS IS THE CALLTYPE', callType);
            createPeerConnection();
            setCallAccepted(true);
            sendWebRTCOffer();
        } {
            setShowOutgoingCall(false);
        }
    }


    const sendWebRTCOffer = async () => {
        const offer = await peerConnection.createOffer();
        await peerConnection.setLocalDescription(offer);
        useSocket.sendDataUsingWebRTCSignaling({
          connectedUserSocketId: connectedUserDetails.socketId,
          type: constants.webRTCSignaling.OFFER,
          offer: offer,
        });
      };


    
export const handleWebRTCOffer = async (data) => {
    await peerConnection.setRemoteDescription(data.offer);
    const answer = await peerConnection.createAnswer();
    await peerConnection.setLocalDescription(answer);
    useSocket.sendDataUsingWebRTCSignaling({
        connectedUserSocketId: connectedUserDetails.socketId,
        type: constants.webRTCSignaling.ANSWER,
        answer: answer,
    })
};

export const handleWebRTCAnswer = async (data) => {
    console.log('WEBRTC ANsWER WORKS')
    await peerConnection.setRemoteDescription(data.answer);
};

export const handleWebRTCCandidate = async (data) => {
    console.log('handle incomming webrtc candidate')
    try {
        await peerConnection.addIceCandidate(data.candidate);
    } catch (err) {
        console.log('shit happens when trying to add receive ice candidate', err)
    }
}
