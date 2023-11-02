import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './PlanMeal.css';

function PlanMeal() {
    const mealTypes = ["Breakfast", "Brunch", "Lunch", "Afternoon Tea", "Dinner", "Night Snack"];
    
    const [date, setDate] = useState("MM/DD/Year");
    const [currentPage, setCurrentPage] = useState(1);
    const [meals, setMeals] = useState({
        "Breakfast": ["Pancakes", "Fruit Salad"],
        "Lunch": ["Grilled Chicken Sandwich", "Caesar Salad"],
        "Dinner": ["Steak with Mashed Potatoes", "Vegetable Stir Fry"],
    });
    const [isEditing, setIsEditing] = useState(false);


    const toggleEditMode = () => {
        setIsEditing(!isEditing);
    };

    // Function to add a new blank recipe for the given meal type
    const addRecipe = (mealType) => {
        setMeals(prevMeals => ({
            ...prevMeals,
            [mealType]: [...prevMeals[mealType], ""]
        }));
    };

    return (
        <div className="container">
            <header className="header">
            
                <h1 className="notebook-line ">Plan Meals</h1>
                <button onClick={toggleEditMode}>
                    {isEditing ? '✔' : '✎'} {/* Toggle between save and edit icons */}
                </button>
            </header>

            <div className="meal-box">
                <h2 className="notebook-line">{date}</h2>
                {mealTypes.map((type) => (
                    meals[type] && meals[type].length ? (
                        <div key={type}>
                            <strong className="notebook-line">{type}</strong>
                            {meals[type].map((recipe, index) => (
                                <div key={index} className="recipe-line">
                                    
                                    {isEditing ?
                                        <input defaultValue={recipe} className="notebook-line edit-input" />  /*{ Render input if editing }*/
                                        :
                                        <p className="notebook-line">{recipe}</p>
                                    }
                                </div>
                            ))}
                            {isEditing && (
                                <button className="add-recipe-button" onClick={() => addRecipe(type)}>+</button>  // Add recipe button
                            )}
                        </div>
                    ) : null
                ))}
                
                <div className="footer">
                    <Link to="/recommended-recipes">
                      <button>
                          Recommend Recipe
                      </button>
                    </Link>
                    <div>
                        <button /*onClick={handlePrevPage}*/>◀</button>
                        <button /*onClick={handleNextPage}*/>▶</button>
                    </div>
                </div>
            </div>

        </div>
    );
}

export default PlanMeal;
