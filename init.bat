@echo off
IF EXIST node_modules GOTO SKIPINSTALL
call npm install
cd client
call npm install
cd ../server/
call npx tsc
cd ../../
:SKIPINSTALL
cd client
start npx webpack --watch
cd ../server/dist/
start npx tsc --watch
cd ../../
npx nodemon --watch / server/dist/server.js
pause