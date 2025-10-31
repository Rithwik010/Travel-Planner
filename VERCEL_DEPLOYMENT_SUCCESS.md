# 🚀 Vercel Deployment Guide for PlexoTravel

## ✅ What's Been Updated

Your GitHub repository now contains all the latest updates:

### ✨ New Features Pushed:
- **PlexoTravel Rebranding**: Custom animated logo with gradient effects
- **20-Day Trip Limit**: Maximum itinerary duration constraint
- **Budget Validation**: Mandatory positive-only budget input
- **Destination Autocomplete**: Real-time validation with OpenStreetMap
- **Dark Mode Improvements**: Enhanced visibility for all UI elements
- **Custom Alert System**: Dark-mode compatible popup alerts
- **Comprehensive Documentation**: Deployment guides and setup instructions

## 🌐 Deploy to Vercel

### Step 1: Connect Repository
1. Go to [vercel.com](https://vercel.com)
2. Sign in with your GitHub account
3. Click **"New Project"**
4. Import `Rithwik010/Travel-Planner` repository

### Step 2: Configure Project Settings
- **Framework Preset**: Other (since it's a vanilla HTML/JS project)
- **Root Directory**: `frontend`
- **Build Command**: Leave empty or `echo "No build required"`
- **Output Directory**: `./` (current directory)
- **Install Command**: `echo "No install required"`

### Step 3: Environment Variables
Add these environment variables in Vercel dashboard:

```bash
# API Keys (Required)
FIREBASE_API_KEY=AIzaSyBBWMn8wuLwHfRdKRbRZZTH7EeOmZiIiR4
FIREBASE_AUTH_DOMAIN=travel-planner-5f52c.firebaseapp.com
FIREBASE_PROJECT_ID=travel-planner-5f52c
FIREBASE_STORAGE_BUCKET=travel-planner-5f52c.firebasestorage.app
FIREBASE_MESSAGING_SENDER_ID=242478277763
FIREBASE_APP_ID=1:242478277763:web:4508544b42aa0fe7bce7b6

GEMINI_API_KEY=AIzaSyBRcZjAd63lm2nQ7OYbnsm5VwVTU8cAn44
LOCATIONIQ_API_KEY=pk.9142f1b59ac476386607c16a5eef5d20
SERP_API_KEY=01209a8292952ff77ca46216c6b59e80a0d5bddeffde547ea78bb9da19eff32c

# Database
MONGODB_URI=mongodb+srv://narnarithwik:rithwik27reddy@travel.ilanakm.mongodb.net/TravelPlanner?retryWrites=true&w=majority&appName=Travel

# Session
SESSION_SECRET=8b32d2d9856e34b04991f86ad9059789962ca37cfa2ea5dd541e9d703121e8e5

# Server Config
PORT=3001
NODE_ENV=production
```

### Step 4: Deploy Backend (Optional - if you want backend on Vercel too)

For the backend, create a separate Vercel project:
1. Import the same repository
2. Set **Root Directory**: `backend`
3. **Framework Preset**: Node.js
4. Add same environment variables
5. Ensure `vercel.json` is properly configured

### Step 5: Update API URLs

After deployment, update the API URL in your frontend:
1. Get your Vercel deployment URL (e.g., `https://your-app.vercel.app`)
2. Update the API endpoint in `frontend/travel.html`
3. Change from `https://travel-planner-backend-ao9v.onrender.com` to your backend URL

## 🔧 Troubleshooting

### Common Issues:

1. **404 Errors**: Ensure `frontend/vercel.json` exists with proper rewrites
2. **API Errors**: Check environment variables are set correctly
3. **Firebase Auth Issues**: Verify Firebase config matches your project
4. **CORS Errors**: Update backend CORS settings for your new domain

### Vercel Configuration Files:

Your repository already includes:
- `frontend/vercel.json` - Frontend routing configuration
- `backend/vercel.json` - Backend API configuration (if deploying backend to Vercel)

## 📱 Frontend-Only Deployment

Since your frontend can work independently with external APIs:
1. Deploy only the `frontend` folder to Vercel
2. Your backend can stay on Render or any other platform
3. Update the API URL in the frontend code to point to your backend

## 🎯 Current Architecture

- **Frontend**: Static files (HTML, CSS, JS) → Deploy to Vercel
- **Backend**: Node.js API server → Keep on Render or deploy separately
- **Database**: MongoDB Atlas (cloud)
- **APIs**: External services (Gemini, SERP, etc.)

## ✅ Verification Checklist

After deployment, test these features:
- [ ] PlexoTravel logo displays with animations
- [ ] 20-day trip limit validation works
- [ ] Budget validation prevents negative/zero values
- [ ] Destination autocomplete functions
- [ ] Dark mode toggle works properly
- [ ] Custom alerts display correctly
- [ ] Firebase authentication works
- [ ] Itinerary generation functions
- [ ] PDF download works
- [ ] Image gallery loads

## 🔗 Quick Deploy Links

**One-Click Deploy (Frontend Only):**
[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/Rithwik010/Travel-Planner&project-name=plexotravel&repository-name=Travel-Planner&root-directory=frontend)

**Your Repository**: https://github.com/Rithwik010/Travel-Planner

Your repository is now fully updated and ready for deployment! 🚀
