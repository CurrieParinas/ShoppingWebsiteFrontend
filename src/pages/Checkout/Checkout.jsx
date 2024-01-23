import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import './Checkout.scss';
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

const Checkout = () => {
  const [paymentMode, setPaymentMode] = useState('');
  const [bankType, setBankType] = useState('');
  const [accountNo, setAccountNo] = useState('');
  const [shippingAddress, setShippingAddress] = useState('');
  const [checkoutError, setCheckoutError] = useState('');
  const [cartItems, setCartItems] = useState([]);
  const [subtotal, setSubtotal] = useState(0);
  const [username, setUsername] = useState('');
  const [message, setMessage] = useState('');

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
        // Handle error
      }
    } catch (error) {
      // Handle error
    }
  };

  const fetchUserProfile = async () => {
    try {
      const response = await fetch('https://shopping-website-backend-production.up.railway.app/profile');
      if (response.ok) {
        const data = await response.json();
        return data.username; // Return the username
      } else {
        // Handle error
        return null;
      }
    } catch (error) {
      // Handle error
      return null;
    }
  };

  const calculateSubtotal = (items) => {
    const total = items.reduce((acc, item) => {
      return acc + item.price * item.amount;
    }, 0);
    setSubtotal(total);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      fetchCartItems(); // Call the fetchCartItems function to update cart items
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []); // Fetch cart items only once

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
  const handlePaymentModeChange = (e) => {
    const selectedMode = e.target.value;
    setPaymentMode(selectedMode);

    if (selectedMode === 'Online Payment') {
      setBankType('');
      setAccountNo('');
    }
  };

  const handleAccountDetailsChange = (e) => {
    setAccountNo(e.target.value);
  };

  const handleShippingAddressChange = (e) => {
    setShippingAddress(e.target.value);
  };

  const handleCheckout = async () => {
    if (!paymentMode || !shippingAddress) {
      setCheckoutError('Please fill in all the required fields.');
      return;
    }

    let formattedPaymentMode = '';

    if (paymentMode === 'Online Payment') {
      formattedPaymentMode = `${bankType} - ${accountNo}`;
    } else if (paymentMode === 'Cash On Delivery') {
      formattedPaymentMode = 'Cash On Delivery';
    }
    try {
      const username = await fetchUserProfile();

      if (!username) {
        return;
      }
      const response = await fetch(`https://shopping-website-backend-production.up.railway.app/checkout/${username}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          paymentMode: formattedPaymentMode,
        shippingAddress,
        }),
      });

      if (response.ok) {
        setMessage('Checkout successful');
        window.location.href = "/orders"
      } else {
        setMessage('Checkout failed');
      }
    } catch (error) {
      setMessage('An error occurred');
    }
  };
  const handleallprod = () => {
    window.location.href = '/allproducts';
  };
  

  return (
    <div className="checkout-container">
        <div className="checkout">
            <div className="checkoutword">
                <span>Checkout</span>
            </div>
            <div className="col1">
                {cartItems.length > 0 ? (
                    <div className="checkout-items">
                    {cartItems.map((item) => (
                        <div key={item.item_id} className="item">
                            {item && 
                            <img src={getItemImage(item.item_name)} alt={item.item_name} />}
                            <div className="item-details">
                                <div className="itemname">
                                    <h1>{item.item_name}</h1>
                                </div>
                                <div className="itemquantity">
                                    <p>{`Quantity: ${item.amount}`}</p>
                                    <p>{`Price: $${item.price}`}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                    </div>
                ) : (
                    <div className="noItemsCheckout">
                        <p>No items in the cart</p>
                    </div>
                )}
            </div>
            <div className="col2">
                <div className="entities">
                    <div className="div1">
                        <label className="pmn" htmlFor="payment-mode">Payment Mode: </label>
                        <div className="select-wrapper">
                            <select
                                id="payment-mode"
                                value={paymentMode}
                                onChange={handlePaymentModeChange}
                            >
                                <option value="">Select Payment Mode</option>
                                <option value="Online Payment">Online Payment</option>
                                <option value="Cash On Delivery">Cash On Delivery</option>
                            </select>
                        </div>
                        <div className='optiondd'>
                        {paymentMode === 'Online Payment' && (
                            <>
                                    <br></br>
                                    <label htmlFor="bank-type">Bank Type:</label>
                                    <input
                                    className='bank'
                                    type="text"
                                    id="bank-type"
                                    value={bankType}
                                    onChange={(e) => setBankType(e.target.value)}
                                    />
                                    <br></br>
                                    <label htmlFor="account-no">Account No:</label>
                                    <input
                                    className='acc'
                                    type="text"
                                    id="account-no"
                                    value={accountNo}
                                    onChange={handleAccountDetailsChange}
                                    />
                            </>
                            )}
                        </div>
                    </div>
                    <div className="div2">
                        {checkoutError && <p className="error">{checkoutError}</p>}
                        <div className="subtotal">
                            Subtotal: ${subtotal}
                        </div>
                        <div className="buttonco">
                            <button onClick={handleCheckout}>Checkout</button>
                        </div>
                    </div>
                    <div className="div3">
                        <div className="shippingdiv">
                            <label htmlFor="shipping-address">Shipping Address:</label>
                            <input type="text"
                                id="shipping-address"
                                value={shippingAddress}
                                onChange={handleShippingAddressChange}
                                ></input>
                        </div>
                    </div>
                </div>
                <div className="toprod">
                        <button className="toprodbut" onClick={handleallprod}>
                            Go Back to our Products
                        </button>
                </div>
            </div>
        </div>
    </div>
  );
};

export default Checkout;
