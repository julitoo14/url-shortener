// Dependencies
const express = require('express');
const cors = require('cors');
const connection = require('./database/connection');
require('dotenv').config();
const path = require('path');
const app = express();
const port = process.env.PORT || 3000;

// Connect to the database
connection();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'dist')));
app.set('trust proxy', true); // Habilitar soporte para proxies en Express

// Frontend routes
const frontendRoutes = ['/stats', '/create'];
frontendRoutes.forEach((route) => {
    app.get(route, (req, res) => {
        res.sendFile(path.join(__dirname, 'dist', 'index.html'));
    });
});

// Backend routes (aliases, API, etc.)
app.use('/', require('./routes/url.routes'));

// Catch-all route for the frontend
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

// Start the server
app.listen(port, () => {
    console.log(`El servidor está escuchando en el puerto ${port}`);
});
