# 🚀 Travel Planner Deployment Guide

## Overview
This guide will help you deploy:
- **Backend** → Render (Node.js server)
- **Frontend** → Vercel (HTML/CSS/JS)

---

## 📋 Prerequisites

1. GitHub account with your code pushed
2. Render account (sign up at https://render.com)
3. Vercel account (sign up at https://vercel.com)
4. All API keys ready:
   - MongoDB URI
   - Gemini API Key
   - LocationIQ API Key
   - SERP API Key
   - Firebase credentials

---

## 🔧 PART 1: Deploy Backend to Render

### Step 1: Sign Up for Render
1. Go to https://render.com
2. Click "Get Started for Free"
3. Sign up with your GitHub account

### Step 2: Create a New Web Service
1. Click "New +" button in the dashboard
2. Select "Web Service"
3. Connect your GitHub repository: `Rithwik010/Travel-Planner`
4. Click "Connect" next to your repository

### Step 3: Configure the Web Service

**Basic Settings:**
- **Name**: `travel-planner-backend`
- **Region**: Choose closest to you (e.g., Oregon)
- **Branch**: `main`
- **Root Directory**: `backend`
- **Runtime**: `Node`
- **Build Command**: `npm install`
- **Start Command**: `npm start`

**Instance Type:**
- Select **Free** (or paid if you need better performance)

### Step 4: Add Environment Variables

Click "Advanced" and add these environment variables:

```
NODE_ENV=production
PORT=10000
MONGODB_URI=mongodb+srv://narnarithwik:rithwik27reddy@travel.ilanakm.mongodb.net/TravelPlanner
GEMINI_API_KEY=AIzaSyBRcZjAd63lm2nQ7OYbnsm5VwVTU8cAn44
LOCATIONIQ_API_KEY=pk.9142f1b59ac476386607c16a5eef5d20
SERP_API_KEY=01209a8292952ff77ca46216c6b59e80a0d5bddeffde547ea78bb9da19eff32c

# Firebase Web Config
FIREBASE_API_KEY=AIzaSyD3_SAfaD6gGOWQOlxfIkxXc5_x-3yC6Ig
FIREBASE_AUTH_DOMAIN=travel-planner-5f52c.firebaseapp.com
FIREBASE_PROJECT_ID=travel-planner-5f52c
FIREBASE_STORAGE_BUCKET=travel-planner-5f52c.firebasestorage.app
FIREBASE_MESSAGING_SENDER_ID=1000697638766
FIREBASE_APP_ID=1:1000697638766:web:f55e1ba6aac44a84fb89fd
FIREBASE_MEASUREMENT_ID=G-ZVXTMXM1T8

# Firebase Admin SDK (from firebase-service-account.json)
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n[YOUR_PRIVATE_KEY_HERE]\n-----END PRIVATE KEY-----\n"
FIREBASE_CLIENT_EMAIL=firebase-adminsdk-xxxxx@travel-planner-5f52c.iam.gserviceaccount.com
```

**Important:** For `FIREBASE_PRIVATE_KEY`, copy the entire private key from your `firebase-service-account.json` file, including the `-----BEGIN PRIVATE KEY-----` and `-----END PRIVATE KEY-----` parts.

### Step 5: Deploy
1. Click "Create Web Service"
2. Wait 3-5 minutes for deployment
3. Once deployed, copy your backend URL (e.g., `https://travel-planner-backend.onrender.com`)

### Step 6: Test Backend
Open: `https://your-backend-url.onrender.com/api/test`

You should see: `{"message":"Backend is working!"}`

---

## 🌐 PART 2: Prepare Frontend for Vercel

### Step 1: Create vercel.json Configuration

Create a file at the root of your project called `vercel.json`:

```json
{
  "version": 2,
  "builds": [
    {
      "src": "frontend/**",
      "use": "@vercel/static"
    }
  ],
  "routes": [
    {
      "src": "/(.*)",
      "dest": "/frontend/$1"
    }
  ],
  "outputDirectory": "frontend"
}
```

### Step 2: Update Frontend API URLs

You need to replace all localhost URLs in your frontend files with your Render backend URL.

**Files to update:**
- `frontend/travel.html` - Line ~1770
- `frontend/dashboard.html` - Line ~950-1100
- `frontend/login.html` 
- `frontend/signup.html`

Replace all instances of:
```javascript
http://localhost:3001
```

With your Render backend URL:
```javascript
https://your-backend-url.onrender.com
```

---

## 🎯 PART 3: Deploy Frontend to Vercel

### Step 1: Sign Up for Vercel
1. Go to https://vercel.com
2. Click "Sign Up"
3. Sign up with your GitHub account

### Step 2: Import Your Project
1. Click "Add New..." → "Project"
2. Import your GitHub repository: `Rithwik010/Travel-Planner`
3. Click "Import"

### Step 3: Configure Project Settings

**Framework Preset:** `Other`

**Root Directory:** Click "Edit" and set to `frontend`

**Build Settings:**
- Build Command: Leave empty (static site)
- Output Directory: `.` (current directory)
- Install Command: Leave empty

### Step 4: Add Environment Variables (Optional)

If you want to use environment variables in your frontend:
- Add any public configuration here
- **DO NOT** add API keys that should be kept secret

### Step 5: Deploy
1. Click "Deploy"
2. Wait 1-2 minutes
3. Your site will be live at `https://your-project.vercel.app`

### Step 6: Set Custom Domain (Optional)
1. Go to Project Settings → Domains
2. Add your custom domain
3. Follow DNS configuration instructions

---

## ✅ Post-Deployment Checklist

### Backend (Render)
- [ ] Service is running (green status)
- [ ] Environment variables are set correctly
- [ ] Test API endpoint returns data
- [ ] MongoDB connection is working
- [ ] Firebase authentication is working

### Frontend (Vercel)
- [ ] Site loads correctly
- [ ] Login/Signup works
- [ ] Can generate itineraries
- [ ] Dashboard loads user data
- [ ] All API calls reach backend successfully

### Test Everything
1. **Sign Up**: Create a new account
2. **Login**: Log in with credentials
3. **Generate Itinerary**: Create a travel plan
4. **Save Trip**: Save to dashboard
5. **View Saved Trips**: Check dashboard displays correctly

---

## 🔍 Troubleshooting

### Backend Issues

**Problem: "Application failed to respond"**
- Check Render logs (Logs tab)
- Verify environment variables are set correctly
- Ensure MongoDB URI is correct
- Check if Firebase credentials are properly formatted

**Problem: CORS errors**
- Update CORS configuration in `backend/server.js`:
```javascript
app.use(cors({
  origin: 'https://your-vercel-url.vercel.app',
  credentials: true
}));
```

### Frontend Issues

**Problem: "Failed to fetch"**
- Verify backend URL is correct in all frontend files
- Check browser console for exact error
- Ensure backend is running on Render

**Problem: "Firebase auth error"**
- Verify Firebase Web config in frontend files
- Check Firebase console for authorized domains
- Add your Vercel domain to Firebase authorized domains

---

## 🔐 Security Recommendations

After deployment:

1. **Rotate API Keys**: Since keys were in GitHub, regenerate them:
   - MongoDB password
   - Firebase credentials
   - All API keys

2. **Make Repository Private**: Follow GitHub settings to make repo private

3. **Set up proper CORS**: Only allow your Vercel domain in backend CORS

4. **Enable HTTPS**: Both Render and Vercel provide HTTPS by default

5. **Monitor Usage**: Check API usage on:
   - Google Cloud Console (Gemini API)
   - LocationIQ dashboard
   - SERP API dashboard

---

## 📊 Free Tier Limits

**Render (Free):**
- 750 hours/month
- Spins down after 15 minutes of inactivity
- 512 MB RAM

**Vercel (Free):**
- 100 GB bandwidth/month
- Unlimited deployments
- Automatic HTTPS

---

## 🆘 Need Help?

Common commands:

**View Render Logs:**
```bash
# In Render dashboard → Logs tab
```

**Redeploy Backend:**
```bash
# In Render dashboard → Manual Deploy → Deploy latest commit
```

**Redeploy Frontend:**
```bash
# In Vercel dashboard → Deployments → Redeploy
```

---

## 🎉 Success!

Once everything is deployed:
- Backend: `https://your-backend.onrender.com`
- Frontend: `https://your-project.vercel.app`

Share your live URL and start planning trips! ✈️🌍
