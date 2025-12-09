FROM node:20-alpine

WORKDIR /app

# Habilita Corepack para usar a versão correta do Yarn
RUN corepack enable && corepack prepare yarn@4.6.0 --activate

# Copia apenas arquivos de dependências primeiro para aproveitar cache
COPY package.json yarn.lock ./

RUN yarn install

# Copia o restante do código
COPY . .

# Build do TypeScript para a pasta dist
# Assuma que existe script "build" no package.json do backend
RUN yarn build

ENV NODE_ENV=production
ENV PORT=3000

EXPOSE 3000

# Importante: o servidor deve escutar em 0.0.0.0
# Ex: app.listen(process.env.PORT || 3000, '0.0.0.0', () => ...)
# Usa yarn node para que o PnP funcione corretamente
CMD ["yarn", "node", "dist/index.js"]

