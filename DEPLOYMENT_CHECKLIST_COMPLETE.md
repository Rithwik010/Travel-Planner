# ✅ Pre-Deployment Checklist for PlexoTravel

## Before Pushing to GitHub

### Code Review
- [ ] All features tested locally
- [ ] No console errors in browser
- [ ] Dark mode works properly
- [ ] All form validations working
  - [ ] Budget validation (positive only)
  - [ ] 20-day trip limit
  - [ ] Destination autocomplete
  - [ ] Required fields validation
- [ ] API calls successful
- [ ] Images loading in gallery
- [ ] PDF download working

### Security & Configuration
- [ ] `.env` file is in `.gitignore` (YES ✓)
- [ ] Firebase service account JSON is in `.gitignore` (YES ✓)
- [ ] No API keys hardcoded in frontend
- [ ] No sensitive data in commit history

### Files to Commit
- [ ] All HTML files with updates
- [ ] Updated `vercel.json` with routing
- [ ] `README.md` with instructions
- [ ] `GITHUB_VERCEL_DEPLOYMENT.md` guide
- [ ] `.gitignore` properly configured
- [ ] Backend files (server.js, routes, models)
- [ ] Frontend files (all pages)

## GitHub Repository Setup

### Create Repository
- [ ] Create new repository on GitHub
- [ ] Name: `PlexoTravel` or `Travel-Planner`
- [ ] Visibility: Public or Private
- [ ] Do NOT initialize with README (we have one)

### Push to GitHub
```bash
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
git branch -M main
git push -u origin main
```

- [ ] Repository created
- [ ] Remote added
- [ ] Code pushed successfully
- [ ] All files visible on GitHub

## Vercel Frontend Deployment

### Vercel Setup
- [ ] Vercel account created/logged in
- [ ] GitHub connected to Vercel

### Project Configuration
- [ ] Project imported from GitHub
- [ ] Root directory set to: `frontend`
- [ ] Framework preset: Other
- [ ] Build command: (leave empty)
- [ ] Output directory: `.` or default
- [ ] Domain configured (optional)

### Deployment
- [ ] Deploy button clicked
- [ ] Deployment successful
- [ ] Site accessible via Vercel URL
- [ ] Test URL: `https://your-project.vercel.app`

### Firebase Configuration
- [ ] Vercel domain added to Firebase authorized domains
  - Go to: Firebase Console → Authentication → Settings → Authorized domains
  - Add: `your-project.vercel.app`

### Frontend Testing
- [ ] Home page loads
- [ ] Login page works
- [ ] Signup page works
- [ ] Travel planner page accessible at `/travel`
- [ ] Dashboard page works
- [ ] Dark mode toggle works
- [ ] PlexoTravel branding visible
- [ ] No 404 errors on navigation

## Render Backend Deployment

### Render Setup
- [ ] Render account created/logged in
- [ ] GitHub connected to Render

### Web Service Configuration
- [ ] New Web Service created
- [ ] GitHub repo connected
- [ ] Name: `plexotravel-backend`
- [ ] Root directory: `backend`
- [ ] Environment: Node
- [ ] Build command: `npm install`
- [ ] Start command: `npm start`

### Environment Variables Added
- [ ] `PORT=3001`
- [ ] `MONGODB_URI=...` (from MongoDB Atlas)
- [ ] `GEMINI_API_KEY=...` (from Google AI Studio)
- [ ] `LOCATIONIQ_API_KEY=...` (from LocationIQ)
- [ ] `SERP_API_KEY=...` (from SerpAPI)

### Firebase Service Account
- [ ] Firebase service account JSON uploaded to Render
  - Option 1: Upload via Shell
  - Option 2: Add as environment variable

### Backend Deployment
- [ ] Deploy button clicked
- [ ] Deployment successful (wait 3-5 minutes)
- [ ] Backend URL obtained
- [ ] Test URL: `https://your-backend.onrender.com`

### Backend Testing
- [ ] Health check endpoint works
- [ ] APIs responding
- [ ] MongoDB connected
- [ ] Firebase auth working

## Connect Frontend to Backend

### Update API URLs
- [ ] Copy Render backend URL
- [ ] Update all API URLs in frontend files:
  - [ ] `travel.html` (3 places)
  - [ ] `dashboard.html` (7 places)
  - [ ] `login.html` (1 place)
  - [ ] `signup.html` (1 place)
  - [ ] `config.js` (1 place)

