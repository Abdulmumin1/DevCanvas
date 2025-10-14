FROM node:20.18.1

WORKDIR /app

COPY package.json pnpm-lock.yaml ./
RUN corepack enable && pnpm install --frozen-lockfile

COPY . .
RUN pnpm run build

EXPOSE 8080
ENV PORT=8080

CMD ["node", "build"]
