import express from 'express';

const router = express.Router();

const recommendedList = [
    {
      id: "507f191e810c19729de860ea",
      title: "Caprese Salad",
      description: "Fresh tomatoes and mozzarella cheese, seasoned with basil leaves and olive oil.",
    },
    {
      id: "507f191e810c19729de860eb",
      title: "Chicken Alfredo Pasta",
      description: "Fettuccine pasta tossed in a rich and creamy Parmesan sauce with grilled chicken breast.",
    },
    {
      id: "507f191e810c19729de860ec",
      title: "Vegetarian Burrito",
      description: "A large flour tortilla filled with black beans, rice, cheese, avocado, and salsa.",
    },
    {
      id: "507f191e810c19729de860ed",
      title: "Beef Stroganoff",
      description: "Tender beef in a creamy mushroom sauce, served over egg noodles.",
    },
    {
      id: "507f191e810c19729de860ee",
      title: "Lemon Garlic Roasted Chicken",
      description: "Whole chicken roasted with a lemon, garlic, and herb butter, served with roasted vegetables.",
    },
    {
      id: "507f191e810c19729de860ef",
      title: "Chocolate Lava Cake",
      description: "Warm, rich chocolate cake with a gooey molten center, served with vanilla ice cream.",
    }
  ];  

router.get('/', (req, res) => {
    res.json(recommendedList);
    });


export default router;
