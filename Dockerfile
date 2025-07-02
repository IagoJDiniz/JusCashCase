# Etapa 1: build com esbuild
FROM node:20-alpine AS builder

# Cria diretório da aplicação
WORKDIR /app

# Copia apenas arquivos necessários para instalar deps
COPY package*.json ./
COPY tsconfig.json ./
COPY ./src ./src
COPY prisma ./prisma

# Instala dependências
RUN npm install

# Instala esbuild globalmente para garantir build no container
RUN npm install -g esbuild

# Faz o build
RUN npm run build

# Etapa 2: imagem leve para produção
FROM node:20-alpine

# Cria diretório da aplicação
WORKDIR /app

# Copia apenas o necessário do build
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY package.json ./

# Expõe a porta definida (ou padrão)
ENV PORT=3333
EXPOSE 3333

# Comando para iniciar a app
CMD ["node", "dist/index.js"]