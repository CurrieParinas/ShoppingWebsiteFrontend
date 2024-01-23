import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './Allproduct.scss';
import razerBlade14 from './Items/razerBlade14.jpg';
import razerBlade15 from './Items/razerBlade15.jpg';
import razerBlade16 from './Items/razerBlade16.jpg';
import razerBlade17 from './Items/razerBlade17.jpg';
import razerBlade18 from './Items/razerBlade18.jpg';
import razerBasiliskV3 from './Items/razerBasiliskV3.jpg';
import razerDeathAdderV3 from './Items/razerDeathAdderV3.jpg';
import razerNagaV2Pro from './Items/razerNagaV2Pro.jpg';
import razerViperMiniSignatureEdition from './Items/razerViperMiniSignatureEdition.jpg';
import razerBlackWidowV3Black from './Items/razerBlackWidowV3Black.jpg';
import razerBlackWidowV3Quartz from './Items/razerBlackWidowV3Quartz.jpg';
import razerBlackWidowV3BAPE from './Items/razerBlackWidowV3BAPE.jpg';
import razerBlackWidowV3EVISU from './Items/razerBlackWidowV3EVISU.jpg';
import razerBlackWidowV3HaloInfinite from './Items/razerBlackWidowV3HaloInfinite.jpg';
import razerBlackWidowV3Roblox from './Items/razerBlackWidowV3Roblox.jpg';
import razerDeathStalkerV2 from './Items/razerDeathStalkerV2.jpg';
import razerHuntsmanV2 from './Items/razerHuntsmanV2.jpg';
import razerNommoV2 from './Items/razerNommoV2.jpg';
import razerBlacksharkV2Pro from './Items/razerBlacksharkV2Pro.jpg';
import razerBarracudaPro from './Items/razerBarracudaPro.jpg';
import razerKrakenV3 from './Items/razerKrakenV3.jpg';
import razerWolverineV2 from './Items/razerWolverineV2.jpg';
import razerKishiV2foriPhone from './Items/razerKishiV2foriPhone.jpg';
import razerKishiV2forAndroid from './Items/razerKishiV2forAndroid.jpg';
import razerChargingPadChroma from './Items/razerChargingPadChroma.jpg';
import razerPhoneCoolerChroma from './Items/razerPhoneCoolerChroma.jpg';
import razerArctechProforiPhone13Pro from './Items/razerArctechProforiPhone13Pro.jpg';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';

const Allproduct = () => {
  const [items, setItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const response = await fetch('https://shopping-website-backend-production.up.railway.app/items');
      const data = await response.json();
      setItems(data);

    } catch (error) {
      console.log('Error fetching items:', error);
    }
  };

  const handleSearch = () => {
    const filteredItems = items.filter((item) =>
      item.item_name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    return filteredItems;
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

  const renderedItems = handleSearch();

  return (
    <div className="allproducts">
      <div className="featuredProducts">
        <div className="top">
          <h1>Products</h1>
          <p>Explore a collection of our products</p>
        </div>
        <div className="searchmain">
            <div className="search">
                <button className="search-button" onClick={handleSearch}>
                    <SearchOutlinedIcon />
                </button>
                <input
                    type="text"
                    className="search-input"
                    placeholder="Search..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />                
            </div>
        </div>
        <div className="bottom">
          {renderedItems.map((item) => (
            <Link key={item.item_id} className="link" to={`/product/${item.item_id}`}>
              <div className="product">
                {/* Render your item image using getItemImage function */}
                <img src={getItemImage(item.picture)} alt={item.item_name} />
                <h2>{item.item_name}</h2>
                <p>{item.description}</p>
                <span>{item.price}</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Allproduct;