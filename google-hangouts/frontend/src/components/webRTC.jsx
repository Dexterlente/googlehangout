import * as useSocket from './useSocket'
import * as constants from './constants'
import * as ui from './ui'

let connectedUserDetails;

export const sendPreOffer = (callType, calleePersonalCode) => {
    console.log('pre offer function executed')
    console.log(callType);
    console.log(calleePersonalCode);
    const data = {
        callType,
        calleePersonalCode,
    };
    useSocket.sendPreOffer(data);
};

export const handlePreOffer = (data) => {
    console.log('pre-offer arrived');
    console.log(data);
    const { callType, callerSocketId } = data;

    connectedUserDetails = {
        socketId: callerSocketId,
        callType,
    };
    
    const acceptCallHandler = () => {
        console.log('call accepted')
    }
    const rejectCallHandler = () => {
        console.log('call rejected')
    }
    if (
        callType === constants.callType.CHAT_PERSONAL_CODE ||
        callType === constants.callType.VIDEO_PERSONAL_CODE
    ) {
        ui.showIncomingCallDialog(callType, acceptCallHandler, rejectCallHandler);
    }

};