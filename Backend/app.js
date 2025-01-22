const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const authMiddleware = require('./middleware/authMiddleware');
const authRoutes = require('./routers/authRoutes');
const movieRoutes = require('./routers/movieRoutes');

dotenv.config();
const app = express();
const PORT = process.env.PORT || 8080;

app.use(cors());
app.use(express.json()); // Using express.json()

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

app.use('/auth', authRoutes);
app.use('/movies', authMiddleware, movieRoutes); // Protected routes

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
