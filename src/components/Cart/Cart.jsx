import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import './Cart.scss';
import razerBlade14 from '../../pages/AllProduct/Items/razerBlade14.jpg';
import razerBlade15 from '../../pages/AllProduct/Items/razerBlade15.jpg';
import razerBlade16 from '../../pages/AllProduct/Items/razerBlade16.jpg';
import razerBlade17 from '../../pages/AllProduct/Items/razerBlade17.jpg';
import razerBlade18 from '../../pages/AllProduct/Items/razerBlade18.jpg';
import razerBasiliskV3 from '../../pages/AllProduct/Items/razerBasiliskV3.jpg';
import razerDeathAdderV3 from '../../pages/AllProduct/Items/razerDeathAdderV3.jpg';
import razerNagaV2Pro from '../../pages/AllProduct/Items/razerNagaV2Pro.jpg';
import razerViperMiniSignatureEdition from '../../pages/AllProduct/Items/razerViperMiniSignatureEdition.jpg';
import razerBlackWidowV3Black from '../../pages/AllProduct/Items/razerBlackWidowV3Black.jpg';
import razerBlackWidowV3Quartz from '../../pages/AllProduct/Items/razerBlackWidowV3Quartz.jpg';
import razerBlackWidowV3BAPE from '../../pages/AllProduct/Items/razerBlackWidowV3BAPE.jpg';
import razerBlackWidowV3EVISU from '../../pages/AllProduct/Items/razerBlackWidowV3EVISU.jpg';
import razerBlackWidowV3HaloInfinite from '../../pages/AllProduct/Items/razerBlackWidowV3HaloInfinite.jpg';
import razerBlackWidowV3Roblox from '../../pages/AllProduct/Items/razerBlackWidowV3Roblox.jpg';
import razerDeathStalkerV2 from '../../pages/AllProduct/Items/razerDeathStalkerV2.jpg';
import razerHuntsmanV2 from '../../pages/AllProduct/Items/razerHuntsmanV2.jpg';
import razerNommoV2 from '../../pages/AllProduct/Items/razerNommoV2.jpg';
import razerBlacksharkV2Pro from '../../pages/AllProduct/Items/razerBlacksharkV2Pro.jpg';
import razerBarracudaPro from '../../pages/AllProduct/Items/razerBarracudaPro.jpg';
import razerKrakenV3 from '../../pages/AllProduct/Items/razerKrakenV3.jpg';
import razerWolverineV2 from '../../pages/AllProduct/Items/razerWolverineV2.jpg';
import razerKishiV2foriPhone from '../../pages/AllProduct/Items/razerKishiV2foriPhone.jpg';
import razerKishiV2forAndroid from '../../pages/AllProduct/Items/razerKishiV2forAndroid.jpg';
import razerChargingPadChroma from '../../pages/AllProduct/Items/razerChargingPadChroma.jpg';
import razerPhoneCoolerChroma from '../../pages/AllProduct/Items/razerPhoneCoolerChroma.jpg';
import razerArctechProforiPhone13Pro from '../../pages/AllProduct/Items/razerArctechProforiPhone13Pro.jpg';

