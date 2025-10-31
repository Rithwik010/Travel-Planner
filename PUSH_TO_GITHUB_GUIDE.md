# GitHub Push Setup Guide

## Authentication Options

Since you're getting a 403 error, you need to authenticate properly. Here are your options:

### Option 1: Personal Access Token (Recommended)

1. **Create a Personal Access Token:**
   - Go to GitHub.com → Settings → Developer settings → Personal access tokens → Tokens (classic)
   - Click "Generate new token (classic)"
   - Set expiration and select scopes: `repo` (full control of private repositories)
   - Copy the token (you won't see it again!)

2. **Update Git Remote with Token:**
   ```bash
   git remote set-url origin https://YOUR_GITHUB_USERNAME:YOUR_TOKEN@github.com/Rithwik010/Travel-Planner.git
   ```

3. **Push to Repository:**
   ```bash
   git push -u origin main
   ```

### Option 2: SSH Authentication

1. **Generate SSH Key** (if you don't have one):
   ```bash
   ssh-keygen -t ed25519 -C "anihithreddy132@gmail.com"
   ```

2. **Add SSH Key to GitHub:**
   - Copy your public key: `cat ~/.ssh/id_ed25519.pub`
   - Go to GitHub → Settings → SSH and GPG keys → New SSH key
   - Paste the key

3. **Update Remote to Use SSH:**
   ```bash
   git remote set-url origin git@github.com:Rithwik010/Travel-Planner.git
   git push -u origin main
   ```

### Option 3: Use GitHub Desktop or VS Code

- Install GitHub Desktop or use VS Code's built-in Git integration
- These handle authentication automatically

## Current Repository Status

Your repository contains all the latest updates:
- ✅ PlexoTravel rebranding with animated logo
- ✅ 20-day trip duration limit
- ✅ Budget validation (no negatives, mandatory field)
- ✅ Destination validation with autocomplete
- ✅ Dark mode improvements
- ✅ All deployment documentation

## After Successful Push

Once you push to GitHub, you can deploy to Vercel:

1. Go to [vercel.com](https://vercel.com)
2. Import your GitHub repository
3. Configure environment variables in Vercel dashboard
4. Deploy!

## Environment Variables for Vercel

Don't forget to add these in Vercel dashboard:
- `FIREBASE_API_KEY`
- `GEMINI_API_KEY`
- `LOCATIONIQ_API_KEY`
- `SERP_API_KEY`
- `MONGODB_URI`
- `SESSION_SECRET`
- All other variables from your `.env` file

## Need Help?

If you continue having issues:
1. Ask Rithwik010 to verify you're added as a collaborator
2. Try the Personal Access Token method first
3. Or use GitHub Desktop for easier authentication
