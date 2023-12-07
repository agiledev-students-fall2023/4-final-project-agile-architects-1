import app from './app.js';
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Serve static files from the React app
app.use(express.static('../back-end/static'));

app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, '../static/index.html'))  
})

const PORT = process.env.PORT || 3001;

// Start server
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server is running on port ${PORT}`);
});

export default app;