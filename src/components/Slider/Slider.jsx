import React, { useState } from 'react';
import "./Slider.scss";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import Pic1 from './assets/1.jpg';
import Pic2 from './assets/2.jpg';
import Pic3 from './assets/3.png';


const Slider = () => {
const [currentSlide, setCurrentSlide] = useState(0)

const prevSlide = () => {
    setCurrentSlide(currentSlide === 0 ? 2 : (prev) => prev - 1);
};
const nextSlide = () => {
    setCurrentSlide(currentSlide === 2 ? 0 : (prev) => prev + 1);
}

  return (
    <div className='slider'>
      <div className="container" style={{ transform: `translateX(-${currentSlide * 100}vw)` }}>
            <img src={Pic1} alt=''/>
            <img src={Pic2} alt=''/>
            <img src={Pic3} alt=''/>
        </div>
        <div className="icons">
            <div className="iconLeft" onClick={prevSlide}>
                <ArrowBackIosIcon/>
            </div>
            <div className="iconRight" onClick={nextSlide}>
                <ArrowForwardIosIcon/>
            </div>
        </div>
    </div>
  )
}

export default Slider