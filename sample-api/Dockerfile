# Używamy obrazu Node (wersja alpine dla mniejszego obrazu)
FROM node:16-alpine

# Ustawiamy katalog roboczy
WORKDIR /app

COPY  . .

# Instalujemy json-server jako zależność lokalną
RUN npm install json-server --save

# Eksponujemy port 3000
#EXPOSE 3000

# Uruchamiamy json-server, monitorując plik db.json i udostępniając endpointy na porcie 3000
CMD ["npx", "json-server", "--watch", "db.json", "--port", "3000"]
