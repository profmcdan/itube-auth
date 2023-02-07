FROM node:18-alpine
USER node

WORKDIR /app
RUN npm install yarn

COPY --chown=node ./package.json ./
COPY --chown=node . ./

RUN yarn install && yarn cache clean
RUN yarn prisma:migrate

EXPOSE 10001

CMD ["yarn,", "start:dev"]
