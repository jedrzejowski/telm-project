FROM node:lts-alpine AS builder
WORKDIR /container/
COPY . ./
RUN npm install
#RUN npm run test
#RUN npm run eslint
RUN npm run build

FROM node:lts-alpine
RUN apk --no-cache add ca-certificates
WORKDIR /container/
COPY --from=builder /container/package.json ./
COPY --from=builder /container/dist/ ./dist/
ENV NODE_ENV=production
RUN npm install --prod
CMD npm run serve
