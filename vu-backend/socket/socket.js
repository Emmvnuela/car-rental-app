const socketHandler = (io) => {
  io.on('connection', (socket) => {
    console.log(`✅ Utilisateur connecté: ${socket.id}`);

    socket.on('joinRoom', (roomId) => {
      socket.join(roomId);
      console.log(`📥 Rejoint la salle: ${roomId}`);
    });

    socket.on('sendMessage', ({ room_id, sender_id, receiver_id, message, timestamp }) => {
      io.to(room_id).emit('receiveMessage', {
        room_id,
        sender_id,
        receiver_id,
        message,
        timestamp,
      });
    });

    socket.on('disconnect', () => {
      console.log(`❌ Utilisateur déconnecté: ${socket.id}`);
    });
  });
};

module.exports = socketHandler;
