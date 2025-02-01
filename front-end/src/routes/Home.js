import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import Animation from './Animation';
import './Home.css';


function Home() {
    const [fridgeItems, setFridgeItems] = useState(["Get something to cook!"]);
    const [mealPlans, setMealPlans] = useState(["Get something to eat!"]);
    const navigate  = useNavigate();

    function toFridge () {
        navigate('/fridge');
    }

    function toPlan () {
        navigate('/plan');
    }

    useEffect(() => {
        if (localStorage.getItem('user')) {
            const user = JSON.parse(localStorage.getItem('user'));
            if (user.fridgeItems){
                const userIngredients = [];
                for (let i = 0; i < user.fridgeItems.length; i++) {
                    userIngredients.push(user.fridgeItems[i].name);
                }
                if (userIngredients.length === 0){
                    userIngredients.push("Get something to cook!");
                }
                setFridgeItems(userIngredients);
            }
            if (user.mealPlans){
                const userMealPlans = [];
                for (let i = 0; i < user.mealPlans.length; i++) {
                    for (const [key, value] of Object.entries(user.mealPlans[i].meals)) {
                        for (let j = 0; j < value.length; j++) {
                            if (value[j] != "Tap edit button to enter a recipe"){
                                userMealPlans.push(value[j]);
                            }
                        }
                    }
                }
                if (userMealPlans.length === 0){
                    userMealPlans.push("Get something to eat!");
                }
                setMealPlans(userMealPlans);
            }
          }
    }, []);

    return (
      <div>
        {/* <h1>This is the home page</h1> */}
        <div className='home-container'>
            <div className='home-ingredients-storage' onClick={toFridge}>
                <h2>Ingredients Storage</h2>
                <ul>
                {fridgeItems.map((fridgeItem, index) => (
                    <li key={index}>
                        {fridgeItem}
                    </li>
                ))}
                </ul>
            </div>
            <div className='home-recipe-calendar' onClick={toPlan}>
                <h2>Recipe Calendar</h2>
                <ul>
                {mealPlans.map((mealPlan, index) => (
                    <li key={index}>
                        {mealPlan}
                    </li>
                ))}
                </ul>
            </div>
        </div>
      </div>
    );
  }


export default Home;