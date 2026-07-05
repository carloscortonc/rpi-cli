#!/bin/bash
# Script for uploading files into "registry" folder
# ARGUMENTS:
#   $@: list of file locations to upload
# ENV_VARIABLES:
#  - DESTINATION: if provided, destination path (default: "~/registry")

CURRDIR=$(dirname $0)
FILENAME=`basename $1`
DEST="${DESTINATION:-\$HOME/registry}"

# Check server
source $CURRDIR/check_server.sh

# Create first destination folder, in case it does not exist, and save resolved path
EXPANDED_DEST=$($SSH $USER@$IP "mkdir -p $DEST && echo $DEST")


scp $@ $USER@$IP:$EXPANDED_DEST