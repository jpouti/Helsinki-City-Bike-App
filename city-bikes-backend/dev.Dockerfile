FROM node:16

WORKDIR /usr/src/app

COPY . .

COPY entrypoint.sh /usr/src/app/

RUN npm i -G nodemon

RUN npm ci

ENTRYPOINT [ "/usr/src/app/entrypoint.sh" ]