const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../.env') });
const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2');
const app = express();

const port = process.env.PORT || 3000;
const webAddress = `http://localhost:${port}`;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '../frontend')));

app.get('/', (request, response) => {
    response.sendFile(path.join(__dirname, '../frontend/index.html'));
});

const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
});

app.get('/favicon.ico', (request, response) => {
    response.status(process.env.SERVER_STATUS_NO_CONTENT).end();
});

app.listen(port, () => {
    console.log(`Server running at ${webAddress}`);
});