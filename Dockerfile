# Etapa de construcción (builder)
# Se usa una imagen de Node.js basada en Alpine para compilar la aplicación
FROM node:lts-alpine AS builder
WORKDIR /app # app inside the image

# Copiar los archivos del proyecto y ejecutar la instalación de dependencias
COPY ./app ./dist


# Etapa de producción con Nginx
FROM nginx:alpine

# Copiar la aplicación construida desde la etapa builder
COPY --from=builder /app/dist /usr/share/nginx/html

# Copiar configuración personalizada de Nginx
COPY default.conf /etc/nginx/conf.d/default.conf

# Exponer el puerto 80 para servir la aplicación
EXPOSE 80

# Iniciar Nginx en modo foreground
CMD ["nginx", "-g", "daemon off;"]