### Update CORS Settings
- [ ] Add Vercel domain to backend CORS in `backend/server.js`:
```javascript
app.use(cors({
  origin: [
    'http://localhost:8000',
    'https://your-vercel-app.vercel.app'
  ],
  credentials: true
}));
```

### MongoDB Configuration
- [ ] MongoDB Atlas Network Access updated
- [ ] IP whitelist includes `0.0.0.0/0` or Render IPs
- [ ] Database user created with correct permissions

### Commit and Push Updates
```bash
git add .
git commit -m "Update API URLs for production deployment"
git push origin main
```

- [ ] Changes committed
- [ ] Changes pushed to GitHub
- [ ] Vercel auto-deployed new version
- [ ] Render redeployed (if needed)

## Final Testing

### Full Application Flow Test
- [ ] Visit Vercel URL
- [ ] Sign up with new account
- [ ] Verify email (if required)
- [ ] Log in successfully
- [ ] Fill travel form:
  - [ ] Destination autocomplete works
  - [ ] Dates validated (20-day limit)
  - [ ] Budget validated (positive only)
  - [ ] Interests selectable
  - [ ] Companions selectable
- [ ] Generate itinerary
- [ ] Itinerary displays correctly
- [ ] Gallery loads images
- [ ] Download PDF works
- [ ] Dark mode toggles properly
- [ ] Navigate to dashboard
- [ ] View search history
- [ ] Logout works

### Cross-Browser Testing
- [ ] Chrome
- [ ] Firefox
- [ ] Safari
- [ ] Edge
- [ ] Mobile browsers (iOS/Android)

### Performance Checks
- [ ] Page load time < 3 seconds
- [ ] API response time < 5 seconds
- [ ] Images optimized and load quickly
- [ ] No console errors
- [ ] No broken links

### API Monitoring
- [ ] Gemini API working
- [ ] LocationIQ API working
- [ ] SERP API working
- [ ] Firebase Auth working
- [ ] MongoDB queries working

## Post-Deployment

### Documentation
- [ ] Update README with live URLs
- [ ] Document any deployment issues
- [ ] Create release notes

### Monitoring Setup
- [ ] Set up error tracking (optional: Sentry)
- [ ] Monitor API usage and limits
- [ ] Set up uptime monitoring (optional: UptimeRobot)

### Team Notification
- [ ] Share deployed URLs with team
- [ ] Provide login credentials (test account)
- [ ] Share documentation

### Backup
- [ ] Export MongoDB data
- [ ] Save environment variables securely
- [ ] Backup Firebase configuration

## Troubleshooting

### Common Issues Checklist

#### "Failed to fetch" Error
- [ ] Check CORS settings in backend
- [ ] Verify backend URL is correct
- [ ] Check browser console for details
- [ ] Verify backend is running on Render

#### Authentication Not Working
- [ ] Verify Vercel domain in Firebase authorized domains
- [ ] Check Firebase configuration in frontend
- [ ] Verify Firebase service account in backend
- [ ] Check environment variables

#### Database Connection Error
- [ ] Verify MongoDB URI is correct
- [ ] Check IP whitelist in MongoDB Atlas
- [ ] Verify database user credentials
- [ ] Check connection string format

#### API Keys Not Working
- [ ] Verify all API keys are set in Render
- [ ] Check API quotas and limits
- [ ] Verify API keys are active
- [ ] Test APIs individually

#### Images Not Loading
- [ ] Check SERP API key and credits
- [ ] Verify CORS for image URLs
- [ ] Check browser console for errors
- [ ] Test with different destinations

## Success Criteria

Your deployment is successful when:

✅ Frontend accessible via Vercel URL
✅ Backend accessible via Render URL  
✅ User can sign up and log in
✅ Itinerary generation works end-to-end
✅ Gallery displays destination images
✅ All form validations working
✅ Dark mode functional
✅ PDF download works
✅ Dashboard shows user data
✅ No console errors
✅ Mobile responsive
✅ All API calls successful

---

## 🎉 Deployment Complete!

Once all checkboxes are checked, your PlexoTravel application is successfully deployed!

**Live URLs:**
- Frontend: `https://your-project.vercel.app`
- Backend: `https://your-backend.onrender.com`

**Next Steps:**
1. Share with users
2. Monitor performance
3. Gather feedback
4. Plan future updates

---

**Questions?** Contact:
- Nihith Reddy: anihithreddy132@gmail.com
- Rithwik Reddy: rithwikreddy27@gmail.com
- Aryan Sai: aryansaienugula@gmail.com
