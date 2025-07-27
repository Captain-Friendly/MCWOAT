FROM node:alpine

WORKDIR /app

COPY package*.json ./

RUN npm install 

COPY . .
# RUN npm run build

# ENV PORT=5173

EXPOSE 5173

CMD ["node", "src/express_server.js"]


