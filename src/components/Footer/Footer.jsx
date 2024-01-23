import React from 'react';
import "./Footer.scss";

const Footer = () => {
  return (
    <div className="footer">
        <div className="top">
            <div className="item">
                <h1>Categories</h1>
                <span>Laptop</span>
                <span>Keyboard</span>
                <span>Mouse</span>
                <span>Headset</span>
                <span>Controller</span>
                <span>Accessories</span>
            </div>
            <div className="item">
                <h1>Links</h1>
                <span>FAQ</span>
                <span>Pages</span>
                <span>Stores</span>
            </div>
            <div className="item">
                <h1>About</h1>
                <span>
                    Razer is a global lifestyle brand that has become synonymous 
                    with high-performance gaming hardware and software. With a focus 
                    on innovation and precision, Razer offers a wide range of gaming 
                    peripherals and devices that deliver unparalleled performance and 
                    responsiveness. From gaming mice and keyboards to headsets and laptops, 
                    Razer's products are designed to meet the unique demands of gamers worldwide. 
                    Their commitment to excellence, vibrant community, and continuous drive for 
                    pushing the boundaries of gaming technology have solidified Razer as a leader 
                    in the industry, empowering gamers to elevate their gaming experience to new heights.
                </span>
            </div>
            <div className="item">
                <h1>Contact</h1>
                <span>
                    To contact Ron Gomez, please feel free to connect on Facebook through 
                    [Ron Brylle Gomez' Facebook](https://www.facebook.com/RonBrylleGomez).
                </span>
                <span>
                    To communicate with Kristine Jewel Malimban, reach out via Facebook using 
                    [Kristine Malimban's Facebook](https://www.facebook.com/kristine.juwel).
                </span>
                <span>
                    For inquiries or to get in touch with Currie Parinas, you can reach out on Facebook at 
                    [Currie Parinas' Facebook](https://www.facebook.com/currie.parinas/).
                </span>
            </div>
        </div>
        <div className="bottom">
            <div className="left">
            <span className="logo">KeyCaps</span>
            <span className="copyright">Copyright 2023. All Rights Reserved</span>
            </div>
        </div>
    </div>
  )
}

export default Footer