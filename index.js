const express = require('express')
require('dotenv').config();
const router = require('./routes')

const app = express();
const port = process.env.PORT || 4000;

app.use(express.json());

app.use('/', router)

app.get("/", (req, res) => {
    res.send("KoinX Backend Internship Assignment");
});

app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
});