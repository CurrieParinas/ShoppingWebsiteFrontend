import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import { Link } from 'react-router-dom';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import './Product.scss';
import razerBlade14 from '../AllProduct/Items/razerBlade14.jpg';
import razerBlade15 from '../AllProduct/Items/razerBlade15.jpg';
import razerBlade16 from '../AllProduct/Items/razerBlade16.jpg';
import razerBlade17 from '../AllProduct/Items/razerBlade17.jpg';
import razerBlade18 from '../AllProduct/Items/razerBlade18.jpg';
import razerBasiliskV3 from '../AllProduct/Items/razerBasiliskV3.jpg';
import razerDeathAdderV3 from '../AllProduct/Items/razerDeathAdderV3.jpg';
import razerNagaV2Pro from '../AllProduct/Items/razerNagaV2Pro.jpg';
import razerViperMiniSignatureEdition from '../AllProduct/Items/razerViperMiniSignatureEdition.jpg';
import razerBlackWidowV3Black from '../AllProduct/Items/razerBlackWidowV3Black.jpg';
import razerBlackWidowV3Quartz from '../AllProduct/Items/razerBlackWidowV3Quartz.jpg';
import razerBlackWidowV3BAPE from '../AllProduct/Items/razerBlackWidowV3BAPE.jpg';
import razerBlackWidowV3EVISU from '../AllProduct/Items/razerBlackWidowV3EVISU.jpg';
import razerBlackWidowV3HaloInfinite from '../AllProduct/Items/razerBlackWidowV3HaloInfinite.jpg';
import razerBlackWidowV3Roblox from '../AllProduct/Items/razerBlackWidowV3Roblox.jpg';
import razerDeathStalkerV2 from '../AllProduct/Items/razerDeathStalkerV2.jpg';
import razerHuntsmanV2 from '../AllProduct/Items/razerHuntsmanV2.jpg';
import razerNommoV2 from '../AllProduct/Items/razerNommoV2.jpg';
import razerBlacksharkV2Pro from '../AllProduct/Items/razerBlacksharkV2Pro.jpg';
import razerBarracudaPro from '../AllProduct/Items/razerBarracudaPro.jpg';
import razerKrakenV3 from '../AllProduct/Items/razerKrakenV3.jpg';
import razerWolverineV2 from '../AllProduct/Items/razerWolverineV2.jpg';
import razerKishiV2foriPhone from '../AllProduct/Items/razerKishiV2foriPhone.jpg';
import razerKishiV2forAndroid from '../AllProduct/Items/razerKishiV2forAndroid.jpg';
import razerChargingPadChroma from '../AllProduct/Items/razerChargingPadChroma.jpg';
import razerPhoneCoolerChroma from '../AllProduct/Items/razerPhoneCoolerChroma.jpg';
import razerArctechProforiPhone13Pro from '../AllProduct/Items/razerArctechProforiPhone13Pro.jpg';

