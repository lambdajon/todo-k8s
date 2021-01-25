#!/usr/bin/env bash

docker build -t todoclient .
docker tag todoclient ahmadulinjs/todoclient
docker push ahmadulinjs/todoclient