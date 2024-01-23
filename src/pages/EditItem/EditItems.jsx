import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './EditItems.scss'; // Import the SCSS file

const EditItems = () => {
  const { id } = useParams();
  const [updatedItem, setUpdatedItem] = useState({
    picture: '',
    itemName: '',
    category: '',
    description: '',
    price: 0,
    stocks: 0
  });

  useEffect(() => {
    // Fetch the item data using the provided endpoint and update the state
    fetch(`https://shopping-website-backend-production.up.railway.app/items/${id}`)
      .then(response => response.json())
      .then(data => setUpdatedItem(prevState => ({ ...prevState, ...data })))
      .catch(error => console.log('Error fetching item:', error));
  }, [id]);

  const handleInputChange = (e) => {
    setUpdatedItem({ ...updatedItem, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Make an API request to update the item using the provided endpoint and data
    fetch(`https://shopping-website-backend-production.up.railway.app/edit/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(updatedItem)
    })
      .then((response) => {
        if (response.ok) {
          // Handle successful update
          console.log('Item updated successfully');
          // Navigate back to the product page
          // Replace '/products' with the actual route to the product page
          window.location.href = `/product/${id}`;
        } else {
          // Handle update error
          console.log('Failed to update item');
        }
      })
      .catch((error) => {
        // Handle update error
        console.log('Error during item update:', error);
      });
  };

  const handleBackToProductPage = () => {
    // Navigate back to the product page
    // Replace '/products' with the actual route to the product page
    window.location.href = `/product/${id}`;
  };

  return (
    <div className="edititem">
        <div className="cont">
            <div className="left">
                <h2>Edit Item</h2>
            </div>
            <div className="editmain">
                <form onSubmit={handleSubmit}>
                    <div className="edititemsub">
                        <div className="entitiesedititems">
                            <div className="pic">
                                <label>
                                Picture:
                                <input
                                    type="text"
                                    name="picture"
                                    value={updatedItem.picture || ''}
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
                                    value={updatedItem.category || ''}
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
                                    value={updatedItem.description || ''}
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
                                    value={updatedItem.price || 0}
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
                                    value={updatedItem.stocks || 0}
                                    onChange={handleInputChange}
                                    required
                                />
                                </label>
                            </div>
                            <div className="updbut">
                                <button type="submit"><p>Update Item</p></button>
                            </div>
                            <div className="backtosom">
                                <button
                                className="back-to-product-button"
                                onClick={handleBackToProductPage}
                                >
                                <p>Back to Product Page</p>
                                </button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>
  );
};

export default EditItems;
