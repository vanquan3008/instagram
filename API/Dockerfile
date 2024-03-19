FROM node:18-alpine

WORKDIR /instagram-ui/backend

COPY package*.json ./

RUN npm install

RUN npm install -g @babel/core @babel/cli

COPY . .

RUN npm run build-src

EXPOSE 3000

CMD ["npm", "run", "build"]