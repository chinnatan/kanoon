FROM --platform=linux/amd64 node:21-slim

ENV NODE_ENV development

WORKDIR /app

COPY package.json .

RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm", "run", "dev"]