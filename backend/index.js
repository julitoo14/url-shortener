//dependencies
const express = require('express');
const cors = require('cors');
const connection = require('./database/connection');
require('dotenv').config();
const path = require('path');
const app = express();
const port = process.env.PORT || 3000;

connection();
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'dist')));


//routes
app.use('/', require('./routes/url.routes'));

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist', 'index.html'));
  });

app.listen(port, () => {
    console.log(`El servidor está escuchando en el puerto ${port}`);
});
