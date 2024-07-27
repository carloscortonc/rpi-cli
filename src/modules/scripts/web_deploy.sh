#!/bin/bash
# Script for deploying a static web app (zip) into /var/www/html/
# ENV_VARIABLES:
#  - LOCATION: location where the file to upload is located
#  - APP_NAME: context path for the application. Default: `basename $LOCATION`

CURRDIR=$(dirname $0)
FILE=$(basename $LOCATION)
APP="${FILE%.*}"
NAME="${APP_NAME:-$APP}"

echo Uploading project [$NAME] to registry ...

source $CURRDIR/ftp_upload.sh

ssh $USER@$IP 'bash -s' <<EOF
cd ~/registry/
# rm /var/www/html/$APP
# unzip file
unzip -o $FILE -d /var/www/html/$NAME
# clean
rm $APP.zip

EOF