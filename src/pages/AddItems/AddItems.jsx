import React, { useState, useEffect } from 'react';
import './AddItems.scss'; // Import the SCSS file

const AddItems = () => {
  const [item, setItem] = useState({
    picture: '',
    item_name: '',
    category: '',
    seller_name: '',
    description: '',
    price: 0,
    stocks: 0
  });

  useEffect(() => {
    fetchUserProfile();
  }, []);

  const handleInputChange = (e) => {
    setItem({ ...item, [e.target.name]: e.target.value });
  };

  const fetchUserProfile = async () => {
    try {
      const response = await fetch('https://shopping-website-backend-production.up.railway.app/profile');
      if (response.ok) {
        const data = await response.json();
        setItem((prevItem) => ({
          ...prevItem,
          seller_name: data.first_name + ' ' + data.last_name
        }));
      } else {
        // Handle error
        console.error('Failed to fetch user profile');
      }
    } catch (error) {
      // Handle error
      console.error('Failed to fetch user profile:', error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Make a POST request to the '/add' endpoint
    fetch('https://shopping-website-backend-production.up.railway.app/add', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(item)
    })
      .then((response) => {
        console.log('Item added successfully');
        window.location.href = '/allproducts';
        // Clear the form after successful submission
        setItem({
          picture: '',
          item_name: '',
          category: '',
          seller_name: '',
          description: '',
          price: 0,
          stocks: 0
        });
      })
      .catch((error) => {
        console.error('Error adding item:', error);
      });
  };

  return (
    <div className="additem">
        <div className="add-items-container">
            <div className="left">
                <h2>Add Item</h2>
            </div>
            <div className="addmain">
                <form onSubmit={handleSubmit}>
                    <div className="additemsub">
                        <div className="entitiesadditems">
                            <div className="pic">
                                <label>
                                Picture:
                                <input
                                type="text"
                                name="picture"
                                value={item.picture}
                                onChange={handleInputChange}
                                required
                                />
                                </label>
                            </div>
                            <div className="itemname">
                                <label>
                                Item Name:
                                <input
                                type="text"
                                name="item_name"
                                value={item.item_name}
                                onChange={handleInputChange}
                                required
                                />
                                </label>
                            </div>
                            <div className="categ">
                                <label>
                                Category:
                                <input
                                type="text"
                                name="category"
                                value={item.category}
                                onChange={handleInputChange}
                                required
                                />
                                </label>
                            </div>
                            <div className="sellername">
                                <label>
                                Seller Name:
                                <input
                                type="text"
                                name="seller_name"
                                value={item.seller_name}
                                onChange={handleInputChange}
                                required
                                />
                                </label>
                            </div>
                            <div className="desc">
                                <label>
                                Description:
                                <input
                                type='text'
                                name="description"
                                value={item.description}
                                onChange={handleInputChange}
                                required
                                />
                                </label>
                            </div>
                            <div className="price">
                                <label>
                                Price:
                                <input
                                type="number"
                                name="price"
                                value={item.price}
                                onChange={handleInputChange}
                                required
                                />
                                </label>
                            </div>
                            <div className="stock">
                                <label>
                                Stocks:
                                <input
                                type="number"
                                name="stocks"
                                value={item.stocks}
                                onChange={handleInputChange}
                                required
                                />
                                </label>
                            </div>
                            <div className="sub">
                                <button type="submit">Add Item</button>
                            </div>
                            <div className="sub">
                                <button  onClick={() => window.location.href = "/profile"}>Back to Profile</button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>
  );
};

export default AddItems;
