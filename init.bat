@echo off
IF EXIST node_modules GOTO SKIPINSTALL
call npm install
cd client
call npm install
call npx webpack
cd ../server/
call npx tsc
cd ../
:SKIPINSTALL
cd client
start npx webpack --watch
cd ../server/
start npx tsc --watch
cd ../
npx nodemon dist/server.js
pause