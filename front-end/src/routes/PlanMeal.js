import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './PlanMeal.css';
import { useAuthContext } from './hooks/useAuthContext';

function PlanMeal() {
  const { user } = useAuthContext;
  const [mealPlans, setMealPlans] = useState([{
    "date": "fetching...",
    "meals": { "fetching...": ["fetching..."] }
  },]);

  const [currentPage, setCurrentPage] = useState(0); // Start from the first plan
  const [currentMeals, setCurrentMeals] = useState(mealPlans[currentPage].meals);
  const [mealTypes, setMealTypes] = useState(Object.keys(currentMeals));
  const [isEditing, setIsEditing] = useState(false);
  const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const today = new Date();
  /*
  const defaultMealPlans = [{
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
    },{
    "date": `${dayNames[(today.getDay()+1)%7]}`,
    "meals": {
      "Breakfast": ["Tap edit button to enter a recipe"],
      "Lunch": ["Tap edit button to enter a recipe"],
      "Dinner": ["Tap edit button to enter a recipe"]
      }
    },{
    "date": `${dayNames[(today.getDay()+2)%7]}`,
    "meals": {
      "Breakfast": ["Tap edit button to enter a recipe"],
      "Lunch": ["Tap edit button to enter a recipe"],
      "Dinner": ["Tap edit button to enter a recipe"]
      }
    },{
    "date": `${dayNames[(today.getDay()+3)%7]}`,
    "meals": {
      "Breakfast": ["Tap edit button to enter a recipe"],
      "Lunch": ["Tap edit button to enter a recipe"],
      "Dinner": ["Tap edit button to enter a recipe"]
      }
    },{
    "date": `${dayNames[(today.getDay()+4)%7]}`,
    "meals": {
      "Breakfast": ["Tap edit button to enter a recipe"],
      "Lunch": ["Tap edit button to enter a recipe"],
      "Dinner": ["Tap edit button to enter a recipe"]
      }
    },{
    "date": `${dayNames[(today.getDay()+5)%7]}`,
    "meals": {
      "Breakfast": ["Tap edit button to enter a recipe"],
      "Lunch": ["Tap edit button to enter a recipe"],
      "Dinner": ["Tap edit button to enter a recipe"]
      }
    },{
    "date": `${dayNames[(today.getDay()+6)%7]}`,
    "meals": {
      "Breakfast": ["Tap edit button to enter a recipe"],
      "Lunch": ["Tap edit button to enter a recipe"],
      "Dinner": ["Tap edit button to enter a recipe"]
      }
    },
  ];
  */
  const defaultMealPlans = dayNames.map((day, index) => ({
    "date": `${dayNames[(today.getDay() + index) % 7]}`,
    "meals": {
      "Breakfast": ["Tap edit button to enter a recipe"],
      "Lunch": ["Tap edit button to enter a recipe"],
      "Dinner": ["Tap edit button to enter a recipe"]
    }
  }));
  /*
  const updateLocalStorage = async (updatedMealPlans) => {
    const user = JSON.parse(localStorage.getItem('user'));
    user.mealPlans = updatedMealPlans;
    localStorage.setItem('user', JSON.stringify(user));
    const currentUserId = user.userId;
    await fetch(`${process.env.REACT_APP_BACKEND_HOST}/api/user/editUserMeals/${currentUserId}`, {
        method: "PUT",
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({updatedMealPlans})
    })
  };
  */
  const updateLocalStorage = async (updatedMealPlans) => {
    if (user) {
      try {
        const response = await fetch(`${process.env.REACT_APP_BACKEND_HOST}/api/user/editUserMeals/${user.userId}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ updatedMealPlans }),
        });
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
      } catch (error) {
        console.error('Failed to update meal plans: ', error);
      }
    } else {
      const localUser = JSON.parse(localStorage.getItem('user')) || {};
      localUser.mealPlans = updatedMealPlans;
      localStorage.setItem('user', JSON.stringify(localUser));
    }
  }
  /*
  useEffect(() => {
    const fetchPlans = async () => {
      try {
        if (localStorage.getItem('user')) {
          const user = JSON.parse(localStorage.getItem('user'));
          if (!user.mealPlans || user.mealPlans.length === 0) {
            user.mealPlans = defaultMealPlans;
          }
          localStorage.setItem('user', JSON.stringify(user));
          setmealPlans(user.mealPlans);
          setCurrentMeals(user.mealPlans[currentPage].meals);
          setMealTypes(Object.keys(user.mealPlans[currentPage].meals));
        }
        else {
          // else if no user in local storage
          let newUser = {
            "mealPlans": defaultMealPlans
          };
          localStorage.setItem('user', JSON.stringify(newUser));
          setmealPlans(newUser.mealPlans);
          setCurrentMeals(newUser.mealPlans[currentPage].meals);
          setMealTypes(Object.keys(newUser.mealPlans[currentPage].meals));
        }
      } catch (error) {
        console.error("Fetching recipes failed: ", error);
      }
    };
    fetchPlans();
  }, []);
*/
  useEffect(() => {
    const fetchPlans = async () => {
      try {
        if (user) {
          const response = await fetch(`${process.env.REACT_APP_BACKEND_HOST}/api/user/meals/${user.userId}`)
          const data = await response.json();
          if (!data.mealPlans || data.mealPlans.length === 0) {
            data.mealPlans = defaultMealPlans;
          }
          setMealPlans(data.mealPlans);
          setCurrentMeals(data.mealPlans[currentPage].meals);
          setMealTypes(Object.keys(data.mealPlans[currentPage].meals));
        } else {
          const localUser = JSON.parse(localStorage.getItem('user'));
          if (localUser && localUser.mealPlans && localUser.mealPlans.length > 0) {
            setMealPlans(localUser.mealPlans);
            setCurrentMeals(localUser.mealPlans[currentPage].meals);
            setMealTypes(Object.keys(localUser.mealPlans[currentPage].meals));
          } else {
            setMealPlans(defaultMealPlans);
            setCurrentMeals(defaultMealPlans[currentPage].meals);
            setMealTypes(Object.keys(defaultMealPlans[currentPage].meals));
          }
        }
      } catch (error) {
        console.error("Fetching recipes failed: ", error);
      }
    };
    fetchPlans();
  }, [user, currentPage]);

  const toggleEditMode = () => {
    if (isEditing) {
      // Save changes to mealPlans array
      mealPlans[currentPage].meals = currentMeals;
      updateLocalStorage(mealPlans);
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

  const handleDeleteRecipe = (mealType, index) => {
    setCurrentMeals(prevMeals => {
      // Check if this is the last item in the meal type
      if (prevMeals[mealType].length === 1) {
        // Replace the last item with an empty string
        return { ...prevMeals, [mealType]: [""] };
      } else {
        // If not the last item, filter it out
        const updatedMeals = prevMeals[mealType].filter((_, i) => i !== index);
        return { ...prevMeals, [mealType]: updatedMeals };
      }
    });
  };

  const handlePrevPage = () => {
    const newPage = Math.max(currentPage - 1, 0);
    setCurrentPage(newPage);
    setCurrentMeals(mealPlans[newPage].meals);
    setMealTypes(Object.keys(mealPlans[newPage].meals));
  };

  const handleNextPage = () => {
    const newPage = Math.min(currentPage + 1, mealPlans.length - 1);
    console.log(mealPlans[newPage]);
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
      <header className="plan-meal-header">
        <h1>Plan Meals</h1>
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
                      value={recipe}
                      className="notebook-line edit-input"
                      onChange={(e) => handleMealChange(type, index, e.target.value)}
                    />
                    :
                    <p className="notebook-line">{recipe}</p>
                  }
                  {isEditing && (
                    <button
                      className="delete-recipe-button"
                      onClick={() => handleDeleteRecipe(type, index)}
                    >
                      -
                    </button>
                  )}
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
            <button className='recommend-recipe-button'>
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
