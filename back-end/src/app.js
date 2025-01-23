import express from 'express';
import path from 'path';
import cors from 'cors';
import morgan from 'morgan';
import multer from 'multer';
import { fileURLToPath } from 'url';

import homeRoutes from './routes/homeRoutes.js';
import BrowseRoutes from './routes/BrowseRoutes.js';
import RecommendRoutes from './routes/RecommendRoutes.js';
import profileRoutes from './routes/profileRoutes.js';
import userRoutes from './routes/userRoutes.js';
import connectDB from './database.js';
import youtubeRoutes from './routes/youtubeRoutes.js';

connectDB();

const app = express();

// Logging middleware
app.use(morgan('dev'));

// Middleware to parse JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true })); 

const corsOptions = {
    origin: [  'http://wastewise.site',
        'https://wastewise.site',
        'http://www.wastewise.site',
        'https://www.wastewise.site',
        'http://localhost:3000',
        'http://localhost:3001',
        "http://localhost:5000",
    ],
    methods: 'GET,POST,PUT,DELETE,OPTIONS',
    allowedHeaders: 'Content-Type,Authorization',
    credentials: true,
}
app.use(cors(corsOptions));

// Setting path for serving static files
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const publicPath = path.join(__dirname, '../public');
app.use('/static', express.static(publicPath));

// Routes
app.use('/api/', homeRoutes);
app.use('/api/browse', BrowseRoutes);
app.use('/api/recommend', RecommendRoutes);
app.use('/api/profile', profileRoutes);
app.use('/api/user', userRoutes);
app.use('/api/youtube', youtubeRoutes);

export default app;
