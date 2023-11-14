import express from 'express';
import path from 'path';

import homeRoutes from './routes/homeRoutes.js';

const app = express();

// Middleware to parse JSON
app.use(express.json());
app.use("/static", express.static("public"));

// Routes
app.use('/', homeRoutes);

export default app;
