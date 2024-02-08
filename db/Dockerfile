# Загрузка базового образа с Postgres
FROM postgres:14-alpine

# Копирование SQL-скрипта инициализации базы данных
COPY init.sql /docker-entrypoint-initdb.d/

# Опционально: копирование миграций и других файлов для инициализации БД
# COPY migrations/ /docker-entrypoint-initdb.d/migrations/
# COPY data/ /docker-entrypoint-initdb.d/data/

