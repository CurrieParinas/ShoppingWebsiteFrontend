import React, { useState, useRef, useEffect } from 'react';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import SearchIcon from '@mui/icons-material/Search';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import LoginOutlinedIcon from '@mui/icons-material/LoginOutlined';
import { Link } from 'react-router-dom';
import './Navbar.scss';
import Cart from '../Cart/Cart';
import Search from '../../pages/Search/Search';

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [cartItems, setCartItems] = useState(0); // State to store the number of cart items
  const [username, setUsername] = useState(''); // State to store the username
  const containerRef = useRef(null);


  const scrollToBottom = () => {
    containerRef.current.scrollTop = containerRef.current.scrollHeight;
  };

  const fetchCartItems = async () => {
    try {
      const username = await fetchUserProfile();

      if (!username) {
          return;
      }
      const response = await fetch(`https://shopping-website-backend-production.up.railway.app/cartNumItems/${username}`);
      if (response.ok) {
        const data = await response.json();
        setCartItems(data); // Update the number of cart items from the API response
      } else {
        console.log('Failed to fetch cart items');
      }
    } catch (error) {
      console.log('Error during cart items fetch:');
    }
  };

  const fetchUserProfile = async () => {
    try {
      const response = await fetch('https://shopping-website-backend-production.up.railway.app/profile');
      if (response.ok) {
        const data = await response.json();
        return data.username; // Return the username
      } else {
        
        return null;
      }
    } catch (error) {
     
      return null;
    }
  };


  useEffect(() => {
    const interval = setInterval(() => {
      fetchCartItems(); // Call the fetchCartItems function to update cart items
    }, 1000);
  
    return () => {
      clearInterval(interval);
    };
  }, [fetchCartItems]); // Fetch cart items every second

  useEffect(() => {
      fetchCartItems(); // Call the fetchCartItems function to update cart items

  }, [fetchCartItems]); // Fetch cart items every second
  
  
  return (
    <div className="navbar">
        <div className="wrapper">
            <div className="left">
                <div className="item">
                    <span>USD</span>
                    <KeyboardArrowDownIcon/>
                </div>
                <div className="item">
                    <Link className="link" to="/products/Laptop">Laptop</Link>
                </div>
                <div className="item">
                    <Link className="link" to="/products/Mouse">Mouse</Link>
                </div>
                <div className="item">
                    <Link className="link" to="/products/Keyboard">Keyboard</Link>
                </div>
                <div className="item">
                    <Link className="link" to="/products/Audio">Audio</Link>
                </div>
            </div>
            <div className="center">
                <Link className="link" to="/">KeyCaps</Link>
            </div>
            <div className="right">
                <div className="item">
                    <Link className="link" to="/">Homepage</Link>
                </div>
                <div className="item">
                    <Link className="link" to="/">About</Link>
                </div>
                <div className="item">
                    <Link className="link" to="/allproducts">All Products</Link>
                </div>
                <div className="icons">
                    <div className="personIcon">
                        <Link className="link" to="/profile">
                            <PersonOutlineIcon/>
                        </Link>
                    </div>
                    <div className="loginIcon">
                        <Link className="link" to="/login">
                            <LoginOutlinedIcon/>
                        </Link>
                    </div>
                    <div className="cartIcon" onClick={()=>setOpen(!open)}>
                        <AddShoppingCartIcon/>
                        <span>{cartItems}</span> {/* Display the number of cart items */}
                    </div>
                </div>
            </div>
        </div>
        {open && <Cart/>}
    </div>
  );
};

export default Navbar