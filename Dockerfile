# ==========================================
# Estágio 1: Build (Compilação do TypeScript)
# ==========================================
FROM node:26-alpine AS builder

WORKDIR /usr/src/app

# Copia os arquivos de dependências
COPY package*.json ./

# Instala todas as dependências (incluindo devDependencies para compilar)
RUN npm ci

# Copia o código-fonte e configurações
COPY . .

# Gera o Prisma Client dentro do container antes de compilar
RUN npx prisma generate

# Gera os arquivos compilados em JavaScript na pasta /dist
RUN npm run build

# ==========================================
# Estágio 2: Runner (Ambiente de Execução)
# ==========================================
FROM node:26-alpine AS runner

WORKDIR /usr/src/app

ENV NODE_ENV=production

# Copia apenas os arquivos de manifesto de pacotes
COPY package*.json ./

# Instala APENAS as dependências de produção para reduzir o tamanho da imagem
RUN npm ci --only=production

# Copia a pasta /dist gerada no estágio de build
COPY --from=builder /usr/src/app/dist ./dist

# Traz os arquivos do schema e das migrations para o runner
COPY --from=builder /usr/src/app/prisma ./prisma

# Copia os artefatos gerados pelo Prisma e o código compilado em JS
COPY --from=builder /usr/src/app/node_modules/.prisma ./node_modules/.prisma
COPY --from=builder /usr/src/app/node_modules/@prisma/client ./node_modules/@prisma/client
COPY --from=builder /usr/src/app/src/generated/prisma/*.so.node ./dist/generated/prisma/

# Expõe a porta onde o Express escuta
EXPOSE 3000

# Comando para subir o servidor em produção
CMD ["node", "dist/main/server.js"]
