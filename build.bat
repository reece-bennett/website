@echo off
rmdir "public" /s /q
call roots compile -e production
cd public
git init
git add .
For /f "tokens=2-4 delims=/ " %%a in ('date /t') do (set mydate=%%c-%%a-%%b)
For /f "tokens=1-2 delims=/:" %%a in ('time /t') do (set mytime=%%a:%%b)
git commit -m "Site updated: %mydate% %mytime%"
git push git@github.com:PhyscoKillerMonkey/physcokillermonkey.github.io.git --force