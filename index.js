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
    

// app.get("/", (req, res) => {
//     res.send("KoinX Backend Internship Assignment");
// });

app.get("/", (req, res) => {
    res.send(`<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Cryptocurrency Price and Deviation API</title>
    </head>
    <body>
        <h1>Cryptocurrency Price and Deviation API</h1>
            <p>This project uses the CoinGecko API to fetch and store cryptocurrency price data in a MongoDB database. It provides routes to get the latest price of a specified cryptocurrency and calculate the standard deviation of the last 100 price entries.</p>

        <h2>Setup</h2>
        <ol>
            <li>Clone the repository.</li>
            <li>Install dependencies:
                <pre><code>npm install</code></pre>
            </li>
            <li>Set up a MongoDB instance and update the database connection configuration.</li>
            <li>Run the application:
                <pre><code>node server.js</code></pre>
            </li>
        </ol>

        <h2>Endpoints</h2>

        <h3>1. Get Cryptocurrency Price</h3>
        <p><strong>POST</strong> <code>/stats</code></p>

        <p><strong>Description:</strong> Fetch the current price, market cap, and 24-hour change of a cryptocurrency.</p>

        <p><strong>Request Body:</strong></p>
        <pre><code>{
    "ids": "bitcoin"
    }</code></pre>

        <p><em>ids</em> can be any supported cryptocurrency, such as <em>bitcoin</em>, <em>ethereum</em>, or <em>matic-network</em>.</p>

        <p><strong>Response:</strong></p>
        <pre><code>{
    "price": 94203,
    "marketCap": 1866033172615.4473,
    "24hChange": 0.35687315684650456
    }</code></pre>

        <h3>2. Get Standard Deviation of Prices</h3>
        <p><strong>POST</strong> <code>/deviation</code></p>

        <p><strong>Description:</strong> Calculate the standard deviation of the last 100 prices for a specified cryptocurrency.</p>

        <p><strong>Request Body:</strong></p>
        <pre><code>{
    "ids": "bitcoin"
    }</code></pre>

        <p><strong>Response:</strong></p>
        <pre><code>{
    "standardDeviation": 331.5847888884866
    }</code></pre>

        <p><em>ids</em> can be any supported cryptocurrency name.</p>

        <h2>Scheduled Tasks</h2>
        <p>A cron job fetches and stores prices every 15 minutes for <em>bitcoin</em>, <em>ethereum</em>, and <em>matic-network</em>.</p>

        <h2>Deployment</h2>
        <p>The backend is deployed on an AWS EC2 instance:</p>
        <ul>
            <li><strong>Public IP:</strong> 13.235.78.202</li>
            <li><strong>Port:</strong> 3000</li>
        </ul>
    </body>
    </html>`);
});



app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
});