import React, { useState } from 'react';
import './Verification.scss';

const Verification = ({ email }) => {
  const [otp, setOtp] = useState('');
  const [message, setMessage] = useState('');

  const handleVerification = async () => {
    try {
      const response = await fetch(`https://shopping-website-backend-production.up.railway.app/verify?email=${email}`+ '&otp=' + otp, {
        method: 'GET',
      });
  
      if (response.ok) {
        const verificationResult = await response.text();
        setMessage(verificationResult);
        if (verificationResult=='Successful verification.'){
          window.location.href = '/login'; // Redirect to the login page
        }
        else{
          setMessage('Unsuccessful verification.');
        }
      } else {
        setMessage('Unsuccessful verification.');
      }
    } catch (error) {
      setMessage('An error occurred');
    }
  };
  

  const handleGoBack = () => {
    window.location.href = '/login'; 
  };

  const handleOtpChange = (e) => {
    const inputOtp = e.target.value;
      setOtp(inputOtp);

  };

  return (
    <div className="verification-container">
      <h1>Verification</h1>

      <div className="verification-input">
        <label htmlFor="otp">OTP:</label>
        <input
          type="text"
          id="otp"
          value={otp}
          onChange={handleOtpChange}
        />
      </div>
      <div className="buttons">
        <button className="back" onClick={handleGoBack}>Already Verified</button>
        <button className="verif" onClick={handleVerification}>Verify</button>
      </div>
      {message && <p className="verification-message">{message}</p>}
    </div>
  );
};

export default Verification;
