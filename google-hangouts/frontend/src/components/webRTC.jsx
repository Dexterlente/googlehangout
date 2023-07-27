import * as useSocket from './useSocket'

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
};