import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './RecommendedRecipes.css';

function RecommendedRecipes() {
    const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday", "Any"];
    const mealTypes = ["Breakfast", "Brunch", "Lunch", "Afternoon Tea", "Dinner", "Night Snack", "Any"];
    
    const [recipes, setRecipes] = useState([{
        id: 1,
        title: "Recipe Title",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit...",
        //... other recipe details
    },]);
    const [selectedDay, setSelectedDay] = useState({});
    const [selectedMeal, setSelectedMeal] = useState({});

    // Mock fetching recipes from a database
    useEffect(() => {
        const fetchedRecipes = [
            {
                id: 1,
                title: "Coffee",
                description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. ",
                //... other recipe details
            },
            {
                id: 2,
                title: "Milk",
                description: "Just drink",
                //... other recipe details
            },
        ];
        setRecipes(fetchedRecipes);
    }, []);

    const [currentPage, setCurrentPage] = useState(0);

    
    const handlePrevPage = () => {
        const newPage = Math.max(currentPage - 1, 0);
        setCurrentPage(newPage);
      };
    
      const handleNextPage = () => {
        const newPage = Math.min(currentPage + 1, recipes.length - 1);
        setCurrentPage(newPage);
      };

    return (
        <div className="container">
            <header className="header">
                <Link to="/plan" className="back-button">
                    <button className="back-button">&lt;</button>
                </Link>
                <h1 className="notebook-line">Recommended Recipes</h1>
            </header>

            <div className="recipe-card">
                <button className="save-button">Save</button>
                <h2 className="recipe-title">{recipes[currentPage].title}</h2>
                <p className="recipe-text">{recipes[currentPage].description}</p>
                
                <div className="flip-page">
                    <button onClick={handlePrevPage}>◀</button>
                    <button onClick={handleNextPage}>▶</button>
                </div>
                
            </div>
            <div className="dropdown-container">
                    <select className="dropdown">
                        {days.map(selectedDay => (
                            <option key={selectedDay} value={selectedDay}>{selectedDay}</option>
                        ))}
                    </select>

                    <select className="dropdown">
                        {mealTypes.map(meal => (
                            <option key={meal} value={meal}>{meal}</option>
                        ))}
                    </select>
            </div>

        </div>
    );
}

export default RecommendedRecipes;
