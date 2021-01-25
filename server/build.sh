#!/usr/bin/env bash

docker build -t todoserver .
docker tag todoserver ahmadulinjs/todoserver
docker push ahmadulinjs/todoserver