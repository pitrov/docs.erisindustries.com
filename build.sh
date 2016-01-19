#!/usr/bin/env bash

start=`pwd`
cd /tmp

git clone git@github.com:OpenBazaar/OpenBazaar.git 1>/dev/null
cd OpenBazaar 1>/dev/null
docker build -t quay.io/eris/openbazaar . 1>/dev/null

cd .. && rm -rf OpenBazaar
cd $start