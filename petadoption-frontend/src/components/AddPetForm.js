import React, { useState } from 'react';
import axios from 'axios';
import './components.css/AddPetForm.css'
import LoginForm from './LoginForm';


function AddPetForm() {
  const [type, setType] = useState('');
  const [name, setName] = useState('');
  const [adoptionStatus, setAdoptionStatus] = useState('');
  const [picture, setPicture] = useState('');
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [color, setColor] = useState('');
  const [bio, setBio] = useState('');
  const [hypoallergenic, setHypoallergenic] = useState(false);
  const [dietaryRestrictions, setDietaryRestrictions] = useState('');
  const [breed, setBreed] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);

  const handleLogin = (token) => {
    localStorage.setItem("token", token);
    setLoggedIn(true);
  };


  const handleSubmit = (event) => {
    event.preventDefault();

    
    // Récupération des données du formulaire
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData.entries());
    
    // Ajout de l'image à la FormData
    const image = event.target.files[0];
    formData.append('picture', image);
    
    // Envoi de la requête POST a
    axios.post('http://localhost:3001/pet/admin/addingpet', {
    name: data.name,
    breed: data.breed,
    userId: data.userId
    })
    .then(response => {
    console.log(response.data);
    })
    .catch(error => {
    console.error(error);
    });
    };


  return (
    <div>
      <h1>Add a New Pet</h1>
      <div>
      {loggedIn ? ( 
      <form onSubmit={handleSubmit}>
        <label>
          Type:
          <input type="text" name="name" value={type} onChange={(e) => setType(e.target.value)} />
        </label>
        <label>
          Name:
          <input type="text" name="name"value={name} onChange={(e) => setName(e.target.value)} />
        </label>
        <label>
          Adoption Status:
          <input type="text" name="name" value={adoptionStatus} onChange={(e) => setAdoptionStatus(e.target.value)} />
        </label>
        <label>
          Picture:
          <input type="file" name="name"value={picture} onChange={(e) => setPicture(e.target.files[0])} />
        </label>
        <label>
          Height:
          <input type="text" name="name"value={height} onChange={(e) => setHeight(e.target.value)} />
        </label>
        <label>
          Weight:
          <input type="text" name="name"value={weight} onChange={(e) => setWeight(e.target.value)} />
        </label>
        <label>
          Color:
          <input type="text" name="name"value={color} onChange={(e) => setColor(e.target.value)} />
        </label>
        <label>
          Bio:
          <textarea value={bio} name="name"onChange={(e) => setBio(e.target.value)} />
        </label>
        <label>
          Hypoallergenic:
          <input type="checkbox"name="name" checked={hypoallergenic} onChange={(e) => setHypoallergenic(e.target.checked)} />
        </label>
        <label>
          Dietary restrictions:
          <input type="text" name="name"value={dietaryRestrictions} onChange={(e) => setDietaryRestrictions(e.target.value)} />
        </label>
        <label>
          Breed:
          <input type="text" name="name"value={breed} onChange={(e) => setBreed(e.target.value)} />
        </label>
        <button type="submit">Add </button>
      </form>
    
    ) : (
      <LoginForm onLogin={handleLogin} />
    )}
    </div>
  </div>
);
}

 

export default AddPetForm;
