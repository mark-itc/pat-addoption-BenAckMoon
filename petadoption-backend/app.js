const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const mongoose = require('mongoose');
const errorHandler = require('./middlewares/error-handler');
const authRoutes = require('./routes/authRoutes/authRoutes')
const userRoutes = require('./routes/userRoutes/userRoutes');
const petRoutes = require('./routes/petRoutes/petRoutes');

// Connexion MongoDB
mongoose.connect(process.env.DATABASE_URL, {
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 5000, 
  socketTimeoutMS: 45000 
})
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.log('MongoDB connection error:', err));

//  Express
const app = express();

//middleware pour parser le JSON
app.use(express.json());

// routes
app.use('/auth', authRoutes);
app.use('/user', userRoutes);
app.use('/pet', petRoutes);

// middleware pour gérer les erreurs
app.use(errorHandler);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
