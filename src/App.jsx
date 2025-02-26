import './App.css'
import { useState, useEffect } from 'react'
import ProductList from './ProductCards/ProductList.jsx'
import Footer from './Footer1/Footer1.jsx'
import Navbar1 from './Navbar1/Navbar1.jsx'
import  {getMovies, createMovie} from './api.js'

function App() {
  const [movies, setMovies] = useState([]); //api
  const [newMovie, setNewMovie] = useState(''); //api

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
  }

  const handleAddMovie = async () => {
    if (newMovie.trim() === '') return;
    try {
      await createMovie({ newMovie });
      fetchMovies(); // Refresca la lista
      setNewMovie('');
    } catch (error) {
      console.error('Error creating movie:', error);
    }
  };

  return (
    <>
      <header>
        <Navbar1></Navbar1>
      </header>
      <main>
        <div className='content'>
          <ProductList movies={movies}></ProductList>
        </div>
      </main>
      <footer id="footer">
        <Footer></Footer>
      </footer>
    </>
  )
}

export default App