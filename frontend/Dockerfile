# Загрузка базового образа с Node.js
FROM node:21-alpine

# Установка и кэширование зависимостей
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci

# Копирование исходного кода
COPY src ./src

# Запуск сборки React-приложения
RUN npm run build

# Установка сервера Nginx
RUN npm install -g serve

# Копирование собранного приложения в папку, доступную для Nginx
COPY build ./

# Команда для запуска сервера приложения
CMD ["serve", "-s", "."]
