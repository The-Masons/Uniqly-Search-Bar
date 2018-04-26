FROM node:8.11.1

WORKDIR /quick-cart

COPY package.json /quick-cart/
COPY package-lock.json /quick-cart/
COPY db /quick-cart/db/
COPY client /quick-cart/client/
COPY server /quick-cart/server/

RUN npm install

EXPOSE 3001

ENV DBNAME uniqly
ENV PGHOST 172.17.0.1
ENV PGPORT 5432
ENV PGPASSWORD catsanddogs123
ENV HOSTNAME 172.17.0.1
ENV PORT 3001

CMD ["npm","start"]
