import { Server } from 'socket.io';

// Function to create and return the Socket.IO server
function createSocketServer(server) {
  const io = new Server(server);

  let connectedPeers = [];
  // Socket.IO connection handling
  io.on('connection', (socket) => {
  
    console.log('User is connected on socketIO server')

      socket.on('pre-offer', data => {
       const { calleePersonalCode, callType } = data;

        const connectedPeer = connectedPeers.find((peerSocketId) => 
          peerSocketId === calleePersonalCode
        );
        if (connectedPeer) {
          const data = {  
            callerSocketId: socket.id,
            callType,
          };
          io.to(calleePersonalCode).emit('pre-offer', data);
        } else {
          const data = {
            preOfferAnswer: 'CALLEE_NOT_FOUND',
          }
          io.to(socket.id).emit('pre-offer-answer', data);
        }
      });

      socket.on('pre-offer-answer', (data) => {
        console.log('pre offer answer came');
        console.log(data);
        const connectedPeer = connectedPeers.find((peerSocketId) => 
        peerSocketId === data.callerSocketId
  
      );

        if (connectedPeer){
          io.to(data.callerSocketId).emit('pre-offer-answer', data);
        }
    });

      socket.on('webRTC-signaling', (data) =>{
        const { connectedUserSocketId } = data;

        const connectedPeer = connectedPeers.find((peerSocketId) => 
        peerSocketId === connectedUserSocketId
        );

        if (connectedPeer) {
          io.to(connectedUserSocketId).emit('webRTC-signaling', data);
        }

      });
      //voice call
      socket.on('audioData', (data) => {
        // Broadcast the received audio data to all connected clients
        io.emit('audioData', data);
      });

      socket.on('user-hanged-up', (data) => {
        const { connectedUserSocketId } = data;
        console.log('got the hanger')

        const connectedPeer = connectedPeers.find((peerSocketId) => 
        peerSocketId === connectedUserSocketId
        );
        if (connectedPeer) {
          io.to(connectedUserSocketId).emit('user-hanged-up');
          console.log('passing to remote')
        }
      })

    connectedPeers.push(socket.id);
    console.log(connectedPeers);
    socket.on("disconnect", () =>{
        console.log('User is disconnected');

        const newconnectedPeers = connectedPeers.filter((peerSocketId) => 
             // Return true for all socket IDs that are not equal to the disconnected client's socket ID
            peerSocketId !== socket.id
        );
         // Update the connectedPeers array to the new array, excluding the disconnected client's socket ID
        connectedPeers = newconnectedPeers;
    });
  });

  return io;
}

export default createSocketServer;