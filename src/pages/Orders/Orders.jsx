import React, { useEffect, useState } from 'react';
import './Orders.scss';

const Orders = () => {
  const [purchaseHistory, setPurchaseHistory] = useState([]);

  const [username, setUsername] = useState('');

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
  const fetchPurchaseHistory = async (username) => {
    try {
      const response = await fetch(`https://shopping-website-backend-production.up.railway.app/purchaseHistory/${username}`);
      if (response.ok) {
        const data = await response.json();
        setPurchaseHistory(data);
      } else {
        console.log('Failed to fetch purchase history');
      }
    } catch (error) {
      console.log('Error during purchase history fetch:', error);
    }
  };
  
  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await fetch('https://shopping-website-backend-production.up.railway.app/profile');
        if (response.ok) {
          const data = await response.json();
          const username = data.username;
          if (username) {
            fetchPurchaseHistory(username);
          }
        } else {
          // Handle error
        }
      } catch (error) {
        // Handle error
      }
    };
  
    fetchUserProfile();
  }, []);
  
  
  const confirmDelivery = async (transactionNo) => {
    try {
      const response = await fetch(`https://shopping-website-backend-production.up.railway.app/setCompleted/${transactionNo}`, {
        method: 'PUT'
      });
      if (response.ok) {
        const data = await response.json();
        console.log('Transaction completed:', data);
  
        const username = await fetchUserProfile();
        if (username) {
          fetchPurchaseHistory(username);
        }
        // Optionally, you can update the purchase history to reflect the updated status
      } else {
        console.log('Failed to confirm delivery');
      }
    } catch (error) {
      console.log('Error during confirm delivery:', error);
    }
  };
  

  return (
    <div className='tablediv'>
      <div className="table">
        <div className='title'>
          <div className="ph">
            <h2>Purchase History</h2>
          </div>
        </div>
        <div className="tablemain">
          <div className="anodiv">
            <table className='mytable'>
                <thead className='tablehead'>
                <tr>
                    <th>Item ID</th>
                    {/* <th>Transaction No.</th> */}
                    <th>Item Name</th>
                    <th>Category</th>
                    <th>Seller Name</th>
                    <th>Price</th>
                    <th>Amount</th>
                    <th>Transaction Cost</th>
                    <th>Payment Method</th>
                    <th>Address</th>
                    <th>Checkout Date</th>
                    <th>Expected Delivery Date</th>
                    <th>Date Delivered</th>
                    <th>Order Status</th>
                    <th>Confirm Delivery</th>
                </tr>
                </thead>
                <tbody>
                {purchaseHistory.map((history) => (
                    <tr key={history.transaction_no}>
                    <td className='datacells'>{history.item_id}</td>
                    {/* <td className='datacells'>{history.transaction_no}</td> */}
                    <td className='datacells'>{history.item_name}</td>
                    <td className='datacells'>{history.category}</td>
                    <td className='datacells'>{history.seller_name}</td>
                    <td className='datacells'>{history.price}</td>
                    <td className='datacells'>{history.amount}</td>
                    <td className='datacells'>{history.transaction_cost}</td>
                    <td className='datacells'>{history.payment_method}</td>
                    <td className='datacells'>{history.address}</td>
                    <td className='datacells'>{history.checkout_date}</td>
                    <td className='datacells'>{history.expected_delivery_date}</td>
                    <td className='datacells'>{history.date_delivered}</td>
                    <td className='datacells'>{history.order_status}</td>
                    <div className="div">
                    {history.order_status === 'Order Delivered' && (
                    <div className="buttons">
                        <td className='datacells'>
                            <button onClick={() => confirmDelivery(history.transaction_no)}>Confirm Delivery</button>
                    </td>
                    </div>
                    )}
                    {history.order_status !== 'Order Delivered' && (
                        <td className='datacells'>
                        </td>
                    )}
                    </div>
                    </tr>
                ))}
                </tbody>
            </table>
          </div>
        </div>
        <div className='button'>
                <div className="subdiv">
                    <button  onClick={() => window.location.href = "/profile"}>Back to Profile</button>
                </div>
            </div>
      </div>
    </div>
  );
};


export default Orders