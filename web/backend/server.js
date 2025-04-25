const path = require('path');
const env = require('dotenv');
const express = require('express');
const cors = require('cors');
const { MongoClient } = require('mongodb');
const app = express();

env.config({ path: path.join(__dirname, '../.env') });

const port = 3000;
const webAddress = `http://localhost:${port}`;
const url = 'mongodb://localhost:27017';
const dbName = 'mydb';
const collection = 'my collection';

app.use(cors({ origin: 'http://localhost:3000' }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '../frontend')));

let db;

(async () => {
    try {
        const client = await MongoClient.connect(url);
        console.log('Connected to MongoDB');
        db = client.db(dbName);
    }
    catch (error) {
        console.error('Failed to connect to MongoDB', error.message);
        process.exit(1);
    }
})();

app.post('/add-data', async (request, response) => {
    try {
        console.log('Request body: ', request.body);
        const database = await db;
        console.log('Connected to database');

        const collection = database.collection(collection);
        console.log('Connected to collection');

        const result = await collection.insertOne(request.body);
        return response.status(201).json({ message: 'Data added successfully', id: result.insertedId });
    }
    catch (error) {
        console.error('Error adding data: ', error);
        return response.status(500).send('Iternal Server Error');
    }
});

// Example route to fetch data from a collection
app.get('/get-data', async (request, response) => {
    try {
        const database = await db;
        const collection = database.collection(collection);
        const data = await collection.find({}).toArray();
        console.log('Fetching data: ', data);
        return response.json(data);
    }
    catch (error) {
        console.error('Error fetching data: ', error);
        return response.status(500).send('Iternal Server Error');
    }
});

app.get('/', (request, response) => {
    return response.sendFile(path.join(__dirname, '../frontend/index.html'));
});

app.get('/favicon.ico', (request, response) => {
    return response.status(204).end();
});

app.listen(port, () => {
    console.log(`Server running at ${webAddress}`);
});