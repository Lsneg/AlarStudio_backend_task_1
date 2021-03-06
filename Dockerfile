FROM node:16.14.0 as build-stage

WORKDIR /app

COPY ./backend /app
RUN yarn install
RUN rm -rf /app/src/build
COPY ./frontend /app/frontend
RUN cd ./frontend/ && yarn install && yarn build && mv ./build ../src/
RUN cd /app

CMD ["./node_modules/.bin/ts-node", "./src/index.ts"]
