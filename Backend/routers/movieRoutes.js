const express = require('express');
const { getMovies, addMovie, updateMovie, deleteMovie } = require('../controllers/movieController');
const authenticate = require('../middleware/authMiddleware');

const movieRoutes = express.Router();
movieRoutes.get('/', getMovies);
movieRoutes.post('/', authenticate, addMovie);
movieRoutes.put('/:id', authenticate, updateMovie);
movieRoutes.delete('/:id', authenticate, deleteMovie);

module.exports = movieRoutes;
