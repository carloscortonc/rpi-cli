#!/bin/bash
# Script for deploying a static web app (zip) into /var/www/html/
# ENV_VARIABLES:
#  - LOCATION: location where the file to upload is located

CURRDIR=$(dirname $0)
FILE=$(basename $LOCATION)
APP="${FILE%.*}"

echo Uploading project [$APP] to registry ...

source $CURRDIR/ftp_upload.sh $LOCATION

ssh $USER@$IP 'bash -s' <<EOF
cd ~/registry/
# rm /var/www/html/$APP
# unzip file
unzip -o $FILE -d /var/www/html/
# clean
rm $APP.zip

EOF