const Product = ({ user = {} }) => {
    const { id } = useParams();
    const [item, setItem] = useState(null);
    const [cart, setCart] = useState([]);
    const [quantity, setQuantity] = useState(1);
    const [isLogged, setIsLogged] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [addToCartClicked, setAddToCartClicked] = useState(false);
    const [accountType, setAccountType] = useState(null);
    const [canEditItem, setCanEditItem] = useState(false);

    useEffect(() => {
        fetchItem(id);
    }, [id]);
    useEffect(() => {
        fetchUserProfile(item);
      }, [item]);

    useEffect(() => {
        if (user && user.loggedIn) {
            setIsLogged(true);
        } else {
            setIsLogged(false);
        }
    }, [user]);

    const fetchItem = async (itemId) => {
        try {
            const response = await fetch(`https://shopping-website-backend-production.up.railway.app/items/${itemId}`);
            if (response.ok) {
                const data = await response.json();
                setItem(data);
            } else {
                console.log('Failed to fetch item');
            }
        } catch (error) {
            console.error('Error during item fetch:', error);
        }
    };


    const fetchUserProfile = async (item) => {
        try {
          const response = await fetch('https://shopping-website-backend-production.up.railway.app/profile');
          if (response.ok) {
            const data = await response.json();
            setAccountType(data.acc_type);
            if (
              data.acc_type === 2 && item &&
              item.seller_name === data.first_name + " " + data.last_name
            ) {
              setCanEditItem(true);
            } else {
              setCanEditItem(false);
            }
      
            return data.username; // Return the username
          } else {
            console.log('Failed to fetch user profile');
            return null;
          }
        } catch (error) {
          console.error('Error during user profile fetch:', error);
          return null;
        }
      };

    const handleAddToCart = async () => {
        try {
            const username = await fetchUserProfile();

            if (!username) {
                console.log('User not logged in');
                setAddToCartClicked(true);
                return;
            }
            const addToCartURL = `https://shopping-website-backend-production.up.railway.app/addToCart/${username}/${id}/${quantity}`;

            // Send request to add item to cart
            const response = await fetch(addToCartURL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.ok) {
                // Item successfully added to cart
                setCart((prevCart) => [...prevCart, { item: item, quantity: quantity, username }]);
                setQuantity(1);

                // Display success message for 5 seconds
                setSuccessMessage('Item added to cart');
                setTimeout(() => {
                    setSuccessMessage('');
                }, 2000);
            } else {
                // Failed to add item to cart
                setErrorMessage('Item cannot be added');
            }
        } catch (error) {
            console.error('Error adding item to cart:', error);
        }
    };

    const handleQuantityChange = (e) => {
        const value = parseInt(e.target.value);
        if (!isNaN(value) && value >= 1 && value <= item?.stocks) {
            setQuantity(value);
        }
    };
    const handleDelete = () => {
        // Make a DELETE request to the '/delete/{itemId}' endpoint
        fetch(`https://shopping-website-backend-production.up.railway.app/delete/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then((response) => {
                if (response.ok) {
                    console.log('Item deleted successfully');
                    window.location.href = `/Allproducts`;
                    // Perform any additional actions after deletion if needed
                } else {
                    console.log('Error deleting item');
                }
            })
            .catch((error) => {
                console.log('Error deleting item:', error);
            });
    };

    const getItemImage = (imageName) => {
        switch (imageName) {
            case 'razerBlade14.jpg':
                return razerBlade14;
            case 'razerBlade15.jpg':
                return razerBlade15;
            case 'razerBlade16.jpg':
                return razerBlade16;
            case 'razerBlade17.jpg':
                return razerBlade17;
            case 'razerBlade18.jpg':
                return razerBlade18;
            case 'razerBasiliskV3.jpg':
                return razerBasiliskV3;
            case 'razerDeathAdderV3.jpg':
                return razerDeathAdderV3;
            case 'razerNagaV2Pro.jpg':
                return razerNagaV2Pro;
            case 'razerViperMiniSignatureEdition.jpg':
                return razerViperMiniSignatureEdition;
            case 'razerBlackWidowV3Black.jpg':
                return razerBlackWidowV3Black;
            case 'razerBlackWidowV3Quartz.jpg':
                return razerBlackWidowV3Quartz;
            case 'razerBlackWidowV3BAPE.jpg':
                return razerBlackWidowV3BAPE;
            case 'razerBlackWidowV3EVISU.jpg':
                return razerBlackWidowV3EVISU;
            case 'razerBlackWidowV3HaloInfinite.jpg':
                return razerBlackWidowV3HaloInfinite;
            case 'razerBlackWidowV3Roblox.jpg':
                return razerBlackWidowV3Roblox;
            case 'razerDeathStalkerV2.jpg':
                return razerDeathStalkerV2;
            case 'razerHuntsmanV2.jpg':
                return razerHuntsmanV2;
            case 'razerNommoV2.jpg':
                return razerNommoV2;
            case 'razerBlacksharkV2Pro.jpg':
                return razerBlacksharkV2Pro;
            case 'razerBarracudaPro.jpg':
                return razerBarracudaPro;
            case 'razerKrakenV3.jpg':
                return razerKrakenV3;
            case 'razerWolverineV2.jpg':
                return razerWolverineV2;
            case 'razerKishiV2foriPhone.jpg':
                return razerKishiV2foriPhone;
            case 'razerKishiV2forAndroid.jpg':
                return razerKishiV2forAndroid;
            case 'razerChargingPadChroma.jpg':
                return razerChargingPadChroma;
            case 'razerPhoneCoolerChroma.jpg':
                return razerPhoneCoolerChroma;
            case 'razerArctechProforiPhone13Pro.jpg':
                return razerArctechProforiPhone13Pro;
            default:
                return null;
        }
    };
    return (
        <div className="product">
            <div className="left">
                <div className="images">
                    {item && (
                        <img src={getItemImage(item.picture)} alt={item.item_name} onClick={(e) => setSelectedImg(0)} />
                    )}
                </div>
                <div className="mainImg">
                    {item && <img src={getItemImage(item.picture)} alt={item.item_name} />}
                </div>
            </div>
            <div className="right">
                {item && (
                    <>
                        <p>{item.category}</p>
                        <h1>{item.item_name}</h1>
                        <p className='desc'>{item.description}</p>
                        <div className="priceAndQuantity">
                            <div className="quantity">
                                <p>Quantity: </p>
                                <button className="quantityButton" onClick={() => setQuantity((prev) => Math.max(prev - 1, 1))}>-</button>
                                <p>{quantity}</p>
                                <button className="quantityButton" onClick={() => setQuantity((prev) => Math.min(prev + 1, item.stocks))}>+</button>
                            </div>
                            <span className="price">US${item.price}.00</span>
                            {canEditItem && (
                                <>
                            <br></br>
                            <br></br>
                            <br></br>
                            <h2 className="price">Stocks: {item.stocks}</h2>
                            </>
                )}
                        </div>
                        <div className="cartDiv">
                            {/* Render appropriate buttons based on conditions */}
                            {canEditItem ? (
                                <div>
                                    
                                    <button className="add" key={id} onClick={() => window.location.href = `/edititems/${id}`}>
                                        Edit Item
                                    </button>
                                    <br></br>
                                    <br></br>
                                    <br></br>
                                    <button className="add" onClick={handleDelete}>
                                        <DeleteOutlineOutlinedIcon></DeleteOutlineOutlinedIcon>
                                        <span>Delete Item</span>
                                    </button>
                                </div>
                            ) : (
                                <button className="add" onClick={handleAddToCart}>
                                    <AddShoppingCartIcon className="cartIcon" />
                                    <span> ADD TO CART </span>
                                </button>
                            )}
                            {successMessage && (
                                <div className="success-message">{successMessage}</div>
                            )}
                            {errorMessage && (
                                <div className="error-message">{errorMessage}</div>
                            )}
                            {!isLogged && addToCartClicked && (
                                <div className="login-prompt">
                                    <p>User not logged in. Please login or signup first to add to your cart.</p>
                                    <div className="login-buttons">
                                        <button className='loginbutton' onClick={() => window.location.href = "/login"}><p className='par'>Login</p></button>
                                        <button className='signinbutton' onClick={() => window.location.href = "/signup"}><p className='par'>Signup</p></button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </>
                )}
            </div>
    
        </div>
    );
};

export default Product;

