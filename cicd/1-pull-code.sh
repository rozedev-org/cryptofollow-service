#!/bin/bash
source ./utils.sh

#Pull changes
git pull || handle_error "pull"

