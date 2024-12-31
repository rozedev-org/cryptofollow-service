#!/bin/bash
source ./cicd//utils.sh

#Pull changes
git pull || handle_error "pull"

