import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [planets, setPlanets] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(null);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch(`https://swapi.dev/api/planets/?page=${currentPage}`);
      const data = await response.json();
      setPlanets(planets => [...planets, ...data.results]);
      setTotalPages(Math.ceil(data.count / 10));
    }

    fetchData();
  }, [currentPage]);

  const handlePrevPlanetsPage = () => {
    setCurrentPage(currentPage => Math.max(currentPage - 1, 1));
  };

  const handleNextPlanetsPage = () => {
    setCurrentPage(currentPage => Math.min(currentPage + 1, totalPages));
  };

  const handleFetchMore = () => {
    setCurrentPage(currentPage => currentPage + 1);
  };

  return (
    <div className="App">
      
      <div className="cards-container">
        <div className="cards">
          {planets.map(planet => (
            <div className="card" key={planet.name}>
              <h2>{planet.name}</h2>
              <p>Population: {planet.population}</p>
              <p>Climate: {planet.climate}</p>
            </div>
          ))}
        </div>
      </div>
      {currentPage < totalPages && <button onClick={handleFetchMore}>Fetch More</button>}
      
      
    </div>
  );
}

export default App;
