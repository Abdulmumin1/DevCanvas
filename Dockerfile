FROM node:20.18.1

WORKDIR /app

COPY package.json pnpm-lock.yaml ./
RUN npm install -g pnpm@9
RUN pnpm install --frozen-lockfile

COPY . .
RUN pnpm run build

EXPOSE 8080
CMD ["pnpm", "start"]
