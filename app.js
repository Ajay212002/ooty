// Import necessary modules
require('dotenv').config();
const express = require('express');
const packageRoutes = require('./routes/packageRoutes');
const db = require('./config/db');  // New file for database configuration
const app = express();

// Middleware
app.use(express.json());

// Define Routes
app.use('/api', packageRoutes);
app.get('/hello', (req, res) => res.send('Hello, World!'));

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);  // Detailed error logging
    res.status(err.status || 500).json({
        error: process.env.NODE_ENV === 'production' ? 'Internal server error' : err.message,
    });
});

// Start the server
const PORT = process.env.APP_PORT || process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
