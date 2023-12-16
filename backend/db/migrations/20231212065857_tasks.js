export function up(knex) {
    return knex.schema
        .createTable("tasks", (table) => {
            table.increments("id").primary();
            table.string("title").notNullable();
            table.string("description").notNullable();
            table.integer("priority").notNullable();
            table.date("ends_in").notNullable();
            table.date("created_at").notNullable();
            table.date("updated_at").notNullable();
            table.integer("status").notNullable();
            table.integer("inspector_id").unsigned().notNullable();
            table.integer("author_id").unsigned().notNullable();
            table
                .foreign("inspector_id")
                .references("id")
                .inTable("users")
                .onDelete("CASCADE");
            table
                .foreign("author_id")
                .references("id")
                .inTable("users")
                .onDelete("CASCADE");
        })
        .then(() => {
            console.log('Таблица "tasks" создана');
        })
        .catch((err) => {
            console.error('Ошибка при создании таблицы "tasks"', err);
        });
}

export function down(knex) {
    return knex.schema.dropTable("tasks");
}
