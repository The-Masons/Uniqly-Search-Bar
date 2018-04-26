FROM node:8.11.1

WORKDIR /quick-cart

COPY package.json /quick-cart/
COPY package-lock.json /quick-cart/
COPY db /quick-cart/db/
COPY client /quick-cart/client/
COPY server /quick-cart/server/

RUN npm install

EXPOSE 3001

ARG dbname
ARG pghost
ARG pgport
ARG pgpassword

ENV DBNAME $dbname
ENV PGHOST $pghost
ENV PGPORT $pgport
ENV PGPASSWORD $pgpassword

CMD ["npm","start"]
