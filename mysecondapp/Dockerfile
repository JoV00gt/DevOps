FROM node:20

WORKDIR /secondapp

COPY package*.json ./

RUN npm ci

COPY . .

EXPOSE 5001

CMD npm run dev
