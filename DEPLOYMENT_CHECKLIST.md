# 🚀 Quick Deployment Checklist

## Before You Start
- [ ] GitHub repository is pushed and up to date
- [ ] You have all API keys and credentials ready
- [ ] MongoDB is accessible from anywhere (not localhost)

---

## Backend Deployment (Render)

### 1. Create Render Account
- Go to https://render.com
- Sign up with GitHub

### 2. Create Web Service
- New + → Web Service
- Connect GitHub: `Rithwik010/Travel-Planner`
- **Root Directory**: `backend`
- **Build Command**: `npm install`
- **Start Command**: `npm start`
- **Instance Type**: Free

### 3. Add Environment Variables
Copy-paste these in Render:

```
NODE_ENV=production
MONGODB_URI=mongodb+srv://narnarithwik:rithwik27reddy@travel.ilanakm.mongodb.net/TravelPlanner
GEMINI_API_KEY=AIzaSyBRcZjAd63lm2nQ7OYbnsm5VwVTU8cAn44
LOCATIONIQ_API_KEY=pk.9142f1b59ac476386607c16a5eef5d20
SERP_API_KEY=01209a8292952ff77ca46216c6b59e80a0d5bddeffde547ea78bb9da19eff32c
FIREBASE_API_KEY=AIzaSyD3_SAfaD6gGOWQOlxfIkxXc5_x-3yC6Ig
FIREBASE_AUTH_DOMAIN=travel-planner-5f52c.firebaseapp.com
FIREBASE_PROJECT_ID=travel-planner-5f52c
FIREBASE_STORAGE_BUCKET=travel-planner-5f52c.firebasestorage.app
FIREBASE_MESSAGING_SENDER_ID=1000697638766
FIREBASE_APP_ID=1:1000697638766:web:f55e1ba6aac44a84fb89fd
FIREBASE_MEASUREMENT_ID=G-ZVXTMXM1T8
```

For Firebase Admin, add the private key from your firebase-service-account.json:
```
FIREBASE_PRIVATE_KEY=<copy from file>
FIREBASE_CLIENT_EMAIL=<copy from file>
```

### 4. Deploy
- Click "Create Web Service"
- Wait 3-5 minutes
- Copy your backend URL: `https://______.onrender.com`

---

## Frontend Deployment (Vercel)

### 1. Update API URLs in Frontend
Replace `http://localhost:3001` with your Render URL in these files:
- [ ] `frontend/travel.html`
- [ ] `frontend/dashboard.html`
- [ ] `frontend/login.html`
- [ ] `frontend/signup.html`

### 2. Push Changes to GitHub
```bash
git add .
git commit -m "Update API URLs for production"
git push
```

### 3. Deploy to Vercel
- Go to https://vercel.com
- Sign up with GitHub
- New Project → Import `Rithwik010/Travel-Planner`
- **Root Directory**: `frontend`
- Click Deploy
- Wait 1-2 minutes
- Copy your frontend URL: `https://______.vercel.app`

---

## Testing

### Test Backend
Visit: `https://your-backend.onrender.com/api/test`
Should show: `{"message":"Backend is working!"}`

### Test Frontend
1. Open: `https://your-frontend.vercel.app`
2. Sign up for a new account
3. Generate an itinerary
4. Save to dashboard
5. Check if everything works

---

## If Something Goes Wrong

**Backend not working?**
- Check Render logs
- Verify all environment variables are set
- Test MongoDB connection

**Frontend not connecting?**
- Check browser console for errors
- Verify API URLs are updated
- Make sure backend is running

**CORS errors?**
- Update CORS in backend to allow your Vercel domain

---

## Done! ✅

Your app is now live:
- Backend: https://your-app.onrender.com
- Frontend: https://your-app.vercel.app

Remember to:
1. Make GitHub repo private (if it contains sensitive data)
2. Rotate API keys for security
3. Monitor your usage limits
