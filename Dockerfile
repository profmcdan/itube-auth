FROM node:18-alpine AS base
# RUN apt-get update && apt-get install libssl-dev ca-certificates -y
WORKDIR /app

COPY package.json yarn.lock ./

FROM base as builder
RUN export NODE_ENV=production
RUN yarn

COPY . .
RUN yarn run prisma:generate
RUN yarn build

FROM base as prod-builder

RUN yarn install --production
COPY prisma prisma
RUN yarn run prisma:generate
RUN cp -R node_modules prod_node_modules

FROM base as prod

COPY --from=prod-builder /app/prod_node_modules /app/node_modules
COPY --from=builder  /app/dist /app/dist
COPY --from=builder  /app/prisma /app/prisma

EXPOSE 80
CMD ["yarn", "start"]
