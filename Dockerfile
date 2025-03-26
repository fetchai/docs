FROM node:20.17.0

ARG BACKEND_URL=""
ARG NEXT_PUBLIC_GOOGLE_ANALYTICS_TRACKING_ID=""
ARG NEXT_PUBLIC_ALGOLIA_APP_ID=""
ARG NEXT_PUBLIC_ALGOLIA_API_KEY=""
ARG NEXT_PUBLIC_ALGOLIA_INDEX=""
ARG NEWSLETTER_BASE_URL=""
ARG SENDER_TOKEN=""

RUN npm install --global corepack@latest

RUN corepack prepare pnpm@10.5.2 --activate && \
    corepack enable

WORKDIR /app
ADD package.json pnpm-lock.yaml /app/

RUN pnpm install --verbose

COPY . /app

ENV NODE_ENV="production"
ENV NODE_OPTIONS="--max-old-space-size=8192"

RUN echo BACKEND_URL="${BACKEND_URL}" > .env.local && \
    echo SENDER_TOKEN="${SENDER_TOKEN}" >> .env.local && \
    echo NEXT_PUBLIC_GOOGLE_ANALYTICS_TRACKING_ID="${NEXT_PUBLIC_GOOGLE_ANALYTICS_TRACKING_ID}" >> .env.local && \
    echo NEXT_PUBLIC_ALGOLIA_APP_ID="${NEXT_PUBLIC_ALGOLIA_APP_ID}" >> .env.local && \
    echo NEXT_PUBLIC_ALGOLIA_API_KEY="${NEXT_PUBLIC_ALGOLIA_API_KEY}" >> .env.local && \
    echo NEXT_PUBLIC_ALGOLIA_INDEX="${NEXT_PUBLIC_ALGOLIA_INDEX}" >> .env.local && \
    echo NEWSLETTER_BASE_URL="${NEWSLETTER_BASE_URL}" >> .env.local

RUN pnpm run build

ENTRYPOINT ["pnpm"]
CMD ["start"]
