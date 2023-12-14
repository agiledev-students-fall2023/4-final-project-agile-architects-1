import express from 'express';

const router = express.Router();

// controller functions
import { loginUser, registerUser, editUser, editUserMeals } from '../controllers/userController.js';

// Login route
router.post('/login', loginUser)

// Signup route
router.post('/register', registerUser)

// Update route
router.put('/editUser/:_id', editUser)

// Update meal
router.put('/editUserMeals/:_id', editUserMeals)

export default router


