//dependencies
const express = require('express');
const cors = require('cors');
const connection = require('./database/connection');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

connection();
app.use(cors());
app.use(express.json());


//routes
app.use('/', require('./routes/url.routes'));

app.listen(port, () => {
    console.log(`El servidor está escuchando en el puerto ${port}`);
});
