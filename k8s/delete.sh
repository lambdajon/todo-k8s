#!/usr/bin/env bash

kubectl delete svc/todo-mongo-service 
kubectl delete svc/todo-backend-service
kubectl delete deployment/todo-backend
kubectl delete deployment/todo-frontend
kubectl delete deployment/todo-mongodb