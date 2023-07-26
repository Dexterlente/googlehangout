import { Server } from 'socket.io';

// Function to create and return the Socket.IO server
function createSocketServer(server) {
  const io = new Server(server);

  let connectedPeers = [];
  // Socket.IO connection handling
  io.on('connection', (socket) => {
    console.log('User is connected on socketIO server')

    connectedPeers.push(socket.id);
    console.log(connectedPeers);
    socket.on("disconnect", () =>{
        console.log('User is disconnected');

        const newconnectedPeers = connectedPeers.filter((peerSocketId) => {
             // Return true for all socket IDs that are not equal to the disconnected client's socket ID
            peerSocketId !== socket.id;
        })
         // Update the connectedPeers array to the new array, excluding the disconnected client's socket ID
        connectedPeers = newconnectedPeers;
    });
  });

  return io;
}

export default createSocketServer;