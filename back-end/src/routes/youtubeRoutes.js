import express from 'express';
import proxyToFlask from './flaskProxy.js';

const youtubeRoutes = express.Router();

// Handle OPTIONS preflight requests for CORS
youtubeRoutes.options('/get-videos', (req, res) => {
    console.log("Received OPTIONS request from frontend");
    res.sendStatus(200);
});

// POST request to fetch YouTube videos from Flask
youtubeRoutes.post('/get-videos', async (req, res) => {
    try {
        console.log("Forwarding POST request to Flask with data:", req.body);
        const data = await proxyToFlask('/youtube/get-videos', "POST", req.body);
        res.status(200).json(data);
    } catch (error) {
        console.error("Error fetching YouTube data:", error);
        res.status(500).json({ error: "Failed to fetch YouTube data" });
    }
});

export default youtubeRoutes;
