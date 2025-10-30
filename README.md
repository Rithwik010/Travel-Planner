# 🌍 AI-Powered Travel Planner

An intelligent travel planning application that generates personalized itineraries using Google's Gemini AI, complete with user authentication, trip management, and interactive features.

![Travel Planner](https://img.shields.io/badge/Status-Live-success)
![Node.js](https://img.shields.io/badge/Node.js-v18+-green)
![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-brightgreen)
![Firebase](https://img.shields.io/badge/Firebase-Auth-orange)

## 🚀 Live Demo

- **Frontend**: [https://travel-planner-ruby-rho.vercel.app](https://travel-planner-ruby-rho.vercel.app)
- **Backend API**: [https://travel-planner-backend-ao9v.onrender.com](https://travel-planner-backend-ao9v.onrender.com)

## ✨ Features

### 🎯 Core Features
- **AI-Powered Itinerary Generation** - Creates detailed day-by-day travel plans using Google Gemini AI
- **Smart Destination Suggestions** - Autocomplete with real location data from LocationIQ API
- **Budget Planning** - Generate itineraries within your specified budget (in ₹ Rupees)
- **Interest-Based Planning** - Customize trips based on interests (Adventure, Culture, Food, Nature, etc.)
- **Date Range Selection** - Plan trips from 1 day to multi-week adventures

### 🔐 Authentication & User Management
- **Firebase Authentication** - Secure login with Email/Password and Google Sign-In
- **User Profiles** - Track your travel statistics and history
- **Session Management** - Persistent login across sessions

### 💾 Trip Management
- **Save Trips** - Bookmark your favorite itineraries
- **Search History** - Access your past searches
- **Trip Dashboard** - View all saved trips and statistics
- **Trip Rating** - Rate your completed trips (1-5 stars)
- **Delete Trips** - Remove unwanted itineraries

### 🖼️ Visual Features
- **Photo Gallery** - Browse destination photos using SERP API
- **Modal View** - Detailed trip information in beautiful pop-ups
- **Responsive Design** - Works seamlessly on desktop and mobile
- **Modern UI** - Clean, gradient-based design with smooth animations

### 📄 Export & Sharing
- **PDF Download** - Save itineraries as PDF files
- **Booking Links** - Direct links to MakeMyTrip and Booking.com with dates pre-filled
- **Formatted Output** - Beautifully structured itineraries with emojis and sections

## 🛠️ Technology Stack

### Frontend
- **HTML5, CSS3, JavaScript** - Core web technologies
- **Bootstrap 5.3.3** - Responsive UI framework
- **Firebase SDK v10.7.1** - Client-side authentication
- **Vercel** - Frontend hosting platform

### Backend
- **Node.js v18+** - JavaScript runtime
- **Express.js v4.21.2** - Web application framework
- **MongoDB Atlas** - Cloud database (Mongoose v8.19.2)
- **Firebase Admin SDK v13.5.0** - Server-side authentication
- **Render** - Backend hosting platform

### APIs & Services
- **Google Gemini AI v0.24.1** - AI itinerary generation (gemini-2.5-flash model)
- **LocationIQ API** - Autocomplete and geocoding
- **SERP API** - Google Images search for destinations
- **Firebase Authentication** - User management

### Security & Tools
- **CORS v2.8.5** - Cross-origin resource sharing
- **dotenv v16.6.1** - Environment variable management
- **Axios v1.12.2** - HTTP client
- **Git & GitHub** - Version control

## 📦 Project Structure

```
Travel-Planner/
├── frontend/                    # Frontend application
│   ├── index.html              # Landing page (redirects to login)
│   ├── login.html              # User login page
│   ├── signup.html             # User registration page
│   ├── travel.html             # Main travel planner interface
│   ├── dashboard.html          # User dashboard with saved trips
│   ├── forgot-password.html    # Password reset page
│   └── vercel.json             # Vercel deployment config
│
├── backend/                     # Backend API server
│   ├── server.js               # Main Express server
│   ├── package.json            # Backend dependencies
│   ├── auth/
│   │   ├── firebase-config.js  # Firebase initialization
│   │   └── auth-middleware.js  # JWT authentication middleware
│   ├── models/
│   │   ├── User.js             # User database schema
│   │   └── SearchHistory.js    # Search history schema
│   └── routes/
│       ├── auth.js             # Authentication routes
│       ├── user.js             # User management routes
│       └── gallery.js          # Image gallery routes
│
├── .env                         # Environment variables (DO NOT COMMIT)
├── render.yaml                  # Render deployment config
├── package.json                 # Root package file
├── DEPLOYMENT_GUIDE.md          # Comprehensive deployment instructions
├── DEPLOYMENT_CHECKLIST.md      # Quick deployment checklist
└── README.md                    # This file
```

## 🔧 Installation & Setup

### Prerequisites
- Node.js v18 or higher
- MongoDB Atlas account
- Firebase project
- API keys for Gemini, LocationIQ, and SERP

### Local Development Setup

1. **Clone the repository**
```bash
git clone https://github.com/Rithwik010/Travel-Planner.git
cd Travel-Planner
```

2. **Install dependencies**
```bash
# Install backend dependencies
cd backend
npm install

# Return to root
cd ..
npm install
```

3. **Configure environment variables**

Create a `.env` file in the root directory:
```env
# MongoDB
MONGODB_URI=your_mongodb_connection_string

# Google Gemini AI
GEMINI_API_KEY=your_gemini_api_key

# LocationIQ
LOCATIONIQ_API_KEY=your_locationiq_api_key

# SERP API
SERP_API_KEY=your_serp_api_key

# Firebase Admin SDK
FIREBASE_PRIVATE_KEY="your_firebase_private_key"
FIREBASE_CLIENT_EMAIL=your_firebase_client_email

# Firebase Client Config
FIREBASE_API_KEY=your_firebase_api_key
FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
FIREBASE_PROJECT_ID=your_project_id
FIREBASE_STORAGE_BUCKET=your_project_id.firebasestorage.app
FIREBASE_MESSAGING_SENDER_ID=your_sender_id
FIREBASE_APP_ID=your_app_id
FIREBASE_MEASUREMENT_ID=your_measurement_id
```

4. **Start the development servers**

Backend:
```bash
cd backend
npm start
# Server runs on http://localhost:3001
```

Frontend:
```bash
# Open frontend/travel.html in your browser
# Or use a simple HTTP server:
python -m http.server 8000
# Then visit http://localhost:8000/frontend/
```

## 🚀 Deployment

### Backend Deployment (Render)

1. Create a new Web Service on [Render](https://render.com)
2. Connect your GitHub repository
3. Configure:
   - **Root Directory**: `backend`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
4. Add all environment variables from `.env`
5. Deploy!

### Frontend Deployment (Vercel)

1. Create a new project on [Vercel](https://vercel.com)
2. Import your GitHub repository
3. Configure:
   - **Root Directory**: `frontend`
   - **Build Command**: (leave empty)
   - **Output Directory**: `.`
4. Deploy!
5. Add your Vercel domain to Firebase authorized domains

For detailed deployment instructions, see [DEPLOYMENT_GUIDE.md](DEPLOYMENT_GUIDE.md)

## 📡 API Endpoints

### Authentication
- `POST /api/auth/sync-user` - Sync Firebase user with MongoDB
- `GET /api/auth/me` - Get current user profile with stats

### Itinerary Generation
- `POST /api/generate-itinerary` - Generate AI-powered travel itinerary
  - Body: `{ destination, startDate, endDate, interest, budget, userId }`

### User Management
- `GET /api/user/search-history` - Get user's search history
- `GET /api/user/saved-trips` - Get user's saved trips
- `GET /api/user/trip/:tripId` - Get specific trip details
- `PUT /api/user/save-trip/:tripId` - Save a trip to favorites
- `PUT /api/user/unsave-trip/:tripId` - Remove trip from favorites
- `POST /api/user/rate/:tripId` - Rate a trip (1-5 stars)
- `DELETE /api/user/trip/:tripId` - Delete a trip

### Gallery
- `GET /api/gallery/search-images?query=destination` - Get destination photos

## 🎨 Key Features Explained

### AI Itinerary Generation
The app uses Google's Gemini 2.5 Flash model to generate detailed, day-by-day itineraries that include:
- Morning, afternoon, and evening activities
- Specific place names and attractions
- Travel tips and local insights
- Budget considerations
- Time allocations for each activity
- Emoji-rich formatting for better readability

### Smart Autocomplete
LocationIQ API provides real-time destination suggestions as you type, ensuring accurate location data.

### Budget Planning
Specify your budget in Rupees (₹) and get suggestions optimized for your spending capacity, including:
- Budget-friendly accommodation options
- Free and paid activities mix
- Local food recommendations
- Transportation estimates

### User Dashboard
Track your travel planning journey with:
- Total trips generated
- Saved favorites count
- Recent search history
- Quick access to past itineraries
- Trip statistics and insights

## 🔒 Security Features

- **Firebase Authentication** - Industry-standard auth system
- **JWT Tokens** - Secure API authentication
- **CORS Protection** - Controlled cross-origin requests
- **Environment Variables** - Sensitive data kept secure
- **Input Validation** - Protected against injection attacks
- **HTTPS Only** - Encrypted data transmission

## 🌟 Usage Guide

1. **Sign Up / Login**
   - Create account with email/password or Google Sign-In
   
2. **Plan Your Trip**
   - Enter destination (with autocomplete)
   - Select travel dates
   - Choose your interest category
   - Set your budget (optional)
   - Click "Generate Itinerary"

3. **Review Itinerary**
   - Browse day-by-day plans
   - View destination photos
   - Check booking links
   - Download as PDF

4. **Manage Trips**
   - Save favorite itineraries
   - Access from dashboard
   - Rate completed trips
   - Delete unwanted plans

## 📊 Database Schema

### User Model
```javascript
{
  firebaseUid: String,
  email: String,
  displayName: String,
  photoURL: String,
  createdAt: Date,
  lastLogin: Date,
  searchHistory: [{
    destination: String,
    startDate: Date,
    endDate: Date,
    interest: String,
    budget: Number,
    createdAt: Date
  }],
  savedTrips: [ObjectId],
  tripRatings: Map
}
```

### Search History Model
```javascript
{
  userId: ObjectId,
  destination: String,
  startDate: Date,
  endDate: Date,
  interest: String,
  budget: Number,
  days: Number,
  itinerary: String,
  placeNames: [String],
  isSaved: Boolean,
  rating: Number,
  createdAt: Date
}
```

## 🐛 Troubleshooting

### Common Issues

**"Google sign-in failed"**
- Add your domain to Firebase authorized domains in Firebase Console

**"Failed to generate itinerary"**
- Check Gemini API key is valid
- Verify backend is running
- Check API rate limits

**Images not loading**
- Verify SERP API key
- Check CORS settings

**Backend not responding**
- Render free tier may sleep after inactivity (takes 30-60s to wake up)
- Check environment variables are set correctly

## 📈 Future Enhancements

- [ ] Multi-language support
- [ ] Weather integration
- [ ] Flight and hotel booking integration
- [ ] Social sharing features
- [ ] Collaborative trip planning
- [ ] Mobile app (React Native)
- [ ] Offline mode
- [ ] Trip expense tracking
- [ ] Travel community forum

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 👨‍💻 Developer

**Rithwik**
- GitHub: [@Rithwik010](https://github.com/Rithwik010)
- Repository: [Travel-Planner](https://github.com/Rithwik010/Travel-Planner)

## 🙏 Acknowledgments

- Google Gemini AI for powerful itinerary generation
- Firebase for seamless authentication
- MongoDB Atlas for reliable database hosting
- LocationIQ for accurate location data
- SERP API for destination imagery
- Vercel and Render for free hosting tiers

## 📞 Support

For issues, questions, or suggestions:
- Open an issue on GitHub
- Check the [DEPLOYMENT_GUIDE.md](DEPLOYMENT_GUIDE.md) for setup help
- Review the [DEPLOYMENT_CHECKLIST.md](DEPLOYMENT_CHECKLIST.md) for quick reference

---

**Made with ❤️ for travelers around the world** ✈️🌏

*Start planning your next adventure today!*
