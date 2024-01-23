import React from 'react';
import "./Card.scss";
import { Link } from 'react-router-dom';

const Card = ({item}) => {
  return (
    <Link className = "link" to={`/product/${item.item_id}`}>
        <div className='card'>
            <div className="image">
                {item.isNew && <span>New Arrivals!</span>}
                <img src={item.img1} alt='' className='mainImg' />
            </div>
            <div className="itemchar">
                <div className="itemname">
                    <h2>{item.item_name}</h2>    
                </div>
                <div className="desc">
                    <h3>{item.description}</h3>
                </div>
                <div className="prices">
                    <h3>${item.price}</h3>
                </div>
            </div>
        </div>
    </Link>
    
  )
}

export default Card