# Build frontend
FROM node:20-slim AS client-builder
WORKDIR /app/client
COPY client/package*.json ./
RUN npm install --production=false
COPY client/ .
RUN npm run build

# Build backend
FROM node:20-slim AS server
WORKDIR /app/server
COPY server/package*.json ./
RUN npm install --production
COPY server/ .
COPY --from=client-builder /app/client/dist ./public
ENV PORT=3000
ENV PGHOST=db
ENV PGPORT=5432
ENV PGUSER=todo
ENV PGPASSWORD=todo
ENV PGDATABASE=todo
ENV DB_FILE=/data/todos.db
EXPOSE 3000
CMD ["node", "src/index.js"]
