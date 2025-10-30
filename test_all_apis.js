// Test script for all three APIs
const axios = require('axios');
const { GoogleGenerativeAI } = require('@google/generative-ai');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

const LOCATIONIQ_API_KEY = process.env.LOCATIONIQ_API_KEY;
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const SERP_API_KEY = process.env.SERP_API_KEY;

console.log('🔍 Testing all APIs...\n');
console.log('API Keys loaded:');
console.log(`- LocationIQ: ${LOCATIONIQ_API_KEY ? '✅ Present' : '❌ Missing'}`);
console.log(`- Gemini: ${GEMINI_API_KEY ? '✅ Present' : '❌ Missing'}`);
console.log(`- SERP API: ${SERP_API_KEY ? '✅ Present' : '❌ Missing'}`);
console.log('\n' + '='.repeat(50) + '\n');

// Test 1: LocationIQ API
async function testLocationIQ() {
    console.log('📍 Test 1: LocationIQ API');
    console.log('Testing place search for "Museum in Paris"...');
    
    try {
        const response = await axios.get('https://us1.locationiq.com/v1/search', {
            params: {
                key: LOCATIONIQ_API_KEY,
                q: 'Museum in Paris',
                format: 'json',
                limit: 5
            }
        });
        
        console.log(`✅ LocationIQ API Success!`);
        console.log(`   Found ${response.data.length} locations`);
        console.log(`   Sample result: ${response.data[0]?.display_name || 'N/A'}`);
        return true;
    } catch (error) {
        console.error(`❌ LocationIQ API Failed: ${error.message}`);
        if (error.response) {
            console.error(`   Status: ${error.response.status}`);
            console.error(`   Error: ${JSON.stringify(error.response.data)}`);
        }
        return false;
    }
}

// Test 2: Gemini AI API
async function testGemini() {
    console.log('\n🤖 Test 2: Gemini AI API');
    console.log('Testing content generation...');
    
    try {
        const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
        const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });
        
        const prompt = 'Write a one-sentence summary of Paris as a travel destination.';
        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();
        
        console.log(`✅ Gemini AI API Success!`);
        console.log(`   Response: ${text.substring(0, 100)}...`);
        return true;
    } catch (error) {
        console.error(`❌ Gemini AI API Failed: ${error.message}`);
        return false;
    }
}

// Test 3: SERP API (Google Images)
async function testSerpAPI() {
    console.log('\n🖼️  Test 3: SERP API (Google Images)');
    console.log('Testing image search for "Paris"...');
    
    try {
        const response = await axios.get('https://serpapi.com/search', {
            params: {
                api_key: SERP_API_KEY,
                engine: 'google_images',
                q: 'Paris travel destination',
                num: 5
            }
        });
        
        console.log(`✅ SERP API Success!`);
        console.log(`   Found ${response.data.images_results?.length || 0} images`);
        if (response.data.images_results && response.data.images_results.length > 0) {
            console.log(`   Sample image title: ${response.data.images_results[0].title}`);
        }
        return true;
    } catch (error) {
        console.error(`❌ SERP API Failed: ${error.message}`);
        if (error.response) {
            console.error(`   Status: ${error.response.status}`);
            console.error(`   Error: ${JSON.stringify(error.response.data)}`);
        }
        return false;
    }
}

// Run all tests
async function runAllTests() {
    const results = {
        locationIQ: false,
        gemini: false,
        serpAPI: false
    };
    
    results.locationIQ = await testLocationIQ();
    results.gemini = await testGemini();
    results.serpAPI = await testSerpAPI();
    
    console.log('\n' + '='.repeat(50));
    console.log('\n📊 Test Summary:');
    console.log(`   LocationIQ API: ${results.locationIQ ? '✅ PASS' : '❌ FAIL'}`);
    console.log(`   Gemini AI API: ${results.gemini ? '✅ PASS' : '❌ FAIL'}`);
    console.log(`   SERP API: ${results.serpAPI ? '✅ PASS' : '❌ FAIL'}`);
    
    const passCount = Object.values(results).filter(r => r).length;
    console.log(`\n   Total: ${passCount}/3 APIs working`);
    
    if (passCount === 3) {
        console.log('\n🎉 All APIs are working correctly! You can now run the application.');
    } else {
        console.log('\n⚠️  Some APIs are not working. Check the errors above.');
    }
}

// Execute tests
runAllTests().catch(console.error);
