const Movie = require('../models/movie');

// Get all movies
const getMovies = async (req, res) => {
  const movies = await Movie.find();
  res.json(movies);
};

// Add a new movie
const addMovie = async (req, res) => {
  const { title, genre, director, releaseYear, description } = req.body;
  const newMovie = new Movie({ title, genre, director, releaseYear, description });
  await newMovie.save();
  res.status(201).send('Movie added');
};

// Update a movie
const updateMovie = async (req, res) => {
  const movie = await Movie.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!movie) return res.status(404).send('Movie not found');
  res.json(movie);
};

// Delete a movie
const deleteMovie = async (req, res) => {
  const movie = await Movie.findByIdAndDelete(req.params.id);
  if (!movie) return res.status(404).send('Movie not found');
  res.status(204).send();
};

module.exports = { getMovies, addMovie, updateMovie, deleteMovie };
