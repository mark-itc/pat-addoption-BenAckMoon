import React, { useState } from "react";
import './components.css/SearchPage.css'


function SearchPage() {
  const [searchType, setSearchType] = useState('basic');

  // Basic search 
  const [animalType, setAnimalType] = useState('');

  // Advanced search 
  const [adoptionStatus, setAdoptionStatus] = useState('');
  const [size, setSize] = useState('');
  const [weight, setWeight] = useState('');
  const [name, setName] = useState('');

  const handleSearchTypeChange = (event) => {
    setSearchType(event.target.value);
  };

  const handleAnimalTypeChange = (event) => {
    setAnimalType(event.target.value);
  };

  const handleAdoptionStatusChange = (event) => {
    setAdoptionStatus(event.target.value);
  };

  const handleSizeChange = (event) => {
    setSize(event.target.value);
  };

  const handleWeightChange = (event) => {
    setWeight(event.target.value);
  };

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleSearchSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch('/search', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          searchType,
          animalType,
          adoptionStatus,
          size,
          weight,
          name
        })
      });
      const results = await response.json();
      console.log(results);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSearchSubmit}>
        <label>
          Search Type:
          <select value={searchType} onChange={handleSearchTypeChange}>
            <option value="basic">Basic</option>
            <option value="advanced">Advanced</option>
          </select>
        </label>
        {searchType === 'basic' ? (
          <div>
            <label>
              Animal Type:
              <select value={animalType} onChange={handleAnimalTypeChange}>
                <option value="">All</option>
                <option value="dog">Dog</option>
                <option value="cat">Cat</option>
              </select>
            </label>
          </div>
        ) : (
          <div>
            <label>
              Adoption Status:
              <select value={adoptionStatus} onChange={handleAdoptionStatusChange}>
                <option value="">All</option>
                <option value="available">Available</option>
                <option value="adopted">Adopted</option>
              </select>
            </label>
            <label>
              Size:
              <input type="text" value={size} onChange={handleSizeChange} />
            </label>
            <label>
              Weight:
              <input type="text" value={weight} onChange={handleWeightChange} />
            </label>
            <label>
              Name:
              <input type="text" value={name} onChange={handleNameChange} />
            </label>
          </div>
        )}
        <button type="submit">Search</button>
      </form>
    </div>
  );
}

export default SearchPage;
