import './App.css';
import { useState, useEffect } from 'react';
import ProductList from './ProductCards/ProductList.jsx';
import Footer from './Footer1/Footer1.jsx';
import Navbar1 from './Navbar1/Navbar1.jsx';
import SearchButton from './SearchButton/SearchButton.jsx';
import { getMovies, createMovie } from './apiBD.js';

function App() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    fetchMovies();
  }, []);

  const fetchMovies = async () => {
    try {
      const response = await getMovies();
      setMovies(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleAddMovie = async (movie) => {
    try {
      await createMovie({
        title: movie.Title,
        year: movie.Year,
        poster: movie.Poster,
        type: movie.Type,
      });
      fetchMovies();
    } catch (error) {
      console.error('Error adding movie:', error);
    }
  };

  return (
    <>
      <header>
        <Navbar1 />
      </header>

      <main>
        <div className='content'>
          <SearchButton onAddMovie={handleAddMovie} />
          <ProductList movies={movies} />
        </div>
      </main>

      <footer id="footer">
        <Footer />
      </footer>
    </>
  );
}

export default App;
