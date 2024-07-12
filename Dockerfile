FROM node:18-alpine

ARG BACKEND_URL=""
ARG NEXT_PUBLIC_GOOGLE_ANALYTICS_TRACKING_ID=""
ARG NEXT_PUBLIC_ALGOLIA_APP_ID=""
ARG NEXT_PUBLIC_ALGOLIA_API_KEY=""
ARG NEXT_PUBLIC_ALGOLIA_INDEX=""
ARG NEWSLETTER_BASE_URL=""

RUN apk add tree && corepack prepare pnpm@8.6.10 --activate && corepack enable

WORKDIR /app
ADD package.json pnpm-lock.yaml /app/

RUN pnpm install --frozen-lockfile

COPY . /app

ENV NODE_ENV="production"

RUN echo BACKEND_URL="${BACKEND_URL}" > .env.local && \
    echo NEXT_PUBLIC_GOOGLE_ANALYTICS_TRACKING_ID="${NEXT_PUBLIC_GOOGLE_ANALYTICS_TRACKING_ID}" >> .env.local && \
    echo NEXT_PUBLIC_ALGOLIA_APP_ID="${NEXT_PUBLIC_ALGOLIA_APP_ID}" >> .env.local && \
    echo NEXT_PUBLIC_ALGOLIA_API_KEY="${NEXT_PUBLIC_ALGOLIA_API_KEY}" >> .env.local && \
    echo NEXT_PUBLIC_ALGOLIA_INDEX="${NEXT_PUBLIC_ALGOLIA_INDEX}" >> .env.local && \
    echo NEWSLETTER_BASE_URL="${NEWSLETTER_BASE_URL}" >> .env.local && \
    pnpm build

ENTRYPOINT ["pnpm"]
CMD ["start"]
