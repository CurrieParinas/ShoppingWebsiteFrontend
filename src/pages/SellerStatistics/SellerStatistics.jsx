import React, { useEffect, useState } from 'react';
import './SellerStatistics.scss';

const SellerStatistics = () => {
    const [sold, setSold] = useState([]);
    const [name, setName] = useState('');

    const fetchUserProfile = async () => {
        try {
            const response = await fetch('https://shopping-website-backend-production.up.railway.app/profile');
            if (response.ok) {
                const data = await response.json();
                data.name = data.first_name + ' ' + data.last_name;
                return data.name; // Return the username
            } else {
                // Handle error
                return null;
            }
        } catch (error) {
            // Handle error
            return null;
        }
    };

    useEffect(() => {
        const fetchPurchaseHistory = async () => {
            try {
                const name = await fetchUserProfile();

                if (!name) {
                    return;
                }

                const response = await fetch(`https://shopping-website-backend-production.up.railway.app/sold/${name}`);
                if (response.ok) {
                    const data = await response.json();
                    setSold(data);
                } else {
                    console.log('Failed to fetch purchase history');
                }
            } catch (error) {
                console.log('Error during purchase history fetch:', error);
            }
        };

        fetchPurchaseHistory();
    }, [name]);

    const handleStatusChange = async (transNo, status) => {
        try {
            let response;
            switch (status) {
                case 'Shipping Order':
                    response = await fetch(`https://shopping-website-backend-production.up.railway.app/setShipping/${transNo}`, { method: 'PUT' });
                    break;
                case 'Order Delivered':
                    response = await fetch(`https://shopping-website-backend-production.up.railway.app/setDelivered/${transNo}`, { method: 'PUT' });
                    break;
                default:
                    return;
            }

            if (response.ok) {
                // Update the order status in the UI
                setSold((prevSold) =>
                    prevSold.map((order) =>
                        order.transaction_no === transNo ? { ...order, order_status: status } : order
                    )
                );

            } else {
                console.log('Failed to update order status');
            }
        } catch (error) {
            console.log('Error during status change:', error);
        }
    };

    return (
        <div className="tablediv">
            <div className="table">
            <div className='title'>
                <div className="ph">
                    <h2>Sales</h2>
                </div>
            </div>
            <div className="tablemain">
                <div className="anodiv">
                  <table>
                      <thead>
                          <tr>
                              <th>Transaction No.</th>
                              <th>Buyer Username</th>
                              <th>Item ID</th>
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
                              <th>Change Order Status</th>
                          </tr>
                      </thead>
                      <tbody>
                          {sold.map((history) => (
                              <tr key={history.transaction_no}>
                                  <td>{history.transaction_no}</td>
                                  <td>{history.buyer_name}</td>
                                  <td>{history.item_id}</td>
                                  <td>{history.item_name}</td>
                                  <td>{history.category}</td>
                                  <td>{history.seller_name}</td>
                                  <td>{history.price}</td>
                                  <td>{history.amount}</td>
                                  <td>{history.transaction_cost}</td>
                                  <td>{history.payment_method}</td>
                                  <td>{history.address}</td>
                                  <td>{history.checkout_date}</td>
                                  <td>{history.expected_delivery_date}</td>
                                  <td>{history.date_delivered}</td>
                                  <td className={`order-status ${history.order_status.toLowerCase().replace(' ', '-')}`}>
                                      {history.order_status}
                                  </td>
                                  <td>
                                      <select
                                          value={history.order_status}
                                          onChange={(e) => handleStatusChange(history.transaction_no, e.target.value)}
                                      >
                                          {history.order_status === 'Processing Order' && (
                                              <option value="processing">Processing</option>
                                          )}
  
                                          <option value="Shipping Order">Shipping Order</option>
  
                                          <option value="Order Delivered">Order Delivered</option>
                                      </select>
                                  </td>
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
  
  export default SellerStatistics;