import mongoose from 'mongoose';

const Schema = mongoose.Schema;

// Define a schema for individual meals
const mealSchema = new Schema({
mealId: { type: Schema.Types.ObjectId, required: true, default: () => new mongoose.Types.ObjectId() },
  mealType: { type: String, required: true },
  recipes: [{ type: String }]
});

// Define the main MealPlan schema
const planMealSchema = new Schema({
  user_id: { type: Schema.Types.ObjectId, required: true },
  _id: { type: Schema.Types.ObjectId, required: true, default: () => new mongoose.Types.ObjectId() },
  date: { type: String, required: true },
  meals: {
    Breakfast: [String],
    Lunch: [String],
    Dinner: [String],
  }
}, { collection: 'PlanMeal' });

// Create a model from the schema
const PlanMeal = mongoose.model('PlanMeal', planMealSchema);

export default PlanMeal;
