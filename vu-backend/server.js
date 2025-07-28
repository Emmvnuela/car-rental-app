// server.js
const http = require('http');
const app = require('./app'); // express app
const { Server } = require('socket.io');

// Crée le serveur HTTP
const server = http.createServer(app);

// Initialise Socket.IO
const io = new Server(server, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
  }
});

// Injecte io dans l’app pour pouvoir l’utiliser dans les routes
app.set('socketio', io);

// Gestion des événements socket
io.on('connection', (socket) => {
  console.log('✅ Utilisateur connecté:', socket.id);

  socket.on('joinRoom', ({ roomId }) => {
    socket.join(roomId);
    console.log(`📥 Utilisateur ${socket.id} a rejoint la salle ${roomId}`);
  });

  socket.on('sendMessage', ({ roomId, message, sender }) => {
    io.to(roomId).emit('receiveMessage', {
      message,
      sender,
      timestamp: Date.now()
    });
  });

  socket.on('disconnect', () => {
    console.log('❌ Utilisateur déconnecté:', socket.id);
  });
});

// Lance le serveur
server.listen(5000, () => {
  console.log('🚀 Serveur démarré sur le port 5000');
});
