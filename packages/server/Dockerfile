FROM node

WORKDIR /app

COPY package.json ./

RUN npm install

COPY . .

EXPOSE 2100

RUN npm run build

CMD ["npm", "run", "start"]
