import React from 'react';
import "./Categories.scss";
import {Link, useParams} from "react-router-dom";
import Laptop from "./assets/razerBlade14.jpg";
import Mouse from "./assets/razerDeathAdderV3.jpg";
import Audio from "./assets/razerKrakenV3.jpg";
import Keyboard from "./assets/razerDeathStalkerV2.jpg";
import Controller from "./assets/razerWolverineV2.jpg";
import Accessories from "./assets/razerNommoV2.jpg";

const Categories = () => {
    const { id } = useParams();
    return (
    <div className='categories'>
        <div className="col">
            <div className="row">
                <img src={Laptop} alt=''/>
                <button>
                    <Link className="link" to="/products/Laptop" type="Laptop">Laptop</Link>
                </button>
            </div>
            <div className="row">
                <img src={Mouse} alt=''/>
                <button>
                    <Link className="link" to="/products/Mouse" type="Mouse">Mouse</Link>
                </button>
            </div>
        </div>
        <div className="col">
            <div className="row">
                <img src={Audio} alt=''/>
                <button>
                    <Link className="link" to="/products/Audio" type="Audio">Audio</Link>
                </button>
            </div>
        </div>
        <div className="col col-l">
            <div className="row">
                <div className="col">
                    <div className="row">
                        <img src={Keyboard} alt=''/>
                        <button className="keyboard-button">
                            <Link className="link" to="/products/Keyboard" type="Keyboard">Keyboard</Link>
                        </button>
                    </div>
                </div>
                <div className="col">
                    <div className="row">
                        <img src={Controller} alt=''/>
                        <button>
                            <Link className="link" to="/products/Controller" type="Controller">Controller</Link>
                        </button>
                    </div>
                </div>
            </div>   
            <div className="row">
                <img src={Accessories} alt=''/>
                <button>
                    <Link className="link" to="/products/Accessories" type="Accessories">Accessories</Link>
                </button>
            </div>
        </div>
    </div>
  )
}

export default Categories