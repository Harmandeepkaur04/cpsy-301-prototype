"use client"
import React, { useState, useEffect } from 'react';
import './styles.css';
import CreateAccount from './account';


const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [attemptCount, setAttemptCount] = useState(0);
  const [isLocked, setIsLocked] = useState(false);
  const [lockoutTime, setLockoutTime] = useState(0);
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoginPage, setIsLoginPage] = useState(true); // State to toggle between pages


  const correctUsername = 'user';
  const correctPassword = 'pass';
  const maxAttempts = 3;
  const lockoutDuration = 10; // seconds

  useEffect(() => {
    if (isLocked) {
      const timer = setInterval(() => {
        setLockoutTime((prevTime) => {
          if (prevTime > 0) {
            return prevTime - 1;
          } else {
            setIsLocked(false);
            setAttemptCount(0);
            clearInterval(timer);
            return 0;
          }
        });
      }, 1000);
    }
  }, [isLocked]);

  const handleLogin = (e) => {
    e.preventDefault();

    if (isLocked) {
      setErrorMessage(`Too many failed attempts. Please wait ${lockoutTime} seconds.`);
      return;
    }

    if (username === correctUsername && password === correctPassword) {
      setErrorMessage('');
      alert('Login successful!');
      // Add your login success logic here
    } else {
      setAttemptCount(attemptCount + 1);
      if (attemptCount + 1 >= maxAttempts) {
        setIsLocked(true);
        setLockoutTime(lockoutDuration);
        setErrorMessage(`Too many failed attempts. Please wait ${lockoutDuration} seconds.`);
      } else {
        setErrorMessage(`Login failed. You have ${maxAttempts - attemptCount - 1} attempts left.`);
      }
    }
  };

  const togglePage = () => {
    setIsLoginPage(prevPage => !prevPage);
  };

  return (
    <div className='container'>
      {isLoginPage ? (
        <>
      <h2 >Login</h2>
      
      <form onSubmit={handleLogin}>
        <div>
          <label className='' >Username: </label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            disabled={isLocked}
          />
        </div>
        <div>
          <label>Password: </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={isLocked}
          />
        </div>
        <button type="submit" disabled={isLocked}>Login</button>

        {errorMessage && <p className='error'>{errorMessage}</p>}

        <p>Don't have an account? <button onClick={togglePage}>Sign Up</button></p>
      </form>
     
      </>
      ):(
    <CreateAccount togglePage={togglePage}/>
      )}
    </div>

  );
};

export default Login;
