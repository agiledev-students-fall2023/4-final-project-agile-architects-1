import React, { useState , useEffect } from 'react';
import { Link } from 'react-router-dom';
import './PlanMeal.css';

function PlanMeal() {
  const [mealPlans, setmealPlans] = useState([{
    "date": "fetching...",
    "meals": {
        "fetching...": ["fetching..."]
    }
  },]);

  const [currentPage, setCurrentPage] = useState(0); // Start from the first plan
  const [currentMeals, setCurrentMeals] = useState(mealPlans[currentPage].meals);
  const [mealTypes, setMealTypes] = useState(Object.keys(currentMeals));
  const [isEditing, setIsEditing] = useState(false);
  const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const today = new Date();
        if (localStorage.getItem('user')) {
          const user = JSON.parse(localStorage.getItem('user'));
          if (user.mealPlans){
            console.log("we do have meal plans")
            setmealPlans(user.mealPlans);
          }
          else{
            setmealPlans([{
              "date": "Any",
              "meals": {
                "Any": ["Tap edit button to enter a recipe"],
              }
            },{
              "date": `${dayNames[today.getDay()]}`,
              "meals": {
                "Breakfast": ["Tap edit button to enter a recipe"],
                "Lunch": ["Tap edit button to enter a recipe"],
                "Dinner": ["Tap edit button to enter a recipe"]
              }
            },]);
          }
          localStorage.setItem('user', JSON.stringify(user));
          setmealPlans(user.mealPlans);
          setCurrentMeals(user.mealPlans[currentPage].meals);
          setMealTypes(Object.keys(user.mealPlans[currentPage].meals));
        }
        else{
          // else if no user in local storage
          let newUser = {
            "mealPlans": [{
                "date": "Any",
                "meals": {
                  "Any": ["Tap edit button to enter a recipe"],
                }
              },{
                "date": `${dayNames[today.getDay()]}`,
                "meals": {
                  "Breakfast": ["Tap edit button to enter a recipe"],
                  "Lunch": ["Tap edit button to enter a recipe"],
                  "Dinner": ["Tap edit button to enter a recipe"]
                }
              },]
          };
          localStorage.setItem('user', JSON.stringify(newUser));
          setmealPlans(newUser.mealPlans);
          setCurrentMeals(newUser.mealPlans[currentPage].meals);
          setMealTypes(Object.keys(newUser.mealPlans[currentPage].meals));
        }
      } catch (error) {
        console.error("Fetching recipes failed: ", error);
        // Handle errors here
      }
    };
    fetchPlans();
}, []);

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
        setMealTypes(Object.keys(mealPlans[newPage].meals));
      };
    
      const handleNextPage = () => {
        const newPage = Math.min(currentPage + 1, mealPlans.length - 1);
        setCurrentPage(newPage);
        setCurrentMeals(mealPlans[newPage].meals);
        setMealTypes(Object.keys(mealPlans[newPage].meals));
        console.log(mealPlans[newPage]);
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
