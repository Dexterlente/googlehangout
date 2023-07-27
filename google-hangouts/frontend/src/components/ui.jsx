import * as constants from "./constants";

export const showIncomingCallDialog = (
    callType,
    acceptCallHandler,
    rejectCallHandler
  ) => {
    const callTypeInfo =
      callType === constants.callType.CHAT_PERSONAL_CODE ? "Chat" : "Video";
  
    // const incomingCallDialog = elements.getIncomingCallDialog(
    //   callTypeInfo,
    //   acceptCallHandler,
    //   rejectCallHandler
    // );
    };