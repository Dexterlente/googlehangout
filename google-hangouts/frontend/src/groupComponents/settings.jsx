import { createClient, createMicrophoneAndCameraTracks } from "agora-rtc-react";

const appId = "2b9dac3b4d084d7bb5f84b22cd986df4";
const token = "007eJxTYFhfolq3bOeKf4LhjwMzXuct3TVN28viFee/qXdUhW5mTjJWYDCxMEtOSzEytUg2MTZJTDWxNExLMU61SDMwNTK3SDVJrn51J6UhkJFhGdM3RkYGCATxWRhyEzPzGBgAshshEg==";

export const config = { mode: "rtc", codec: "vp8", appId: appId, token: token };
export const useClient = createClient(config);
export const useMicrophoneAndCameraTracks = createMicrophoneAndCameraTracks();
export const channelName = "main";