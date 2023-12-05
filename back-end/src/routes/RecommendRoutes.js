import express from 'express';

const router = express.Router();

const recommendedList = [
    {
      title: "Caprese Salad",
      description: "Fresh tomatoes and mozzarella cheese, seasoned with basil leaves and olive oil.",
    },
    {
      title: "Chicken Alfredo Pasta",
      description: "Fettuccine pasta tossed in a rich and creamy Parmesan sauce with grilled chicken breast.",
    },
    {
      title: "Vegetarian Burrito",
      description: "A large flour tortilla filled with black beans, rice, cheese, avocado, and salsa.",
    },
    {
      title: "Beef Stroganoff",
      description: "Tender beef in a creamy mushroom sauce, served over egg noodles.",
    },
    {
      title: "Lemon Garlic Roasted Chicken",
      description: "Whole chicken roasted with a lemon, garlic, and herb butter, served with roasted vegetables.",
    },
    {
      title: "Chocolate Lava Cake",
      description: "Warm, rich chocolate cake with a gooey molten center, served with vanilla ice cream.",
    }
  ];  

router.get('/', (req, res) => {
    res.json(recommendedList);
    });

    router.post('/get-recipes', async (req, res) => {
      const ingredients = req.body.input; // Assuming the input is sent in the request body
  
      try {
          const response = await axios.post('https://api.openai.com/v1/engines/davinci/completions', {
              prompt: ` Generate a list of recipes based on the following ingredients: ${ingredients} in this 
                        structure: {title: "Chocolate Lava Cake", description: "Warm, rich chocolate 
                        cake with a gooey molten center, served with vanilla ice cream."},
                        {title: "Lemon Garlic Roasted Chicken", description: "Whole chicken roasted with a lemon, 
                        garlic, and herb butter, served with roasted vegetables."}
                      `,
              max_tokens: 150
          }, {
              headers: {
                  'Authorization': `Bearer YOUR_OPENAI_API_KEY`,
                  'Content-Type': 'application/json'
              }
          });
  
          const recipes = response.data.choices[0].text;
          res.json({ recipes });
      } catch (error) {
          console.error('Error calling OpenAI API:', error);
          res.status(500).send('Error generating recipes');
      }
  });


export default router;
