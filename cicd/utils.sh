#!/bin/bash


# Función para manejar errores
handle_error() {
    echo "Error en el paso $1"
    exit 1
}


load_config() {
# Cargar archivo de configuración
config_file="/home/jcjimenez/app/cryptofollow/dev/cryptofollow-service/cicd/config.env"
if [ -f "$config_file" ]; then
  source "$config_file"
  IP=$(echo $IP | tr -d '\r')
  PORT=$(echo $PORT | tr -d '\r')
 
else
  echo "Error: Archivo de configuración '$config_file' no encontrado."
  exit 1
fi
}