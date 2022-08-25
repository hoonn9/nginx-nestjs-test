FROM node:16

COPY . /usr/src/app
WORKDIR /usr/src/app

RUN npm ci
RUN npm run build

EXPOSE 3000
CMD ["node", "dist/main"]