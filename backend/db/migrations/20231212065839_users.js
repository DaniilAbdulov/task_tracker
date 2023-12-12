export function up(knex) {
    return knex.schema
        .createTable("users", (table) => {
            table.increments("id").primary().defaultTo(1);
            table.string("first_name").notNullable();
            table.string("last_name").notNullable();
            table.string("third_name").notNullable();
            table.string("login").notNullable();
            table.string("password").notNullable();
            table.string("role").notNullable();
        })
        .then(() => {
            console.log('Таблица "users" создана');
        })
        .catch((err) => {
            console.error('Ошибка при создании таблицы "users"', err);
        });
}

export function down(knex) {
    return knex.schema.dropTable("users");
}
