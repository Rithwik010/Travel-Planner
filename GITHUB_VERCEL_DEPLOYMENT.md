# 🚀 GitHub & Vercel Deployment Guide

## Step 1: Push to GitHub

### 1.1 Create a New Repository on GitHub
1. Go to [GitHub](https://github.com) and log in
2. Click the "+" icon in the top right corner
3. Select "New repository"
4. Name it: `Travel-Planner` or `PlexoTravel`
5. Choose "Public" or "Private"
6. **DO NOT** initialize with README (we already have one)
7. Click "Create repository"

### 1.2 Connect Local Repository to GitHub
Run these commands in your terminal:

```bash
cd /Users/nihithreddy/Downloads/Travel-Planner-main-2

# Add your GitHub repository as remote (replace with your repo URL)
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git

# Push to GitHub
git branch -M main
git push -u origin main
```

**Example:**
```bash
git remote add origin https://github.com/nihithreddy/PlexoTravel.git
git branch -M main
git push -u origin main
```

## Step 2: Deploy Frontend to Vercel

### 2.1 Sign Up / Log In to Vercel
1. Go to [Vercel](https://vercel.com)
2. Sign up or log in (preferably with GitHub for easier integration)

### 2.2 Import Your Project
1. Click "Add New" → "Project"
2. Select "Import Git Repository"
3. Find and select your GitHub repository
4. Click "Import"

### 2.3 Configure Project Settings
**IMPORTANT:** Configure these settings before deploying:

1. **Framework Preset:** Select "Other" (since it's vanilla HTML/CSS/JS)

2. **Root Directory:** Click "Edit" and set to `frontend`

3. **Build & Output Settings:**
   - Leave build command empty (no build needed for static site)
   - Output directory: leave as default or set to `.`

4. **Environment Variables:** (None needed for frontend, but if you add any later, add them here)

5. Click "Deploy"

### 2.4 Wait for Deployment
- Vercel will deploy your site (usually takes 30-60 seconds)
- You'll get a URL like: `https://your-project.vercel.app`

### 2.5 Test Your Deployed Site
1. Click on the deployment URL
2. Navigate to `/travel.html` or `/travel` to access the main planner
3. Test all features:
   - ✅ Dark mode toggle
   - ✅ Destination autocomplete
   - ✅ Budget validation
   - ✅ 20-day limit
   - ✅ PlexoTravel branding

## Step 3: Deploy Backend to Render

### 3.1 Sign Up / Log In to Render
1. Go to [Render](https://render.com)
2. Sign up or log in with GitHub

### 3.2 Create New Web Service
1. Click "New" → "Web Service"
2. Connect your GitHub repository
3. Select your repository

### 3.3 Configure Backend Settings
1. **Name:** `plexotravel-backend` (or your choice)
2. **Root Directory:** `backend`
3. **Environment:** Node
4. **Region:** Choose closest to your users
5. **Branch:** main
6. **Build Command:** `npm install`
7. **Start Command:** `npm start`

### 3.4 Add Environment Variables
Click "Advanced" → "Add Environment Variable" and add:

```
PORT=3001
MONGODB_URI=your_mongodb_connection_string_here
GEMINI_API_KEY=your_gemini_api_key_here
LOCATIONIQ_API_KEY=your_locationiq_api_key_here
SERP_API_KEY=your_serp_api_key_here
```

**Important:** Get your API keys from:
- MongoDB: https://www.mongodb.com/cloud/atlas
- Gemini API: https://makersuite.google.com/app/apikey
- LocationIQ: https://locationiq.com/
- SERP API: https://serpapi.com/

### 3.5 Deploy Backend
1. Click "Create Web Service"
2. Wait for deployment (3-5 minutes first time)
3. You'll get a URL like: `https://plexotravel-backend.onrender.com`

### 3.6 Upload Firebase Service Account
1. In Render dashboard, go to your service
2. Go to "Shell" tab
3. Upload your `firebase-service-account.json` file
4. Or add it as an environment variable (as JSON string)

## Step 4: Connect Frontend to Backend

### 4.1 Update API URL in Frontend
You need to update the API URL in your frontend to point to your deployed backend:

1. Go to your local project: `frontend/travel.html`
2. Find line with `const API_URL = 'https://travel-planner-backend-ao9v.onrender.com/api/generate-itinerary';`
3. Replace with your Render backend URL:
   ```javascript
   const API_URL = 'https://YOUR-BACKEND-URL.onrender.com/api/generate-itinerary';
   ```

### 4.2 Update Backend CORS Settings
Make sure your backend allows requests from your Vercel domain.

In `backend/server.js`, update CORS configuration:
```javascript
app.use(cors({
  origin: [
    'http://localhost:8000',
    'https://your-vercel-app.vercel.app'  // Add your Vercel URL
  ],
  credentials: true
}));
```

### 4.3 Commit and Push Changes
```bash
cd /Users/nihithreddy/Downloads/Travel-Planner-main-2
git add frontend/travel.html backend/server.js
git commit -m "Update API URLs for production deployment"
git push origin main
```

### 4.4 Vercel Auto-Deploy
Vercel will automatically detect the push and redeploy your frontend!

## Step 5: Verify Deployment

### 5.1 Test Full Application Flow
1. Visit your Vercel URL
2. Sign up / Log in
3. Fill in travel details
4. Generate itinerary
5. Check gallery loads
6. Test dark mode
7. Download PDF

### 5.2 Check Console for Errors
Open browser DevTools (F12) and check Console tab for any errors.

### 5.3 Common Issues & Solutions

**Issue: "Failed to fetch" or CORS errors**
- Solution: Update CORS settings in backend to include your Vercel domain

**Issue: API not responding**
- Solution: Check Render logs to see if backend is running
- Verify environment variables are set correctly

**Issue: Images not loading**
- Solution: Check SERP API key is valid and has credits

**Issue: Firebase auth not working**
- Solution: Add your Vercel domain to Firebase authorized domains:
  - Go to Firebase Console
  - Select your project
  - Go to Authentication → Settings → Authorized domains
  - Add your Vercel domain (e.g., `your-app.vercel.app`)

**Issue: MongoDB connection error**
- Solution: Whitelist Render's IP addresses in MongoDB Atlas:
  - Go to MongoDB Atlas
  - Network Access → Add IP Address
  - Add `0.0.0.0/0` (allow from anywhere) or Render's specific IPs

## Step 6: Custom Domain (Optional)

### 6.1 Add Custom Domain to Vercel
1. Go to your project in Vercel
2. Click "Settings" → "Domains"
3. Add your custom domain
4. Update DNS records as instructed by Vercel

### 6.2 Update Firebase & Backend
Remember to add your custom domain to:
- Firebase authorized domains
- Backend CORS configuration

## 🎉 Deployment Complete!

Your PlexoTravel app is now live! Share your Vercel URL with others.

### Quick Commands Reference

```bash
# Add and commit changes
git add .
git commit -m "Your commit message"

# Push to GitHub
git push origin main

# Check status
git status

# View commit history
git log --oneline
```

### Maintenance Tips

1. **Keep Dependencies Updated:**
   ```bash
   cd backend
   npm update
   ```

2. **Monitor Logs:**
   - Vercel: Check deployment logs in Vercel dashboard
   - Render: Check logs in Render dashboard

3. **API Usage:**
   - Monitor your API usage for Gemini, SERP, and LocationIQ
   - Set up usage alerts to avoid unexpected charges

4. **Database Backups:**
   - Enable automated backups in MongoDB Atlas
   - Export important data regularly

---

**Need Help?** Contact the team:
- Nihith Reddy: anihithreddy132@gmail.com
- Rithwik Reddy: rithwikreddy27@gmail.com
- Aryan Sai: aryansaienugula@gmail.com
