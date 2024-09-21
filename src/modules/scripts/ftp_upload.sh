#!/bin/bash
# Script for uploading files into "registry" folder
# ARGUMENTS:
#   $1: location where the file to upload is located

FILENAME=`basename $1`
DESTFILE="./registry/${FILENAME}"
echo "put $1 $DESTFILE" | sftp $USER@$IP