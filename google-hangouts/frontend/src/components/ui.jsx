import * as constants from "./constants";
import * as MainPage from '../pages/MainPage'
import IncomingCallDialog from './IncomingCallDialog'

export const showIncomingCallDialog = (
    callType,
    acceptCallHandler,
    rejectCallHandler
  ) => {
    const callTypeInfo =
      callType === constants.callType.CHAT_PERSONAL_CODE ? "Chat" : "Video";

      console.log('callType', callType);
      const incomingDialog = MainPage.getIncomingCallDialog();

    };