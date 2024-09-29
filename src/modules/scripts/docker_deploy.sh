#!/bin/bash
# Script for deploying a docker aplication in target server
# ENV_VARIABLES:
#  - LOCATION: location of the folder to deploy
#  - APP_NAME: name to tag the app. Default: `basename $LOCATION`
#  - PORT: for docker applications, port to be used (should be included in $VARS)
#  - VARS: other variables to be included as build-args
#  - ENVFILE: name of an env-file to provide to `docker run` command
#  - LOGS: time to wait for displaying container logs, <=0 to skip
#  - BUILD_ON_TARGET: whether the build process should be executed on target server

CURRDIR=$(dirname $0)
APP=`basename $LOCATION`
NAME="${APP_NAME:-$APP}"
ZIP_LOCATION="$LOCATION/../$APP.zip"

# define build-args variables to be used inside Dockerfile
vars=($VARS)
build_args=$([ ! "$VARS" ] && echo "" || echo $(printf -- "--build-arg %s " "${vars[@]}"))
port_mapping=$([ ! "$PORT" ] && echo "" || echo "-p $PORT:$PORT")
env_file=$([ ! "$ENVFILE" ] && echo "" || echo "--env-file secrets/$NAME")

# Check for building locally
if [ "$BUILD_ON_TARGET" != "true" ]; then
  # build docker image
  docker build $build_args -t $NAME $LOCATION
  # save image to a file
  docker save -o $ZIP_LOCATION $NAME
fi

echo Uploading project [$NAME] to registry ...

source $CURRDIR/ftp_upload.sh $ZIP_LOCATION

# Upload env-file
if [ "$ENVFILE" ]; then
  echo Uploading env-file to registry ...
  source $CURRDIR/ftp_upload.sh $ENVFILE secrets/$NAME
fi

echo Deploying docker app [$NAME] $([ ! "$PORT" ] && echo "" || echo on port [$PORT])

ssh -o ConnectTimeout=5 $USER@$IP 'bash -s' <<EOF
cd ~/registry/

# build-on-target
if [ "$BUILD_ON_TARGET" = "true" ]; then
  # unzip file
  unzip -o $APP.zip -d $NAME
  # build docker image
  docker build $build_args -t $NAME $NAME
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
docker run --privileged --name $NAME -d -i $port_mapping $env_file $NAME:latest

if [[ "$LOGS" =~ ^[1-9][0-9]*$ ]]; then
  # wait specified delay and display logs
  echo Waiting ${LOGS}s before displaying logs...
  sleep $LOGS
  docker logs $NAME
fi

EOF