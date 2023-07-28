import * as useSocket from './useSocket'
import * as constants from './constants'
import * as ui from './ui'

let connectedUserDetails;

export const sendPreOffer = (callType, calleePersonalCode) => {
    console.log('pre offer function executed')
    console.log(callType);
    console.log(calleePersonalCode);
    // console.log(setShowOutgoingCall);
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

    // ui.showIncomingCallDialog(callingDialogRejectCallHandler);
    useSocket.sendPreOffer(data);
    // setShowOutgoingCall(true);
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
        // ui.showIncomingCallDialog(callType, acceptCallHandler, rejectCallHandler);
    }

};
const acceptCallHandler = () => {
    console.log('call accepted')
}
const rejectCallHandler = () => {
    console.log('call rejected')
}
const callingDialogRejectCallHandler = () => {
    console.log('Rejecting the call');
}