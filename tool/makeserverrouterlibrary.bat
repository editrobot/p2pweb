@echo off
echo ========================
echo please input the new library name:
set /p desc=
if not %desc% == q node makelibrary.js %desc% router

if %desc% == q exit

pause