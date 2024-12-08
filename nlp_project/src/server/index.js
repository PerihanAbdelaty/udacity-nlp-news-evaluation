var path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
dotenv.config();

const app = express();
const cors = require('cors');

app.use(cors());
app.use(bodyParser.json());
app.use(express.static('dist'))

// console.log(__dirname);


// Variables for url and api key


app.get('/', function (req, res) {
    res.sendFile('dist/index.html')
    })


// POST Route
app.post('/api', async (req, res) => {
    const { url } = req.body;

    if (!url) {
        return res.status(400).json({ error: 'URL is required' });
    }

    const apiURL = `https://api.meaningcloud.com/sentiment-2.1?key=${process.env.API_KEY}&url=${encodeURIComponent(url)}&lang=en`;

    try {
        const response = await fetch(apiURL, {
            method: 'POST',
        });

        if (!response.ok) {
            throw new Error('Failed to fetch from MeaningCloud API');
        }

        const data = await response.json();
        res.status(200).json(data);
    } catch (error) {
        console.error('Error fetching MeaningCloud API:', error);
        res.status(500).json({ error: 'Failed to analyze the URL' });
    }
});


module.exports = app;  // for testing purposes


// Designates what port the app will listen to for incoming requests
app.listen(8000, function () {
    console.log('Example app listening on port 8000!');
});