import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './PlanMeal.css';

const mealPlans = [
    {
        "date": "11/08/2023",
        "meals": {
            "Breakfast": ["French Toast", "Mixed Berry Smoothie"],
            "Lunch": ["Chicken Caesar Salad", "Sweet Potato Fries"],
            "Dinner": ["Spaghetti Bolognese", "Garlic Bread"]
        }
    },
    {
      "date": "11/09/2023",
      "meals": {
        "Breakfast": ["Bagel with Cream Cheese", "Fresh Orange Juice"],
        "Lunch": ["Sushi Platter", "Miso Soup"],
        "Dinner": ["Beef Tacos", "Mexican Rice"]
      }
    },
    {
      "date": "11/10/2023",
      "meals": {
        "Breakfast": ["Banana Pancakes", "Honey"],
        "Lunch": ["Veggie Burger", "Kale Chips"],
        "Dinner": ["Chicken Curry", "Basmati Rice"]
      }
    },
    {
      "date": "11/11/2023",
      "meals": {
        "Breakfast": ["Scrambled Eggs", "Sourdough Toast"],
        "Lunch": ["Quiche Lorraine", "Green Salad"],
        "Dinner": ["Lamb Chops", "Roasted Vegetables"]
      }
    },
    
    {
        "date": "11/12/2023",
        "meals": {
          "Breakfast": ["Oatmeal with Berries", "Greek Yogurt"],
          "Lunch": ["Turkey Avocado Wrap", "Tomato Soup"],
          "Dinner": ["Grilled Salmon", "Quinoa Salad"]
        }
      },
  ];  

function PlanMeal() {

    const [currentPage, setCurrentPage] = useState(0); // Start from the first plan
    const [currentMeals, setCurrentMeals] = useState(mealPlans[currentPage].meals);
    const mealTypes = Object.keys(currentMeals);

    const [isEditing, setIsEditing] = useState(false);

    const toggleEditMode = () => {
        if (isEditing) {
            // Save changes to mealPlans array
            mealPlans[currentPage].meals = currentMeals;
        }
        setIsEditing(!isEditing);
    };

    // Function to add a new blank recipe for the given meal type
    const addRecipe = (mealType) => {
        setCurrentMeals(prevMeals => ({
        ...prevMeals,
        [mealType]: [...prevMeals[mealType], ""]
        }));
    };

    const handlePrevPage = () => {
        const newPage = Math.max(currentPage - 1, 0);
        setCurrentPage(newPage);
        setCurrentMeals(mealPlans[newPage].meals);
      };
    
      const handleNextPage = () => {
        const newPage = Math.min(currentPage + 1, mealPlans.length - 1);
        setCurrentPage(newPage);
        setCurrentMeals(mealPlans[newPage].meals);
      };

      const handleMealChange = (mealType, index, newValue) => {
        setCurrentMeals(prevMeals => ({
          ...prevMeals,
          [mealType]: prevMeals[mealType].map((item, i) => i === index ? newValue : item)
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
                <h2 className="notebook-line">{mealPlans[currentPage].date}</h2>
                {mealTypes.map((type) => (
                    currentMeals[type] && currentMeals[type].length ? (
                        <div key={type}>
                            <strong className="notebook-line">{type}</strong>
                            {currentMeals[type].map((recipe, index) => (
                                <div key={index} className="recipe-line">
                                    
                                    {isEditing ?
                                    <input
                                        defaultValue={recipe}
                                        className="notebook-line edit-input"
                                        onChange={(e) => handleMealChange(type, index, e.target.value)}
                                    />
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
                        <button onClick={handlePrevPage}>◀</button>
                        <button onClick={handleNextPage}>▶</button>
                    </div>
                </div>
            </div>

        </div>
    );
}

export default PlanMeal;
