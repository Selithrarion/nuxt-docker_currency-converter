FROM node:15

ENV APP_ROOT /web
WORKDIR ${APP_ROOT}

COPY package*.json ./
RUN yarn install

COPY . .

EXPOSE 3000

CMD ["yarn", "nuxt"]
