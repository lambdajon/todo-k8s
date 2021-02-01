#!/usr/bin/env bash
kubectl apply -f volumes/todo-volume.yaml
kubectl apply -f volumes/todo-volume-calim.yaml

kubectl apply -f hpa/hpa-mem.yaml
kubectl apply -f hpa/hpa.yaml

kubectl apply -f hpa/todo-configmap.yaml
kubectl apply -f hpa/todo-secret.yaml
kubectl apply -f hpa/todo-mongo.yaml
kubectl apply -f hpa/todo-backend.yaml

kubectl apply -f client/todo-frontend.yaml
kubectl apply -f ingress/ingress.yaml