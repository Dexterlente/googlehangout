import { Server } from 'socket.io';

function createGroupServer(groupServer, corsOptions) {
  const emailToSocketIdMap = new Map();
  const socketidToEmailMap = new Map();

  const groupIo = new Server(groupServer, { cors: corsOptions });

  // Socket.IO connection handling
  groupIo.on('connection', (socket) => {
    console.log(`Group server socket is Connected`, socket.id);

    // socket.on("room:join", (data) => {
    //   const { email, room } = data;
    //   emailToSocketIdMap.set(email, socket.id);
    //   socketidToEmailMap.set(socket.id, email);
    //   groupIo.to(room).emit("user:joined", { email, id: socket.id });
    //   socket.join(room);
    //   groupIo.to(socket.id).emit("room:join", data);
    // });

    // socket.on("user:call", ({ to, offer }) => {
    //   groupIo.to(to).emit("incoming:call", { from: socket.id, offer });
    // });

    // socket.on("call:accepted", ({ to, ans }) => {
    //   groupIo.to(to).emit("call:accepted", { from: socket.id, ans });
    // });

    // socket.on("peer:nego:needed", ({ to, offer }) => {
    //   console.log("peer:nego:needed", offer);
    //   groupIo.to(to).emit("peer:nego:needed", { from: socket.id, offer });
    // });

    // socket.on("peer:nego:done", ({ to, ans }) => {
    //   console.log("peer:nego:done", ans);
    //   groupIo.to(to).emit("peer:nego:final", { from: socket.id, ans });
    // });
  });

  return groupIo;
}

export default createGroupServer;