const Cart = () => {
    const { id } = useParams();
    const [item, setItem] = useState({});
    const [quantity, setQuantity] = useState(0); // Initialize to 1
    const [isLogged, setIsLogged] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    const [subtotal, setSubtotal] = useState(0);
    useEffect(() => {
      fetchCartItems();
    }, []);

    
    
    const fetchCartItems = async () => {
        try {
            const username = await fetchUserProfile();

            if (!username) {
                return;
            }
            const response = await fetch(`https://shopping-website-backend-production.up.railway.app/cart/${username}`);
            if (response.ok) {
                const data = await response.json();
                setCartItems(data);
                calculateSubtotal(data);
            } else {
            }
        } catch (error) {

        }
    };

    const handleResetCart = async () => {
        try {
            const username = await fetchUserProfile();

            if (!username) {
                return;
            }
          const response = await fetch(`https://shopping-website-backend-production.up.railway.app/removeAllFromCart/${username}`, {
            method: 'DELETE',
          });
    
          if (response.ok) {
            setCartItems([]);
            setSubtotal(0);
            fetchCartItems();
          } else {
            console.log('Failed to reset cart');
          }
        } catch (error) {
          console.error('Error resetting cart:', error);
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

      const checkUserLoggedIn = async () => {
        const username = await fetchUserProfile();
        const isLoggedIn = username !== null;
        setIsLogged(isLoggedIn);
      };
      
      useEffect(() => {
        checkUserLoggedIn();
      }, []);
      
    const handleQuantityChange = async (itemNo, action) => {
        try {
          let updatedQuantity;
          if (action === 'increase') {
            updatedQuantity = item.amount + 1;
            await fetch(`https://shopping-website-backend-production.up.railway.app/addAmount/${itemNo}`, {
              method: 'PUT',
            });
          } else if (action === 'decrease') {
            updatedQuantity = item.amount - 1;
            await fetch(`https://shopping-website-backend-production.up.railway.app/reduceAmount/${itemNo}`, {
              method: 'PUT',
            });
          }
          setItem({ ...item, amount: updatedQuantity });
      
          if (updatedQuantity === 0) {
            // Delete the item if the quantity is zero
            handleDeleteItem(itemNo);
            fetchCartItems();
          } else {
            // Fetch the updated cart items
            fetchCartItems();
          }
        } catch (error) {
          console.error('Error updating quantity:', error);
        }
      };
      
      
      

    const calculateSubtotal = (items) => {
        const total = items.reduce((acc, item) => {
            return acc + item.price * item.amount;
        }, 0);
        setSubtotal(total);
    };

    const handleDeleteItem = async (itemNo) => {
        try {
            // Send request to delete item from cart
            const response = await fetch(`https://shopping-website-backend-production.up.railway.app/removeFromCart/${itemNo}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                // Item successfully deleted from cart
                const updatedCartItems = cartItems.filter((item) => item.item_no !== itemNo);
                setCartItems(updatedCartItems);
                calculateSubtotal(updatedCartItems);
            } else {
                console.log('Failed to delete item from cart');
            }
        } catch (error) {
            console.error('Error deleting item from cart:', error);
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


    const getItemImage = (imageName) => {
        switch (imageName) {
            case 'Razer Blade 14':
                return razerBlade14;
            case 'Razer Blade 15':
                return razerBlade15;
            case 'Razer Blade 16':
                return razerBlade16;
            case 'Razer Blade 17':
                return razerBlade17;
            case 'Razer Blade 18':
                return razerBlade18;
            case 'Razer Basilisk V3':
                return razerBasiliskV3;
            case 'Razer DeathAdder V3':
                return razerDeathAdderV3;
            case 'Razer Naga V2 Pro':
                return razerNagaV2Pro;
            case 'Razer Viper Mini Signature Edition':
                return razerViperMiniSignatureEdition;
            case 'Razer BlackWidow V3 Black':
                return razerBlackWidowV3Black;
            case 'Razer BlackWidow V3 Quartz':
                return razerBlackWidowV3Quartz;
            case 'Razer BlackWidow V3 BAPE':
                return razerBlackWidowV3BAPE;
            case 'Razer BlackWidow V3 EVISU':
                return razerBlackWidowV3EVISU;
            case 'Razer BlackWidow V3 Halo Infinite':
                return razerBlackWidowV3HaloInfinite;
            case 'Razer BlackWidow V3 Robox':
                return razerBlackWidowV3Roblox;
            case 'Razer DeathStalker V2':
                return razerDeathStalkerV2;
            case 'Razer Huntsman V2':
                return razerHuntsmanV2;
            case 'Razer Nommo V2':
                return razerNommoV2;
            case 'Razer Blackshark V2 Pro':
                return razerBlacksharkV2Pro;
            case 'Razer Barracuda Pro':
                return razerBarracudaPro;
            case 'Razer Kraken V3':
                return razerKrakenV3;
            case 'Razer Wolverine V2':
                return razerWolverineV2;
            case 'Razer Kishi V2 for iPhone':
                return razerKishiV2foriPhone;
            case 'Razer Kishi V2 for Android':
                return razerKishiV2forAndroid;
            case 'Razer Charging Pad Chroma':
                return razerChargingPadChroma;
            case 'Razer Phone Cooler Chroma':
                return razerPhoneCoolerChroma;
            case 'Razer Arctech Pro for iPhone 13 Pro':
                return razerArctechProforiPhone13Pro;
            default:
                return null;
        }
    };
    useEffect(() => {
        if (item.amount) {
          setQuantity(item.amount);
        }
      }, [item]);


      const handleToCheckout = () => {
        window.location.href = '/checkout';
      };

    return (
        <div className="cart">
            <div className="insidecart">
                {(!isLogged) && (
                    <div className="notlogged">
                        <p className='parpar'>User not logged in. Please login or signup first to add items to your cart.</p>
                        <div className="notloggedbuttons">
                            <div className="log">
                                <button className='loginbutton' onClick={() => window.location.href = "/login"}>Login</button>
                            </div>
                            <span> or </span>
                            <div className="sign">
                                <button className='signinbutton' onClick={() => window.location.href = "/signup"}>Signup</button>
                            </div>
                        </div>
                    </div>
                )}
                {(isLogged) && (
                <div className='logged'>
                    <span className='cartTitle'>Recently Added Products</span>
                    {cartItems.length > 0 ? (
                        cartItems.map((item) => (
                            <div key={item.item_id} className="listofitem">
                                <div className="item" key={item.item_no}>
                                    {item && <img src={getItemImage(item.item_name)} alt={item.item_name} />}
                                    <div className="details">
                                            <div className="itemTitle">
                                                <span className='itemName'>{item.item_name}</span>
                                            </div>                                        
                                        <div className="quantity">
                                            <div className="buttons">
                                                <button onClick={() => handleQuantityChange(item.item_no, 'decrease')}>-</button>
                                                <span className='amount'>{item.amount}</span>
                                                <button onClick={() => handleQuantityChange(item.item_no, 'increase')}>+</button>
                                            </div>
                                        </div>
                                        <div className="price">{item.amount} x ${item.price}</div>
                                    </div>
                                </div>
                                <div className="deleteIcon">
                                    <div className="delete">
                                        <DeleteOutlineOutlinedIcon onClick={() => handleDeleteItem(item.item_no)} />
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="noItems">
                            <p>No items in the cart</p>
                        </div>
                    )}
                    <div className="total">
                        <span>SUBTOTAL</span>
                        <span className='subtotal'>${subtotal}</span>
                    </div>
                    <div className="bottombuttons">
                        <div className="toReset">
                            <button className="reset" onClick={handleResetCart}>Reset My Cart</button>
                        </div>
                        <div className="toCheckout">
                            <button className="checkout" onClick={handleToCheckout}>CHECKOUT</button>
                        </div>
                    </div>
                </div>
                )}
            </div>
        </div>
    );
};

export default Cart;
