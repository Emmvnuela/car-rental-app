// app.js
const express = require('express');
const cors = require('cors');

const app = express();

// CORS
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));

app.use(express.json());

// Routes
const userRoutes = require('./routes/userRoutes');
const reservationRoutes = require('./routes/reservationRoutes');
const paymentRoutes = require('./routes/paymentRoutes');
const damageRoutes = require('./routes/damageRoutes');
const missionRoutes = require('./routes/missionRoutes');
const carRoutes = require('./routes/carRoutes');
const authRoutes = require('./routes/authRoutes');
const agentRoutes = require('./routes/agentRoutes');
const deliveriesRoutes = require('./routes/deliveriesRoutes');
const availabilityRoutes = require('./routes/availabilityRoutes');
const notificationRoutes = require('./routes/notificationRoutes');
const documentRoutes = require('./routes/documents');
const adminDocumentsRoutes = require('./routes/adminDocuments');
const contratsLocationRoutes = require('./routes/contratLocationRoutes');
const emailTestRoutes = require('./routes/emailTest');
const chatRoutes = require('./routes/chatRoutes');
const reviewRoutes = require('./routes/reviewRoutes');



// Utilisation des routes
app.use('/api/users', userRoutes);
app.use('/api/reservations', reservationRoutes);
app.use('/api/payments', paymentRoutes);
app.use('/api/damages', damageRoutes);
app.use('/api/missions', missionRoutes);
app.use('/api/cars', carRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/agents', agentRoutes);
app.use('/api/deliveries', deliveriesRoutes);
app.use('/api/availability', availabilityRoutes);
app.use('/api/notifications', notificationRoutes);
app.use('/api/documents', documentRoutes);
app.use('/api/admin-documents', adminDocumentsRoutes);
app.use('/api/contrats-location', contratsLocationRoutes);
app.use('/api', emailTestRoutes);
app.use('/api/messages', chatRoutes);
app.use('/api/reviews', reviewRoutes);

// Fichiers statiques
app.use('/uploads', express.static('uploads'));

// Route test
app.get('/', (req, res) => {
  res.send('Bienvenue sur l’API VU Vehicles 🚗');
});

module.exports = app;
