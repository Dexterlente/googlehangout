import * as useSocket from './useSocket'
import * as constants from './constants'
import * as ui from './ui'
import * as MainPage from '../pages/MainPage'


let connectedUserDetails;

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
    // setShowOutgoingCall(true);
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
    sendPreOfferAnswer(constants.preOfferAnswer.CALL_ACCEPTED);
}
export const rejectCallHandler = () => {
    console.log('call rejected')
    sendPreOfferAnswer(constants.preOfferAnswer.CALL_REJECTED);
}

const callingDialogRejectCallHandler = () => {
    console.log('Rejecting the call');
}

// anwer of accepting 
const sendPreOfferAnswer = (preOfferAnswer) =>{
    const data = {
        callerSocketId: connectedUserDetails.socketId,
        preOfferAnswer
    }
    useSocket.sendPreOfferAnswer(data);
}