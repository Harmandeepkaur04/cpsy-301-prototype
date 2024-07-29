"use client"
import React, { useState } from 'react';
import './styles.css';

const CreateAccount = ({togglePage}) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [email, setEmail] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');



  const handleSignup = (e) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');

    if (!username || !password || !confirmPassword || !email) {
      setErrorMessage('All fields are required.');
      return;
    }

    if (password !== confirmPassword) {
      setErrorMessage('Passwords do not match.');
      return;
    }

    if (password.length < 6) {
      setErrorMessage('Password should be at least 6 characters.');
      return;
    }

    // Add your signup logic here, such as making an API call to register the user
    // For now, we'll just display a success message
    setSuccessMessage('Account created successfully!');
  };

  return (
    <div className='container'>
      <h2>Create Account</h2>
      <form onSubmit={handleSignup}>
        <div>
          <label>Username: </label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          <label>Email: </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label>Password: </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div>
          <label>Confirm Password: </label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>
        <button type="submit">Create Account</button>

        {errorMessage && <p className="error">{errorMessage}</p>}
        {successMessage && <p className="success">{successMessage}</p>}
      </form>
      
      <p>Already have an account? <button onClick={togglePage}>Login</button></p>
    </div>
  );
};

export default CreateAccount;
