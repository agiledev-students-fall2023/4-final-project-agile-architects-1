import express from 'express';
import path from 'path';

import homeRoutes from './routes/homeRoutes.js';
import BrowseRoutes from './routes/BrowseRoutes.js';
import fridgeRoutes from './routes/fridgeRoutes.js';

const app = express();

// Middleware to parse JSON
app.use(express.json());
app.use("/static", express.static("public"));

// Routes
app.use('/', homeRoutes);
app.use('/browse', BrowseRoutes);

export default app;
