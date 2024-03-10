#!/bin/bash
# Script for uploading files into "registry" folder
# ENV_VARIABLES:
#   LOCATION: location where the file to upload is located

FILENAME=`basename $LOCATION`
DESTFILE="./registry/${FILENAME}"
echo "put $LOCATION $DESTFILE" | sftp $USER@$IP