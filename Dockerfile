FROM node:18
WORKDIR /usr

RUN corepack enable
RUN corepack prepare yarn@stable --activate

COPY package.json ./
COPY tsconfig.json ./
COPY prisma ./prisma
COPY src ./src

RUN npm install

COPY ./entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

EXPOSE 8000
ENTRYPOINT [ "/entrypoint.sh" ]
