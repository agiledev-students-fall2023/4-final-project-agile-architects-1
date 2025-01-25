import express from 'express';
import axios from 'axios'; // Use axios to call Flask API
import dotenv from 'dotenv';

dotenv.config();

const youtubeRoutes = express.Router();

youtubeRoutes.get('/get-videos', async (req, res) => {
    try {
        const flaskResponse = await axios.get(`${process.env.FLASK_API_URL}/get-videos`); // Flask API URL
        res.status(200).json(flaskResponse.data); // Forward Flask response to the client
    } catch (error) {
        console.error('Error fetching YouTube data:', error);
        res.status(500).json({ error: 'Failed to fetch YouTube data' });
    }
});

export default youtubeRoutes;
