#!/bin/bash
# Script for deploying a docker-compose aplication in target server
# ENV_VARIABLES:
#  - LOCATION: location of the zip folder to deploy
#  - COMPOSE_ARGS: arguments for `docker compose`` command
#  - BUILD_ARGS: arguments for `docker compose build`` command
#  - LOGS: time to wait for displaying container logs, <=0 to skip
#  - BUILD_ON_TARGET: whether the build process should be executed on target server

CURRDIR=$(dirname $0)
APP=`basename $LOCATION`
NAME="${APP%.*}"

# Check server
source $CURRDIR/check_server.sh

# Check for building locally
if [ "$BUILD_ON_TARGET" != "true" ]; then
  echo This is not currently supported
  exit 1
fi

echo Uploading project [$APP] to registry ...

source $CURRDIR/upload.sh $LOCATION

$SSH -o ConnectTimeout=5 -o ServerAliveCountMax=2 -o ServerAliveInterval=10 $USER@$IP 'bash -s' <<EOF
cd ~/registry/

# build-on-target
if [ "$BUILD_ON_TARGET" = "true" ]; then
  # unzip file
  unzip -o $APP
  cd $NAME
  # execute docker compose
  docker compose $COMPOSE_ARGS build $BUILD_ARGS

# build-local - not implemented
else
  echo This is not currently supported
  exit 1
fi

# stop previous if running
docker compose down
# run docker compose
docker compose up -d


if [[ "$LOGS" =~ ^[1-9][0-9]*$ ]]; then
  # wait specified delay and display logs
  echo Waiting ${LOGS}s before displaying logs...
  sleep $LOGS
  docker compose logs
fi

# clean
cd ..
rm $APP
rm -rf $NAME

EOF

# Remove zip
rm $LOCATION