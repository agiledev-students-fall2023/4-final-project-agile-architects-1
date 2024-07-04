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
import connectDB from './database.js'

connectDB();

const app = express();

// Logging middleware
app.use(morgan('dev'));

// Middleware to parse JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true })); 

app.use(cors());

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use("/static", express.static(path.join(__dirname, "public")));

// Routes
app.use('/api/', homeRoutes);
app.use('/api/browse', BrowseRoutes);
app.use('/api/recommend', RecommendRoutes);
app.use('/api/profile', profileRoutes);
app.use('/api/user', userRoutes)

export default app;
