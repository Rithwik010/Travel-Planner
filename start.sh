#!/bin/bash

# Travel Itinerary Planner Startup Script
# This script starts both backend and frontend servers

echo "========================================"
echo "🚀 Travel Itinerary Planner"
echo "   with Authentication System"
echo "========================================"
echo ""

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Check if .env file exists
if [ ! -f ".env" ]; then
    echo -e "${RED}❌ Error: .env file not found!${NC}"
    echo ""
    echo "Please create .env file from .env.example:"
    echo "  1. Copy .env.example to .env: cp .env.example .env"
    echo "  2. Fill in your Firebase and MongoDB credentials"
    echo "  3. Add your SERP API key from https://serpapi.com/"
    echo ""
    exit 1
fi

# Check if firebase-service-account.json exists
if [ ! -f "backend/firebase-service-account.json" ]; then
    echo -e "${YELLOW}⚠️  Warning: backend/firebase-service-account.json not found!${NC}"
    echo "   Firebase Admin SDK features will not work."
    echo "   Download it from Firebase Console > Project Settings > Service Accounts"
    echo ""
fi

# Test all APIs first
echo -e "${BLUE}🔍 Testing all APIs...${NC}"
node test_all_apis.js
if [ $? -ne 0 ]; then
    echo ""
    echo -e "${YELLOW}⚠️  Some APIs failed. Check the output above.${NC}"
    echo "   You can continue, but some features may not work."
    echo ""
    read -p "Press Enter to continue..."
fi
echo ""

# Check if backend is already running on port 3001
if lsof -Pi :3001 -sTCP:LISTEN -t >/dev/null 2>&1 ; then
    echo -e "${YELLOW}⚠️  Backend already running on port 3001${NC}"
else
    echo -e "${BLUE}📡 Starting backend server on port 3001...${NC}"
    (cd backend && npm start) &
    BACKEND_PID=$!
    sleep 3
    echo -e "${GREEN}✅ Backend server started (PID: $BACKEND_PID)${NC}"
fi

echo ""

# Wait for backend to initialize
echo "⏳ Waiting for backend to initialize..."
sleep 2

# Check if frontend is already running on port 8000
if lsof -Pi :8000 -sTCP:LISTEN -t >/dev/null 2>&1 ; then
    echo -e "${YELLOW}⚠️  Frontend already running on port 8000${NC}"
else
    echo -e "${BLUE}🌐 Starting frontend server on port 8000...${NC}"
    (cd frontend && python3 -m http.server 8000) &
    FRONTEND_PID=$!
    sleep 2
    echo -e "${GREEN}✅ Frontend server started (PID: $FRONTEND_PID)${NC}"
fi

echo ""

# Wait for frontend to start
echo "⏳ Waiting for frontend to start..."
sleep 2

# Open in default browser
echo "🌎 Opening in default browser..."
open http://localhost:8000/travel.html 2>/dev/null || xdg-open http://localhost:8000/travel.html 2>/dev/null

echo ""
echo "========================================"
echo "✨ Setup Complete!"
echo "========================================"
echo "📍 Travel Planner:  http://localhost:8000/travel.html"
echo "🔐 Login Page:      http://localhost:8000/login.html"
echo "📝 Signup Page:     http://localhost:8000/signup.html"
echo "📊 Dashboard:       http://localhost:8000/dashboard.html"
echo "🔧 Backend API:     http://localhost:3001"
echo "========================================"
echo ""
echo "💡 Tips:"
echo "   - Create an account at http://localhost:8000/signup.html"
echo "   - Your searches will be saved automatically"
echo "   - View your history in the dashboard"
echo "   - Test APIs with: node test_all_apis.js"
echo ""
echo "🛑 To stop servers, run: ./stop.sh"
echo ""
