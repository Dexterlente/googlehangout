import * as wss from './wss'

export const sendPreOffer = (callType, calleePersonalCode) => {
    console.log('pre offer function executed')
    console.log(callType);
    console.log(calleePersonalCode);
    const data = {
        callType,
        calleePersonalCode,
    };
    wss.sendPreOffer(data);
};