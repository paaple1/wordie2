require('dotenv').config();
const express = require('express');
const path = require('path');
const axios = require('axios');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, 'public')));

app.get('/search', async (req, res) => {
    const { word } = req.query;
    try {
        const response = await axios.get('https://lexicala1.p.rapidapi.com/search-entries', {
            params: { text: word },
            headers: {
                'X-RapidAPI-Key': process.env.LEXICALA_API_KEY,
                'X-RapidAPI-Host': 'lexicala1.p.rapidapi.com'
            }
        });
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching data from Lexicala API' });
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
