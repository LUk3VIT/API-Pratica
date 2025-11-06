# Usar imagem oficial do Node.js
FROM node:18-alpine

# Definir diretório de trabalho
WORKDIR /app

# Copiar arquivos de dependências
COPY package*.json ./

# Instalar dependências
RUN npm install

# Copiar código da aplicação
COPY . .

# Expor porta da aplicação
EXPOSE 3000

# Criar usuário não-root para segurança
RUN addgroup -g 1001 -S nodejs
RUN adduser -S nextjs -u 1001
USER nextjs

# Comando para iniciar a aplicação
ENTRYPOINT ["npm", "run", "dev"]