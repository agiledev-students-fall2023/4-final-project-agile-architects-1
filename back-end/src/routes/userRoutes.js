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

router.get("/profile/:userId", async (req, res) => {
    try {
        const userId = req.params.userId;
        const user = await User.findById(userId).select('email username zipcode')
        if (!user){
            return res.status(404).send('User not found')
        }
        res.json(user);
    } catch (error){
        res.status(500).send('Server error');
    }
});

export default router


