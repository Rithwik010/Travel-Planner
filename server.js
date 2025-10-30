// Import required packages
const express = require('express');
const axios = require('axios');
const { GoogleGenerativeAI } = require('@google/generative-ai');
const dotenv = require('dotenv');
const cors = require('cors');

// Load environment variables from .env file
dotenv.config();

// Initialize Express app
const app = express();

// Apply middleware
app.use(cors());
app.use(express.json());

// Get API keys from environment variables
const LOCATIONIQ_API_KEY = process.env.LOCATIONIQ_API_KEY;
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

// API Endpoint: POST /api/generate-itinerary
app.post('/api/generate-itinerary', async (req, res) => {
  console.log('📥 Received request to generate itinerary');
  
  try {
    // Step A: Get Input and Validate
    const { destination, days, interest, startDate, endDate } = req.body;
    
    console.log(`📍 Destination: ${destination}, Days: ${days}, Interest: ${interest}`);
    console.log(`📅 Travel Dates: ${startDate} to ${endDate}`);
    
    // Validate required fields
    if (!destination || !days || !interest || !startDate || !endDate) {
      return res.status(400).json({ 
        error: 'Missing required fields. Please provide destination, days, interest, startDate, and endDate.' 
      });
    }
    
    // Step B: Call LocationIQ API to search for places
    console.log('🔍 Fetching places from LocationIQ API...');
    console.log(`API Key present: ${LOCATIONIQ_API_KEY ? 'Yes' : 'No'}`);
    
    const searchQuery = `${interest} in ${destination}`;
    
    // LocationIQ Search API endpoint
    const locationiqUrl = 'https://us1.locationiq.com/v1/search.php';
    
    try {
      const locationResponse = await axios.get(locationiqUrl, {
        params: {
          key: LOCATIONIQ_API_KEY,
          q: searchQuery,
          format: 'json',
          limit: 10
        }
      });
      
      console.log(`✅ Found ${locationResponse.data.length} locations from LocationIQ`);
      
      // Extract place names from the response
      const places = locationResponse.data;
      
      if (!places || places.length === 0) {
        console.log('⚠️ No places found, will generate itinerary without specific places');
        // Continue without places - Gemini can still generate a good itinerary
        var placeNames = [];
      } else {
        // Get display names (these include the full address/location info)
        var placeNames = places.map(place => place.display_name.split(',')[0]).slice(0, 10);
        console.log(`✅ Places found:`, placeNames);
      }
      
    } catch (locationError) {
      console.log('⚠️ LocationIQ API error:', locationError.message);
      console.log('Continuing without place suggestions...');
      var placeNames = [];
    }
    
    // Step C: Call Gemini API
    console.log('🤖 Generating itinerary using Gemini AI...');
    
    // Initialize Google Generative AI client
    const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });
    
    // Get budget info
    const { budget } = req.body;
    const budgetInfo = budget ? `Budget: ₹${budget}` : 'Budget: Not specified';
    
    // Format dates for booking URLs
    const formatDateForURL = (dateString) => {
      const date = new Date(dateString);
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      return `${year}-${month}-${day}`;
    };
    
    const departureDate = formatDateForURL(startDate);
    const returnDate = formatDateForURL(endDate);
    
    // Format dates for display
    const formatDateForDisplay = (dateString) => {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
    };
    
    const displayStartDate = formatDateForDisplay(startDate);
    const displayEndDate = formatDateForDisplay(endDate);
    
    // Construct detailed prompt for Gemini with modern formatting and date-specific booking links
    const prompt = `Create a detailed ${days}-day travel itinerary for ${destination} with a focus on ${interest}.
Travel Dates: ${displayStartDate} to ${displayEndDate}
${budgetInfo}

${placeNames.length > 0 ? `Here are some suggested places to consider incorporating into the itinerary:
${placeNames.map((name, index) => `${index + 1}. ${name}`).join('\n')}
` : ''}

IMPORTANT FORMATTING REQUIREMENTS:
Use this EXACT modern, user-friendly format with emojis and clear structure:

══════════════════════════════════════════════
📅 DAY 1: [Catchy Day Title]
══════════════════════════════════════════════

🌅 MORNING (8:00 AM - 12:00 PM)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📍 [Activity/Place Name]
   ⏰ Time: [Time range]
   💡 Tip: [Brief helpful tip]
   ✨ Why: [Why it's worth visiting - 1-2 sentences]

🌞 AFTERNOON (12:00 PM - 6:00 PM)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📍 [Activity/Place Name]
   ⏰ Time: [Time range]
   💡 Tip: [Brief helpful tip]
   ✨ Why: [Why it's worth visiting - 1-2 sentences]

🌆 EVENING (6:00 PM - 10:00 PM)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📍 [Activity/Place Name]
   ⏰ Time: [Time range]
   💡 Tip: [Brief helpful tip]
   ✨ Why: [Why it's worth visiting - 1-2 sentences]

[Repeat this format for all ${days} days]

AT THE END, ADD THIS EXACT SECTION:

══════════════════════════════════════════════
🎫 BOOKING RESOURCES
══════════════════════════════════════════════

✈️ FLIGHTS (${displayStartDate} - ${displayEndDate})
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🔗 Google Flights: https://www.google.com/travel/flights?q=flights%20to%20${encodeURIComponent(destination)}%20on%20${departureDate}
🔗 Skyscanner: https://www.skyscanner.co.in/transport/flights?oym=${departureDate.slice(0,7).replace('-','')}&iym=${returnDate.slice(0,7).replace('-','')}&odt=${departureDate}&idt=${returnDate}
🔗 MakeMyTrip: https://www.makemytrip.com/flight/search?tripType=O&from=DEL&to=${encodeURIComponent(destination)}&depart=${departureDate}&return=${returnDate}

🏨 HOTELS & ACCOMMODATION (${displayStartDate} - ${displayEndDate})
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🔗 Booking.com: https://www.booking.com/searchresults.html?ss=${encodeURIComponent(destination)}&checkin=${departureDate}&checkout=${returnDate}
🔗 Agoda: https://www.agoda.com/search?city=${encodeURIComponent(destination)}&checkIn=${departureDate}&checkOut=${returnDate}
🔗 Airbnb: https://www.airbnb.co.in/s/${encodeURIComponent(destination)}/homes?checkin=${departureDate}&checkout=${returnDate}
🔗 OYO: https://www.oyorooms.com/search?location=${encodeURIComponent(destination)}&checkin=${departureDate}&checkout=${returnDate}

💡 TIPS:
- Book flights 2-3 months in advance for best prices
${budget ? `- Filter hotels by your budget range (₹${Math.round(budget/days)}/night approx)` : '- Compare prices across multiple platforms'}
- Check cancellation policies before booking
- Look for package deals combining flights + hotels
- These links are pre-filled with your travel dates for convenience

GUIDELINES:
- Use relevant emojis throughout (🏛️ for museums, 🍽️ for restaurants, 🏖️ for beaches, 🎭 for culture, 🏔️ for nature, etc.)
- Keep descriptions concise and engaging (2-3 sentences max per activity)
- Include specific times and realistic durations
- Add practical tips (best time to visit, booking advice, what to bring, etc.)
- Focus on ${interest} activities
${budget ? `- Suggest budget-friendly options within ₹${budget} for ${days} days` : '- Include a mix of free and paid activities'}
${placeNames.length > 0 ? '- Include specific place names from the suggestions where appropriate' : '- Include popular attractions and activities in the destination'}
- Use the exact formatting with lines (═══ and ━━━) for visual separation
- Make day titles exciting and descriptive (e.g., "Cultural Deep Dive", "Adventure Awaits", "Coastal Relaxation")

Important: Start IMMEDIATELY with the formatted itinerary. NO introductory text like "Here's your itinerary" or "Certainly". Begin directly with the first ═══ separator and Day 1.`;
    
    // Generate content using Gemini
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const itineraryText = response.text();
    
    console.log('✅ Itinerary generated successfully');
    
    // Step D: Send Response
    res.json({ 
      itinerary: itineraryText 
    });
    
  } catch (error) {
    console.error('❌ Error generating itinerary:', error.message);
    
    // Handle specific error types
    if (error.response) {
      // API responded with error status
      console.error('API Error:', error.response.data);
      return res.status(error.response.status).json({ 
        error: 'Failed to fetch data from external API',
        details: error.response.data 
      });
    } else if (error.request) {
      // Request made but no response received
      console.error('Network Error:', error.request);
      return res.status(503).json({ 
        error: 'Network error. Please check your connection and API keys.' 
      });
    } else {
      // Other errors
      return res.status(500).json({ 
        error: 'Internal server error',
        message: error.message 
      });
    }
  }
});

// Server Activation
const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
  console.log(`📡 API endpoint available at: http://localhost:${PORT}/api/generate-itinerary`);
});
