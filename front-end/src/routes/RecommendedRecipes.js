import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './RecommendedRecipes.css';

function RecommendedRecipes() {
    const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday", "Any"];
    const mealTypes = ["Breakfast", "Brunch", "Lunch", "Afternoon Tea", "Dinner", "Night Snack", "Any"];

    const [recipes, setRecipes] = useState([]);
    const [selectedDay, setSelectedDay] = useState({});
    const [selectedMeal, setSelectedMeal] = useState({});

    // Mock fetching recipes from a database
    useEffect(() => {
        const fetchedRecipes = [
            {
                id: 1,
                title: "Recipe Title",
                description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit...",
                //... other recipe details
            },
            {
                id: 2,
                title: "Recipe Title",
                description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit...",
                //... other recipe details
            },
            //... other recipes
        ];
        setRecipes(fetchedRecipes);
    }, []);

    return (
        <div className="container">
            <header className="header">
                <Link to="/plan" className="back-button">
                    <button className="back-button">&lt;</button>
                </Link>
                <h1 className="notebook-line">Recommended Recipes</h1>
                <button className="log-button">Log IN</button>
            </header>

            <div className="recipes-list">
                {recipes.map((recipe) => (
                    <div key={recipe.id} className="recipe-card">
                        <h2>{recipe.title}</h2>
                        <p>{recipe.description}</p>

                        <div className="dropdown-container">
                            <select className="half-dropdown">
                                {days.map(selectedDay => (
                                    <option key={selectedDay} value={selectedDay}>{selectedDay}</option>
                                ))}
                            </select>

                            <select className="half-dropdown">
                                {mealTypes.map(meal => (
                                    <option key={meal} value={meal}>{meal}</option>
                                ))}
                            </select>

                            <button className="save-button">Save</button>
                        </div>
                    </div>
                ))}
            </div>

        </div>
    );
}

export default RecommendedRecipes;