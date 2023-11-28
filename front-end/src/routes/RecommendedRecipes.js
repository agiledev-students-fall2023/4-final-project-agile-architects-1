import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSwipeable } from 'react-swipeable';
import './RecommendedRecipes.css';

function RecommendedRecipes() {
    const days = ["Any","Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
    const mealTypes = ["Any","Breakfast", "Brunch", "Lunch", "Afternoon Tea", "Dinner", "Night Snack"];
    
    const [recipes, setRecipes] = useState([{
        id: 1,
        title: "Recipe Title",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit...",
        //... other recipe details
    },]);
    const [selectedDay, setSelectedDay] = useState('Any');
    const [selectedMeal, setSelectedMeal] = useState('Any');

    // Mock fetching recipes from a database
    useEffect(() => {
        const fetchRecommends = async () => {
          try {
            const response = await fetch('http://localhost:3001/recommend'); // Adjust the URL/port if needed
            if (!response.ok) {
              throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            setRecipes(data);
          } catch (error) {
            console.error("Fetching recipes failed: ", error);
            // Handle errors here
          }
        };
        fetchRecommends();
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

      const handleSave = async () => {
        const recipeToSave = {
          title: recipes[currentPage].title,
          day: selectedDay,
          mealType: selectedMeal
        };
      
        try {
          const response = await fetch('http://localhost:3001/plan/save-recipe', { // Replace with your actual endpoint
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(recipeToSave),
          });
      
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
      
          const result = await response.json();
          console.log("Save successful", result);
          // Further actions after save (e.g., confirmation message)
        } catch (error) {
          console.error("Error saving recipe", error);
          // Handle errors here (e.g., show error message)
        }

        //change the color of save-button
        const saveButton = document.querySelector('.save-button');
        saveButton.style.color = '#ffe11c';
      };
      
      const handlers = useSwipeable({
        onSwipedLeft: () => handleNextPage(),
        onSwipedRight: () => handlePrevPage(),
        preventDefaultTouchmoveEvent: true,
        trackMouse: true
      });

    return (
        <div className="container">
            <header className="header">
                <Link to="/plan" className="back-button">
                    <button className="back-button">&lt;</button>
                </Link>
                <h1 className="notebook-line">Recommended Recipes</h1>
            </header>

            <div className="recipe-card" {...handlers}>
                <button className="save-button" onClick={handleSave}>★</button>
                <h2 className="recipe-title">{recipes[currentPage].title}</h2>
                <p className="recipe-text">{recipes[currentPage].description}</p>
                
                {/* <div className="flip-page">
                    <button onClick={handlePrevPage}>◀</button>
                    <button onClick={handleNextPage}>▶</button>
                </div> */}
                
            </div>
            <div className="dropdown-container">
                    <select className="dropdown" onChange={(e) => setSelectedDay(e.target.value)}>
                        {days.map(selectedDay => (
                            <option key={selectedDay} value={selectedDay}>{selectedDay}</option>
                        ))}
                    </select>

                    <select className="dropdown" onChange={(e) => setSelectedMeal(e.target.value)}>
                        {mealTypes.map(meal => (
                            <option key={meal} value={meal}>{meal}</option>
                        ))}
                    </select>
            </div>

        </div>
    );
}

export default RecommendedRecipes;
