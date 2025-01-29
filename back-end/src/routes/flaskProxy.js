import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

/**
 * Proxies requests to Flask API.
 * @param {string} endpoint - Flask API endpoint (e.g., '/get-videos')
 * @param {string} method - HTTP method (GET, POST)
 * @param {Object} [data] - Optional data for POST requests
 */
const proxyToFlask = async (endpoint, method = "GET", data = null) => {
    try {
        const FLASK_API_URL = process.env.FLASK_API_URL || "http://127.0.0.1:5000";
        const url = `${FLASK_API_URL}${endpoint}`;
        const response = method === "POST"
            ? await axios.post(url, data)
            : await axios.get(url);
        return response.data;
    } catch (error) {
        console.error(`Error calling Flask endpoint ${endpoint}:`, error.message);
        throw new Error("Flask service unavailable");
    }
};

export default proxyToFlask;
