#!/usr/bin/env bash

kubectl apply -f volumes/todo-volume.yaml
kubectl apply -f volumes/todo-volume-calim.yaml
kubectl apply -f server/todo-configmap.yaml
kubectl apply -f server/todo-secret.yaml
kubectl apply -f server/todo-mongo.yaml
kubectl apply -f server/todo-backend.yaml
kubectl apply -f client/todo-frontend.yaml
# kubectl apply -f ingress/ingress.yaml