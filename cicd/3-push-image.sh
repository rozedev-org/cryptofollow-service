#!/bin/bash
source ./utils.sh

load_config

# Empujar la imagen de Docker
echo "Iniciando empuje de la imagen de Docker al registro..."
docker push "$IMAGE:latest" || handle_error "empuje"
echo "Empuje de la imagen de Docker completado con éxito."
