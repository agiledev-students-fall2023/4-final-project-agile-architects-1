import express from 'express';

const router = express.Router();

const recipeList = [
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
    ]

router.get('/', (req, res) => {
    res.json(recipeList);
    });

export default router;
