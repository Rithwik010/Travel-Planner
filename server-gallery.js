const express = require('express');
const axios = require('axios');
const router = express.Router();

// Get API key from environment variables
const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY;
const GOOGLE_CX = process.env.GOOGLE_CX;

router.get('/search-images', async (req, res) => {
    try {
        const { query } = req.query;
        
        if (!query) {
            return res.status(400).json({ error: 'Query parameter is required' });
        }

        const response = await axios.get('https://www.googleapis.com/customsearch/v1', {
            params: {
                key: GOOGLE_API_KEY,
                cx: GOOGLE_CX,
                q: query + ' travel destination',
                searchType: 'image',
                num: 9 // Number of images to return
            }
        });

        const images = response.data.items.map(item => ({
            url: item.link,
            thumbnail: item.image.thumbnailLink,
            title: item.title,
            context: item.image.contextLink
        }));

        res.json(images);
    } catch (error) {
        console.error('Error fetching images:', error);
        res.status(500).json({ error: 'Failed to fetch images' });
    }
});

module.exports = router;