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
        description: "Fetching...",
        ingredients: ["Fetching..."],
        steps: ["Fetching..."],
        time: "Fetching...",
    },]);
    const [selectedDay, setSelectedDay] = useState('Any');
    const [selectedMeal, setSelectedMeal] = useState('Any');

    // Mock fetching recipes from a database
    useEffect(() => {
        const fetchRecommends = async () => {
          try {
            let requestBody = {};
            if (localStorage.getItem('user')) {
              const user = JSON.parse(localStorage.getItem('user'));
              if (user.fridgeItems){
                const userIngredients = [];
                for (let i = 0; i < user.fridgeItems.length; i++) {
                  userIngredients.push(user.ingredients[i].name);
                }
                requestBody = {
                  ingredients: userIngredients
                };
              }
            }
            const response = await fetch(`${process.env.REACT_APP_BACKEND_HOST}/api/recommend/recommendations`,{
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify(requestBody),
            }); // Adjust the URL/port if needed
            if (!response.ok) {
              throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            console.log("API RESPONSE:",data)
            if (data[0].title || data[0].description || data[0].steps || data[0].time) {
              console.log(data)
              console.log(data[currentPage].ingredients.join('\n'))
              setRecipes(data);
            }
            else{
              console.log("API ERROR:",data)
              setRecipes([{
                id: 1,
                title: "Fetch Failed",
                description: "Try again later",
              }])
            }
          } catch (error) {
            console.error("Fetching recipes failed: ", error);
          }
        };
        fetchRecommends();
    }, []);

    const [currentPage, setCurrentPage] = useState(0);

    
    const handlePrevPage = () => {
        const newPage = Math.max(currentPage - 1, 0);
        setCurrentPage(newPage);
        const saveButton = document.querySelector('.save-button');
        saveButton.style.color = '#808080';
      };
    
      const handleNextPage = () => {
        const newPage = Math.min(currentPage + 1, recipes.length - 1);
        setCurrentPage(newPage);
        const saveButton = document.querySelector('.save-button');
        saveButton.style.color = '#808080';
      };

      const handleSave = async () => {
        if (localStorage.getItem('user')) {
          const user = JSON.parse(localStorage.getItem('user'));
          if (user.mealPlans === undefined){
            user.mealPlans = [];
          }
          for (let i = 0; i < user.mealPlans.length; i++) {
            if (user.mealPlans[i].date === selectedDay){
              console.log("adding to existing day")
              if (user.mealPlans[i]["meals"][selectedMeal] === undefined){
                user.mealPlans[i]["meals"][selectedMeal] = [];
              }
              user.mealPlans[i]["meals"][selectedMeal].push(recipes[currentPage].title);
              // console.log("user.mealPlans[i][selectedMeal]");
              // console.log(user.mealPlans[i][selectedMeal]);
              localStorage.setItem('user', JSON.stringify(user));
              const saveButton = document.querySelector('.save-button');
              saveButton.style.color = '#ffe11c';
              return;
            }
          }
          const newDay = {
            day: selectedDay
          };
          newDay[selectedMeal] = [recipes[currentPage].title];
          user.mealPlans.push(newDay);
          localStorage.setItem('user', JSON.stringify(user));
          const saveButton = document.querySelector('.save-button');
          saveButton.style.color = '#ffe11c';
          return;
        }
        else{
          const user = {
            mealPlans: []
          };
          const newPlan = {
            day: selectedDay
          };
          newPlan[selectedMeal] = [recipes[currentPage].title];
          user.mealPlans.push(newPlan);
          localStorage.setItem('user', JSON.stringify(user));
          const saveButton = document.querySelector('.save-button');
          saveButton.style.color = '#ffe11c';
        }
        const user = JSON.parse(localStorage.getItem('user'));
        const currentUserId = user.userId;
        const mealPlans = user.mealPlans;
        const response = await fetch(`${process.env.REACT_APP_BACKEND_HOST}/api/user/editUserMeals/${currentUserId}`, {
            method: "PUT",
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({mealPlans})
        })
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
                {/* <div classNema="recipe-container"> */}
                  <h2 className="recipe-title">{recipes[currentPage].title}</h2>
                  <p className="recipe-description">{recipes[currentPage].description}</p>  
                  <p className="recipe-description">Ingredients:</p>
                  {recipes[currentPage].ingredients.map((ingredient) => (
                    <li className="recipe-description">{ingredient}</li>
                  ))}
                  <p className="recipe-description">Steps:</p>
                  {recipes[currentPage].steps.map((step) => (
                    <li className="recipe-description">{step}</li>
                  ))}
                  <p className="recipe-description">Time: {recipes[currentPage].time}</p>
                {/* </div> */}
                
                <div className="page-indicators">
                  {recipes.map((_, index) => (
                    <span 
                      key={index} 
                      className={`page-dot ${index === currentPage ? 'active' : ''}`} 
                    />
                  ))}
                </div>
                
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