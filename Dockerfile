# Etap 1
FROM scratch AS build

# utworzenie warstwy bazowej obrazu 
ADD alpine-minirootfs-3.21.3-x86_64.tar /

# uaktualnienie systemu w warstwie bazowej ora instalacja
# niezbędnych komponentów środowiska roboczego
RUN apk update && \
    apk upgrade && \
    apk add --no-cache nodejs npm && \
    rm -rf /etc/apk/cache

# Ustalenie katalogu roboczego w kontenerze
WORKDIR /app

# Kopiowanie plików .json i instalacja zależności
COPY package*.json ./
RUN npm install

# Kopiujemy resztę kodu aplikacji
COPY . .

# Budowa aplikacji
RUN npm run build

# Etap 2
FROM nginx:alpine

# dodanie brakującego narzedzia do realizacji testu HEALTHCHECK 
RUN apk update && \
    apk upgrade && \
    apk add --update --no-cache curl && \
    rm -rf /etc/apk/cache

# Imie i nazwisko autora
LABEL org.opencontainers.image.authors="Kamila Karwat"

# Kopiowanie aplikacji jako domyślnej dla serwera HTTP
COPY --from=build /app/build/. /var/www/html

# Kopiowanie konfiguracji serwera HTTP dla srodowiska produkcyjnego
COPY default.conf /etc/nginx/conf.d/default.conf

# Deklaracja portu aplikacji w kontenerze 
EXPOSE 80

# monitorowanie dostepnosci serwera 
HEALTHCHECK --interval=10s --timeout=1s \
 CMD curl -f http://localhost:80/ || exit 1

# Deklaracja sposobu uruchomienia serwera
CMD ["nginx", "-g", "daemon off;"]