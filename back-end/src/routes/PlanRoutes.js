import express from 'express';
import PlanMeal from '../schemas/PlanMealSchema.js';
const router = express.Router();

const recipeList = [
    {
        "date": "Monday",
        "meals": {
            "Breakfast": ["French Toast", "Mixed Berry Smoothie"],
            "Lunch": ["Chicken Caesar Salad", "Sweet Potato Fries"],
            "Dinner": ["Spaghetti Bolognese", "Garlic Bread"]
        }
    },
    {
      "date": "Tuesday",
      "meals": {
        "Breakfast": ["Bagel with Cream Cheese", "Fresh Orange Juice"],
        "Lunch": ["Sushi Platter", "Miso Soup"],
        "Dinner": ["Beef Tacos", "Mexican Rice"]
      }
    },
    {
      "date": "Wednesday",
      "meals": {
        "Breakfast": ["Banana Pancakes", "Honey"],
        "Lunch": ["Veggie Burger", "Kale Chips"],
        "Dinner": ["Chicken Curry", "Basmati Rice"]
      }
    },
    {
      "date": "Thursday",
      "meals": {
        "Breakfast": ["Scrambled Eggs", "Sourdough Toast"],
        "Lunch": ["Quiche Lorraine", "Green Salad"],
        "Dinner": ["Lamb Chops", "Roasted Vegetables"]
      }
    },
    
    {
        "date": "Friday",
        "meals": {
          "Breakfast": ["Oatmeal with Berries", "Greek Yogurt"],
          "Lunch": ["Turkey Avocado Wrap", "Tomato Soup"],
          "Dinner": ["Grilled Salmon", "Quinoa Salad"]
        }
      },
    ]

router.get('/', async (req, res) => {
  try {
    const plans = await PlanMeal.find();
    // console.log(plans);
    res.json(plans);
  } catch (error) {
    console.error('Error finding data:', error);
    res.json(recipeList);
  }
    });

    
router.post('/save-recipe', (req, res) => {
  const { title, day, mealType } = req.body;
  console.log(req.body);

  // Find the recipe day object
  const recipeDay = recipeList.find(recipe => recipe.date === day);
  if (recipeDay) {
    // Check if the mealType already exists for the day
    if (recipeDay.meals[mealType]) {
      // If the meal type exists, push the new recipe onto it
      recipeDay.meals[mealType].push(title);
    } else {
      // If the meal type does not exist, create it and set its value to an array with the new recipe
      recipeDay.meals[mealType] = [title];
    }
  } else {
    // If the day does not exist in the recipeList, create a new day with the recipe
    const newRecipeDay = {
      date: day,
      meals: {
        [mealType]: [title]
      }
    };
    recipeList.push(newRecipeDay);
  }

  res.status(200).json({ message: 'Recipe saved successfully', recipeList });
});


export default router;
