import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import batikData from './db.json';
import './Second.css';

const Second = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [featuredBatikIndex, setFeaturedBatikIndex] = useState(null);

  const batikList = batikData.batik;
  const navigate = useNavigate();

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    const results = batikList.filter((batik) =>
      batik.nama_batik.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setSearchResults(results);
    setFeaturedBatikIndex(null);
  };

  return (
    <div className="search-page">
      <div className="button">
        <button onClick={() => navigate('/')}>Home</button>
        <button onClick={() => navigate('/exhibition')}>Virtual Exhibition</button>
      </div>
      <h1 className="search-heading">Search Page</h1>
      <form className="search-form" onSubmit={handleSearchSubmit}>
        <input
          className="search-input"
          type="text"
          value={searchQuery}
          onChange={handleSearchChange}
          placeholder="Search Batik"
        />
        <button className="search-button" type="submit">
          Search
        </button>
      </form>

      {searchResults.length > 0 && (
        <div className="result">
          <h2>Search Results:</h2>
          <div className="featured-carousel">
            {searchResults.slice(0, 5).map((batik, index) => (
              <div
                key={batik.id}
                className={`batik-card ${index === featuredBatikIndex ? 'active' : ''}`}
              >
                <h3 className="batik-name">{batik.nama_batik}</h3>
                <img className="batik-image" src={batik.image} alt={batik.nama_batik} />
                <div className="batik-details">
                  <p className="batik-info">Nama: {batik.nama_batik}</p>
                  <p className="batik-info">Daerah: {batik.daerah}</p>
                  <p className="batik-info">Makna: {batik.makna}</p>
                  <p className="batik-info">Deskripsi: {batik.deskripsi}</p> {/* Added description */}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {featuredBatikIndex !== null && (
        <div className="featured-batik">
          <h2>Featured Batik:</h2>
          <div className={`batik-card ${featuredBatikIndex === null ? 'active' : ''}`}>
            <h3 className="batik-name">{batikList[featuredBatikIndex].nama_batik}</h3>
            <img
              className="batik-image"
              src={batikList[featuredBatikIndex].image}
              alt={batikList[featuredBatikIndex].nama_batik}
            />
            <div className="batik-details">
              <p className="batik-info">Nama: {batikList[featuredBatikIndex].nama_batik}</p>
              <p className="batik-info">Daerah: {batikList[featuredBatikIndex].daerah}</p>
              <p className="batik-info">Makna: {batikList[featuredBatikIndex].makna}</p>
              <p className="batik-info">Deskripsi: {batikList[featuredBatikIndex].deskripsi}</p> {/* Added description */}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Second;
