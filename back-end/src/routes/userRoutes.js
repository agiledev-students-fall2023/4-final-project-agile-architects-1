import express from 'express';

const router = express.Router();

// controller functions
import { loginUser, registerUser } from '../controllers/userController.js';

// Simulated user database
const user1 = [
    { id: 1, username: 'test1', email: "test1@test.com", password: 'pass1', zipCode: 10008},
    // ... other users
];

// Login route
router.post('/login', loginUser)

// Signup route
router.post('/register', registerUser)

export default router


