const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const bodyParser = require('body-parser'); // Use if needed

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(bodyParser.json()); // For parsing application/json, if needed

// Simulated user database
const users = [
    { id: 1, username: 'user1', password: bcrypt.hashSync('pass1', 8) },
    // ... other users
];

// Login Endpoint
app.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;

        // Find user by username
        const user = users.find(u => u.username === username);
        if (!user) {
            console.log(`Login failed: User not found for username '${username}'`);
            return res.status(404).send('User not found');
        }

        // Checking if password is correct
        const passwordIsValid = bcrypt.compareSync(password, user.password);
        if (!passwordIsValid) {
            console.log(`Login failed: Invalid password for username '${username}'`);
            return res.status(401).send({ auth: false, token: null });
        }

        // Create a token
        const token = jwt.sign({ id: user.id }, 'your_jwt_secret', {
            expiresIn: 86400 // expires in 24 hours
        });

        console.log(`Login successful: User '${username}'`);
        res.status(200).send({ auth: true, token: token });
    } catch (error) {
        console.error(`Login error: ${error}`);
        res.status(500).send('Error on the server.');
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
