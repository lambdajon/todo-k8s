#!/usr/bin/env bash

kubectl apply -f server/todo-configmap.yaml
kubectl apply -f server/todo-secret.yaml
kubectl apply -f server/todo-mongo.yaml
kubectl apply -f server/todo-backend.yaml
kubectl apply -f client/todo-frontend.yaml