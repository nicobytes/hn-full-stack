FROM node:20

WORKDIR /app
COPY package.json package-lock.json /app/
RUN npm install

COPY . /app
RUN npm run build

EXPOSE 3001

CMD npm run migrations:run; npm run start:prod
