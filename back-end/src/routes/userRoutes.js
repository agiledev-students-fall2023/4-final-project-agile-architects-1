import express from 'express';

const router = express.Router();

// controller functions
import { loginUser, registerUser, editUser, editMealPlans } from '../controllers/userController.js';

// Login route
router.post('/login', loginUser)

// Signup route
router.post('/register', registerUser)

// Update route
router.put('/editUser/:_id', editUser)

// MealPlans
router.put('/editMealPlans/:_id', editMealPlans)
export default router


