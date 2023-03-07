import React, { useState } from 'react';
import './components.css/ProfileSetting.css'

function ProfileSettings() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [bio, setBio] = useState('');

  const handleFormSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    
    fetch('http://localhost:3001/user/profile-settings/update', {
      method: 'PUT',
      body: formData
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Failed to save profile changes');
      }
      alert('Profile changes saved successfully');
    })
    .catch(error => {
      console.error(error);
      alert('Failed to save profile changes');
    });
  };
  
  const handleDeleteUser = () => {
    fetch('http://localhost:3001/user/profile-settings/delete${userId}', {
    method: 'DELETE'
    })
    .then(response => {
    if (!response.ok) {
    throw new Error('Failed to delete user');
    }
    alert('User deleted successfully');
    })
    .catch(error => {
    console.error(error);
    alert('Failed to delete user');
    });
    }

  return (
    <form onSubmit={handleFormSubmit}>
      <h2>Profile Settings</h2>
      <label> Email:
        <input type="email" value={email}
          onChange={(event) => setEmail(event.target.value)}/>
      </label>
      <br />
      <label> Password:
        <input type="password" value={password}
          onChange={(event) => setPassword(event.target.value)}/>
      </label>
      <br />
      <label> First Name:
        <input type="text" value={firstName}
          onChange={(event) => setFirstName(event.target.value)}/>
      </label>
      <br />
      <label> Last Name:
        <input type="text" value={lastName}
          onChange={(event) => setLastName(event.target.value)}/>
      </label>
      <br />
      <label>Phone Number:
        <input type="tel" value={phoneNumber}
          onChange={(event) => setPhoneNumber(event.target.value)}/>
      </label>
      <br />
      <label> Bio:
        <textarea value={bio} onChange={(event) => setBio(event.target.value)}/>
      </label>
      <br />
      <button type="submit">Save Changes</button>
      <button type="button" onClick={handleDeleteUser}>Delete Account</button>
    </form>
  );
}

export default ProfileSettings;
