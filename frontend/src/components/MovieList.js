import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const MovieList = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8080/movies', {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    }).then(response => setMovies(response.data));
  }, []);

  const deleteMovie = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/movies/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      setMovies(movies.filter(movie => movie._id !== id));
    } catch (err) {
      alert('Error deleting movie');
    }
  };

  return (
    <div>
      <h1>Movies</h1>
      <Link to="/add">Add New Movie</Link>
      <ul>
        {movies.map(movie => (
          <li key={movie._id}>
            {movie.title} - <Link to={`/movies/${movie._id}`}>View</Link> - 
            <Link to={`/edit/${movie._id}`}>Edit</Link> - 
            <button onClick={() => deleteMovie(movie._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MovieList;
