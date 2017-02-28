#!/bin/sh

TOP_PATH=$PWD
BACKEND_PATH=backend/src/testing-environment/
FRONTEND_PATH=frontend

cd ${BACKEND_PATH}
rm -rf ./../../bin
mkdir -p ./../../bin/config
cp -a ./config/config-prod.yml ./../../bin/config
cp -a ./config/run.sh ./../../bin/
chmod +x ./../../bin/run.sh
go install
if [ $? != 0 ]
then
    exit
fi
cd ${TOP_PATH}/${FRONTEND_PATH}
ng build
cd ${TOP_PATH}
docker-compose -f docker-compose.yml up