// Gallery routes for SERP API
const express = require('express');
const axios = require('axios');
const dotenv = require('dotenv');
const path = require('path');
const router = express.Router();

// Load environment variables from .env file in the parent directory
const envPath = path.join(__dirname, '..', '..', '.env');
dotenv.config({ path: envPath });

router.get('/search-images', async (req, res) => {
    try {
        const { query } = req.query;
        const SERP_API_KEY = process.env.SERP_API_KEY;
        
        if (!query) {
            return res.status(400).json({ error: 'Query parameter is required' });
        }

        console.log(`🔍 Searching for images: ${query}`);
        console.log(`SERP API Key present: ${SERP_API_KEY ? 'Yes' : 'No'}`);
        console.log(`SERP API Key length: ${SERP_API_KEY ? SERP_API_KEY.length : 'N/A'}`);
        console.log(`SERP API Key (first 10 chars): ${SERP_API_KEY ? SERP_API_KEY.substring(0, 10) : 'N/A'}`);

        // Determine how many images to request/return (default 12, max 15)
        const requestedLimitRaw = parseInt(req.query.limit, 10);
        const DEFAULT_LIMIT = 12;
        const MAX_LIMIT = 15;
        let limit = Number.isInteger(requestedLimitRaw) && requestedLimitRaw > 0 ? requestedLimitRaw : DEFAULT_LIMIT;
        if (limit > MAX_LIMIT) limit = MAX_LIMIT;

        // Call SERP API for Google Images (ask for 'limit' results)
        const response = await axios.get('https://serpapi.com/search', {
            params: {
                api_key: SERP_API_KEY,
                engine: 'google_images',
                q: query + ' travel destination',
                google_domain: 'google.com',
                tbm: 'isch',
                ijn: '0',
                num: String(limit),
                safe: 'active'
            }
        });

        console.log(`✅ Got ${response.data.images_results ? response.data.images_results.length : 0} images from SERP API`);

        // Check if we got valid results
        if (!response.data.images_results || response.data.images_results.length === 0) {
            console.warn('⚠️ No images found in SERP API response');
            return res.json([]);
        }

        // Extract and format the image results
        const images = response.data.images_results.map(item => ({
            url: item.original || item.thumbnail,
            thumbnail: item.thumbnail,
            title: item.title || 'Travel Destination',
            sourceUrl: item.source || 'Web',
            position: item.position,
            width: item.original_width,
            height: item.original_height
        }));

    // Ensure we return at most the requested limit (slice in case API returned more)
    const limitedImages = images.slice(0, limit);
    console.log(`✅ Successfully formatted ${images.length} images, returning ${limitedImages.length}`);
    res.json(limitedImages);
    } catch (error) {
        console.error('❌ Error fetching images from SERP API:', error.message);
        
        // Check if error response has details
        if (error.response) {
            console.error('Status:', error.response.status);
            console.error('Status Text:', error.response.statusText);
            console.error('Error Data:', error.response.data);
        }
        
        console.error('Full error:', error);
        
        // Return empty array to avoid breaking the frontend
        res.status(500).json({ error: 'Failed to fetch images', details: error.message });
    }
});

module.exports = router;