import React, { useState } from 'react';
import './Signup.scss';
import Pic from "./assets/rightpic.jpg";
import Verification from '../Verification/Verification';

const Signup = () => {
  const [username, setUsername] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [accountType, setAccountType] = useState('');
  const [signupMessage, setSignupMessage] = useState('');
  const [showVerification, setShowVerification] = useState(false);

  const handleSignup = async () => {
    // Check if any of the fields are empty
    if (
      !username ||
      !firstName ||
      !lastName ||
      !email ||
      !password ||
      !accountType
    ) {
      setSignupMessage('Please fill in all fields.');
      return;
    }

    // Validate password length
    if (password.length <= 7) {
      setSignupMessage('Password must be at least 8 characters long.');
      return;
    }

    // Validate email format using regular expression
    const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
    if (!emailRegex.test(email)) {
      setSignupMessage('Invalid email format.');
      return;
    }

    try {
      const url = new URL('https://shopping-website-backend-production.up.railway.app/users');
      const userData = {
        username,
        first_name: firstName,
        last_name: lastName,
        email,
        pword: password,
        acc_type: accountType,
      };

      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      if (response.ok) {
        // Signup successful
        setSignupMessage('User added successfully');
        setShowVerification(true);
      } else {
        // Signup failed
        const errorMessage = await response.text();
        setSignupMessage(`Signup failed: ${errorMessage}`);
        // Handle the error or display an error message to the user
      }
    } catch (error) {
      console.error('Error during signup:', error);
      setSignupMessage('Error during signup. Please try again later.');
      // Handle the error or display an error message to the user
    }
  };
  const handleVerificationClose = () => {
    setShowVerification(false);
  };


  return (
    <div className="signup-container">
      <div className="verification-overlay" style={{ display: showVerification ? 'block' : 'none' }}>
        {showVerification && <Verification email={email} onClose={handleVerificationClose} />}
      </div>
      <div className="signupsubcon">
        <div className="signupLeft">
          <form>
            <div className="input-container">
              <label htmlFor="username" className="user-label">Username:</label>
              <input
                className="input"
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="input-container">
              <label htmlFor="firstName" className="user-label">First Name:</label>
              <input
                className="input"
                type="text"
                id="firstName"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </div>
            <div className="input-container">
              <label htmlFor="lastName" className="user-label">Last Name:</label>
              <input
                className="input"
                type="text"
                id="lastName"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>
            <div className="input-container">
              <label htmlFor="email" className="user-label">Email:</label>
              <input
                className="input"
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="input-container">
              <label htmlFor="password" className="user-label">Password:</label>
              <input
                className="input"
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="input-container">
              <label htmlFor="accountType">Account Type:</label>
              <select
                id="accountType"
                value={accountType}
                onChange={(e) => setAccountType(e.target.value)}
                className="dropdown-button"
              >
                <option value="">Select Account Type</option>
                <option value="1">Buyer</option>
                <option value="2">Seller</option>
              </select>
            </div>
            {signupMessage && <p className="signup-message">{signupMessage}</p>}
            <button type="button" onClick={handleSignup}>
              <p>Signup</p>
            </button>
          </form>
        </div>
        <div className="signupRight">
          <img src={Pic} alt="" />
        </div>
      </div>
    </div>
  );
};

export default Signup;
