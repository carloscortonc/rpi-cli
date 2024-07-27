#!/bin/bash
# Script for deploying a docker aplication (zip) in target server
# ENV_VARIABLES:
#  - LOCATION: location where the file to upload is located
#  - APP_NAME: name to tag the app. Default: `basename $LOCATION`
#  - PORT: for docker applications, port to be used (should be included in $VARS)
#  - VARS: other variables to be included as build-args
#  - BUILD_ON_TARGET: whether the build process should be executed on target server

CURRDIR=$(dirname $0)
FILE=`basename $LOCATION`
APP="${FILE%.*}"
NAME="${APP_NAME:-$APP}"

# define build-args variables to be used inside Dockerfile
vars=($VARS)
build_args=$([ ! "$VARS" ] && echo "" || echo $(printf -- "--build-arg %s " "${vars[@]}"))

# Check for building locally
if [ "$BUILD_ON_TARGET" != "true" ]; then
  # build docker image
  docker build $build_args -t $NAME $LOCATION
  # save image to a file
  docker save -o $LOCATION/../$APP.zip $NAME
fi

echo Uploading project [$NAME] to registry ...

source $CURRDIR/ftp_upload.sh

echo Deploying docker app [$NAME] on port [$PORT]

ssh -o ConnectTimeout=5 $USER@$IP 'bash -s' <<EOF
cd ~/registry/

# Begin build-on-target
if [ "$BUILD_ON_TARGET" = "true" ]; then
  # unzip file
  unzip -o $APP.zip -d $NAME
  # build docker image
  docker build $build_args -t $NAME $NAME
  # clean
  rm -rf $NAME

# Begin build-local
else
  docker load -i $APP.zip
fi

# clean
rm $APP.zip
# stop previous container if running
docker container stop $NAME
# remove previous container
docker rm $NAME
# run docker container
docker run --privileged --name $NAME -d -p $PORT:$PORT $NAME:latest

EOF