# Fase de build
FROM public.ecr.aws/docker/library/node:20-alpine AS build

WORKDIR /app

# Habilita Corepack para usar a versão correta do Yarn
RUN corepack enable && corepack prepare yarn@4.10.3 --activate

COPY package.json yarn.lock ./
RUN yarn install

COPY . .

# Assuma que existe script "build" no package.json do frontend (Vite)
RUN yarn build

# Fase de servidor estático com Nginx
 FROM public.ecr.aws/nginx/nginx:alpine


# Copia os arquivos estáticos gerados pelo Vite
COPY --from=build /app/dist /usr/share/nginx/html

# Remove configuração default e mantém o básico
RUN rm /etc/nginx/conf.d/default.conf

# Cria uma config simples do Nginx
# Servindo os arquivos estáticos e permitindo SPA (fallback para index.html)
RUN printf 'server {\n\
    listen 80;\n\
    server_name _;\n\
    root /usr/share/nginx/html;\n\
    index index.html;\n\
\n\
    location / {\n\
        try_files $uri $uri/ /index.html;\n\
    }\n\
}\n' > /etc/nginx/conf.d/app.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]

