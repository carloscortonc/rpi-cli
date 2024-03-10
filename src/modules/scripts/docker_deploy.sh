#!/bin/bash
# Script for deploying a docker aplication (zip) in target server
# ENV_VARIABLES:
#  - LOCATION: location where the file to upload is located
#  - PORT: for docker applications, port to be used (should be included in $VARS)
#  - VARS: other variables to be included as build-args

CURRDIR=$(dirname $0)
FILE=`basename $LOCATION`
APP="${FILE%.*}"

# define build-args variables to be used inside Dockerfile
vars=($VARS)
build_args=$(printf -- "--build-arg %s " "${vars[@]}")

echo Uploading project [$APP] to registry ...

source $CURRDIR/ftp_upload.sh

echo Deploying docker app [$APP] on port [$PORT]

ssh $USER@$IP 'bash -s' <<EOF
cd ~/registry/
# unzip file
unzip -o $APP.zip -d $APP
# build docker image
docker build $build_args -t $APP $APP
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