const express = require('express')
require('dotenv').config();
const mongoose = require('mongoose')
const router = require('./routes')
const cron = require('node-cron');
const { fetchAndStoreStats } = require('./controllers');


const app = express();
const port = process.env.PORT || 4000;

app.use(express.json());

cron.schedule('0 */2 * * *', fetchAndStoreStats);
// cron.schedule('*/15 * * * *', fetchAndStoreStats);

app.use('/', router)

let status = '';

mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
        console.log('Connected to MongoDB');
        status = 'connected';
    })
    .catch((error) => {
        console.error('Failed to connect: ', error);
        status = 'unable to connect';
    });

app.get('/api/message', (req, res) => {
    const message = {
        message: 'Hello, we reached a server and db',
        timestamp: new Date().toISOString(),
        status,
    };
    res.json(message);
});
    

app.get("/", (req, res) => {
    res.send("KoinX Backend Internship Assignment");
});

app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
});