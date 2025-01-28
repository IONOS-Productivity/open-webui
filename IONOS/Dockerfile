# syntax=docker/dockerfile:1

ARG BUILD_HASH=dev-build

#########################
# WebUI frontend
#########################

FROM --platform=$BUILDPLATFORM node:22-alpine3.20 AS build
ARG BUILD_HASH

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

COPY . .
ENV APP_BUILD_HASH=${BUILD_HASH}
ENV NODE_OPTIONS=--max-old-space-size=3300
RUN npm run build

#########################
# WebUI backend
#########################

FROM python:3.11-slim-bookworm AS base

## Basis ##
ENV ENV=prod \
    PORT=8080

WORKDIR /app/backend

# install python dependencies
COPY ./backend/requirements.txt ./requirements.txt

RUN pip3 install uv && \
    uv pip install --system -r requirements.txt --no-cache-dir

# copy built frontend files
COPY --from=build /app/build /app/build
COPY --from=build /app/CHANGELOG.md /app/CHANGELOG.md
COPY --from=build /app/package.json /app/package.json

# copy backend files
COPY ./backend .

EXPOSE 8080

HEALTHCHECK CMD curl --silent --fail http://localhost:${PORT:-8080}/health | jq -ne 'input.status == true' || exit 1

ARG BUILD_HASH
ENV WEBUI_BUILD_VERSION=${BUILD_HASH}
ENV DOCKER=true

CMD [ "bash", "start.sh"]
