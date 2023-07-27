import * as constants from "./constants";
import * as MainPage from '../pages/MainPage'

export const showIncomingCallDialog = (
    callType,
    acceptCallHandler,
    rejectCallHandler
  ) => {
    const callTypeInfo =
      callType === constants.callType.CHAT_PERSONAL_CODE ? "Chat" : "Video";

      const getIncomingCallDialog = MainPage.getIncomingCallDialog();
    };