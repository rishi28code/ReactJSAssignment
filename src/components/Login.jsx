// src/Login.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    const storedData = JSON.parse(localStorage.getItem('userData'));

    if (storedData && storedData.name === name && storedData.password === password) {
      navigate('/dashboard'); // Redirect to the Dashboard
    } else {
      alert('Invalid Credentials');
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <h2>Login</h2>
      <input 
        type="text" 
        placeholder="Name" 
        value={name} 
        onChange={(e) => setName(e.target.value)} 
        required 
      />
      <input 
        type="password" 
        placeholder="Password" 
        value={password} 
        onChange={(e) => setPassword(e.target.value)} 
        required 
      />
      <button type="submit">Login</button>
    </form>
  );
};

export default Login;
