import { Server } from 'socket.io';

// Function to create and return the Socket.IO server
function createSocketServer(server) {
  const io = new Server(server);

  // Socket.IO connection handling
  io.on('connection', (socket) => {
    // Your socket connection logic goes here
    console.log('User is connected on socketIO server')
    console.log(socket.id)
  });

  return io;
}

export default createSocketServer;