FROM node:20-alpine AS development

WORKDIR /app
RUN chown node:node ./
USER node

COPY package.json ./
COPY yarn.lock ./
RUN yarn

COPY . .

ENV VITE_API_BASE_URL="http://localhost:3000"

EXPOSE 8080

CMD [ "yarn", "dev" ]