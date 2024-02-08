# Загрузка базового образа с Node.js
FROM node:14-alpine

# Установка и кэширование зависимостей
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci

# Копирование исходного кода
COPY . .

# Команда для запуска сервера Express
CMD ["npm", "run", "serve"]