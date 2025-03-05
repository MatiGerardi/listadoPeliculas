import { useState } from "react";
import PropTypes from "prop-types";
// import { createMovie } from "../../apiBD";

function ListOfMovies({ movies, onAddMovie }) {
  const [selectedMovie, setSelectedMovie] = useState(null);

  const handleMovieClick = (movie) => {
    setSelectedMovie(selectedMovie?.id === movie.id ? null : movie);
  };

  // const fetchMovies = async () => {
  //   try {
  //     const response = await getMovies();
  //     setMovies(response.data);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  // const handleAddMovie = async (movie) => {
  //   try {
  //     await createMovie({
  //       id: movie.imdbID,
  //       title: movie.Title,
  //       year: movie.Year,
  //       poster: movie.Poster,
  //       genre: movie.Genre,
  //       director: movie.Director,
  //       actors: movie.Actors,
  //       plot: movie.Plot,
  //       rating: movie.imdbRating,
  //       runtime: movie.Runtime,
  //     });
  //     fetchMovies();
  //   } catch (error) {
  //     console.error("Error adding movie:", error);
  //   }
  // };

  return (
    <ul className="movies">
      {movies.map((movie) => (
        <li
          className="movie"
          key={movie.id}
          onClick={() => handleMovieClick(movie)}
        >
          <h3>{movie.title}</h3>
          <p>{movie.year}</p>
          <img src={movie.poster} alt={movie.title} />

          {/* Mostrar detalles solo si esta película está seleccionada */}
          {selectedMovie?.id === movie.id && (
            <div className="movie-details">
              <p>
                <strong>Género:</strong> {movie.genre}
              </p>
              <p>
                <strong>Director:</strong> {movie.director}
              </p>
              <p>
                <strong>Actores:</strong> {movie.actors}
              </p>
              <p>
                <strong>Sinopsis:</strong> {movie.plot}
              </p>
              <p>
                <strong>Calificación:</strong> {movie.rating}
              </p>
              <p>
                <strong>Duración:</strong> {movie.runtime}
              </p>
              <button onClick={() => onAddMovie(movie)}>Agregar</button>
            </div>
          )}
        </li>
      ))}
    </ul>
  );
}

ListOfMovies.propTypes = {
  movies: PropTypes.array.isRequired,
  onAddMovie: PropTypes.func.isRequired,
};

function NoMoviesResults() {
  return <p>No se encontraron películas para esta búsqueda</p>;
}

export function Movies({ movies }) {
  const hasMovies = movies?.length > 0;

  return hasMovies ? <ListOfMovies movies={movies} /> : <NoMoviesResults />;
}

export default Movies;
