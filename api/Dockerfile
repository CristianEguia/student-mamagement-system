# Etapa de compilación
FROM mcr.microsoft.com/dotnet/sdk:9.0 AS build
WORKDIR /src

# Agregar herramientas globales de .NET al PATH
ENV PATH="$PATH:/root/.dotnet/tools"

# Copiar archivos de proyecto y restaurar dependencias
COPY *.csproj .
RUN dotnet restore

# Copiar el resto del código fuente
COPY . .

# Publicar la aplicación en modo Release
RUN dotnet publish -c Release -o /app/publish

# Etapa de ejecución
FROM mcr.microsoft.com/dotnet/aspnet:9.0 AS runtime
WORKDIR /app

# Copiar la aplicación publicada desde la etapa de compilación
COPY --from=build /app/publish .

# Exponer el puerto en el que se ejecutará la aplicación
EXPOSE 5226

# Definir el punto de entrada para ejecutar la aplicación
ENTRYPOINT ["sh", "-c", "dotnet api.dll"]
