@echo off
echo ========================
echo please input the new style name:
set /p desc=
echo ========================
echo please input the style name index:
echo 1.width
echo 2.height
echo 3.background
set /p stylename=
echo ========================
echo please input the style value:
set /p stylevalue=
echo ========================

if %stylename% == 1 set stylename=width
if %stylename% == 2 set stylename=height
if %stylename% == 3 set stylename=background
if not %desc% == q node makelibrary.js %desc% styleAnimation %stylename% %stylevalue%

if %desc% == q exit

pause