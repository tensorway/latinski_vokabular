FROM node:alpine AS builder
WORKDIR /latin_vocab
COPY . .
RUN npm install && npm run build


FROM nginx:alpine
WORKDIR /usr/share/nginx/html
RUN rm -rf ./*
COPY --from=builder /latin_vocab/build .
ENTRYPOINT ["nginx", "-g", "daemon off;"]