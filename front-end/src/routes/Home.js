import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";

import './Home.css';
function Home() {
    const navigate  = useNavigate();

    function toFridge () {
        navigate('/fridge');
    }

    function toPlan () {
        navigate('/plan');
    }

    return (
      <div>
        {/* <h1>This is the home page</h1> */}
        <div className='home-container'>
            <div className='home-ingredients-storage' onClick={toFridge}>
                <h2>Ingredients Storage</h2>
                <ul>
                    <li>Flour</li>
                    <li>Sugar</li>
                    <li>Eggs</li>
                    <li>Milk</li>
                </ul>
            </div>
            <div className='home-recipe-calendar' onClick={toPlan}>
                <h2>Recipe Calendar</h2>
                <ul>
                    <li>Monday: Spaghetti Bolognese</li>
                    <li>Tuesday: Chicken Curry</li>
                    <li>Wednesday: Beef Stew</li>
                    <li>Thursday: Fish and Chips</li>
                    <li>Friday: Pizza</li>
                </ul>
            </div>
        </div>
      </div>
    );
  }


export default Home;