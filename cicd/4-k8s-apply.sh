#!/bin/bash
source ./utils.sh

load_config

# Desplegar en Kubernetes
echo "Iniciando despliegue en Kubernetes..."
microk8s kubectl apply -k ../kustomization/$TARGET_ENVIROMENT || handle_error "despliegue 1"
microk8s kubectl set image deployment/$APP_NAME $APP_NAME=$IMAGE -n cryptofollow-dev || handle_error "despliegue 2"
microk8s kubectl rollout restart deployment/$APP_NAME -n cryptofollow-dev || handle_error "despliegue 3"
echo "Despliegue en Kubernetes completado con éxito."

echo "Todas las acciones se completaron con éxito."
