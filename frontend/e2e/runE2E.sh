#!/bin/sh
cd frontend
ls -la
apt-get install tree
cd e2e
tree
cd ..
echo $PATH
export NVM_DIR="/root/.nvm" && [ -s "$NVM_DIR/nvm.sh" ] && . "$NVM_DIR/nvm.sh"
nvm use 6.9.5
webdriver-manager update
Xvfb -ac :99 -screen 0 1280x1024x16 &
export DISPLAY=:99
protractor protractor.conf.js --baseUrl=http://server:8080
chmod -R 777 test_reports/


