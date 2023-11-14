import app from './app.js';

const PORT = process.env.PORT || 3001;

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
