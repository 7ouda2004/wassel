@echo off
chcp 65001
cd "واصل-Wasel\واصل-Wasel"
echo Installing dependencies...
call npm install
echo Starting server...
call npm run dev
pause
