const { GoogleGenerativeAI } = require('@google/generative-ai');
require('dotenv').config();

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

async function listModels() {
  try {
    const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
    const models = await genAI.listModels();
    console.log('Available Gemini models:', models);
  } catch (error) {
    console.error('Error listing Gemini models:', error.message);
    if (error.response) {
      console.error('Gemini API response error:', error.response.data);
    }
  }
}

listModels();
