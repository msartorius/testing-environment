#!/bin/sh

TOP_PATH=$PWD
BACKEND_PATH=backend/src/testing-environment/
FRONTEND_PATH=frontend/
# script
rm -rf reports
mkdir reports
cd ${BACKEND_PATH}
rm -rf ./../../bin
mkdir -p ./../../bin/config
cp -a ./config/config-prod.yml ./../../bin/config
cp -a ./config/run.sh ./../../bin/
chmod +x ./../../bin/run.sh
glide install
go install
if [ $? != 0 ]
then
    exit
fi
cd ${TOP_PATH}
chmod +x ./${FRONTEND_PATH}/e2e/runE2E.sh
cd ${FRONTEND_PATH}
ng build
cd ${TOP_PATH}
sudo docker-compose -f docker-compose-test.yml up