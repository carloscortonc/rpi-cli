#!/bin/bash
# Script for uploading files into "registry" folder
# ARGUMENTS:
#   $@: list of file locations to upload
# ENV_VARIABLES:
#  - DESTINATION: if provided, destination path (default: "~/registry")

FILENAME=`basename $1`
DEST="${DESTINATION:-'~/registry'}"
# Create first destination folder, in case it does not exist
ssh $USER@$IP "mkdir -p $DEST"
scp $@ $USER@$IP:$DEST