#!/bin/bash

# Stop all servers for Travel Itinerary Planner

echo "========================================"
echo "🛑 Stopping Travel Itinerary Planner"
echo "========================================"
echo ""

# Colors for output
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Stop backend server (port 3001)
if lsof -Pi :3001 -sTCP:LISTEN -t >/dev/null 2>&1 ; then
    echo -e "${BLUE}Stopping backend server on port 3001...${NC}"
    lsof -ti:3001 | xargs kill -9 2>/dev/null
    sleep 1
    echo -e "${GREEN}✅ Backend server stopped${NC}"
else
    echo -e "${YELLOW}⚠️  No backend server running on port 3001${NC}"
fi

echo ""

# Stop frontend server (port 8000)
if lsof -Pi :8000 -sTCP:LISTEN -t >/dev/null 2>&1 ; then
    echo -e "${BLUE}Stopping frontend server on port 8000...${NC}"
    lsof -ti:8000 | xargs kill -9 2>/dev/null
    sleep 1
    echo -e "${GREEN}✅ Frontend server stopped${NC}"
else
    echo -e "${YELLOW}⚠️  No frontend server running on port 8000${NC}"
fi

# Also kill any orphaned node processes from backend
echo ""
echo -e "${BLUE}Cleaning up any orphaned processes...${NC}"
pkill -f "node.*server.js" 2>/dev/null
pkill -f "python3 -m http.server 8000" 2>/dev/null

echo ""
echo "========================================"
echo "✨ All servers stopped!"
echo "========================================"
echo ""
echo "💡 To start servers again, run: ./start.sh"
echo ""
