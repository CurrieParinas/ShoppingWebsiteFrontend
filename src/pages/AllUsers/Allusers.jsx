import React, { useEffect, useState } from 'react';
import './Allusers.scss'; // Import your CSS file

const AllUsers = () => {
  const [users, setUsers] = useState([]);

  const fetchAllUsers = async () => {
    try {
      const response = await fetch('https://shopping-website-backend-production.up.railway.app/users'); // Update the URL to match your Spring Boot endpoint
      if (response.ok) {
        const data = await response.json();
        setUsers(data);
      } else {
        console.log('Failed to fetch users');
      }
    } catch (error) {
      console.log('Error during user fetch:', error);
    }
  };

  useEffect(() => {
    fetchAllUsers();
  }, []);

  const getAccountTypeText = (accType) => {
    if (accType === 1) {
      return 'Buyer';
    } else if (accType === 2) {
      return 'Seller';
    }
    return 'Unknown'; // Handle other account types if needed
  };

  return (
    <div className='tablediv'>
      <div className="table">
        <div className='title'>
          <div className="ph">
            <h2>All Users</h2>
          </div>
        </div>
        <div className="tablemain">
          <div className="anodiv">
            <table className='mytable'>
              <thead className='tablehead'>
                <tr>
                  <th>Username</th>
                  <th>First Name</th>
                  <th>Last Name</th>
                  <th>Email</th>
                  <th>Account Type</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.username}>
                    <td className='datacells'>{user.username}</td>
                    <td className='datacells'>{user.first_name}</td>
                    <td className='datacells'>{user.last_name}</td>
                    <td className='datacells'>{user.email}</td>
                    <td className='datacells'>{getAccountTypeText(user.acc_type)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllUsers;
