import { useMemo } from "react";
import { io } from "socket.io-client";

const createSocket  = (url) => {
  const socket = useMemo(() => io(url), [url]);

  return socket;
};

export default createSocket ;
