require('dotenv').config();
const express = require('express');
const app = express();
const routes = require('./routes');
const { initializeDatabase } = require('./db');

// Middleware
app.use(express.json());
app.use(routes);

// Root route
app.get('/', (req, res) => {
    res.send('Server is running');
});

// Global error handler
app.use((err, req, res, next) => {
    console.error('Unhandled error:', err);
    res.status(500).json({ error: 'Internal server error' });
});

// Initialize DB and start server
initializeDatabase();
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});