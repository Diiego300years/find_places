# Używamy obrazu Node (wersja alpine)
FROM node:18-alpine
LABEL authors="Marcin Buczak"

WORKDIR /app

# Kopiujemy pliki package.json oraz package-lock.json (jeśli istnieje)
COPY package*.json ./

# Instalujemy Angular CLI globalnie oraz zależności projektu
RUN npm install -g @angular/cli && npm install

COPY . ./app

EXPOSE 4200

CMD ["ng", "serve", "--host", "0.0.0.0"]
