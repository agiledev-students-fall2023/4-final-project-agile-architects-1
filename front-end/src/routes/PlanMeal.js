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
  const [user, setUser] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        if (localStorage.getItem('user')) {
          // console.log(JSON.parse(localStorage.getItem('user')))
          const currentUser = await JSON.parse(localStorage.getItem('user'));
          setUser(currentUser);
          if (currentUser.mealPlans) {
            const savedMeals = currentUser.mealPlans;
            // console.log(savedMeals);
            setmealPlans(savedMeals);
            setCurrentMeals(savedMeals[currentPage].meals);
            setMealTypes(Object.keys(savedMeals[currentPage].meals));
          }
          else{
            const today = new Date();
            currentUser.mealPlans = [{
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
            },];
            setUser(currentUser);
            setmealPlans(currentUser.mealPlans);
            setCurrentMeals(currentUser.mealPlans[currentPage].meals);
            setMealTypes(Object.keys(currentUser.mealPlans[currentPage].meals));
          }
          
          localStorage.setItem('user', JSON.stringify(currentUser));
        }
        else{
          let user = {}
          const today = new Date();
          user.mealPlans = [{
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
          },];
          setUser(user);
          setmealPlans(user.mealPlans);
          setCurrentMeals(user.mealPlans[currentPage].meals);
          setMealTypes(Object.keys(user.mealPlans[currentPage].meals));
          localStorage.setItem('user', JSON.stringify(user));
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
        user.mealPlans = mealPlans;
        localStorage.setItem('user', JSON.stringify(user));
        if (localStorage.getItem('user').id) {
          const response = fetch(`/user/editMealPlans/${localStorage.getItem('user').id}`, {
            method: "POST",
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({mealPlans})
          })
        }
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

      const handleAddPage = async () => {
        let user = {}
        if (localStorage.getItem('user')) {
          // console.log(JSON.parse(localStorage.getItem('user')))
          user = await JSON.parse(localStorage.getItem('user'));
          if (user.mealPlans) {
            let prevDay = dayNames.indexOf(mealPlans[mealPlans.length - 1]["date"]);
            user.mealPlans.push({
              "date": `${dayNames[(prevDay+1)%7]}`,
              "meals": {
                "Breakfast": ["Tap edit button to enter a recipe"],
                "Lunch": ["Tap edit button to enter a recipe"],
                "Dinner": ["Tap edit button to enter a recipe"]
              }
            })
          }
          setCurrentPage(mealPlans.length - 1);
          setmealPlans(user.mealPlans);
          localStorage.setItem('user', JSON.stringify(user));
        }
      }

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
                        <button onClick={handleAddPage}>+</button>
                    </div>
                </div>
            </div>

        </div>
    );
}

export default PlanMeal;
