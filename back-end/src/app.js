import express from 'express';
import path from 'path';
import cors from 'cors';
import morgan from 'morgan';

import homeRoutes from './routes/homeRoutes.js';
import BrowseRoutes from './routes/BrowseRoutes.js';
import PlanRoutes from './routes/PlanRoutes.js';
import RecommendRoutes from './routes/RecommendRoutes.js';
import fridgeRoutes from './routes/fridgeRoutes.js';
import profileRoutes from './routes/profileRoutes.js';
import userRoutes from './routes/userRoutes.js';
import connectDB from './database.js'

connectDB();

const app = express();

// Logging middleware
app.use(morgan('dev'));

// Middleware to parse JSON
app.use(express.json());

app.use(cors());
app.use("/static", express.static("public"));

// Routes
app.use('/', homeRoutes);
app.use('/browse', BrowseRoutes);
app.use('/plan', PlanRoutes);
app.use('/recommend', RecommendRoutes);
app.use('/profile', profileRoutes);
app.use('/fridge', fridgeRoutes);
app.use('/user', userRoutes)

export default app;
