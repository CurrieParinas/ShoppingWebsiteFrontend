import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import "./Profile.scss";
import Pic from "./assets/rightpic.jpg";
import PersonIcon from '@mui/icons-material/Person';

const Profile = () => {
  const [user, setUser] = useState(null);
  const [isError, setIsError] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchUser();
  }, []);

  const handleToOrders = () => {
    window.location.href = '/orders'; // Redirect to the orders page
  };

  const handleToStatistics = () => {
    window.location.href = '/statistics'; // Redirect to the statistics page
  };

  const handleToAddItems = () => {
    window.location.href = '/additems'; // Redirect to the add items page
  };

  const fetchUser = async () => {
    try {
      const response = await fetch("https://shopping-website-backend-production.up.railway.app/profile");
      if (response.ok) {
        const data = await response.json();
        setUser(data);
      } else {
        setIsError(true);
      }
    } catch (error) {
      console.error('Error fetching user:', error);
      setIsError(true);
    }
  };

  const handleLogin = () => {
    // Navigate to the login route
    window.location.href = '/login';
  };

  const handleLogout = async () => {
    try {
      const response = await fetch("https://shopping-website-backend-production.up.railway.app/logout", {
        method: 'POST',
      });

      if (response.status === 200) {
        setMessage('Logged out successfully');
        window.location.href = '/profile';
      } else if (response.status === 401) {
        setMessage('No user is currently logged in');
      } else {
        setMessage('An error occurred');
      }
    } catch (error) {
      setMessage('An error occurred');
    }
  };

  const handleSignup = () => {
    // Navigate to the signup route
    window.location.href = '/signup';
  };

  if (isError) {
    return (
      <div className="errorProfile">
        <div className="noUser">
          <div className="leftNoUser">
            <div className="login-promptnoUser">
              <h2>log in to view your profile</h2>
              <div className='errorbuttons'>
                <button className="errorbuttonslogin" onClick={handleLogin}>Login</button>
                <span className="or-text">or</span>
                <button className="errorbuttonssignin" onClick={handleSignup}>Sign Up</button>
              </div>
            </div>
          </div>
          <div className="rightNoUser">
            <img src={Pic} alt="" />
          </div>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="containerProfile">
        <div>Loading...</div>
      </div>
    );
  }

  const getAccountType = (accType) => {
    return accType === 1 ? 'Buyer' : 'Seller';
  };

  return (
    <div className="containerProfile">
      <div className="profile">
        <div className="container"></div>
        <div className="toStart">
          <div className="profileavatar"><PersonIcon /></div>
        </div>

        <div className="profileinfo">
          <div className='username'>
            <span>{user.first_name} {user.last_name}</span>
          </div>
          <div className='name'>
            <span>{user.username}</span>
          </div>
          <div className='email'>
            <label>Email: </label>
            <span>{user.email}</span>
          </div>
          <div className='accounttype'>
            <label>Account Type: </label>
            <span>{getAccountType(user.acc_type)}</span>
          </div>
        </div>
        <div className="buttons">
          {user.acc_type === 1 && (
            <div className='tobtn'>
              <button className="toOrders" onClick={handleToOrders}>Orders</button>
            </div>
          )}
          {user.acc_type === 2 && (
            <>
              <div className='tobtn'>
                <button className="toOrders" onClick={handleToOrders}>Orders</button>
              </div>
              <div className='tobtn'>
                <button className="toSales" onClick={handleToStatistics}>Sales</button>
              </div>
              <div className='tobtn'>
                <button className="toAddItems" onClick={handleToAddItems}>Add Item</button>
              </div>
            </>
          )}
          <div className='lgbtn'>
            <button className="logoutButton" onClick={handleLogout}>Logout</button>
            <p>{message}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
