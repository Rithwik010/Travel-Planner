@echo off
echo ========================================
echo 🚀 Travel Itinerary Planner
echo    with Authentication System
echo ========================================
echo.

REM Check if .env file exists
if not exist ".env" (
    echo ❌ Error: .env file not found!
    echo.
    echo Please create .env file from .env.example:
    echo   1. Copy .env.example to .env
    echo   2. Fill in your Firebase and MongoDB credentials
    echo   3. Add your SERP API key from https://serpapi.com/
    echo.
    exit /b 1
)

REM Check if firebase-service-account.json exists
if not exist "backend\firebase-service-account.json" (
    echo ⚠️  Warning: backend\firebase-service-account.json not found!
    echo    Firebase Admin SDK features will not work.
    echo    Download it from Firebase Console > Project Settings > Service Accounts
    echo.
)

REM Test all APIs first
echo 🔍 Testing all APIs...
node test_all_apis.js
if %errorlevel% neq 0 (
    echo.
    echo ⚠️  Some APIs failed. Check the output above.
    echo    You can continue, but some features may not work.
    echo.
    pause
)
echo.

REM Check if backend is running on port 3001
netstat -ano | findstr :3001 > nul
if %errorlevel% equ 0 (
    echo ⚠️  Backend already running on port 3001
) else (
    echo 📡 Starting backend server on port 3001...
    start "🔧 Backend Server" cmd /c "cd backend && npm start"
)

REM Wait for backend to start
echo ⏳ Waiting for backend to initialize...
timeout /t 5 /nobreak > nul

REM Check if frontend is running on port 8000
netstat -ano | findstr :8000 > nul
if %errorlevel% equ 0 (
    echo ⚠️  Frontend already running on port 8000
) else (
    echo 🌐 Starting frontend server on port 8000...
    start "🎨 Frontend Server" cmd /c "cd frontend && python -m http.server 8000"
)

REM Wait for frontend to start
echo ⏳ Waiting for frontend to start...
timeout /t 3 /nobreak > nul

REM Open in default browser
echo 🌎 Opening in default browser...
start http://localhost:8000/travel.html

echo.
echo ========================================
echo ✨ Setup Complete!
echo ========================================
echo 📍 Travel Planner:  http://localhost:8000/travel.html
echo 🔐 Login Page:      http://localhost:8000/login.html
echo 📝 Signup Page:     http://localhost:8000/signup.html
echo 📊 Dashboard:       http://localhost:8000/dashboard.html
echo 🔧 Backend API:     http://localhost:3001
echo ========================================
echo.
echo 💡 Tips:
echo   - Create an account at http://localhost:8000/signup.html
echo   - Your searches will be saved automatically
echo   - View your history in the dashboard
echo.
echo 🛑 To stop servers, run: stop.bat
echo.