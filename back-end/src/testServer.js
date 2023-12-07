import app from './app.js';

const PORT = 8000;

// Start server
const listener = app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

export default listener;