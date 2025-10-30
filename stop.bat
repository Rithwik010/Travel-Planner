@echo off
echo ========================================
echo 🛑 Stopping Travel Itinerary Planner
echo ========================================
echo.

set "backend_stopped=0"
set "frontend_stopped=0"

REM Kill processes on port 3001 (Backend)
echo 📡 Checking backend server (port 3001)...
for /f "tokens=5" %%a in ('netstat -ano ^| findstr :3001 ^| findstr LISTENING') do (
    taskkill /F /PID %%a 2>nul
    if %errorlevel% equ 0 (
        echo ✓ Stopped backend server (PID: %%a)
        set "backend_stopped=1"
    )
)

if %backend_stopped% equ 0 (
    echo   No backend server running on port 3001
)

REM Kill processes on port 8000 (Frontend)
echo 🌐 Checking frontend server (port 8000)...
for /f "tokens=5" %%a in ('netstat -ano ^| findstr :8000 ^| findstr LISTENING') do (
    taskkill /F /PID %%a 2>nul
    if %errorlevel% equ 0 (
        echo ✓ Stopped frontend server (PID: %%a)
        set "frontend_stopped=1"
    )
)

if %frontend_stopped% equ 0 (
    echo   No frontend server running on port 8000
)

REM Also kill any orphaned node.exe and python.exe processes from this project
echo.
echo 🧹 Cleaning up orphaned processes...
taskkill /F /IM node.exe /FI "WINDOWTITLE eq *Backend Server*" 2>nul
taskkill /F /IM python.exe /FI "WINDOWTITLE eq *Frontend Server*" 2>nul

echo.
echo ========================================
echo ✨ Cleanup Complete!
echo ========================================
echo.
echo All servers have been stopped.
echo You can restart them with: start.bat
echo.