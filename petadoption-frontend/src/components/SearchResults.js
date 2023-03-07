import React from 'react';
import './components.css/SearchResults.css'

const SearchResults = ({ results }) => {
  return (
    <div>
      <h2>Résultats de recherche</h2>
      {results.length > 0 ? (
        <ul>
          {results.map((result) => (
            <li key={result.id}>
              <img src={result.image} alt={result.name} />
              <p>{result.name}</p>
              <p>{result.age} ans</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>Aucun résultat trouvé.</p>
      )}
    </div>
  );
};

export default SearchResults;
