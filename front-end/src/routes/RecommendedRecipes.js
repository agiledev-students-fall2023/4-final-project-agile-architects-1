import React, { useState, useEffect } from 'react';
import './RecommendedRecipes.css';

function RecommendedRecipes() {
    const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
    const mealTypes = ["Breakfast", "Brunch", "Lunch", "Afternoon Tea", "Dinner", "Night Snack"];

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
            //... other recipes
        ];
        setRecipes(fetchedRecipes);
    }, []);

    return (
        <div className="container">
            <header className="header">
                <button className="back-button">&lt;</button>
                <h1 className="notebook-line">Recommended Recipes</h1>
                <button className="log-button">Log IN</button>
            </header>

            <div className="recipes-list">
                {recipes.map((recipe) => (
                    <div key={recipe.id} className="recipe-card">
                        <h2>{recipe.title}</h2>
                        <p>{recipe.description}</p>

                        <select
                            value={selectedDay[recipe.id] || ""}
                            onChange={(e) => setSelectedDay(prev => ({ ...prev, [recipe.id]: e.target.value }))}
                        >
                            <option value="" disabled>Select day</option>
                            {daysOfWeek.map(day => <option key={day} value={day}>{day}</option>)}
                        </select>

                        <select
                            value={selectedMeal[recipe.id] || ""}
                            onChange={(e) => setSelectedMeal(prev => ({ ...prev, [recipe.id]: e.target.value }))}
                        >
                            <option value="" disabled>Select meal</option>
                            {mealTypes.map(meal => <option key={meal} value={meal}>{meal}</option>)}
                        </select>
                    </div>
                ))}
            </div>

        </div>
    );
}

export default RecommendedRecipes;
