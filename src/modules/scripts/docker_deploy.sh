#!/bin/bash
# Script for deploying a docker aplication in target server
# ENV_VARIABLES:
#  - LOCATION: location of the folder to deploy
#  - APP_NAME: name to tag the app. Default: `basename $LOCATION`
#  - RUN_ARGS: additional arguments for `docker run` command
#  - LOGS: time to wait for displaying container logs, <=0 to skip
#  - BUILD_ON_TARGET: whether the build process should be executed on target server

CURRDIR=$(dirname $0)
APP=`basename $LOCATION`
NAME="${APP_NAME:-$APP}"
ZIP_LOCATION="$LOCATION/../$APP.zip"

# Check for building locally
if [ "$BUILD_ON_TARGET" != "true" ]; then
  # build docker image
  docker build -t $NAME $LOCATION
  # save image to a file
  docker save -o $ZIP_LOCATION $NAME
fi

echo Uploading project [$NAME] to registry ...

source $CURRDIR/upload.sh $ZIP_LOCATION

echo Deploying docker app [$NAME]

ssh -o ConnectTimeout=5 $USER@$IP 'bash -s' <<EOF
cd ~/registry/

# build-on-target
if [ "$BUILD_ON_TARGET" = "true" ]; then
  # unzip file
  unzip -o $APP.zip -d $NAME
  # build docker image
  docker build -t $NAME $NAME
  # clean
  rm -rf $NAME

# build-local
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
docker run --name $NAME -d $RUN_ARGS $NAME:latest

if [[ "$LOGS" =~ ^[1-9][0-9]*$ ]]; then
  # wait specified delay and display logs
  echo Waiting ${LOGS}s before displaying logs...
  sleep $LOGS
  docker logs $NAME
fi

EOF