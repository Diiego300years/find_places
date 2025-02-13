# Użyj Node.js jako obrazu bazowego
FROM node:18 AS build

# Ustaw katalog roboczy
WORKDIR /app

# Skopiuj package.json i package-lock.json
COPY ang-app/package*.json ./

# Zainstaluj zależności
RUN npm install

# Skopiuj resztę aplikacji Angular
#COPY ang-app/ ./
#
## Zbuduj aplikację Angular
#RUN npm run build --prod
#
## Użyj nginx jako serwera statycznych plików
#FROM nginx:alpine
#
## Usuń domyślną stronę NGINX
#RUN rm -rf /usr/share/nginx/html/*
#
## Skopiuj zbudowaną aplikację Angular do katalogu NGINX
#COPY --from=build /app/dist/ang-app /usr/share/nginx/html
#
## Otwórz port 80
#EXPOSE 80
#
## Uruchom NGINX
#CMD ["nginx", "-g", "daemon off;"]

EXPOSE 80