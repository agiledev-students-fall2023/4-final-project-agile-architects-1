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
        
        console.log(`Forwarding request to Flask: ${url}, Method: ${method}, Data:`, data);
       
        const response = await axios({
            method,
            url,
            data,
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
            },
            withCredentials: true, // Allow cross-origin cookies
            validateStatus: (status) => status < 500, // Prevent Axios from throwing on 403
        });
        console.log("Flask Response Headers:", response.headers);
        console.log(`Flask Response:`, response.data);
        return response.data;
    } catch (error) {
        console.error(`Error calling Flask endpoint ${endpoint}:`, error.message);
        throw new Error("Flask service unavailable");
    }
};

export default proxyToFlask;
