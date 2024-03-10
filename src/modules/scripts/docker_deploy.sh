#!/bin/bash
# Script for deploying a docker aplication (zip) in target server
# ENV_VARIABLES:
#  - LOCATION: location where the file to upload is located
#  - PORT: for docker applications, port to be used

CURRDIR=$(dirname $0)
FILE=`basename $LOCATION`
APP="${FILE%.*}"

echo Uploading project [$APP] to registry ...

source $CURRDIR/ftp_upload.sh

echo Deploying docker app [$APP] on port [$PORT]

ssh $USER@$IP 'bash -s' <<EOF
cd ~/registry/
# unzip file
unzip -o $APP.zip -d $APP
# build docker image, define PORT variable to be used inside Dockerfile
docker build --build-arg PORT=$PORT -t $APP $APP
# clean
rm -rf $APP
rm $APP.zip
# stop previous container if running
docker container stop $APP
# remove previous container
docker rm $APP
# run docker container
docker run --privileged --name $APP -d -p $PORT:$PORT $APP:latest

EOF