FROM node:18-alpine

ARG BACKEND_URL=""

RUN apk add tree && corepack prepare pnpm@8.6.10 --activate && corepack enable

WORKDIR /app
ADD package.json pnpm-lock.yaml /app/

RUN pnpm install --frozen-lockfile

COPY . /app

ENV NODE_ENV="production"

RUN echo NEXT_PUBLIC_BACKEND_URL="${NEXT_PUBLIC_BACKEND_URL}" > .env.local && \
    echo NEXT_PUBLIC_GOOGLE_ANALYTICS_TRACKING_ID="${NEXT_PUBLIC_GOOGLE_ANALYTICS_TRACKING_ID}" >> .env.local && \
pnpm build

ENTRYPOINT ["pnpm"]
CMD ["start"]
