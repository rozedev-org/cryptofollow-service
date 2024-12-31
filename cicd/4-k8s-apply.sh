#!/bin/bash
source ./utils.sh

load_config

# Desplegar en Kubernetes
echo "Iniciando despliegue en Kubernetes..."
microk8s kubectl apply -k ../k8s || handle_error "despliegue 1"
microk8s kubectl set image deployment/$appName $appName=$image -n service-management || handle_error "despliegue 2"
microk8s kubectl rollout restart deployment/$appName -n service-management || handle_error "despliegue 3"
echo "Despliegue en Kubernetes completado con éxito."

echo "Todas las acciones se completaron con éxito."
