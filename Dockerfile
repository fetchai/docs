FROM node:18-alpine

RUN apk add tree && corepack prepare pnpm@8.6.10 --activate && corepack enable

WORKDIR /app
ADD package.json pnpm-lock.yaml /app/

RUN pnpm install --frozen-lockfile

COPY . /app

RUN pnpm build

ENTRYPOINT ["pnpm"]
CMD ["start"]
