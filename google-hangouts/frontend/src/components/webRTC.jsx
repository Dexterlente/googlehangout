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
        setCallAccepted(true);
        // onCallAccepted(callType);
    } {
        setShowOutgoingCall(false);
    }
}