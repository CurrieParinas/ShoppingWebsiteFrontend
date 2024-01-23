import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Login.scss';
import Pic from "./assets/rightpic.jpg"

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');

  useEffect(() => {
    // Check if the user is already logged in (you can implement your own logic)
    const isLoggedIn = false; // Replace with your actual login check logic

    if (isLoggedIn) {
      // Redirect to the profile page if already logged in
      window.location.href = '/profile';
    }
  }, []);

  const handleLogin = async () => {
    try {
      const url = new URL('https://shopping-website-backend-production.up.railway.app/login');
      url.searchParams.append('username', username);
      url.searchParams.append('password', password);

      const response = await fetch(url, {
        method: 'POST',
      });

      if (response.ok) {
        // Login successful
        setLoginError('');
        console.log('Login successful');
        window.location.href = '/profile'; // Redirect to the profile page
      } else {
        // Login failed
        const errorMessage = await response.text();
        setLoginError(errorMessage);
        console.log('Login failed:', errorMessage);
      }
    } catch (error) {
      console.error('Error during login:', error);
      setLoginError('An error occurred during login');
    }
  };
  const handleToSignup = () => {
    window.location.href = '/signup';
  };

  return (
    <div className="login-container">
        <div className="loginPage">
            <div className="loginPageLeft">
                <div className="errorMessage">
                    {loginError && <p className="error-message">{loginError}</p>}
                </div>
                <form className='loginForm'>
                    <div className="input-container">
                    <label htmlFor="username">Username:</label>
                    <input
                        type="text"
                        id="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    </div>
                    <div className="input-container">
                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    </div>
                    <button type="button" onClick={handleLogin}>
                    <p>Login</p>
                    </button>
                </form>
                <span>or</span>
                <div className="toSignup">
                    <button className="signupbutton" onClick={handleToSignup}><p>Sign Up</p></button>
                </div>
            </div>
            <div className="loginPageRight">
                <img src={Pic} alt="" />
            </div>
        </div>
    </div>
  );
};

export default Login;
