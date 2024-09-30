FROM node AS deps
WORKDIR /usr/src/app
COPY package*.json .
RUN npm install

FROM node AS builder
WORKDIR /usr/src/app
COPY --from=deps /usr/src/app/node_modules ./node_modules
COPY . .
COPY --from=deps /usr/src/app/package.json ./
COPY --from=deps /usr/src/app/package-lock.json ./
RUN npx prisma generate
RUN npm run build

FROM node
ENV NODE_ENV production
WORKDIR /usr/src/app

COPY --from=builder /usr/src/app/dist ./dist
COPY --from=builder /usr/src/app/package.json ./
COPY --from=builder /usr/src/app/package-lock.json ./
COPY --from=builder /usr/src/app/.env ./
COPY --from=builder /usr/src/app/public ./public
COPY --from=builder /usr/src/app/uploads ./uploads

RUN npm ci --only=production

CMD npm run start-prod