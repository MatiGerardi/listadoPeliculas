import { useState } from "react";
import PropTypes from "prop-types";
import "./SearchButton.css";
import SearchWindow from "../apiIMDB/SearchWindow";

function SearchButton({ onAddMovie }) {
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = async () => {
    if (!searchQuery.trim()) return;

    const API_KEY = "TU_OMDB_API_KEY"; // 🔹 Reemplaza con tu API Key de OMDb
    const url = `https://www.omdbapi.com/?s=${searchQuery}&apikey=${API_KEY}`;

    try {
      const response = await fetch(url);
      const data = await response.json();
      setSearchResults(data.Search || []);
    } catch (error) {
      console.error("Error searching movies:", error);
    }
  };

  return (
    <>
      <button className="search-btn" onClick={() => setSearchOpen(true)}>
        Buscar
      </button>

      {searchOpen && (
        <div className="search-modal">
          <button className="close-btn" onClick={() => setSearchOpen(false)}>
            ✖
          </button>
          <SearchWindow></SearchWindow>
        </div>
      )}
    </>
  );
}
SearchButton.propTypes = {
  onAddMovie: PropTypes.func.isRequired,
};

export default SearchButton;
