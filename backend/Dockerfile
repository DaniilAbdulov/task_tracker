# Загрузка базового образа с Node.js
FROM node:21-alpine

# Установка и кэширование зависимостей
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci

# Копирование исходного кода
COPY . .

# RUN npm run knex:rollback
# RUN npm run knex:migrate
# RUN npm run knex:seed


# Команда для запуска сервера Express
CMD ["npm", "run", "start"]