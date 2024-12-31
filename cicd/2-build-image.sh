#!/bin/bash
source ./utils.sh

load_config

echo "Iniciando construcción de la imagen de Docker..."
docker build -f ../Dockerfile -t "$IMAGE" ../ || handle_error "construcción"
echo "Construcción de la imagen de Docker completada con éxito."

