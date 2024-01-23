import React, { useEffect, useState } from 'react';
import "./List.scss";
import Card from '../Card/Card';

const List = ({ category }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchItemsByCategory();
  }, [category]);

  const fetchItemsByCategory = async () => {
    try {
      const response = await fetch(`https://shopping-website-backend-production.up.railway.app/itemsByCategory?category=${category}`);
      const data = await response.json();
      setData(data);
    } catch (error) {
      console.error('Error fetching items:', error);
    }
  };

  return (
    <div className="list">
      <h1 className="temp">{category}</h1>
      {data.map((item) => (
        <Card item={item} key={item.item_id} />
      ))}
    </div>
  );
};

export default List;
