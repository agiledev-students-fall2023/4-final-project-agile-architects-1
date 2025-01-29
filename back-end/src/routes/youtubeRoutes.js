import express from 'express';
import proxyToFlask from './flaskProxy.js';

const youtubeRoutes = express.Router();

youtubeRoutes.options('/get-videos', (req, res) => {
    console.log("Received OPTIONS request from frontend");
    res.sendStatus(200);
});

// GET videos (calls Flask service)
youtubeRoutes.get('/get-videos', async (req, res) => {
    try {
        const data = await proxyToFlask('/youtube/get-videos', "GET");
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch YouTube data" });
    }
});


export default youtubeRoutes;
