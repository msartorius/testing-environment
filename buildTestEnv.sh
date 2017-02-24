#!/bin/sh

TOP_PATH=$PWD
BACKEND_PATH=backend/src/testing-environment/

mkdir reports
rm -rfv -y reports/*
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
cd ${TOP_PATH}
docker-compose -f docker-compose-test.yml up
# docker build . -f dockerfileMongoDB -t database --no-cache=true
# docker build . -f dockerfileApplicationProd -t server --no-cache=true
# docker build . -f dockerfileFrontendTest -t frontend_test --no-cache=true