#!/bin/bash
# Script for uploading files into "registry" folder
# ARGUMENTS:
#   $1: location where the file to upload is located
#   $2: if provided, destination path, relative to registry dir

FILENAME=`basename $1`
DESTFILE=./registry/$([ ! "$2" ] && echo "$FILENAME" || echo "$2")
echo "put $1 $DESTFILE" | sftp $USER@$IP