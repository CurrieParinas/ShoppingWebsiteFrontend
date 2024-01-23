import React, { useEffect, useState } from 'react';
import "./FeaturedProducts.scss";
import Card from '../Card/Card';
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

const FeaturedProducts = ({ type }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const response = await fetch('https://shopping-website-backend-production.up.railway.app/items');
      const items = await response.json();
  
      // Sort the items by ID in descending order
      items.sort((a, b) => b.id - a.id);
  
      // Select the first four items
      const selectedItems = items.slice(0, 4);
  
      // Assign the selected items as new items and update image paths
      const updatedData = selectedItems.map((item, index) => ({
        ...item,
        img1: getItemImage(item.picture),
        isNew: index < 2,
      }));
  
      setData(updatedData);
    } catch (error) {
      console.log('Error fetching items:', error);
    }
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
    <div className='featuredProducts'>
      <div className="top">
        <h1>{type} products</h1>
        <p>
          Discover a world of cutting-edge technology at our store, where you'll
          find the latest computer innovations that will revolutionize your
          digital experience. From powerful processors to sleek designs, our curated
          selection of computer products offers unrivaled performance, seamless connectivity,
          and unmatched reliability. Upgrade your setup and unleash your full potential with
          the top-of-the-line computer gear available exclusively at our store.
        </p>
      </div>
      <div className="bottom">
        {data.map(item => (
          <Card item={item} key={item.id}  />
        ))}
      </div>
    </div>
  );
};

export default FeaturedProducts;
