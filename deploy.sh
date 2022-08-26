#!/bin/bash

DIR=/var/www/stud_frontend

runuser -l ubuntu -c "cd ${DIR} && git pull && yarn && yarn build"
