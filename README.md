# PlexoTravel - AI-Powered Travel Itinerary Planner

## 🌟 Features

- **AI-Powered Itinerary Generation**: Generate personalized travel itineraries using Google Gemini AI
- **Budget Constraints**: Set your budget with validation (positive values only, no more than 20-day trips)
- **Destination Validation**: Real-time validation with autocomplete using OpenStreetMap
- **Interactive Interests Selection**: Choose from 15+ travel interests
- **Travel Companion Options**: Select who you're traveling with
- **Dark Mode**: Beautiful dark mode with custom styling
- **Image Gallery**: Automatic destination image gallery powered by SERP API
- **User Authentication**: Firebase authentication with Google sign-in
- **Search History**: Save and view your past searches
- **PDF Export**: Download your itinerary as PDF
- **Responsive Design**: Works perfectly on all devices

## 🚀 Recent Updates

- ✅ Added 20-day maximum trip duration constraint
- ✅ Rebranded to PlexoTravel with animated logo
- ✅ Enhanced dark mode visibility for all alerts and text
- ✅ Real-time destination validation with autocomplete
- ✅ Budget validation (no negative values, mandatory field)
- ✅ Custom alert modals for better UX
- ✅ Removed redundant "Family" option from interests
- ✅ Improved form validation and error handling

## 📋 Prerequisites

- Node.js (v14 or higher)
- MongoDB account
- Firebase project
- Google Gemini API key
- LocationIQ API key
- SERP API key

## 🛠️ Installation

### Backend Setup

1. Navigate to the backend folder:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the backend folder with:
```env
PORT=3001
MONGODB_URI=your_mongodb_connection_string
GEMINI_API_KEY=your_gemini_api_key
LOCATIONIQ_API_KEY=your_locationiq_api_key
SERP_API_KEY=your_serp_api_key
```

4. Add your Firebase service account JSON file to `backend/firebase-service-account.json`

### Frontend Setup

The frontend is static HTML/CSS/JavaScript and can be served with any web server.

## 🚀 Running Locally

### Option 1: Run Full Stack (Recommended)
```bash
./start.sh
```
This will start both backend (port 3001) and frontend (port 8000)

### Option 2: Run Backend Only
```bash
cd backend
npm start
```

### Option 3: Run Frontend Only
```bash
python3 -m http.server 8000
```
Or open `frontend/index.html` in your browser

## 🌐 Deployment

### Frontend (Vercel)

1. Push your code to GitHub
2. Go to [Vercel](https://vercel.com)
3. Import your GitHub repository
4. Set the root directory to `frontend`
5. Deploy!

The frontend will be deployed and accessible via your Vercel URL.

### Backend (Render)

1. Push your code to GitHub
2. Go to [Render](https://render.com)
3. Create a new Web Service
4. Connect your GitHub repository
5. Set the root directory to `backend`
6. Add environment variables from your `.env` file
7. Deploy!

### Important: Update API URLs

After deploying the backend, update the API URL in `frontend/travel.html`:
```javascript
const API_URL = 'https://your-backend-url.onrender.com/api/generate-itinerary';
```

## 📁 Project Structure

```
Travel-Planner-main-2/
├── backend/
│   ├── server.js              # Express server
│   ├── package.json           # Backend dependencies
│   ├── auth/                  # Authentication middleware
│   ├── models/                # MongoDB models
│   └── routes/                # API routes
├── frontend/
│   ├── index.html             # Landing page
│   ├── login.html             # Login page
│   ├── signup.html            # Signup page
│   ├── travel.html            # Main travel planner (updated with all features)
│   ├── dashboard.html         # User dashboard
│   ├── forgot-password.html   # Password reset
│   └── vercel.json            # Vercel configuration
├── start.sh                   # Start script for local development
├── stop.sh                    # Stop script
└── README.md                  # This file
```

## 🔑 API Keys Required

1. **Google Gemini API**: Get from [Google AI Studio](https://makersuite.google.com/app/apikey)
2. **LocationIQ API**: Get from [LocationIQ](https://locationiq.com/)
3. **SERP API**: Get from [SerpAPI](https://serpapi.com/)
4. **Firebase**: Create project at [Firebase Console](https://console.firebase.google.com/)
5. **MongoDB**: Create cluster at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)

## 👥 Team

- **Nihith Reddy** - [anihithreddy132@gmail.com](mailto:anihithreddy132@gmail.com)
- **Rithwik Reddy** - [rithwikreddy27@gmail.com](mailto:rithwikreddy27@gmail.com)
- **Aryan Sai** - [aryansaienugula@gmail.com](mailto:aryansaienugula@gmail.com)

## 📝 License

This project is for educational purposes.

## 🆘 Troubleshooting

### Backend Issues
- Make sure all API keys are correctly set in `.env`
- Verify MongoDB connection string is correct
- Check that Firebase service account JSON is in the correct location

### Frontend Issues
- Update the API URL to point to your deployed backend
- Clear browser cache if styles don't update
- Check browser console for error messages

### Deployment Issues
- Ensure `vercel.json` is in the frontend folder
- Verify environment variables are set in Render dashboard
- Check that CORS is properly configured in backend

## 🎉 Usage

1. Sign up or log in with your email or Google account
2. Fill in your travel details:
   - Destination (validated in real-time)
   - Travel dates (max 20 days)
   - Budget (positive values only)
   - Travel companions
   - Interests (select multiple)
3. Click "Generate Itinerary"
4. View your AI-generated personalized itinerary
5. Browse destination images in the gallery
6. Download your itinerary as PDF
7. View past searches in your dashboard

Enjoy planning your dream trip with PlexoTravel! ✈️🌍
