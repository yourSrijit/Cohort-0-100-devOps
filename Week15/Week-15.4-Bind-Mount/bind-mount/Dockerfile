FROM node:21

WORKDIR /nextapp

COPY package* .

RUN npm install

COPY . . 

EXPOSE 3000

CMD [ "npm" ,"run","dev" ]
