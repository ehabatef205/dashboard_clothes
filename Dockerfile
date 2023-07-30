FROM node:14.19.3

WORKDIR /React_Admin_dash

COPY package.json .

RUN npm install --force

COPY . .

EXPOSE 3020

CMD ["npm","run","start"]