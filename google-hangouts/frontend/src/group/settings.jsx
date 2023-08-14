import { createClient, createMicrophoneAndCameraTracks } from "agora-rtc-react";

const appId = "486cfd258c434ae491fd3e8f05278e4c";
const token =
  "007eJxTYJi+faN4xHM58ewQJbblk2qXTWxlV2ic88MjXHJmtSNrxEkFBhMLs+S0FCNTi2QTY5PEVBNLw7QU41SLNANTI3OLVJPk7wW3UhoCGRmq3UqYGRkgEMRnYchNzMxjYAAApVIdkw==";

export const config = { mode: "rtc", codec: "vp8", appId: appId, token: token };
export const useClient = createClient(config);
export const useMicrophoneAndCameraTracks = createMicrophoneAndCameraTracks();
export const channelName = "main";