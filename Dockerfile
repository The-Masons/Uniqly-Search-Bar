FROM node:8.11.1

WORKDIR /quick-cart

COPY package.json /quick-cart/
COPY package-lock.json /quick-cart/
COPY db /quick-cart/db/
COPY client /quick-cart/client/
COPY server /quick-cart/server/
COPY data /quick-cart/data/

RUN npm install

EXPOSE 3001

CMD ["npm","start","&&","npm","run react:prod"]
