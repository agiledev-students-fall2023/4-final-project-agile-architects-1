import express from 'express';
import dotenv from "dotenv";
import OpenAI from "openai";

import axios from 'axios';

dotenv.config();
const router = express.Router();

const openai = new OpenAI();
const apiKey = process.env.OPENAI_API_KEY || "";

// Example endpoint for getting recipe recommendations
const RECIPE_API_URL = 'https://api.openai.com/v1/engines/davinci/completions';
const exampleFormat = `
[
  {"title": "Recipe Title 1", "description": "Description of Recipe 1.", "ingredients": ["Ingredient1", "Ingrendient2",...], "steps": ["Step1 to make Recipe 1.","Step2 to make Recipe1.",...], "time": "Time in minutes to make Recipe 1."},
  {"title": "Recipe Title 2", "description": "Description of Recipe 2.", "ingredients": ["Ingredient1", "Ingrendient2",...], "steps": ["Step1 to make Recipe 2.","Step2 to make Recipe2.",...], "time": "Time in minutes to make Recipe 2."},
]
`
router.post('/recommendations', async (req, res) => {
    const ingredients = req.body.ingredients;
    let prompt = `Generate a list of five recipes in JSON format. 
    Each recipe should include a title, a description, arrays of ingredients and steps, and a time. Don't add any other content than the JSON list. Example format:
    ${exampleFormat}
    Recipes:`;
    if (ingredients) {
      prompt = `Given the ingredients: ${ingredients}, generate a list of five recipes in JSON format. 
      Each recipe should include a title and a description. Don't add any other content than the JSON list. Example format:
      ${exampleFormat}
      Recipes:`;
    } 

    try {
      const response = await openai.chat.completions.create({
        messages: [{ role: "system", content: prompt }],
        model: "gpt-3.5-turbo",
      });

      // Assuming the API returns an array of recipes
      const recommendedRecipesString = response.choices[0].message.content;
      const recommendedRecipes = JSON.parse(recommendedRecipesString);
      console.log(recommendedRecipes);
      res.json(recommendedRecipes);
    } catch (error) {
        console.error('Error fetching recipes:', error);
        res.status(500).send('Error fetching recipe recommendations');
    }
});

export default router;
