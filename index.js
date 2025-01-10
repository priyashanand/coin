const express = require('express')
require('dotenv').config();


const app = express();
const port = process.env.PORT || 4000;

app.get("/", (req, res) => {
    res.send("KoinX Backend Internship Assignment");
});

app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
});