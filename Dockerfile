FROM node:18-alpine

ARG BACKEND_URL=""
ARG SENDER_TOKEN=""

RUN apk add tree && corepack prepare pnpm@8.6.10 --activate && corepack enable

WORKDIR /app
ADD package.json pnpm-lock.yaml /app/

RUN pnpm install --frozen-lockfile

COPY . /app

ENV NODE_ENV="production"

RUN echo BACKEND_URL="${BACKEND_URL}" > .env.local && \
    echo SENDER_TOKEN="${SENDER_TOKEN}" > .env.local && \
    echo NEXT_PUBLIC_GOOGLE_ANALYTICS_TRACKING_ID="${NEXT_PUBLIC_GOOGLE_ANALYTICS_TRACKING_ID}" >> .env.local && \
    pnpm build

ENTRYPOINT ["pnpm"]
CMD ["start"]
