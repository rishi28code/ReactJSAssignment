// src/Signup.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [team, setTeam] = useState('');
  const navigate = useNavigate(); // Initialize useNavigate

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const userData = {
      name,
      email,
      phone,
      password,
      team,
    };

    localStorage.setItem('userData', JSON.stringify(userData));
    alert('User registered successfully!');
    
    // Redirect to the login page after signup
    navigate('/login'); // Redirect to login page

    // Clear the form
    setName('');
    setEmail('');
    setPhone('');
    setPassword('');
    setTeam('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Signup</h2>
      <input 
        type="text" 
        placeholder="Name" 
        value={name} 
        onChange={(e) => setName(e.target.value)} 
        required 
      />
      <input 
        type="email" 
        placeholder="Email" 
        value={email} 
        onChange={(e) => setEmail(e.target.value)} 
        required 
      />
      <input 
        type="text" 
        placeholder="Phone Number" 
        value={phone} 
        onChange={(e) => setPhone(e.target.value)} 
        required 
      />
      <input 
        type="password" 
        placeholder="Password" 
        value={password} 
        onChange={(e) => setPassword(e.target.value)} 
        required 
      />
      <select value={team} onChange={(e) => setTeam(e.target.value)} required>
        <option value="">Select Team</option>
        <option value="Team A">Engineer</option>
        <option value="Team B">Doctor</option>
        <option value="Team C">Artist</option>
        <option value="Team D">other</option>
      </select>
      <button type="submit">Signup</button>
    </form>
  );
};

export default Signup;
