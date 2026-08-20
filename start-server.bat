@echo off
echo Starting NightKind Collective Local Server...
echo.
echo This will start a local server to properly run your React app.
echo The server will handle routing and prevent 404 errors.
echo.
echo Server will be available at: http://localhost:8000
echo Press Ctrl+C to stop the server
echo.

REM Check if Python is available
python --version >nul 2>&1
if %errorlevel% equ 0 (
    echo Using Python server...
    python -m http.server 8000
    goto :end
)

REM Check if Python3 is available
python3 --version >nul 2>&1
if %errorlevel% equ 0 (
    echo Using Python3 server...
    python3 -m http.server 8000
    goto :end
)

REM Check if Node.js is available
node --version >nul 2>&1
if %errorlevel% equ 0 (
    echo Using Node.js server...
    npx http-server -p 8000 -o
    goto :end
)

REM Check if PHP is available
php --version >nul 2>&1
if %errorlevel% equ 0 (
    echo Using PHP server...
    php -S localhost:8000
    goto :end
)

echo No suitable server found!
echo Please install one of the following:
echo - Python (https://python.org)
echo - Node.js (https://nodejs.org)
echo - PHP (https://php.net)
echo.
echo Or simply open index.html in your browser
echo (Note: Some features may not work without a server)
pause

:end 